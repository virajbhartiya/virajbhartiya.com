---
title: "Raftokay: Building Raft Consensus From Scratch"
description: "A production-shaped Raft implementation in Go — leader election, log replication, WAL persistence, snapshots, and a chaos simulator. Built so I'd actually understand what etcd is doing under the hood."
publishedAt: "2025-07-28"
updatedAt: "2026-05-08"
tags: ["Distributed Systems", "Raft", "Consensus", "Go", "Open Source"]
image: "/images/Blog/raftokay.png"
author: "Viraj Bhartiya"
---

Everyone reaches for [etcd](https://etcd.io/) or [Consul](https://www.consul.io/) when they need consensus. Fair enough — they're battle-tested.

But here's the thing: if you don't understand what's happening underneath, you're flying blind when something breaks. And in distributed systems, things break in ways that make you question reality.

So I built [Raftokay](https://github.com/virajbhartiya/raftokay).

I wanted to understand [Raft](https://raft.github.io/) deeply, not just use it. Most "educational" implementations skip the parts that actually matter — persistence, snapshots, recovery — and stop at "look, leader election works in a happy-path test." That's not consensus. That's a demo. Raftokay persists to disk with `fsync`. It recovers from crashes. It survives partitions. And it has a chaos simulator that breaks things on purpose so I know it works when reality does the same.

The implementation follows the [original Raft paper](https://raft.github.io/raft.pdf) by Diego Ongaro and John Ousterhout — randomized election timeouts in the 150–300ms range, 50ms heartbeats, strict persistence guarantees where every state change hits the disk before the RPC reply.

---

## The algorithm, briefly

Raft solves distributed consensus: getting multiple machines to agree on a sequence of operations even when some machines crash or networks fail.

The core insight is brutally simple. One leader, everyone else follows. The leader accepts client requests, replicates them to followers, and commits them once a majority acknowledges. If the leader dies, followers elect a new one. That's it. No multi-phase commits. No [Byzantine fault tolerance](https://en.wikipedia.org/wiki/Byzantine_fault). Just "follow the leader," with elections when needed.

If you want the long version, [The Secret Lives of Data has a great Raft visualization](http://thesecretlivesofdata.com/raft/) and the [Raft paper](https://raft.github.io/raft.pdf) is genuinely readable for a paper. They're worth twenty minutes before you read the rest of this.

---

## Leader election

Every server runs a timer. If it doesn't hear from a leader before the timer expires, it assumes the leader is dead and starts an election.

The trick is **randomized timeouts**:

```go
// Election timeout: 150-300ms randomized
electionTimeout := 150 + rand.Intn(150)
```

Why random? Because simultaneous elections cause split votes. If every server timed out at exactly 200ms, they'd all start elections, all vote for themselves, and no one would win. Randomization breaks the symmetry. The original paper has [the math on this](https://raft.github.io/raft.pdf#section.5.2) and ends up choosing the same 150–300ms range for the same reason.

The state machine itself is clean. A follower receives heartbeats, votes in elections, and replicates logs. A candidate requests votes and retries if the election fails. A leader sends heartbeats every 50ms, replicates entries, and commits when a majority acknowledges. Transitions are explicit:

```
follower → candidate (election timeout)
candidate → leader (won election)
candidate → follower (discovered higher term)
leader → follower (discovered higher term)
```

No ambiguous states. No edge cases hidden in boolean flags.

---

## Log replication

Leader election is the part everyone shows off. Log replication is where consensus actually happens.

When the leader receives a command, it appends the entry to its local log with the current term, fires `AppendEntries` RPCs at every follower, and waits for a majority to acknowledge. Once it has the majority, it commits the entry and applies it to the state machine, then notifies followers to commit on the next heartbeat.

The consistency check on `AppendEntries` is the load-bearing part:

```go
// Reject if log doesn't contain entry at prevLogIndex with prevLogTerm
if prevLogIndex > 0 {
    if len(rf.log) < prevLogIndex || rf.log[prevLogIndex-1].Term != prevLogTerm {
        return false
    }
}
```

This ensures followers have an identical log prefix before accepting new entries. If they don't, the leader backtracks until it finds the point of divergence and overwrites the follower's log. Aggressive? Yes. But it's how you guarantee that once an entry is committed, it's committed forever. The paper calls this the [Log Matching Property](https://raft.github.io/raft.pdf#subsection.5.3).

---

## Persistence

This is where most "educational" Raft implementations cheat. They skip persistence.

In production, servers crash. Power fails. Disks get replaced. If your consensus algorithm only works when nothing ever restarts, it's not a consensus algorithm — it's a slide deck.

Raftokay uses a [write-ahead log](https://en.wikipedia.org/wiki/Write-ahead_logging):

```go
// Every write is immediately fsynced
func (w *WAL) Append(entry Entry) error {
    encoded := gob.Encode(entry)
    if _, err := w.file.Write(encoded); err != nil {
        return err
    }
    return w.file.Sync() // fsync after every write
}
```

The `Sync()` call is non-negotiable. Without it, your "persisted" data lives in the OS buffer cache, which dies with the power. If you've never read [Postgres on fsync correctness](https://www.postgresql.org/message-id/flat/CAEepm%3D2g0wPS%3DfRR1AwgEZF-rxd_3vRP-mddDoZ%3DDsYW9d4q3w%40mail.gmail.com) it's a great piece of horror writing about how the OS sometimes lies about what's on disk.

Encoding uses [Go's encoding/gob](https://pkg.go.dev/encoding/gob), which is binary, fast, and Go-specific. On startup, the server replays the WAL to reconstruct state — load persisted term and `votedFor`, replay log entries, load any snapshot, resume operation. Crash at any point and the WAL contains everything needed to recover.

---

## Snapshots

Logs grow forever. That's a problem.

A server running for a year without compaction would have millions of entries. Recovery would take hours. Disk would explode.

Snapshots fix it. The server serializes the current state machine to disk, records the last included log index and term, truncates the log before that point, and continues appending new entries. For slow or recovering followers, the leader sends snapshots via the `InstallSnapshot` RPC instead of replaying thousands of entries.

```go
// Truncate log after snapshot
func (w *WAL) TruncateBefore(index uint64) error {
    // Keep only entries after snapshot point
    w.entries = w.entries[index:]
    return w.rewrite()
}
```

The result is bounded log size, fast recovery, and efficient catch-up for lagging nodes. The paper covers this in [Section 7](https://raft.github.io/raft.pdf#section.7), and it's the part most "I implemented Raft in a weekend" posts skip.

---

## Chaos testing

Unit tests are necessary. They're also insufficient. They test the algorithm in isolation, while production involves network partitions that heal and re-partition, message delays measured in seconds, out-of-order delivery, duplicate messages, and partial failures where one direction works and the other doesn't. None of that shows up in a happy-path test.

Raftokay includes a simulator that injects all of these on demand:

```go
// Simulate network partition
sim.Partition([]int{0, 1}, []int{2, 3, 4})

// Delay messages by 100-500ms
sim.AddLatency(100, 500)

// Drop 10% of messages
sim.SetDropRate(0.1)

// Heal partition and verify consistency
sim.HealPartition()
```

The simulator runs hundreds of operations while chaos is active, then verifies that all committed entries are identical across servers, no committed entries were lost, and the state machine is consistent. The approach borrows heavily from [Jepsen-style](https://jepsen.io/) testing — if Raft can survive simulated chaos, it has a shot at surviving real infrastructure.

---

## Implementation choices worth flagging

A few decisions shape everything else.

**Single-threaded state machine.** All Raft state mutations happen in one goroutine. RPCs and timers send messages to it via channels. This eliminates lock contention and makes reasoning about state trivial. It's the same pattern [Hashicorp's Raft library](https://github.com/hashicorp/raft) uses.

**Term as the source of truth.** Whenever a server sees a higher term, it immediately becomes a follower. No exceptions. This is what stops stale leaders from causing damage and is the source of half the safety arguments in the paper.

**Commit rule safety.** Leaders only commit entries from the current term. This prevents a subtle bug — described as [Figure 8 in the paper](https://raft.github.io/raft.pdf#figure.8) — where a new leader could prematurely commit entries from a previous term that hadn't actually achieved consensus.

```go
// Only commit entries from current term
if entry.Term == rf.currentTerm && matchCount > len(rf.peers)/2 {
    rf.commitIndex = index
}
```

**Pluggable transports.** In-process for tests, Go's standard [`net/rpc`](https://pkg.go.dev/net/rpc) for real deployments. The Raft logic doesn't know or care which one it's running on.

---

## Running it

The repo ships `raftd` (the server daemon) and `raftctl` (the CLI).

Start a 3-node cluster:

```bash
raftd -id node1 -data-dir /tmp/raft-node1 -peers "localhost:8081,localhost:8082" -address :8080
raftd -id node2 -data-dir /tmp/raft-node2 -peers "localhost:8080,localhost:8082" -address :8081
raftd -id node3 -data-dir /tmp/raft-node3 -peers "localhost:8080,localhost:8081" -address :8082
```

Inspect state and submit commands:

```bash
raftctl -address localhost:8080 -command leader
raftctl -address localhost:8080 -command start -key foo -value bar
raftctl -address localhost:8080 -command state
```

Kill a node, submit more commands, restart it, verify it catches up. That's the whole point.

---

## What I actually got out of building this

Raftokay isn't meant to replace etcd. It's meant to teach me what etcd is actually doing — so when a production cluster starts misbehaving at 3 AM, I'll understand why.

It also forced me to be honest about which parts of "consensus" I was hand-waving. Election timing, log truncation on conflicting prefixes, the commit rule across term boundaries, fsync timing on every write — every one of those was a thing I "knew" until I had to write the code that actually did it.

Distributed systems don't reward ignorance. Study the algorithm. Read the code. Break things in simulation, before infrastructure breaks them for you.

---

## References

- [Raftokay repository](https://github.com/virajbhartiya/raftokay)
- Diego Ongaro and John Ousterhout, [In Search of an Understandable Consensus Algorithm](https://raft.github.io/raft.pdf) — the Raft paper
- [The Raft website](https://raft.github.io/) — overview, references, and links to other implementations
- [The Secret Lives of Data — Raft visualization](http://thesecretlivesofdata.com/raft/)
- [etcd](https://etcd.io/) and [Consul](https://www.consul.io/) — production Raft systems
- [Hashicorp's Raft library](https://github.com/hashicorp/raft) — a real-world Go implementation worth reading
- [Jepsen](https://jepsen.io/) — distributed systems testing under chaos
- [Postgres fsync correctness thread](https://www.postgresql.org/message-id/flat/CAEepm%3D2g0wPS%3DfRR1AwgEZF-rxd_3vRP-mddDoZ%3DDsYW9d4q3w%40mail.gmail.com) — required reading for anyone trusting `fsync`

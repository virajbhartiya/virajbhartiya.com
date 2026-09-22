---
title: "Laya vs Jev: Latency Is Part of the Game"
description: "I made a 322M model running on my Mac race TypeSafe's hosted Jev through Chrome's dino game. Same course, same question, real time. The hard part wasn't the models. It was making a third of a second fair."
publishedAt: "2026-09-22"
tags: ["AI", "MLX", "Apple Silicon", "Latency", "Game AI", "Open Source"]
image: "/images/Blog/laya-vs-jev/banner.svg"
author: "Viraj Bhartiya"
---

Most AI benchmarks let the model take as long as it wants.

A leaderboard doesn't care if the answer took 40 milliseconds or 4 seconds. The question just sits there, patient, until the model gets around to it.

Real software doesn't get that luxury. A request router has a latency budget. A game loop has 16.7 ms per frame. A dinosaur running at speed has a window of 18 to 28 frames to start a jump over a cactus, and it does not care how smart your model is if the answer shows up on frame 29.

So I made two AI models play Chrome's offline dino game. Side by side. Same obstacle course. Real time. Every move is a live model call.

That's [Laya vs Jev](https://github.com/virajbhartiya/laya-vs-jev).

---

## Two models, one question

**Laya** is an open-weight decision model from Convai Innovations. I run the 322M-parameter multilingual checkpoint locally on an M3, through [mizorewww's MLX port](https://github.com/mizorewww/laya-mlx). No PyTorch, no cloud, no API key.

**Jev** is [TypeSafe's](https://docs.typesafe.ai) hosted model. It lives on the other side of an HTTPS call.

From the outside they have nothing in common. One is a file on my disk, the other is a line on an invoice. But they speak the same language: you hand them a state and a typed question, and they hand back probabilities. Not a paragraph. Not JSON that might parse. A distribution over exactly the options you asked about.

That shared interface is the whole reason this matchup works. Every move, both models get the same state and the same question, and answer with probabilities over `jump`, `duck`, and `run`. Neither was trained on the game.

![The arena after a full match: Laya on the left, Jev on the right, same course, same seed](/images/Blog/laya-vs-jev/arena.png)

---

## What the models actually decide

I want to be upfront about this, because the internet is full of "AI plays X" videos that quietly hide the scaffolding.

The models don't see pixels. They don't do physics. A deterministic planner simulates the dinosaur with the game's own arithmetic and labels each action safe or unsafe. The model reads those labels as text and picks one. Here's a real question:

```text
state:    Dino runner game. 2 large cacti ahead, 96 px away.
question: Choose the best safe action for the dinosaur.
  jump: Safe. Clears the 2 large cacti. Best.
  duck: Unsafe. Hits the 2 large cacti. Collision.
  run:  Unsafe. Hits the 2 large cacti. Collision.
```

So this isn't "can a model work out dinosaur physics." It measures how fast and how reliably each model reads a labelled situation and commits to a choice, inside a loop that won't wait for it. That's a more interesting question than it sounds, because the labels themselves depend on how slow the model is.

![One move, end to end: the model only picks, everything around it is deterministic and counted](/images/Blog/laya-vs-jev/loop.svg)

---

## How Laya answers without writing a word

Ask a chat model to pick between three options and it generates text. Token by token. Then you parse that text and hope it said one of your three words. Fine for a chatbot. Absurd for a control loop.

Laya doesn't generate anything. It packs the question, the options, and the state into one sequence, with a `[MASK]` marker in front of every option:

```text
[CLS] choice question: Choose the best safe action for the dinosaur. [SEP]
[MASK] jump: Safe. Clears the 2 large cacti. Best.
[MASK] duck: Unsafe. Hits the 2 large cacti. Collision.
[MASK] run: Unsafe. Hits the 2 large cacti. Collision.
[SEP] Dino runner game. 2 large cacti ahead, 96 px away. [SEP]
```

That sequence goes through a bidirectional encoder (ModernBERT for the English checkpoints, mmBERT for the multilingual one I use here), then a small decision transformer. A scorer reads the hidden state at each `[MASK]` position and produces one logit per option. Softmax, temperature calibration, done. One forward pass. Zero output tokens.

![A choice in one forward pass: Laya scores the options instead of writing an answer](/images/Blog/laya-vs-jev/typed-decision.svg)

The heart of it in MLX is almost boring:

```python
h = self.encoder(input_ids, attention_mask)
h = h + self.type_emb(qtype)[:, None, :]
h = self.head(h, attention_mask[:, None, None, :].astype(mx.bool_))
markers = h[mx.arange(h.shape[0])[:, None], mx.maximum(marker_pos, 0)]
logits = self.scorer(markers).squeeze(-1).astype(mx.float32)
logits = mx.where(marker_mask, logits, -1e4)
p = mx.softmax(logits, axis=-1)
```

Jev gets the exact same state and questions, as JSON:

```python
# One persistent connection; no retries, since a late answer is useless in real time.
response = self.client.post(
    "/v1/systemone",
    json={"model": self.request_model, "state": state, "questions": questions},
)
```

That comment is the philosophy of the whole project in one line. In real time, a retry isn't resilience. It's a crash with extra steps.

---

## A dino game you can replay frame by frame

The game is a Python port of the one in Chromium's `components/neterror/resources/dino_game`, pinned to a specific commit. Same constants, same jump physics, same collision boxes, same obstacle rules, same speed curve from 6 to 13. It even keeps the weird quirks:

```python
# The original times jump physics by the current animation's frame rate, so a dino that is
# mid-air in its ducking or running animation falls more slowly.
TIMEBASE = {"jump": FRAME_MS, "duck": 1000 / 8, "run": 1000 / 12}
```

Why be this faithful? Because the whole system rests on one property. The game advances in fixed 60 FPS steps, and the obstacle course has its own seeded random stream. Same seed, same course, for every player, for as long as they survive. Runs are reproducible, and the planner can predict the future exactly instead of approximately.

If you've read my [Parity Protocol post](/blog/parity-protocol-deterministic-compute-with-teeth), you know how I feel about determinism. Same idea here. The tests push thousands of frames of random key presses through both the real engine and the planner's model of it, and assert the dinosaur's state matches on every single frame. If the planner is one frame off, its "safe" labels are lies.

---

## A third of a second

Here's where it gets interesting.

Laya answers in about 33 ms end to end on my machine. That's two frames. Jev answers in about 370 ms, because it's a network round trip to a hosted model. That's 22 frames.

Now look at the jump. Depending on speed, the window in which starting a jump actually clears an obstacle is 18 to 28 frames wide.

At first, each player asked one question at a time: ask, wait, ask again. For Laya that meant a turn almost every frame. For Jev it meant one turn every 22 frames, roughly one chance per obstacle. Jev died at the first or second cactus.

And the kicker: it picked the planner's best move every single time. It wasn't wrong. It was asked too rarely.

![A third of a second is 22 frames: how often each player gets a turn, against the width of a jump window](/images/Blog/laya-vs-jev/timing.svg)

That's where the project stopped being "which model is smarter" and became "what does a fair real-time harness even look like."

---

## The planner plays a game against its own latency

If an answer takes 22 frames to arrive, the planner can't label actions for the world right now. It has to label them for the world at the moment the answer lands. And it doesn't know that moment exactly, because latency jitters.

So the planner treats it as a game. The player picks an action. An adversary picks when the answer lands, anywhere in the range recently observed for that model. A position is winning if some action survives every possible landing time and still leaves a winning move for the next answer, whenever that one lands. Anything past the look-ahead horizon counts as won.

```python
def wins(self, t, s, held, zero_ok=True, lock=None):
    if t >= self.horizon:
        return True
    key = (t, s, held, zero_ok, lock)
    if key in self.memo:
        return self.memo[key]
    lo, hi = self.gap
    ...
    self.memo[key] = result = any(
        self.lands(s, held, a, t, lo, hi, lock) for a in self.options(s, held, t, lock)
    )
    return result
```

`wins` is the "there exists a move" half. `lands` is the "for every landing time" half: it walks the dinosaur forward under the currently held keys from `lo` to `hi` frames and requires `wins` at each one. A tiny minimax over timing, memoised on frame, dinosaur state, and held keys.

![Safe means: for every landing time, a next move exists](/images/Blog/laya-vs-jev/safety-game.svg)

A few details matter more than they look:

- **Latency is measured, not assumed.** Each player tracks its last 16 answer times. The early edge of the landing range is the 20th percentile; the jitter is the gap to the slowest recent answer, capped at 12 frames. If latency suddenly spikes, the old fast history is thrown out immediately. Trust in fast answers comes back gradually.
- **The recommended move is the most patient one.** An answer never lands earlier than planned, only later. So the best time to start a jump is the first moment it clears the obstacle for every expected landing time. All the timing slack then sits ahead of you as margin.
- **Sometimes nothing is provably safe.** With a third of a second of latency and about eight frames of uncertainty, some obstacle sequences can't be timed reliably. The planner then falls back to the action that survives the most landing times, and flags the decision as best-effort so it shows up in the report.

The labels are tested the harsh way. A player that picks at random among the actions labelled safe, with jittery answer times, has to survive 2,500 frames without a crash. If random choices among "safe" moves can kill you, the word safe means nothing.

Speed matters too. Most future frames have no obstacle horizontally overlapping the dino at all, so a prefilter skips building collision boxes there. That took the planner benchmark from 1,290 ms to roughly 560–600 ms over 366 snapshots, with the same output hash before and after. About 2.2× faster planning, byte-for-byte the same decisions.

---

## Keeping a slow model in the game

A model's latency is its own. How often it gets a turn is the harness's choice. So the fix for Jev wasn't to bend physics. It was to stop asking one question at a time.

**Jev keeps several requests in flight**, asked a few frames apart. A hosted API answers in parallel, so the harness staggers questions, at most four per round trip. Every answer is still a full 370 ms old, and the planner accounts for that, but Jev now gets a turn every five or six frames instead of every 22.

**Laya keeps two questions in flight.** One GPU still answers one at a time, so this isn't about parallelism. It's about never letting the GPU idle. Without it, the GPU waits while the planner runs, clocks down, and answers get slower exactly as the game speeds up. The local backend also pins the weights in memory and asks macOS to run the model thread on performance cores:

```python
# Keep the weights resident. Under memory pressure macOS otherwise pages them out
# between moves, and a 14 ms decision can take a quarter of a second.
limit = mx.device_info()["max_recommended_working_set_size"]
mx.set_wired_limit(min(wired_bytes, limit))
```

Multiple requests in flight create a new problem. Every question is asked on a premise: the keys stay as they are until this answer lands. The moment an earlier answer changes the keys (say it triggers a jump), every question still in flight was asked about a world that no longer exists.

So the pilot keeps an epoch counter. Any answer that changes the keys bumps the epoch, and answers from an older epoch are discarded, never applied:

```python
def premise_holds(self, decision):
    """Whether the keys are as the planner assumed when this answer was asked for."""
    if decision.seq <= self.accepted or decision.pending_seq in self.dropped:
        return False
    if decision.pending_seq is not None and (
        self.accepted_actions.get(decision.pending_seq) != decision.pending
    ):
        return False
    if decision.epoch == self.epoch:
        return True
    return (
        self.epoch == decision.epoch + 1 and self.bump_seq == decision.pending_seq is not None
    )
```

The last line is the one exception. An answer that was asked knowing exactly which pending answer would change the keys is still valid in the next epoch. It already planned around it.

![Answers in flight, and why some of them get thrown away](/images/Blog/laya-vs-jev/epochs.svg)

That's what the "skipped" counter in the arena screenshot is. Laya skipped 1,074 answers in that match and Jev skipped 689. Not waste. The harness refusing to act on stale information.

---

## One process per player

Python has a lock problem.

A model call is made of many short Python steps. In a single process, each of those steps competes with the renderer, the course designer, and the other player's planner for the interpreter lock, and a call can wait hundreds of milliseconds just to get scheduled. That's not the model's latency. That's the GIL's.

So each player thinks in its own spawned process: planner, prompt building, and model call. The main process talks to it over a pipe with numbered tickets, so any number of requests can be outstanding at once. Latency stays the model's own, not a side effect of whoever else is holding the lock.

The main loop has a similar rule about the host. If the Mac stalls, the missed time is dropped instead of replayed in a burst. A burst would run several frames with no chance for any answer to land in between, which is just the game playing blind. Dropped time gets reported, so a stalled host is visible in the results instead of quietly deciding them.

---

## Three shields, all counted

By default, three safety layers sit between the model and the dinosaur:

1. **Plan shield.** If the model's top pick was labelled unsafe, it's replaced with the model's most probable safe action. Counted as a model veto.
2. **Arrival shield.** When an answer lands, it's rechecked against live physics. Reversible key holds get a 12-frame check; jumps and mid-air changes are checked up to 42 frames ahead, because a bad takeoff can kill you long after the immediate window.
3. **Emergency shield.** Before every physics step, a bounded check looks for an imminent collision, even when no answer has arrived at all.

![Three shields, three counters: every intervention is visible and reported separately](/images/Blog/laya-vs-jev/shields.svg)

The emergency shield can keep a dinosaur alive with zero model answers. There's a test for exactly that: a completely stalled model survives 6,000 frames on three seeded courses on the shield alone. Which means an assisted score is never a model score. It's the combined system.

So the arena counts every intervention separately and shows them live as LIVE SAVES, next to the model's own vetoes. And `--unassisted` turns all three shields off, so each model's first choice executes even when it walks straight into a cactus.

---

## Letting the model design the course

Playing the game is half the demo. The other half is that a model builds the obstacle course too.

With `--course jev` (the default) or `--course laya`, the designer answers two questions per obstacle: a Choice over which obstacle comes next, restricted to what the original game rules allow at that speed, and a Score for how much room follows it. The choice is sampled from the model's probabilities with a per-obstacle seed, so a designed course is still reproducible.

The designer works ahead of play in a private, invincible "ghost" copy of the game, so every question sees the exact speed and score at the moment that obstacle will actually appear. Every player reads the same stored course. If a player ever outruns the designer, the original random rule fills the slot and the report counts it as a fallback.

The two designers behave very differently. Over 40 obstacles on one seed, Jev behaved like a level designer: obstacle difficulty rose with speed (rank correlation 0.47) and gaps tightened (−0.56). Laya's course came out at 0.19 and −0.01, which is close to the original random rule (−0.02).

![Who designs a harder course? Rank correlation with game speed over 40 obstacles](/images/Blog/laya-vs-jev/course.svg)

Laya designs an obstacle in about 50 ms, Jev in about 370 ms. The look-ahead hides both.

---

## Replays are data, not video

Screen recording a latency benchmark is a bad idea. The recorder steals cycles from the exact thing you're measuring.

So `--record` stores what's on screen as data: every game frame, every model's probabilities and answer times, wall-clock timestamps. `laya-trex export` then draws the recording with the same painter as the live window into a 1920×1080, 30 FPS H.264 file at the original pace. The video says `RECORDED RUN · 1×` on screen, and a JSON sidecar says the same thing.

![A frame from an exported replay, rendered from recorded data rather than captured from the screen](/images/Blog/laya-vs-jev/replay.png)

Crashes get the same treatment. When a dinosaur dies, a two-second buffer replays at half speed under the live lanes while the race keeps going. A crash sidecar keeps the last 120 physics frames, nearby obstacle positions, requested versus executed actions, and expected versus actual answer timing. Reproduction cases pulled out of those sidecars now live in the test suite as fixtures.

---

## So who won?

Depends on what you measure, and I'm going to be annoying about that.

The oldest run predates all of the fairness work: one question at a time, 90 seconds each, on an M3 with 16 GB that was deep in swap. Laya answered in 33 ms median, Jev in 369 ms. Laya made 2,753 decisions to Jev's 197. Laya's best score was 257 to Jev's 110, with 4 deaths to Jev's 11. But Jev picked the planner's best move 100% of the time. Laya, 75%. Cost: Laya free, Jev $0.003.

![The single-request run: Laya is about eleven times faster, Jev is the more accurate reader](/images/Blog/laya-vs-jev/numbers.svg)

Freeze each game while its model thinks (lockstep, 6 frames per decision) and latency disappears from play: zero deaths each, and the agreement numbers barely move, 74% vs 100%. That's the cleanest read on the models themselves. Jev reads the situation more accurately. Laya reads it about eleven times faster, for free, on my own machine.

The latest assisted match, with in-flight requests, staged courses, and all three shields, is almost funny. Two 90-second rounds on the same Jev-designed course. Neither player died. They finished both rounds at exactly the same distance, 1,169 and then 1,175. Jev won the match 2–0 on the tiebreaker: fewer live interventions.

That's a show result, not a verdict. The shields and the staged course did a lot of the work, and the host dropped almost six seconds of stalled time during the run. A single live run is a smoke test, not evidence of a stable winner.

---

## What I actually learned

**Latency isn't a spec-sheet number.** In a control loop it's physics. 370 ms is 22 frames, and 22 frames is the entire jump window. A perfectly accurate model that answers too late looks exactly like a wrong one.

**Fairness is a harness problem.** The first version made Jev look dumb. It wasn't. It was being asked once per obstacle. How often you ask a model matters as much as which model you ask.

**Small local models are absurdly good at this.** A 322M encoder on a Mac, reading a labelled situation and committing to a choice in a couple of frames, with no tokens generated and no bill. Hosted Jev is the more precise reader. Which one you want depends on whether your loop can wait.

**Honest accounting is a feature, not a disclaimer.** Every shield save, discarded answer, best-effort decision, and dropped second of host time is counted and reported. The moment a demo hides its scaffolding, it stops telling you anything.

---

## Try it

You need an Apple Silicon Mac, Python 3.11+, [uv](https://docs.astral.sh/uv/), and a TypeSafe API key for Jev.

```bash
git clone https://github.com/virajbhartiya/laya-vs-jev.git
cd laya-vs-jev
uv sync --extra demo --extra trex --extra dev
uv run --extra demo hf download aac6fef/laya-multilingual-mlx \
  --local-dir models/hub/laya-multilingual-mlx
cp .env.example .env
# Set TYPESAFE_API_KEY in .env before running.
uv run --extra trex laya-trex --round-seconds 0 --env-file .env
```

No API key? Laya can play alone, fully offline:

```bash
uv run --extra trex laya-trex --players laya --course random --round-seconds 0
```

Space pauses, Q quits. Add `--unassisted` to see what each model does with no shields at all. It's humbling.

[View the repository →](https://github.com/virajbhartiya/laya-vs-jev)

---

## References

- [Laya vs Jev repository](https://github.com/virajbhartiya/laya-vs-jev) — the T-Rex arena, planner, shields, and replay export
- [laya-mlx](https://github.com/mizorewww/laya-mlx) — the native MLX port of Laya this project is built on
- [Laya](https://github.com/NandhaKishorM/laya) — the upstream typed decision models by Convai Innovations
- [aac6fef/laya-multilingual-mlx](https://huggingface.co/aac6fef/laya-multilingual-mlx) — the converted checkpoint Laya plays with
- [TypeSafe docs](https://docs.typesafe.ai) — Jev and the System One API
- [MLX](https://github.com/ml-explore/mlx) — Apple's array framework for Apple Silicon
- [ModernBERT](https://huggingface.co/blog/modernbert) — the encoder architecture behind Laya's English checkpoints
- The Chromium Authors — the original dino game, its sprites and its sounds, under the BSD 3-Clause license

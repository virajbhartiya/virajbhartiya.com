---
title: "Parity Protocol: Deterministic Compute with Teeth"
description: "A trustless compute network where work is verified by re-execution, not reputation. Now also handles LLM inference and federated learning, with the same hash-it-or-don't-pay primitive."
publishedAt: "2025-07-27"
updatedAt: "2026-05-08"
tags:
  [
    "Decentralized Compute",
    "Federated Learning",
    "LLM Inference",
    "Docker",
    "Blockchain",
  ]
image: "/images/Blog/parity-protocol.png"
author: "Viraj Bhartiya"
---

I keep getting pitched "decentralized compute" platforms.

Most of them are cloud wrappers with a token. The rest are semi-centralized trust games dressed up in protocol language. Almost none of them actually verify that the work was done correctly — they trust the runner and hope.

I wanted something simpler.

You submit a job. Multiple machines run it in the same environment. Their outputs get hashed. If the hashes match, the work is real and the runners get paid. If they don't, someone cheated, and they get nothing.

That's the entire protocol. No reputation. No staking-as-a-filter. No social capital. Hash matches or it doesn't.

That was the first version. The same primitive now extends to LLM inference and federated learning. Same idea, different surfaces.

---

## How it works

Three components, all open source:

- **parity-server** — the orchestrator. Receives tasks, distributes them to runners, collects outputs, settles rewards on-chain.
- **parity-runner** — the worker. Anyone can run one. Picks up tasks, executes them in Docker, submits hashed outputs, earns tokens. Also runs LLM inference (via Ollama) and federated-learning training jobs.
- **parity-client** — the CLI. Submit jobs, monitor them, fetch results.

The base flow:

1. Client submits a task — Docker image or Dockerfile, input payload, expected behavior.
2. Server publishes it to the network.
3. Multiple runners claim it and execute in fresh Docker containers.
4. Outputs are hashed and submitted back.
5. Matching hashes reach consensus. Matching runners split the reward. Non-matching runners get nothing.
6. Cheat consistently and your stake gets slashed.

Dumb-simple by design. Complexity invites exploits, and I don't have room for those.

---

## Determinism is the whole game

For verification by re-execution to work, your code must produce the same output across machines. Same input, same output, every time.

That means no `Math.random()` without a seed. No reading the system clock. No hidden state. No GPU non-determinism. No "AI magic" that drifts between runs.

If you violate that, your hash won't match anyone else's, you won't get paid, and after enough mismatches the network stops assigning you work. Not a bug — a feature.

Docker enforces the rest. Every job runs in a fresh container, spun up from scratch:

- no leftover memory
- no cached files
- no surprise network calls
- identical environment across all runners

You define your environment. We isolate it and enforce it. If your job depends on `/dev/random` or "GPU availability", it doesn't run here.

This isn't about flexibility. It's about being correct.

---

## LLM inference, paid in tokens

Runners now also run LLMs locally via Ollama — Qwen, LLaMA, Mistral, whatever weights you can host.

A client submits a prompt. The server routes it to runners advertising the right model. The runner generates a response, counts prompt and completion tokens, and returns the result. The client gets billed by token. The runner gets paid.

LLM output isn't bit-exact-deterministic the way a Docker task is, so I don't try to enforce cross-runner hash matching here. Verification shifts to capability advertising and per-runner accountability: each runner attests to the model used, the prompt, the response, and the token counts. The economic teeth come from staking — lie about token counts and your stake gets cut.

Not perfect. Better than "trust a centralized inference provider with your prompts."

---

## Federated learning, without sharing data

This is the part I'm most excited about.

Federated learning trains one model across many machines without any of them sharing raw data. Each participant trains on their slice of the dataset, sends back model weights, and a coordinator aggregates everything into a single global model.

Parity now coordinates this end-to-end:

- the client creates a session with a full config — architecture, learning rate, batch size, partitioning strategy
- the server auto-assigns online runners as participants and gives each one a unique index
- datasets live on IPFS — runners pull their partition by CID, not by URL
- five partitioning strategies are supported: random (IID), stratified, sequential, non-IID via Dirichlet, and label skew
- runners train locally, send back weights and gradients
- the server aggregates with FedAvg and starts the next round automatically

Supported model types: neural networks with configurable architectures, linear regression, and a fully distributed random forest with bootstrap sampling, out-of-bag scoring, and feature-importance aggregation across nodes.

There are no default values. Every parameter has to be explicitly provided. Forgot the `alpha` for non-IID partitioning? The server tells you, instead of silently picking one and producing a model that learned the wrong thing.

That sounds annoying. It's the point. Most FL frameworks ship with hidden defaults that mask configuration errors. I'd rather make you type the parameter than hand you a quietly-wrong model.

---

## Tokens, staking, slashing

Runners stake the protocol's ERC20 token to participate. Real tokens, real chain.

- Match the consensus output → split the reward.
- Mismatch consistently → no work assigned.
- Cheat egregiously → stake slashed.

No reputation that gets gamed by being friends with someone. No KYC. No "trusted" validator set. The math decides.

---

## What you can run today

This is not a theoretical system. It runs real jobs across all three modes:

- **Compute** — CPU-bound model inference, static analysis, file transforms, ZK proof generation, parsing/linting/compiling, anything containerizable with bounded inputs and no external state.
- **LLM inference** — any Ollama-supported model, with token-accounted billing and async status tracking.
- **Federated learning** — neural networks, linear regression, distributed random forests, IPFS-hosted datasets, automatic round progression.

The plumbing is also live: a task submission CLI, a runner daemon anyone can run, on-chain reward payouts, IPFS storage with multiple gateway fallbacks, webhook-based task notifications, heartbeat-based liveness, and capability reporting.

Everything here is built. Running. Used. No pitch decks.

---

## Design philosophy

The bones haven't changed:

- no trust, no reputation, no staking-as-a-filter
- every job is independently verifiable by re-execution where it can be, and by economic accountability where it can't
- incentives are tight, minimal, and enforced by code rather than policy
- assume malicious actors exist — remove their influence through architecture, not policing

What changed is the surface. Parity started as a deterministic-compute network. It's now a deterministic-compute network that also handles LLM inference and federated learning, with the same hash-it-or-don't-pay logic applied where it fits and economic primitives applied where it doesn't.

If you're still clinging to centralized cloud infra that bills you $80 to convert a CSV, or to inference providers that read your prompts, this is what I built to replace that.

And it's already running.

---

## Repos

- [parity-protocol](https://github.com/theblitlabs/parity-protocol) — umbrella spec and whitepaper
- [parity-server](https://github.com/theblitlabs/parity-server) — orchestrator
- [parity-runner](https://github.com/theblitlabs/parity-runner) — execution node
- [parity-client](https://github.com/theblitlabs/parity-client) — CLI

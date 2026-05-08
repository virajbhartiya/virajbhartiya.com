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

I wanted something simpler. You submit a job, multiple machines run it in the same environment, their outputs get hashed, and if the hashes match the work is real and the runners get paid. If they don't match, someone cheated, and they get nothing. That's the entire protocol. No reputation. No staking-as-a-filter. No social capital. The hash matches or it doesn't.

That was the first version of [Parity Protocol](https://github.com/theblitlabs/parity-protocol). The same primitive now extends to LLM inference and federated learning. Same idea, different surfaces.

---

## How it works

Parity is three components, all open source. The orchestrator is [parity-server](https://github.com/virajbhartiya/parity-server), which receives tasks, distributes them to runners, collects outputs, and settles rewards on-chain. The execution node is [parity-runner](https://github.com/virajbhartiya/parity-runner) — anyone can run one. It picks up tasks, executes them in [Docker](https://www.docker.com/), submits hashed outputs, and earns tokens. It also runs LLM inference (via [Ollama](https://ollama.com/)) and federated-learning training jobs. The CLI is [parity-client](https://github.com/virajbhartiya/parity-client): submit jobs, monitor them, fetch results.

The base flow is short. A client submits a task — a Docker image or Dockerfile, an input payload, and the expected behavior. The server publishes it to the network. Multiple runners claim it and execute in fresh Docker containers. Each runner hashes its output and submits it back. The server matches hashes; matching runners split the reward, non-matching runners get nothing. Cheat consistently and your stake gets slashed.

Dumb-simple by design. Complexity invites exploits, and I don't have room for those.

---

## Determinism is the whole game

For verification by re-execution to work, your code must produce the same output across machines. Same input, same output, every time.

That means no `Math.random()` without a seed. No reading the system clock. No hidden state. No GPU non-determinism. No "AI magic" that drifts between runs. If you violate that, your hash won't match anyone else's, you won't get paid, and after enough mismatches the network stops assigning you work. Not a bug — a feature.

Docker enforces the rest. Every job runs in a fresh container, spun up from scratch — no leftover memory, no cached files, no surprise network calls, identical environment across all runners. You define your environment, the protocol isolates it and enforces it. If your job depends on `/dev/random` or "GPU availability," it doesn't run here. This isn't about flexibility. It's about being correct.

---

## LLM inference, paid in tokens

The runner now also runs LLMs locally via [Ollama](https://ollama.com/) — Qwen, LLaMA, Mistral, whatever weights you can host.

A client submits a prompt. The server routes it to runners advertising the right model. The runner generates a response, counts prompt and completion tokens, and returns the result. The client gets billed by token. The runner gets paid.

LLM output isn't bit-exact-deterministic the way a Docker task is, so I don't try to enforce cross-runner hash matching here. Verification shifts to capability advertising and per-runner accountability — each runner attests to the model used, the prompt, the response, and the token counts. The economic teeth come from staking. Lie about token counts and your stake gets cut.

Not perfect. Better than "trust a centralized inference provider with your prompts."

---

## Federated learning, without sharing data

This is the part I'm most excited about.

[Federated learning](https://en.wikipedia.org/wiki/Federated_learning) trains one model across many machines without any of them sharing raw data. Each participant trains on their slice of the dataset, sends back model weights, and a coordinator aggregates everything into a single global model. The classic aggregation algorithm is [FedAvg](https://arxiv.org/abs/1602.05629), introduced by McMahan et al. in 2016.

Parity now coordinates this end-to-end. The client creates a session with a full config — architecture, learning rate, batch size, partitioning strategy. The server auto-assigns online runners as participants and gives each one a unique index. Datasets live on [IPFS](https://ipfs.tech/), so runners pull their partition by [CID](https://docs.ipfs.tech/concepts/content-addressing/) rather than a URL someone could swap out from under them. Runners train locally, send back weights and gradients, and the server aggregates with FedAvg before kicking off the next round automatically.

Five partitioning strategies are supported: random IID, stratified (preserves class distribution across participants), sequential, non-IID via [Dirichlet sampling](https://arxiv.org/abs/1909.06335) for realistic data heterogeneity, and label skew where each participant gets a subset of classes. Supported model types include neural networks with configurable architectures, linear regression, and a fully distributed [random forest](https://en.wikipedia.org/wiki/Random_forest) with bootstrap sampling, out-of-bag scoring, and feature-importance aggregation across nodes.

There are no default values. Every parameter has to be explicitly provided. Forgot the `alpha` for non-IID partitioning? The server tells you, instead of silently picking one and producing a model that learned the wrong thing. That sounds annoying. It's the point. Most FL frameworks ship with hidden defaults that mask configuration errors. I'd rather make you type the parameter than hand you a quietly-wrong model.

---

## Tokens, staking, slashing

Runners stake the protocol's [ERC20](https://eips.ethereum.org/EIPS/eip-20) token to participate. Real tokens, real chain. Match the consensus output and you split the reward. Mismatch consistently and the server stops sending you work. Cheat egregiously and your stake gets slashed.

No reputation that gets gamed by being friends with someone. No KYC. No "trusted" validator set. The math decides.

---

## What you can run today

This is not a theoretical system. It runs real jobs across all three modes.

For compute, anything that's CPU-bound and deterministic — model inference, static analysis, file transforms, [ZK proof generation](https://en.wikipedia.org/wiki/Zero-knowledge_proof), parsing, linting, compiling. If it fits in a Docker container with bounded inputs and no external state, it runs here. For LLM inference, any [Ollama-supported model](https://ollama.com/library), with token-accounted billing and async status tracking. For federated learning, neural networks, linear regression, and distributed random forests, with IPFS-hosted datasets and automatic round progression.

The plumbing is also live: a task submission CLI, a runner daemon anyone can run, on-chain reward payouts, IPFS storage with multiple gateway fallbacks, webhook-based task notifications, heartbeat-based liveness, and capability reporting. Everything here is built, running, and used. No pitch decks.

---

## Design philosophy

The bones haven't changed. No trust, no reputation, no staking-as-a-filter. Every job is independently verifiable by re-execution where it can be, and by economic accountability where it can't. Incentives are tight, minimal, and enforced by code rather than policy. Assume malicious actors exist — remove their influence through architecture, not policing.

What changed is the surface. Parity started as a deterministic-compute network. It's now a deterministic-compute network that also handles LLM inference and federated learning, with the same hash-it-or-don't-pay logic applied where it fits and economic primitives applied where it doesn't.

If you're still clinging to centralized cloud infra that bills you $80 to convert a CSV, or to inference providers that quietly read your prompts, this is what I built to replace that. And it's already running.

---

## References

- [Parity Protocol whitepaper and umbrella spec](https://github.com/theblitlabs/parity-protocol)
- [parity-server](https://github.com/virajbhartiya/parity-server) — orchestrator
- [parity-runner](https://github.com/virajbhartiya/parity-runner) — execution node
- [parity-client](https://github.com/virajbhartiya/parity-client) — CLI
- McMahan et al., [Communication-Efficient Learning of Deep Networks from Decentralized Data](https://arxiv.org/abs/1602.05629) — the FedAvg paper
- Hsu et al., [Measuring the Effects of Non-Identical Data Distribution for Federated Visual Classification](https://arxiv.org/abs/1909.06335) — Dirichlet partitioning for non-IID benchmarks
- [IPFS docs on content addressing](https://docs.ipfs.tech/concepts/content-addressing/)
- [Ollama](https://ollama.com/) — local LLM runtime
- [ERC20 token standard (EIP-20)](https://eips.ethereum.org/EIPS/eip-20)

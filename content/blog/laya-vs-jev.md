---
title: "Laya vs Jev: Latency Is Part of the Game"
description: "Two AI models play Chrome's dino game side by side: one runs on my Mac, the other is a hosted API a third of a second away. How do you make that race fair? A planner that treats latency as the opponent, requests kept in flight, and safety shields that are counted, not hidden."
publishedAt: "2026-09-22"
tags:
  ["AI", "MLX", "Apple Silicon", "Latency", "Real-Time Systems", "Open Source"]
image: "/images/Blog/laya-vs-jev/banner.svg"
author: "Viraj Bhartiya"
---

Most AI benchmarks let the model take as long as it wants.

A leaderboard doesn't care whether an answer took 40 milliseconds or 4 seconds. Real systems do. A game loop gets 16.7 ms per frame. A dinosaur running at speed has a window of 18 to 28 frames to start a jump over a cactus, and an answer that arrives on frame 29 is just a wrong answer that took longer.

So I put two decision models on Chrome's offline dino game, side by side, on the same obstacle course, in real time. Every move is a live model call. That's [Laya vs Jev](https://github.com/virajbhartiya/laya-vs-jev).

The interesting part turned out not to be which model wins. It's everything you have to build before a model that answers in 33 ms and one that answers in 370 ms can be compared at all.

---

## The players

**Laya** is an open-weight decision model from Convai Innovations. The arena runs its 322M-parameter multilingual checkpoint locally on Apple Silicon, through [mizorewww's native MLX port](https://github.com/mizorewww/laya-mlx). No cloud, no API key, no bill.

**Jev** is [TypeSafe's](https://docs.typesafe.ai) hosted model, on the other side of an HTTPS round trip.

They look nothing alike from the outside, but they speak the same language. You hand them a state and a typed question, and they hand back probabilities. Not a paragraph, not JSON that might parse, but a distribution over exactly the options you asked about. That shared interface is what makes the matchup possible: every move, both models get the same state and the same question, and answer with probabilities over jump, duck, and run. Neither was trained on the game.

![The arena after a full match: Laya on the left, Jev on the right, same course, same seed](/images/Blog/laya-vs-jev/arena.png)

---

## What the models actually decide

The models don't see pixels, and they don't do physics. That's a deliberate design choice, and it's worth being upfront about, because plenty of "AI plays X" demos quietly hide their scaffolding.

A deterministic planner simulates the dinosaur using the game's own arithmetic and labels every action as safe or unsafe. The model reads those labels as plain text and picks one. A typical question looks like this:

- **State:** Dino runner game. 2 large cacti ahead, 96 px away.
- **Jump:** Safe. Clears the 2 large cacti. Best.
- **Duck:** Unsafe. Hits the 2 large cacti. Collision.
- **Run:** Unsafe. Hits the 2 large cacti. Collision.

So this isn't a test of whether a model can work out dinosaur physics. It measures how quickly and how reliably a model reads a labelled situation and commits to a choice, inside a loop that won't wait for it. That's a more interesting question than it sounds, because the labels themselves depend on how slow the model is.

The whole system runs as one loop. Every frame, any answers that have arrived get applied, safety checks run, the held keys are enforced, the game advances by exactly one physics step, and a fresh snapshot goes out to the players. An answer takes effect at the first frame after it arrives, so a model's latency is part of play, not a number reported next to it.

![One move, end to end: the model only picks, everything around it is deterministic and counted](/images/Blog/laya-vs-jev/loop.svg)

---

## How Laya answers without writing a word

Ask a chat model to pick one of three options and it generates text, token by token, which you then parse and hope contains one of your three words. That's fine for a chatbot. It's absurd for a control loop.

Laya never generates anything. It packs the question, the options, and the state into a single sequence, with a special marker placed in front of each option. The sequence runs once through a bidirectional encoder (a 22-layer ModernBERT-style network), then through a small two-layer decision transformer. A scoring layer reads the network's internal state at each option's marker and turns it into one score per option. A softmax turns those scores into probabilities.

One forward pass per decision. Zero output tokens. Nothing to parse.

![A choice in one forward pass: Laya scores the options instead of writing an answer](/images/Blog/laya-vs-jev/typed-decision.svg)

Running it locally means tuning for tail latency, not throughput. All model work happens on one dedicated thread that macOS is asked to treat as user-interactive, so the scheduler prefers the performance cores for it. The model weights are pinned in memory, because under memory pressure macOS will otherwise page them out between moves, and a 14 ms decision turns into a quarter of a second.

Jev receives the exact same state and question over HTTPS. The client keeps persistent connections open and warms every one of them up before the game starts, so no request pays for a handshake mid-game. And it never retries. In real time, a retry isn't resilience; a late answer is useless.

---

## A game you can replay exactly

The game is a faithful Python port of the dino game that ships in Chromium. It keeps the original constants, collision boxes, obstacle rules, and speed curve (from 6 up to 13), and even the odd quirks, like a ducking animation that makes the dino fall more slowly mid-air.

Faithful isn't the same as deterministic, though, so three things were added on top:

- **A fixed timestep.** The simulation itself never looks at the wall clock. It always advances in whole 60 FPS steps, so the same inputs always produce the same run.
- **Matching arithmetic.** JavaScript rounds halves differently from Python, and the original rounds obstacle movement down to whole pixels. The port reproduces both exactly, because a one-pixel drift compounds over thousands of frames.
- **Seeded obstacles.** Every obstacle comes from its own random stream keyed by the course seed and its position in the course. Both players meet the same obstacles for as long as they survive, no matter which process asks for them or when.

That determinism is what everything else rests on. The planner keeps its own lightweight model of the dinosaur so it can simulate thousands of possible futures quickly, and that model is tested against the real engine frame by frame, thousands of frames at a time with random key presses. If the planner is one frame off, its "safe" labels are lies.

---

## A third of a second

Here's the core problem in numbers.

Laya answers in about 33 ms end to end, about two frames. Jev answers in about 370 ms, because it's a network round trip to a hosted model. That's around 22 frames, and the exact landing time can vary by about eight frames.

Now look at the jump. Depending on speed, the window in which starting a jump actually clears an obstacle is only 18 to 28 frames wide.

In the first version, each player asked one question at a time: ask, wait for the answer, ask again. For Laya that meant a fresh decision almost every frame. For Jev it meant one decision every 22 frames, which works out to roughly one chance per obstacle. Jev died at the first or second cactus, even though it picked the planner's best move 100% of the time.

It wasn't wrong. It was asked too rarely.

![A third of a second is 22 frames: how often each player gets a turn, against the width of a jump window](/images/Blog/laya-vs-jev/timing.svg)

That's the moment the project stopped being "which model is smarter" and became "what does a fair real-time harness look like?"

---

## Planning against your own latency

If an answer takes 22 frames to arrive, labelling actions based on the world right now is pointless. The planner has to label them for the world at the moment the answer lands, and it doesn't know that moment exactly.

So it treats the problem as a game against its own latency. The player picks an action. An adversary picks when the answer lands, anywhere in the range recently observed for that model. An action counts as safe only if the dinosaur survives every possible arrival time and there's still a safe move available for whenever the next answer lands. It's a small search over possible futures, with repeated positions cached so it stays fast.

![Safe means every arrival time has a way out, and a safe next move still exists](/images/Blog/laya-vs-jev/safety-game.svg)

A few details matter more than they look:

- **Latency is measured, not assumed.** Each player tracks its last 16 answer times. The early edge of the expected range sits at the 20th percentile, and the spread goes out to the slowest recent answer. If latency suddenly spikes, the old fast history is thrown out immediately, and trust in fast answers only returns gradually.
- **The planner is deliberately cautious.** It proves safety using a slightly smaller set of moves than the player actually has. That can only make its labels more conservative, never less.
- **The recommended move is the most patient one.** An answer can land late but never early, so the best time to start a jump is the first moment it clears the obstacle for every expected arrival time. All the timing slack then sits ahead of you as margin.
- **Sometimes nothing is provably safe.** With a third of a second of latency, some obstacle sequences simply can't be timed reliably. When that happens the planner picks the action that survives the most arrival times and flags the decision as best-effort, so it shows up in the results.

The labels are tested by actually playing. A player that picks at random from the moves labelled safe, with jittery answer times, has to survive 2,500 frames without a single crash. If random choices among "safe" moves can kill you, the word safe means nothing. There's an equally honest test in the other direction: at a third of a second of latency, even a player that always follows the recommendation is only expected to reach a modest score, because some sequences can't be cleared at that delay.

Speed matters too, because the planner runs on every decision. Most future frames have no obstacle anywhere near the dino horizontally, so a cheap pre-check skips the expensive collision work for those frames. That made the planner about 2.2× faster on a fixed benchmark while producing byte-for-byte identical decisions. In a live run, planning took a median of about 0.7 ms per decision for Laya and about 6 ms for Jev, whose search is larger.

---

## Giving a slow model more turns

A model's latency is its own. How often it gets a turn is the harness's choice. So the fix for Jev wasn't to bend physics. It was to stop asking one question at a time.

**Jev keeps several requests in flight.** A hosted API can answer requests in parallel, so the harness sends a new question every few frames, at most four per round trip. Every answer is still a full 370 ms old, and the planner accounts for that, but Jev now gets a fresh answer every five or six frames instead of every 22.

**Laya keeps two questions in flight.** One GPU still answers one question at a time, so this isn't about parallelism. It's about never letting the GPU sit idle. Without the second question queued, the GPU waits while the planner works, clocks down, and answers get slower exactly as the game speeds up.

Keeping several requests in flight creates a new problem. Every question is asked on a premise: the keys stay as they are until this answer lands. The moment an earlier answer changes the keys (say it triggers a jump), every question still in flight was asked about a world that no longer exists.

So the harness keeps an epoch counter. Any answer that changes the keys starts a new epoch, and answers asked in an older epoch are discarded instead of applied. The one exception is an answer that was asked knowing exactly which pending answer would change the keys; it already planned around that change, so it stays valid.

![Answers in flight, and why some of them get thrown away](/images/Blog/laya-vs-jev/epochs.svg)

That's what the "skipped" counter in the arena screenshot is. In that match Laya discarded 1,074 answers and Jev 689. That's not waste. It's the harness refusing to act on stale information.

---

## Keeping the measurements honest

Two less visible decisions protect the latency numbers themselves.

**One process per player.** Python has a global interpreter lock. In a single process, the renderer, the course designer, and the other player's planner all compete for it, and a model call made of many small steps can wait hundreds of milliseconds just to get scheduled. That delay would look like model latency, but it isn't. So each player plans and calls its model in a separate process, and latency stays the model's own.

**Host stalls are dropped, not replayed.** If the machine stalls, the missed time is skipped rather than fast-forwarded in a burst. A burst would run several frames with no chance for any answer to land, which is just the game playing blind. The skipped time is reported, so a stalled host is visible in the results instead of quietly deciding them.

There's also a control mode called lockstep. It freezes each game until its model answers, then plays a fixed number of frames per decision. Latency disappears from play entirely, which isolates pure decision quality.

---

## Three shields, all counted

By default, three safety layers sit between the model and the dinosaur:

1. **Plan shield.** If the model's top pick was labelled unsafe, it's swapped for the model's most probable safe option. Counted as a veto.
2. **Arrival shield.** When an answer lands, it's rechecked against the live game, which may have moved on from the snapshot it was planned on. Held keys get a short check; jumps and mid-air changes are checked much further ahead, because a bad takeoff can cause a crash long after the moment it happened.
3. **Emergency shield.** Before every physics step, a quick check looks for an imminent collision, even when no answer has arrived at all.

All three are deliberately bounded. They simulate a handful of fixed trajectories and never run an open-ended search, so they can't become a hidden second planner.

![Three shields, three counters: every intervention is visible and reported separately](/images/Blog/laya-vs-jev/shields.svg)

The emergency shield alone can keep a dinosaur alive with no model answers at all. A test runs a completely stalled model through three seeded courses and it survives on the shield alone. That means an assisted score is never a model score. It's the score of the whole system.

So every intervention is counted separately, shown live on screen, and written to the report. There's also an unassisted mode that turns all three shields off, so each model's first choice executes even when it walks straight into a cactus.

---

## Letting a model design the course

Playing is half the demo. The other half is that a model also builds the obstacle course.

For every obstacle, the designer answers two questions: a choice of what comes next (limited to what the original game's rules allow at that speed) and a score for how much running room follows it. The pick is sampled from the model's probabilities with a fixed seed per obstacle, so a designed course is still reproducible. The designer works ahead of play in a private, invincible copy of the game, so each question sees the exact speed and score at the moment that obstacle will actually appear. Both players then read the same stored course. If a player ever outruns the designer, the original random rule fills the gap and the report counts it.

The two designers behave very differently. Over 40 obstacles on one seed, Jev's course got harder as the game sped up (rank correlation 0.47) and its gaps tightened (−0.56). Laya's came out at 0.19 and −0.01, close to the original random rule (−0.02). Jev designs like a level designer. Laya designs like a dice roll.

![Who designs a harder course? Rank correlation with game speed over 40 obstacles](/images/Blog/laya-vs-jev/course.svg)

---

## Replays are data, not video

Screen recording a latency benchmark is a bad idea, because the recorder steals CPU from the exact thing you're measuring.

Instead, a run can be recorded as data: every frame's game state, every model's probabilities and answer times, and wall-clock timestamps. Afterwards, that recording is redrawn with the same renderer as the live window into a 1080p video at the original pace, clearly labelled as a recorded run.

![A frame from an exported replay, rendered from recorded data rather than captured from the screen](/images/Blog/laya-vs-jev/replay.png)

Crashes get the same treatment. When a dinosaur dies, the last two seconds replay at half speed under the live lanes while the race continues. The crash report keeps the final 120 frames, the nearby obstacles, what the model asked for versus what actually executed, and when each answer was expected versus when it arrived. Reproduction cases pulled from those reports now live in the test suite.

---

## So who won?

Depends on what you measure, and it's worth being precise about that. With the shields on, every score belongs to the combined system. "Best move" means agreement with the planner's recommendation, not understanding of the game. And every run below is a single run on one machine.

**The single-request run.** This predates the in-flight scheduling: one question at a time, 90 seconds each, on an M3 with 16 GB that was deep in swap. Laya answered in 33 ms (median) against Jev's 369 ms, and made 2,753 decisions to Jev's 197. Laya's best score was 257 to Jev's 110, with 4 deaths to Jev's 11. But Jev picked the planner's best move 100% of the time, and Laya 75%. Laya cost nothing; Jev cost about a third of a cent.

![The single-request run: Laya is about eleven times faster, Jev is the more accurate reader](/images/Blog/laya-vs-jev/numbers.svg)

**Lockstep.** Freeze each game while its model thinks and latency vanishes from play. Neither model died, and agreement barely moved: 74% for Laya, 100% for Jev. That's the cleanest read on the models themselves. Jev reads a labelled situation more accurately. Laya reads it about eleven times faster, for free, on the machine in front of you.

**A live smoke test with requests in flight.** One 90-second run: Laya's best score was 803 and Jev's 417, with three deaths each. Jev needed 23 best-effort decisions, where the planner couldn't prove any move safe across its full timing range. Laya needed none and still died three times, a reminder that when an answer lands outside the expected range, a label that was safe on paper can still crash.

**The latest assisted match.** Two 90-second rounds on the same Jev-designed course with all three shields on, and it's almost funny. Neither player died, and they finished both rounds at exactly the same distance. Jev won 2–0 on the tie-breaker, fewer shield interventions. That's a show result, not a verdict: the shields and the staged course did a lot of the work, and the machine dropped almost six seconds of stalled time during the run.

---

## Limitations

- **Assisted play isn't model skill.** The emergency shield alone survives without a model. Lockstep and unassisted modes exist for exactly this reason.
- **The planner knows the physics; the models don't.** This measures reading speed and reliability on a structured decision, not physical reasoning.
- **Physics is unfair at 370 ms.** Some obstacle sequences have no move that survives every possible arrival time.
- **Latency depends on the host and the network.** Memory pressure, GPU clocks, and network jitter all move the numbers. They're reported, not controlled.
- **Small samples.** The course-design numbers come from 40 obstacles on one seed, and the matches are single runs.

---

## Takeaways

**Latency is a correctness property in a control loop.** 22 frames of delay against an 18–28 frame window turns a perfectly accurate model into a dead dinosaur. A model's quality has to be judged together with how long it takes to answer.

**How often you ask matters as much as which model you ask.** With one question at a time, Jev died at the first or second obstacle and peaked at 110. With requests in flight and the newer shields, the same model reached 417.

**Parallel requests need invalidation.** Keeping several requests in flight is only safe if each one carries its premise, and there's a cheap way to throw away answers when that premise breaks.

**Instrument the scaffolding.** Every shield intervention, discarded answer, best-effort decision, and dropped second of host time is counted. Without those counters, the headline score tells you nothing.

---

## Try it

You need an Apple Silicon Mac, and a TypeSafe API key if you want Jev in the race. Laya can also play alone, fully offline. Setup instructions, the unassisted and lockstep modes, and the recording tools are all in the repository.

[View the repository →](https://github.com/virajbhartiya/laya-vs-jev)

---

## References

- [Laya vs Jev repository](https://github.com/virajbhartiya/laya-vs-jev) — the arena, planner, shields, and replay tools
- [laya-mlx](https://github.com/mizorewww/laya-mlx) — the native MLX port of Laya this project is built on
- [Laya](https://github.com/NandhaKishorM/laya) — the upstream decision models by Convai Innovations
- [aac6fef/laya-multilingual-mlx](https://huggingface.co/aac6fef/laya-multilingual-mlx) — the checkpoint Laya plays with
- [TypeSafe docs](https://docs.typesafe.ai) — Jev
- [MLX](https://github.com/ml-explore/mlx) — Apple's machine learning framework for Apple Silicon
- [ModernBERT](https://huggingface.co/blog/modernbert) — the encoder architecture behind Laya
- The Chromium Authors — the original dino game, its sprites and its sounds, under the BSD 3-Clause license

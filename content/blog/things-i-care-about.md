---
title: "Things I Care About That Don't Fit on a Resume"
description: "Resumes compress years into bullet points. Here's everything that actually matters that never makes it onto one."
publishedAt: "2026-04-22"
tags: ["Personal", "Growth", "Values"]
image: "/images/Blog/things-i-care-about/banner.png"
author: "Viraj Bhartiya"
---

# Things I Care About That Don't Fit on a Resume

My resume is one page.

It lists the projects, the roles, the things that worked. It makes my life look linear. Efficient. Intentional.

It isn't.

I started building apps in my summer vacations because I had nothing better to do. Put a music streaming app on the Play Store. Then a notes app. Then an ebook reader. Then a spyware suite, because I was curious and slightly unhinged. None of this was a career plan. I was just a kid who liked making things and couldn't stop.

Now I work on distributed systems, blockchain protocols, and open source infrastructure. If you told fifteen-year-old me that he'd be writing Raft consensus from scratch or contributing to Blender's 3D engine, he'd think you were lying.

The resume makes it look like a progression. It was actually chaos. Each version of me had to die for the next one to exist.

Most of what actually shapes how I work doesn't have a metric. Doesn't have a GitHub contribution graph. Doesn't fit in a bullet point.

It's the stuff underneath.

---

## I hate not understanding things

If I use something and don't understand how it works internally, it bothers me more than it should.

Not in a performative way. In a compulsive way.

I can't just call an API and move on. I want to know what happens after the call. What breaks first. Where the abstraction leaks.

That's why I built [Raft consensus from scratch](https://github.com/virajbhartiya/raftokay). Not because anyone asked me to. Not because it was on a roadmap. Because I kept using etcd and Consul and not understanding what was happening underneath, and that felt wrong. Like driving a car without knowing what the engine does.

That's why I wrote a [compute protocol](https://github.com/theblitlabs/parity-protocol) that enforces determinism through Docker sandboxes and hash comparisons. I could've used a managed service. But I wanted to know what happens when you actually try to make five machines agree on something.

Surface-level knowledge feels fragile to me. When something breaks at 3 AM, the person who only knows the documentation is googling. The person who knows the internals is already thinking about what went wrong.

I want to be the second person. That's non-negotiable.

---

## I care about being wrong quickly

There's a weird social pressure to sound confident. To never hesitate. To have an opinion on everything and never update it.

I've learned that confidence without correction is just ego with better lighting.

I'd rather say "I don't know" and look stupid for ten seconds than stay quiet and write bad code for a week. I'd rather have someone tear apart my approach in a meeting than discover it was flawed in production.

I've been in rooms where no one wants to admit they're lost. Everyone nods along. The meeting ends. Nothing was actually decided. Nobody understood the problem. But everyone *looked* like they did.

The people I respect most don't defend their ideas like territory. They treat them like drafts. They'll say "actually, I was wrong about that" like it's nothing. Because to them, being right matters more than being *seen as* right.

I try to do the same. I don't always manage it. But I try.

---

## I care about things feeling right

This one is hard to explain without sounding obsessive.

Sometimes something works. It passes tests. It ships. Users are fine.

And I still hate it.

The naming feels lazy. The structure feels rushed. The edges feel sharp in a way nobody notices but me.

I've shipped things that technically worked but felt careless. Something about the spacing, the flow, the way one function talks to another, off by a little. Not broken. Just not *right*.

Most people wouldn't notice. But I'd know. And it would bug me for weeks.

I'm not saying everything needs to be perfect. I ship fast. I ship rough. I've built full products in hackathon weekends that were held together by hope and caffeine. But there's a line between rough and careless, and I care about which side I'm on.

---

## I care about work aging well

Future-me is ruthless.

He will judge every shortcut. Every lazy decision. Every "we'll fix it later" that never got fixed.

Half the projects trending on Twitter this week will be dead in six months. That's not a criticism. It's just how things work. Most things are temporary.

But some things stick. Some codebases are still clean three years later. Some APIs still make sense after twelve versions. Some decisions age well because someone sat with them for more than five minutes before committing.

I've killed enough of my own projects to know the difference. The ones I rushed are the ones I'm embarrassed by. The ones where I took an extra day to think about the architecture, those still feel solid.

I care more about durability than applause.

---

## I care about staying level

When things break, the room changes.

Energy spikes. People rush. Messages pile up. Someone suggests rewriting everything from scratch.

I've been in enough of these moments (hackathons where the demo breaks twenty minutes before judging, production issues at 2 AM, code that worked yesterday and doesn't today) to know that panic makes it worse. Every time.

Not because I'm calm by nature. I'm not. My brain runs fast. Too fast, sometimes.

But someone has to slow the moment down. Read the logs. Trace the flow. Separate signal from noise.

Stability is contagious. So is chaos. I choose the first one.

---

## I care about curiosity without a goal

Some of the most important things I've learned weren't tied to a deadline. No prize. No deliverable. No roadmap.

I got into distributed systems before I had any reason to. Nobody was asking me to implement consensus algorithms. I just thought the problem of getting five machines to agree on something was fascinating.

I built a [personal memory infrastructure](https://github.com/cogniahq/cognia) because I wanted to understand how vector search and semantic recall actually worked. Not for a class. Not for a job. Because the idea stuck in my head and wouldn't leave.

That kind of curiosity, the kind that doesn't have a goal yet, is the most valuable kind I've found. It's how I went from building Flutter apps in my bedroom to contributing to Filecoin's core protocol. None of that path was planned. I just kept following whatever felt interesting.

The best things I've built came from that restlessness. Not from strategy.

---

## I care about who I build with

This one matters more than all the others combined.

I've been on teams where everyone was talented and nothing good came out of it. Egos clashing, people protecting territory, nobody willing to say "your approach is better, let's go with that."

And I've been on teams (usually at 3 AM during a hackathon, or deep in an open source thread, or in some group chat that started as a joke) where the vibe was just *right*. People who take ownership without being asked. People who disagree without making it personal. People who stay late not because they have to, but because they genuinely care about the thing.

Those people changed how I think. Not the famous engineers on Twitter. The random person who reviewed my first real PR. The teammate who told me my code was bad and then showed me why. The friend who said "you should try Go" and accidentally changed the trajectory of my entire career.

That kind of team makes you better. You write better code. You think harder. You push yourself because the people around you are pushing themselves.

I care about who I build with. Maybe more than what I build.

---

None of this fits on a resume.

There's no section for "intolerance for shallow understanding." No checkbox for "would rather be corrected than protected." No metric for "cares too much about naming things."

But these are the things that shape every line of code I write. How I approach problems. How I handle being wrong. How I decide what's worth building. How I choose who to build it with.

A resume shows what I've done.

This is why I do it the way I do.

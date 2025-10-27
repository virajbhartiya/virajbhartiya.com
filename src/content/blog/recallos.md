---
title: "Recall OS: Memory Without Permission"
description: "What I built for ETHGlobal 2025 a decentralized memory layer that captures, indexes, and recalls your digital actions without gatekeepers."
publishedAt: "2025-10-27"
tags: ["AI Memory", "Vector Search", "Recall OS", "ETHGlobal"] 
image: "/images/Blog/recallos.png"
author: "Viraj Bhartiya"

---

# Recall OS: Memory Without Permission

*A real-time, trustless, slightly angry memory network built with PostgreSQL, pgvector, and no tolerance for data hostage negotiation.*

## Why This Exists

Everyone's pretending "AI memory" is solved.
What they really built are **surveillance silos** that remember *for you*, but not *with you* context locked behind API keys and usage tiers.

Recall OS doesn't ask permission to remember. It records everything that matters: web pages, code, thoughts, links, files, chat logs whatever defines you as a digital organism and keeps it available across devices and agents without middlemen.

No SaaS, no "sync," no data hostage negotiation.

You own your recall.

## The Architecture (Nothing Hypothetical)

Here's how things actually work:

1. **Browser Extension** captures web content as you browse automatically, silently, persistently.
2. Each page becomes a **Memory Object** hashed, summarized, and vectorized using Google's text-embedding-004 model.
3. The object is stored in PostgreSQL with pgvector embeddings and processed through multiple similarity algorithms.
4. A semantic search engine maps queries to content via cosine similarity with domain-aware adjustments.
5. Any device or agent can request recall by wallet address pure content addressing, no trust needed.

It's dumb-simple by design. Complexity invites exploits. We don't have room for those.

## Memory Enforcement

Data cannot mutate.
There is no "edit memory" endpoint.
Updates spawn new hashes. The old ones stay.

This isn't nostalgia it's auditability.

Memory should be **verifiable**, not curated.
If you said something dumb last week, Recall will show it to you in full fidelity.
No selective erasure. No algorithmic redemption arc.

You get the truth, not the version you wish existed.

## The Search System: Brutally Fair

- A query hits the vector database.
- Similarity scores are calculated via pgvector cosine distance.
- Results are ranked by blended keyword + semantic scores (60% semantic, 40% keyword).
- AI answers are generated with inline citations [1], [2].
- No retry loop for incompetence. Either your query makes sense or you're wasting everyone's electricity.

No staking. No reputation. No social capital. You either found it or didn't.

There is no retry loop for incompetence. Either your content is searchable or you're wasting everyone's electricity.

## Similarity Score Calculation (The Math)

The system uses a **hybrid scoring algorithm** that combines multiple similarity measures:

### 1. Cosine Similarity (Primary)
```typescript
cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

### 2. Domain-Aware Adjustments
- **Penalty**: Meet ↔ GitHub cross-links get -0.4 similarity unless very high (>0.7)
- **Boost**: GitHub ↔ GitHub Filecoin-related items get +0.2 similarity
- **URL Matching**: Same domain gets +0.1 similarity boost

### 3. Keyword Matching (Secondary)
```typescript
// Token-based matching with word boundaries
for (const token of queryTokens) {
  const tokenRegex = new RegExp(`\\b${token}\\b`, 'gi');
  
  if (tokenRegex.test(title)) keywordScore += 0.5;      // Title weight
  if (tokenRegex.test(summary)) keywordScore += 0.3;    // Summary weight  
  if (tokenRegex.test(content)) keywordScore += 0.2;    // Content weight
}

// Normalize by query token count
keywordScore = keywordScore / queryTokens.length;
```

### 4. Final Hybrid Score
```typescript
const hybridScore = (semanticScore * 0.6) + (keywordScore * 0.4);
const boostedScore = hybridScore * (1 + (coverageRatio * 0.3));
```

### 5. Topical Relations (Metadata-Based)
- **Topic Overlap**: 40% weight using Jaccard similarity
- **Category Overlap**: 30% weight
- **Key Points Overlap**: 20% weight
- **Searchable Terms**: 10% weight

### 6. Temporal Relations (Time-Based)
- **Same Hour**: 0.9 + exponential decay
- **Same Day**: 0.7 + exponential decay  
- **Same Week**: 0.4 + exponential decay
- **Same Month**: 0.1 + exponential decay

## What It Can Store (Right Now)

This is not a theoretical system. It stores real memories. Today. Examples include:

- Web pages (via browser extension)
- Manual content (via web client)
- SDK integrations
- MCP server connections

Basically: anything that

- Runs through the API
- Doesn't rely on external state or timing
- Can be vectorized and searched

No GPU support. No async callbacks. No cloud APIs. Just content → vector → search.

## Tooling Already Live

- **Browser Extension**: Captures web content automatically as you browse.
- **Web Client**: React app with 3D memory mesh visualization using UMAP.
- **API Server**: Express.js with PostgreSQL + pgvector for semantic search.
- **SDK**: TypeScript client for programmatic access.
- **MCP Server**: Model Context Protocol integration for AI agents.

Everything here is built. Running. Used. No pitch decks or vaporware.

## Design Philosophy

- No trust, no reputation, no staking-as-a-filter
- No complex coordination protocols
- Every memory is independently verifiable by content hash
- Incentives are tight, minimal, and enforced by logic, not vibe
- Assume malicious actors exist; remove their influence through architecture, not policing

## Technical Backbone

* **Storage:** PostgreSQL with pgvector for semantic search.
* **AI:** Google Gemini API with Ollama fallback.
* **Embeddings:** text-embedding-004 (768-dimensional vectors).
* **Frontend:** React with Three.js for 3D visualization.
* **Extension:** Chrome extension with content script injection.
* **Visualization:** UMAP for latent space projection.

No smart contracts complexity, no on-chain verbosity.
Just content addressing done right.

## The Ethos

* Memory is a right, not a feature.
* Context shouldn't require API credits.
* Truth should outlive convenience.
* Forgetting should be intentional, not engineered.

This isn't an AI toy or a "productivity tool."
It's infrastructure for cognition owned, portable, immutable.

## Summary

Recall OS does one thing: captures your digital actions, stores them with vector embeddings, and lets you search them semantically.
It doesn't ask you to believe in it.
It shows you the similarity score and dares you to dispute it.
If you're still clinging to centralized note apps that sync to "the cloud," we get it. We've been there.
This is what we built to replace that.
And it's already running.

[View the repository →](https://github.com/virajbhartiya/RecallOS)
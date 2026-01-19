---
title: "Cognia: Personal Memory Infrastructure"
description: "A decentralized memory layer that captures, indexes, and recalls your digital actions with complete local control and privacy."
publishedAt: "2025-10-27"
tags: ["AI Memory", "Vector Search"]
image: "/images/Blog/recallos.png"
author: "Viraj Bhartiya"
---

# Cognia: Personal Memory Infrastructure

A decentralized memory layer that captures, indexes, and recalls your digital actions with complete local control and privacy.

## Architecture

1. **Browser Extension** captures web content automatically
2. Each page becomes a **Memory Object** hashed, summarized, and vectorized using Google's text-embedding-004 model
3. Objects are stored in PostgreSQL with pgvector embeddings
4. Semantic search engine maps queries to content via cosine similarity
5. Any device or agent can request recall by wallet address

## Memory Enforcement

- Data cannot mutate
- No "edit memory" endpoint
- Updates spawn new hashes, old ones remain
- Memory is verifiable, not curated

## Search System

- Query hits vector database
- Similarity scores calculated via pgvector cosine distance
- Results ranked by blended keyword + semantic scores (60% semantic, 40% keyword)
- AI answers generated with inline citations

## Similarity Score Calculation

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
  const tokenRegex = new RegExp(`\\b${token}\\b`, "gi");

  if (tokenRegex.test(title)) keywordScore += 0.5; // Title weight
  if (tokenRegex.test(summary)) keywordScore += 0.3; // Summary weight
  if (tokenRegex.test(content)) keywordScore += 0.2; // Content weight
}

// Normalize by query token count
keywordScore = keywordScore / queryTokens.length;
```

### 4. Final Hybrid Score

```typescript
const hybridScore = semanticScore * 0.6 + keywordScore * 0.4;
const boostedScore = hybridScore * (1 + coverageRatio * 0.3);
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

## What It Can Store

- Web pages (via browser extension)
- Manual content (via web client)
- SDK integrations
- MCP server connections

Requirements:

- Runs through the API
- Doesn't rely on external state or timing
- Can be vectorized and searched

## Local Control with Ollama

- **Local AI Processing**: All AI operations can run through Ollama models
- **Zero External Dependencies**: No cloud APIs required
- **Privacy by Design**: Data stays on your machine
- **Offline Capable**: Full functionality without internet
- **Model Flexibility**: Use any Ollama-compatible model

## Technical Stack

- **Storage**: PostgreSQL with pgvector
- **AI**: Google Gemini API with Ollama local support
- **Embeddings**: text-embedding-004 (768-dimensional vectors)
- **Frontend**: React with Three.js for 3D visualization
- **Extension**: Chrome extension with content script injection
- **Visualization**: UMAP for latent space projection

## Tooling

- **Browser Extension**: Captures web content automatically
- **Web Client**: React app with 3D memory mesh visualization
- **API Server**: Express.js with PostgreSQL + pgvector
- **SDK**: TypeScript client for programmatic access
- **MCP Server**: Model Context Protocol integration for AI agents

[View the repository →](https://github.com/cogniahq/cognia)

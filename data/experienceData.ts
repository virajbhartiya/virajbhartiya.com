export interface Experience {
  title: string;
  company: string;
  /** Optional date range, e.g. "Nov 2025 – Present". */
  period?: string;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Founding Engineer",
    company: "SatsTerminal",
    period: "Nov 2025 – Present",
    description: [
      "Built OneSwap, a DEX on Canton mainnet, from AMM smart contracts to swap execution and liquidity management. Since its July 2026 mainnet launch it has settled $10M+ in volume across 1M+ on-ledger transactions, with about $1M in TVL.",
      "Designed atomic delivery-versus-payment settlement so both assets change hands in one ledger transaction, with slippage limits enforced on-chain. Profiled mainnet swaps down to sequencer round trips and remote confirmers; median settlement is 6.3 seconds.",
      "Built the token launchpad: CIP-0056 issuance, bonding-curve trading, graduation into liquidity pools, airdrops, and holder claims. It traded 25M+ CC across 1,300+ traders in its first two weeks on mainnet.",
      "Run the Canton mainnet validators and production stack, through upgrades from 0.6 to 0.9. Built an auto-halt safety guard that stops the stack on stuck swaps, pool drains (k-invariant checks), or on-ledger solvency shortfalls, with a dead-man's switch in case the guard itself dies.",
      "Engineered the accounting and recovery systems behind swaps and liquidity provision: a write-ahead intent journal, deposit attribution, reserve reconciliation against the ledger, idempotent retries, and exact-holding refunds.",
      "Integrated Squid Router and Circle xReserve bridges that have moved $1.2M+ between EVM chains and Canton, and shipped the integrator and trader SDKs used by 26 partner accounts across 2.3M+ requests.",
      "Built a BTC-backed borrowing flow that bridges collateral into EVM lending protocols and delivers stablecoins without repeated user signatures, using deterministic smart accounts, scoped session keys, and durable cross-chain orchestration.",
    ],
  },
  {
    title: "Co-founder",
    company: "Cognia",
    description: [
      "Building Cognia, a research tool over a curated library of Indian law (statutes, rules, and judgments) that answers questions with the sources behind them.",
      "Built the product end to end: statute and judgment ingestion, judgment identity and retrieval, search and answer generation, and the web app and its AWS deployment.",
      "Started as an enterprise AI memory layer with a browser extension, SDKs, and an MCP server, then pivoted to legal research in September 2026.",
    ],
  },
  {
    title: "Committee Head",
    company: "KJSCE CodeCell",
    description: [
      "Led a 36-member team, driving execution across engineering, operations, and outreach.",
      "Hosted HackX, one of India's largest student-led hackathons, along with one of the country's largest student-led cybersecurity CTF events.",
      "Raised funds for these events and built the supporting tech systems in-house.",
    ],
  },
  {
    title: "Guild Member",
    company: "Zed",
    description: [
      "Part of Let's Git Together and Zed Guild, working across Zed's editor, Git UI, Vim mode, and GPUI interaction layer to fix correctness issues in menu navigation, local timestamp rendering, scroll propagation, and single-line cursor semantics.",
      "Implemented Rust-level UX fixes that cut through shared editor primitives and input handling, including forwarding scroll events from non-list panel regions, normalizing line-start movement behavior, and tightening Git view time calculations.",
    ],
  },
  {
    title: "Open Source Engineer",
    company: "Protocol Labs",
    period: "Sept 2024 – Present",
    description: [
      "Part of Protocol Labs Dev Guild cohorts 1 through 6, contributing to Lotus, the reference implementation of the Filecoin protocol written in Go, by improving Ethereum JSON-RPC compatibility, FEVM correctness, chain index behavior, and operator tooling.",
      "Built PDP Explorer in Go with fault-tolerant execution and shipped full-stack features across FilOzone products for proof sets, payments, and explorer workflows.",
      "Extended Synapse SDK for production TypeScript clients with deal orchestration, provider validation, metadata APIs, and callback improvements.",
      "Recognized as a top 10 worldwide open-source contributor to Lotus.",
    ],
  },
  {
    title: "Tech Team",
    company: "IICPC",
    description: [
      "Built IICPC, an end-to-end platform for secure programming contests and technical assessments, with a web control plane for admins and a dedicated desktop environment for contestants.",
      "Designed the product as a split-runtime system with a Next.js 14 control plane and a Tauri desktop client backed by a Rust security daemon for native IPC, fullscreen lockdown, session heartbeats, webcam capture, and ONNX-based proctoring signals.",
      "Engineered the Go backend with JWT and RBAC-protected APIs, replayable WebSocket streams with Redis-backed sequencing, reconnect-safe contest sync, Linux Isolate sandboxed code execution, and signed direct-to-storage uploads for proctoring frames.",
    ],
  },
  {
    title: "Core Team Member",
    company: "GDSC KJSCE",
    description: [
      "Hosted a Flutter and Firebase workshop, teaching students how to build cross-platform mobile apps with realtime backends from scratch.",
      "Organized technical events and workshops as part of the Google Developer Student Club.",
    ],
  },
  {
    title: "Founding Engineer",
    company: "TopClub",
    period: "Jan 2024 – Sept 2024",
    description: [
      "Built the fantasy football app and website end-to-end, shaping the core product experience across mobile and web.",
      "Designed the player data ingestion pipeline for the top five football leagues, processing 100+ datapoints per player to power the platform.",
      "Architected backend systems for live scoring, squad management, and real-time sync across Flutter and React clients, keeping API responses under 300ms p95.",
    ],
  },
];

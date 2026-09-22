export interface Experience {
  title: string;
  company: string;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Founding Engineer",
    company: "SatsTerminal",
    description: [
      "Built OneSwap's trading and settlement infrastructure on Canton, from AMM smart contracts to swap execution and liquidity management. Designed atomic delivery-versus-payment settlement so both assets change hands in one ledger transaction, with slippage limits enforced on-chain.",
      "Benchmarked atomic settlement at 89 transactions per minute with sub-18-second p90 latency on Canton DevNet.",
      "Built the token launch lifecycle: CIP-0056 issuance, bonding-curve trading, graduation into liquidity pools, and holder claims. Made settlement and claims recoverable across retries through durable jobs, idempotent operations, and ledger reconciliation.",
      "Engineered the accounting and recovery systems behind swaps and liquidity provision, including deposit attribution, reserve reconciliation, exact-holding refunds, and per-pool serialized settlement.",
      "Built a BTC-backed borrowing flow that bridges collateral into EVM lending protocols and delivers stablecoins without repeated user signatures, using deterministic smart accounts, scoped session keys, and durable orchestration across chains.",
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
    description: [
      "Built the fantasy football app and website end-to-end, shaping the core product experience across mobile and web.",
      "Designed the player data ingestion pipeline for the top five football leagues, processing 100+ datapoints per player to power the platform.",
      "Architected backend systems for live scoring, squad management, and real-time sync across Flutter and React clients, keeping API responses under 300ms p95.",
    ],
  },
];

export interface Experience {
  title: string;
  company: string;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Software Engineer",
    company: "SatsTerminal",
    description: [
      "Built an SDK-driven BTC-backed borrow flow into EVM DeFi using deterministic ZeroDev Kernel smart accounts, time-bound session keys, and Temporal orchestration to bridge collateral, execute protocol-specific deposit and borrow steps, and disburse stablecoins without repeated user signatures.",
      "Built OneSwap, a Canton-native non-custodial exchange platform spanning the public web app, wallet-authenticated APIs, TypeScript SDK, admin and recovery tooling, ledger-ingest workers, and Temporal-based settlement orchestration.",
      "Engineered safety-critical AMM infrastructure for swaps and LP actions, including slippage-aware quoting, ledger deposit attribution, reserve reconciliation, exact-holding refunds, liability accounting, and per-pool serialized settlement.",
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
      "Organizing technical events and workshops as part of the Google Developer Student Club.",
    ],
  },
  {
    title: "Software Developer",
    company: "MGPEL",
    description: [
      "Built Saarvik, a multi-tenant inventory and production management platform using Next.js, TypeScript, MongoDB, Mongoose, and NextAuth, with tenant isolation, RBAC, template-driven inventory, audit trails, barcode workflows, subscription controls, and client portals.",
      "Built a full-stack apparel e-commerce platform with variant-aware product models, cart and checkout flows, inventory validation, shipping calculation, order lifecycle management, and admin publishing operations.",
      "Built the broader operational stack for apparel brands from consultation and sourcing through manufacturing, printing, packaging, photography, shipping, and launch-ready storefronts.",
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

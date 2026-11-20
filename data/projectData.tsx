export const projectData = [
  {
    title: "OneSwap: A DEX on Canton",
    description:
      "The DEX and token launchpad I build at SatsTerminal. Atomic delivery-versus-payment swaps, liquidity pools, bonding-curve token launches, and EVM bridges on Canton mainnet, with $10M+ in settled volume since its July 2026 launch.",
    link: "https://www.oneswap.cc",
    tags: ["Blockchain", "Canton", "Daml"],
  },
  {
    title: "Laya vs Jev: Latency Is Part of the Game",
    description:
      "Two AI models play Chrome's dino game side by side in real time: one runs locally on Apple Silicon with MLX, the other is a hosted API a third of a second away. A latency-aware planner keeps requests in flight, and safety shields are counted, not hidden. Live metrics and replay recording.",
    link: "https://github.com/virajbhartiya/laya-vs-jev",
    tags: ["MLX", "Real-Time Systems", "AI"],
  },
  {
    title: "flux: Source Control for Huge Monorepos",
    description:
      "Open-source, git-compatible source control inspired by Scion, Mononoke, and Piper. The server owns history, changesets are content-addressed deltas, refs move by compare-and-swap, and landing is a server-side rebase, so many people and agents can land on main at once. Ships a full forge and an MCP server.",
    link: "https://github.com/virajbhartiya/flux",
    tags: ["Distributed Systems", "Version Control", "Agents"],
  },
  {
    title: "Wing: An Open-Source Browser for Mac",
    description:
      "An independent desktop browser for Apple Silicon with Safari's layout and Arc's design: Spaces, a command palette, split view, and Peek. Runs on a native Chromium engine, so Chrome extensions install straight from the Chrome Web Store.",
    link: "https://github.com/virajbhartiya/wing",
    tags: ["Desktop", "Chromium", "macOS"],
  },
  {
    title: "Turing Pool: Identity-Priced Liquidity",
    description:
      "An AMM that prices order-flow risk using proof of unique human backing. A custom 1inch Aqua app reads World's AgentBook on-chain at quote time, so human-backed agents get a tight fee within a per-human daily quota while anonymous bots pay the compensating surcharge. Deployed on World Chain mainnet with a revenue-neutral controller that reprices after every fill.",
    image: "images/Projects/turing-pool.png",
    link: "https://github.com/virajbhartiya/turing-pool",
    tags: ["Blockchain", "1inch Aqua", "World ID", "The Graph"],
  },
  {
    title: "Blip Markets: Prediction Markets on a Grid",
    description:
      "A prediction market without order books or AMM curves: pick a cell on a live price grid and you win if the price lands there. Go settlement and resolver services, a canvas-rendered trading grid, and gasless deposits. ETHGlobal HackMoney 2026 finalist.",
    link: "/blog/blip-markets",
    tags: ["Blockchain", "Prediction Markets", "Go"],
  },
  {
    title: "Parity Protocol: Verifiable Compute",
    description:
      "A decentralized compute network that verifies work by re-execution, not reputation. Runs untrusted workloads, LLM inference, and federated learning across Docker-isolated nodes, with staking, slashing, a Go SDK, and Solidity contracts. Prakalpa 2025 software track winner.",
    link: "https://github.com/theblitlabs/parity-protocol",
    tags: ["Distributed Systems", "Go", "Solidity"],
  },
  {
    title: "fusion-xbtc: Cross-Chain Atomic Swaps for Bitcoin",
    description:
      "Built trustless atomic swaps across Ethereum and Bitcoin-family chains using HTLCs, with 1inch Fusion+ integration, relayer infrastructure, smart contracts, CLI tooling, and a UI for cross-chain execution.",
    image: "images/Projects/fusion-xbtc.png",
    link: "https://github.com/virajbhartiya/fusion-xbtc",
    tags: ["Blockchain", "Bitcoin", "Ethereum", "HTLC"],
  },
  {
    title: "RaftOkay: A Raft Implementation in Go",
    description:
      "Built a Go implementation of Raft with leader election, log replication, WAL-backed durability, snapshots, pluggable transports, and a chaos simulator for failure testing.",
    image: "images/Projects/raftokay.png",
    link: "https://github.com/virajbhartiya/raftokay",
    tags: ["Distributed Systems", "Consensus", "Go"],
  },
  {
    title: "MapReduce in Rust and Go",
    description:
      "Re-implemented MapReduce across multiple languages, including Rust and Go, to explore coordinator-worker execution, task scheduling, fault tolerance, and distributed job processing.",
    image: "images/Projects/map-reduce.png",
    link: "https://github.com/virajbhartiya/map-reduce",
    tags: ["Distributed Systems", "Rust", "Go"],
  },
  {
    title: "Summer of Bitcoin 2025",
    description:
      "Built low-level Bitcoin protocol tooling around node RPCs, descriptor wallets, multisig transaction construction, and mining workflows as part of serious systems and protocol engineering work.",
    image: "images/Projects/summer-of-bitcoin.png",
    link: "https://github.com/virajbhartiya/Summer-Of-Bitcoin-2025",
    tags: ["Blockchain", "Bitcoin", "Go"],
  },
  {
    title: "Cognia: Research Over Indian Law",
    description:
      "A research tool over a curated library of Indian statutes, rules, and judgments that answers questions with the sources behind them. Started as an enterprise AI memory layer with pgvector, a browser extension, and an MCP server.",
    image: "images/Projects/recallos.png",
    link: "https://cogniahq.tech",
    tags: ["Legal AI", "Retrieval", "PostgreSQL"],
  },
  {
    title: "Rail Throughput Optimization (SIH 2025)",
    description:
      "Built a rail infrastructure optimization algorithm focused on maximizing train throughput per track section.",
    image: "images/Projects/iris.png",
    link: "https://github.com/virajbhartiya/sih-2025-team-nyx",
    tags: ["Optimization", "Operations Research"],
  },
  {
    title: "Cachly: A Type-Safe Cache for Node.js",
    description:
      "Built a type-safe caching system for Node.js and TypeScript with dependency tracking, intelligent invalidation, TTL, stale-while-revalidate, compression, circuit breaking, distributed support, and advanced eviction strategies.",
    image: "images/Projects/cachly.png",
    link: "https://www.npmjs.com/package/cachly",
    tags: ["TypeScript", "Node.js", "NPM Package"],
  },
  {
    title: "HotVault: Hot Storage on Filecoin",
    description:
      "Prototype for a data storage drive application that leverages Filecoin's verifiable storage, powered by Proof of Data Possession (PDP), payable with FIL-backed Stablecoin.",
    image: "images/Projects/hotvault.png",
    link: "https://github.com/FilOzone/hotvault-demo",
    tags: ["Filecoin", "Blockchain", "Storage"],
  },
  {
    title: "Structurize: JSON to Typed Models",
    description:
      "Structurize simplifies the conversion of JSON data from APIs into structured formats. This open-source tool supports TypeScript, JavaScript, Dart, and more, allowing users to effortlessly transform complex JSON into manageable tabular data. Perfect for developers looking to streamline their data processing workflows.",
    image: "images/Projects/structurize.png",
    link: "https://structurize.virajbhartiya.com",
    tags: ["React", "TailwindCSS"],
  },
  {
    title: "Inter IIT Competitive Programming Conclave",
    description:
      "Designed and developed the official website for the Inter IIT Competitive Programming Conclave, India's largest competitive programming camp according to statistics involving 30+ colleges including IITs, NITs, and BITS",
    image: "images/Projects/IICPC.png",
    link: "https://iicpc.com",
    tags: ["React", "TailwindCSS"],
  },
  {
    title: "Rusty: A License File Generator",
    description:
      '"LICENSE GENERATOR" is a versatile software tool designed to simplify the process of generating license files for your projects. With an easy installation process, it allows users to quickly create license files by specifying the license type, year, full name, project name, and file extension.',
    image: "images/Projects/license.png",
    link: "https://license.virajbhartiya.com",
    tags: ["Rust", "CLI"],
  },

  {
    title: "DevOpia: KJSCE Hackathon Site",
    description:
      "KJSCE DevOpia is an exciting event that promises to bring together the brightest minds in the country. it's a national-level offline hackathon where you can showcase your skills in both hardware and software domains.",
    image: "images/Projects/devopia.png",
    link: "https://devopia.kjsce.com",
    tags: ["React", "Sass"],
  },
  {
    title: "SciOps: A Scientific Calculator CLI",
    description:
      "With an interactive prompt for seamless computations and a wide range of functions, SciOps simplifies calculations Perform basic arithmetic, advanced functions, and more with ease. Developed with 64-bit binary floating-point arithmetic, accuracy is ensured, though be aware of potential rounding errors.",
    image: "images/Projects/sciops.png",
    link: "https://github.com/virajbhartiya/sciops",
    tags: ["Rust", "CLI"],
  },
  {
    title: "Atari Breakout with Deep Q-Learning",
    description:
      "Built a Deep Q-Network agent for Atari Breakout using Python, NumPy, OpenCV, PyGame, and PyTorch, covering frame preprocessing, policy learning, and training and evaluation loops.",
    image: "images/Projects/Atari Breakout.gif",
    link: "https://github.com/virajbhartiya/Atari-Breakout-DeepQ",
    tags: ["PyTorch", "OpenCV", "PyGame"],
  },
  {
    title: "Alien: Browser as a Secondary Display",
    description:
      "Built a desktop app that turns any browser-enabled device into a secondary display over Wi-Fi, combining networking, real-time rendering, and cross-device UX.",
    image: "images/Projects/alien.png",
    link: "https://github.com/virajbhartiya/Alien",
    tags: ["Electron", "React", "WebRTC"],
  },
  {
    title: "Feather: A Notes App",
    description:
      "Take notes on the go. Feather is lightweight Google keep clone. Syncs notes on the cloud instantly so you never lose them.",
    image: "images/Projects/Feather.jpg",
    link: "https://play.google.com/store/apps/details?id=feather.com",
    tags: ["Flutter", "Firebase"],
  },
  {
    title: "Lucid: Text-to-Image with CLIP",
    description:
      "Built text-to-image and multimodal generation tooling around CLIP-style models, spanning image generation, text-to-video experiments, and broader research-hacker workflows.",
    image: "images/Projects/Lucid.jpg",
    link: "https://github.com/virajbhartiya/Lucid",
    tags: ["Python", "OpenAI", "Stable Diffusion"],
  },
  {
    title: "Riverto: A Music Streaming App",
    description:
      "Riverto is a free music streaming and download app built using Flutter. It was launched on Google Playstore on September 21, 2020. Due to some legal issues, the app had to be taken down from the play store",
    image: "images/Projects/Riverto.jpg",
    link: "https://drive.google.com/file/d/1cpC8DbK4FSmhjGgvAMxkIVswlnRrAzp0/view?usp=sharing",
    tags: ["Flutter", "API Extraction"],
  },
  {
    title: "Medco: A Medicine Reminder App",
    description:
      "Medco is a medicine reminder app using SQL as the database built using flutter. Timely notifications are sent to the user's mobile to remind them to take their medications.",
    image: "images/Projects/Medco.png",
    link: "https://play.google.com/store/apps/details?id=com.medco",
    tags: ["Flutter", "SQL"],
  },
  {
    title: "Maple: An Ebook Reader",
    description:
      "Choose from millions of best-selling ebooks. It's all free. When finished, find the next one from the genre of your choice. No Ads. No subscription. Take Notes in the Ebook itself. Bookmarks? We got you covered. Dark Mode. Save Books Offline",
    image: "images/Projects/Maple.webp",
    link: "https://play.google.com/store/apps/details?id=com.ebook.maple",
    tags: ["Flutter", "Firebase", "EPub"],
  },
  {
    title: "Informal Eats: A Recipe Discovery App",
    description:
      "Informal eats provide recipes from over 10,000+ blogs for free. Enter the ingredients available with you and we'll show the related recipes.",
    image: "images/Projects/Informal Eats.png",
    link: "https://play.google.com/store/apps/details?id=com.Citrus.recipe_app",
    tags: ["Flutter", "API Integration"],
  },
  {
    title: "Flappy Bird AI with Reinforcement Learning",
    description:
      "A Flappy Bird AI that learns to play by itself. Built by implementing reinforcement Learning",
    image: "images/Projects/falppy bird.gif",
    link: "https://github.com/virajbhartiya/Flappy-Bird-AI",
    tags: ["JavaScript", "Reinforcement Learning", "P5.js"],
  },
];

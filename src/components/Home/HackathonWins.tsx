import { AsciiDivider } from "@/components/ascii";

const hackathonWins = [
  {
    title: "EthIndia 2024",
    project: "ThreeDrive",
    award: "Winner",
    description:
      "Built ThreeDrive, a decentralized storage layer with zk-proof generation on upload. Won Walrus Protocol track by Sui Foundation.",
    year: "2024",
  },
  {
    title: "Unfold 2024",
    project: "OpenFund",
    award: "Winner",
    description:
      "Built OpenFund, a GitHub-integrated bounty protocol to incentivize OSS with crypto. Won 1st prize from 120+ teams; awarded by Nethermind, Okto, and Rabble Tracks.",
    year: "2024",
  },
  {
    title: "Prakalpa 2025",
    project: "Parity Protocol",
    award: "Software Track Winner",
    description:
      "National-level engineering project competition. Presented Parity Protocol, a decentralized compute execution network; awarded best software track project.",
    year: "2025",
  },
  {
    title: "Filecoin Dev Summit Toronto 2025",
    project: "HotVault",
    award: "Demo Showcase",
    description:
      "Demoed HotVault, a PDP-based hot storage client on Filecoin. Showcased fast retrievals, encrypted chunking, and sync pipeline with proof verification.",
    year: "2025",
  },
  {
    title: "Smart India Hackathon 2025",
    project: "Rail Infrastructure Optimization",
    award: "Winner",
    description:
      "Built a rail infrastructure optimization algorithm focused on maximizing train throughput per track section for Ministry of Railways.",
    year: "2025",
  },
];

export const HackathonWins = () => {
  return (
    <section aria-label="Hackathon Achievements" className="mt-24 md:mt-32 px-4">
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-[var(--accent)] text-xs">{">>>"}</span>
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide">
            ACHIEVEMENTS
          </h2>
          <span className="hidden md:inline text-white/20 text-xs flex-1 overflow-hidden whitespace-nowrap">
            {"─".repeat(40)}
          </span>
          <span className="font-mono text-xs text-white/30">
            [{hackathonWins.length.toString().padStart(2, "0")}]
          </span>
        </div>
        <p className="font-mono text-xs text-white/50 max-w-2xl leading-relaxed">
          Hackathon wins and competition achievements
        </p>
      </div>

      <AsciiDivider variant="dashed" className="mb-8" />

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {hackathonWins.map((win, index) => (
          <div
            key={index}
            className="group relative border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:border-[var(--accent)]/30 transition-all duration-300"
          >
            {/* Corner decorations */}
            <span className="absolute -top-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
            <span className="absolute -top-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
            <span className="absolute -bottom-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
            <span className="absolute -bottom-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>

            {/* Index */}
            <div className="absolute top-4 right-4 font-mono text-[10px] text-white/20">
              [{(index + 1).toString().padStart(2, "0")}]
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[var(--accent)]">{win.year}</span>
                  <span className="font-mono text-xs text-white/20">|</span>
                  <span className="font-mono text-xs text-white/40">{win.title}</span>
                </div>
                <h3 className="font-mono text-lg text-white group-hover:text-[var(--accent)] transition-colors">
                  {win.project}
                </h3>
              </div>
            </div>

            {/* Award Badge */}
            <div className="inline-block mb-4">
              <span className="font-mono text-[10px] px-2 py-1 border border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/5">
                {win.award}
              </span>
            </div>

            {/* Description */}
            <p className="font-mono text-xs text-white/50 leading-relaxed">
              {win.description}
            </p>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

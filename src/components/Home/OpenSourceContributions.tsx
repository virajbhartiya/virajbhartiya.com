import { AsciiDivider } from "@/components/ascii";

type Organization = {
  name: string;
  logo: string;
  url: string;
  description: string;
  contributions?: string;
};

const organizations: Organization[] = [
  {
    name: "Blit Labs",
    logo: "https://github.com/theblitlabs.png",
    url: "https://github.com/theblitlabs",
    description: "Trustless Cloudless Distributed Compute Network",
    contributions: "Core Protocol Development",
  },
  {
    name: "Filecoin",
    logo: "https://github.com/filecoin-project.png",
    url: "https://github.com/filecoin-project",
    description: "Decentralized Storage Protocol",
    contributions: "Core Protocol Development",
  },
  {
    name: "FilOzone",
    logo: "https://github.com/FilOzone.png",
    url: "https://github.com/FilOzone",
    description: "Filecoin Proofs Explorer",
    contributions: "PDP Explorer & Frontend",
  },
  {
    name: "Chainsafe",
    logo: "https://github.com/ChainSafe.png",
    url: "https://github.com/ChainSafe",
    description: "Blockchain Infrastructure & Tools",
    contributions: "Forest Client",
  },
  {
    name: "Zed Industries",
    logo: "https://github.com/zed-industries.png",
    url: "https://github.com/zed-industries",
    description: "High-Performance Code Editor",
    contributions: "Core Editor Development",
  },
  {
    name: "Blender",
    logo: "https://github.com/blender.png",
    url: "https://projects.blender.org/blender/blender",
    description: "Free and Open Source 3D Creation Suite",
    contributions: "3D Engine Development",
  },
  {
    name: "Ethereum",
    logo: "https://github.com/ethereum.png",
    url: "https://github.com/ethereum",
    description: "Leading Smart Contract Platform",
    contributions: "Protocol Research",
  },
  {
    name: "Near Protocol",
    logo: "https://github.com/near.png",
    url: "https://github.com/near",
    description: "High-Performance Blockchain",
    contributions: "Protocol Engineering",
  },
  {
    name: "Storacha",
    logo: "https://github.com/storacha.png",
    url: "https://github.com/storacha",
    description: "Decentralized Storage Protocol",
    contributions: "Core Protocol Development",
  },
  {
    name: "Parity Tech",
    logo: "https://github.com/paritytech.png",
    url: "https://github.com/paritytech",
    description: "Substrate & Polkadot Framework",
    contributions: "Runtime Development",
  },
  {
    name: "CCExtractor",
    logo: "https://github.com/CCExtractor.png",
    url: "https://github.com/CCExtractor",
    description: "Open Source Video Tools",
    contributions: "Core Development",
  },
  {
    name: "KJSCE CodeCell",
    logo: "https://github.com/kjsce-codecell.png",
    url: "https://github.com/kjsce-codecell",
    description: "Open Source Community",
    contributions: "Core Development",
  },
];

export function OpenSourceContributions() {
  return (
    <section
      className="mt-24 md:mt-32 px-4"
      aria-label="Open Source Contributions"
    >
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-[var(--accent)] text-xs">{">>>"}</span>
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide">
            OPEN SOURCE
          </h2>
          <span className="hidden md:inline text-white/20 text-xs flex-1 overflow-hidden whitespace-nowrap">
            {"─".repeat(40)}
          </span>
        </div>
        <p className="font-mono text-xs text-white/50 max-w-2xl leading-relaxed">
          Building the decentralized web, one commit at a time
        </p>
      </div>

      <AsciiDivider variant="dashed" className="mb-8" />

      {/* Contributions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((org, index) => (
          <a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative border border-white/10 bg-black/40 backdrop-blur-sm p-4 hover:border-[var(--accent)]/30 transition-all duration-300 card-hover"
          >
            {/* Corner decorations */}
            <span className="absolute -top-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
            <span className="absolute -top-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
            <span className="absolute -bottom-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
            <span className="absolute -bottom-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>

            {/* Index */}
            <div className="absolute top-2 right-2 font-mono text-[8px] text-white/20">
              [{(index + 1).toString().padStart(2, "0")}]
            </div>

            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="relative shrink-0 w-12 h-12 border border-white/10 bg-black/60 overflow-hidden">
                <img
                  src={org.logo}
                  alt={`${org.name} logo`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-[var(--accent)]/0 group-hover:border-[var(--accent)]/30 transition-colors" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-mono text-sm text-white group-hover:text-[var(--accent)] transition-colors truncate">
                    {org.name}
                  </h3>
                  <span className="font-mono text-[var(--accent)] text-xs opacity-0 group-hover:opacity-100 transition-opacity arrow-animate">
                    {"->"}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-white/40 mb-2 line-clamp-1">
                  {org.description}
                </p>
                {org.contributions && (
                  <span className="font-mono text-[10px] text-[var(--accent)]/70">
                    {org.contributions}
                  </span>
                )}
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </a>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 font-mono text-xs text-white/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--accent)]" />
          <span>{organizations.length} ORGANIZATIONS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 border border-[var(--accent)]" />
          <span>BUILDING IN PUBLIC</span>
        </div>
      </div>
    </section>
  );
}

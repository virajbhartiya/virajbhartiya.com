import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, Code2, GitFork } from "lucide-react";

type Organization = {
  name: string;
  logo: string;
  url: string;
  description: string;
  contributions?: string;
};

const organizations: Organization[] = [
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
    name: "Bacalhau",
    logo: "https://github.com/bacalhau-project.png",
    url: "https://github.com/bacalhau-project",
    description: "Decentralized Compute Framework",
    contributions: "Core Systems",
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
    name: "Polkadot EVM",
    logo: "https://github.com/polkadot-evm.png",
    url: "https://github.com/polkadot-evm",
    description: "EVM on Substrate Framework",
    contributions: "Protocol Integration",
  },
  {
    name: "Moonbeam",
    logo: "https://github.com/moonbeam-foundation.png",
    url: "https://github.com/moonbeam-foundation",
    description: "Ethereum-Compatible Network",
    contributions: "Smart Contract Platform",
  },
];

export function OpenSourceContributions() {
  return (
    <section className="relative min-h-screen w-full py-16">
      <div className="absolute -right-4 -top-4 h-32 w-32 rotate-12 bg-[var(--accent)]/10 blur-3xl" />
      <div className="absolute -left-4 bottom-4 h-32 w-32 -rotate-12 bg-[var(--accent)]/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)]/5 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <div className="flex w-full flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <Code2 className="h-14 w-14 text-[var(--accent)]" />
                    <div className="absolute -inset-3 -z-10 animate-pulse rounded-full bg-[var(--accent)]/10 blur-lg" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-6xl font-thin tracking-tighter">
                      <span className="accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/70 bg-clip-text text-transparent proto">
                        OPEN SOURCE
                      </span>
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground/80">
                      Building the decentralized web, one commit at a time
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative border-l-2 border-[var(--accent)] pl-6"
              >
                <div className="absolute -left-[2px] top-0 h-12 w-[2px] animate-pulse bg-[var(--accent)]" />
                <div className="space-y-4">
                  <p className="font-mono text-sm tracking-tight text-muted-foreground/90 flex items-center gap-3">
                    <span className="text-[var(--accent)] font-bold">
                      {">"}
                    </span>
                    Crafting Digital Infrastructure
                  </p>
                  <p className="font-mono text-sm tracking-tight text-muted-foreground/80 flex items-center gap-3">
                    <span className="animate-bounce inline-block text-[var(--accent)]">
                      ↓
                    </span>
                    Building in Public, for the public
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org, index) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative flex h-full flex-col gap-6 rounded-xl border p-6",
                    "border-[var(--accent)]/10 bg-background/50 backdrop-blur-sm transition-all duration-300",
                    "hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.02]",
                    "hover:shadow-[0_0_30px_-12px_var(--accent)]",
                    "hover:scale-[1.02] hover:-translate-y-1",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="relative z-10 h-16 w-16 overflow-hidden rounded-xl border border-[var(--accent)]/20 bg-black/20">
                        <img
                          src={org.logo}
                          alt={`${org.name} logo`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                      </div>
                      <div className="absolute -inset-2 -z-10 animate-pulse rounded-full bg-[var(--accent)]/5 blur-xl transition-all duration-300 group-hover:bg-[var(--accent)]/10" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold tracking-tight proto">
                          {org.name}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                      </div>
                      <p className="text-sm text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground/90">
                        {org.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-3">
                      <GitFork className="h-4 w-4 text-[var(--accent)]" />
                      <span className="text-sm font-medium text-[var(--accent)] transition-all duration-300 group-hover:tracking-wide">
                        {org.contributions}
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

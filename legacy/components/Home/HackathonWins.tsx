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
    <section aria-label="Hackathon Achievements" className="mt-24">
      <h2 className="text-center text-2xl font-thin accent proto mb-16">
        Hackathon Achievements
      </h2>

      <div className="max-w-4xl mx-auto space-y-12">
        {hackathonWins.map((win, index) => (
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={index * 100}
            key={index}
            className="border-l-2 border-[var(--accent)]/30 pl-8 relative"
          >
            <div className="absolute -left-2 top-0 w-4 h-4 bg-[var(--accent)] rounded-full"></div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-thin proto mb-1">{win.title}</h3>
                <h4 className="text-lg accent proto font-normal">
                  {win.project}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-sm accent proto">{win.award}</span>
                <div className="text-xs text-gray-400 mt-1">{win.year}</div>
              </div>
            </div>

            <p className="text-gray-300 font-thin leading-relaxed">
              {win.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

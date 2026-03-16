export interface Experience {
  title: string;
  company: string;
  badge: string;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Guild Member",
    company: "Zed",
    badge: "2026 - Present",
    description: [
      "Accepted into Zed Guild, contributing directly with the core team on real issues for an editor built in the open.",
      "Working on features used by developers worldwide, building on a foundation of open source contribution.",
    ],
  },
  {
    title: "Software Engineer",
    company: "SatsTerminal",
    badge: "2026 - Present",
    description: [
      "Built backend SDK enabling non-custodial borrowing of USDC against BTC collateral.",
      "Worked on AMM-style swap primitives aligned with Canton's institutional-grade DLT used by financial institutions and consortium networks.",
    ],
  },
  {
    title: "Open Source Engineer",
    company: "Protocol Labs",
    badge: "Sept 2024 - Dec 2025",
    description: [
      "Built RPC extensions, proof validation logic, and distributed indexing for Filecoin tooling.",
      "Designed PDP Explorer in Go with fault-tolerant execution.",
      "Extended Synapse SDK to support deal orchestration across TypeScript clients used in production.",
    ],
  },
  {
    title: "Core Team Member",
    company: "GDSC KJSCE",
    badge: "Oct 2024 - Jun 2025",
    description: [
      "Organizing technical events and workshops as part of the Google Developer Student Club.",
    ],
  },
  {
    title: "Web and ML Lead",
    company: "IICPC",
    badge: "May 2024",
    description: [
      "Built the official website for India's largest competitive programming camp, involving 30+ colleges including IITs, NITs, and BITS.",
      "Achieved 70,000+ page views and 15,000+ unique visitors during the Codefest event.",
    ],
  },
  {
    title: "Software Developer",
    company: "MGPEL",
    badge: "Mar 2024 - Present",
    description: [
      "Built a creator and brand platform using React.js, Tailwind CSS, Node.js, with AWS RDS (PostgreSQL) and S3 for storage.",
      "Developed analytics dashboards and personalized storefronts for creator and brand onboarding.",
      "Achieved 19,000+ page views and 7,800+ unique visitors in the first month with a focus on performance and SEO.",
    ],
  },
  {
    title: "Founding Engineer",
    company: "TopClub",
    badge: "Jan 2024 - Sept 2024",
    description: [
      "Architected backend enforcing sub-300ms p95 responses on AWS Lambda.",
      "Built real-time sync for Flutter and React clients with concurrent update handling.",
    ],
  },
  {
    title: "Committee Head",
    company: "KJSCE CodeCell",
    badge: "Nov 2023 - Present",
    description: [
      "Built websites for the Debating Society, Voices of Somaiya Vidyavihar University, and the tech fest KJSCE DevOpia.",
      "Conducted workshops on competitive programming, covering C++ fundamentals and algorithmic problem-solving.",
    ],
  },
];

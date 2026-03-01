export interface Experience {
  title: string;
  company: string;
  badge: string;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Software Engineer",
    company: "SatsTerminal",
    badge: "Jan 2025 - Present",
    description: [
      "Building swap infrastructure on Canton Network for institutional-grade Bitcoin transactions.",
      "Developing the Borrow SDK to enable Bitcoin-backed lending and yield products.",
    ],
  },
  {
    title: "Open Source Engineer",
    company: "Protocol Labs",
    badge: "Oct 2024 - Present",
    description: [
      "Contributing to Lotus, the Go-based reference implementation of the Filecoin decentralized storage network.",
      "Collaborating with ChainSafe on Forest, the Rust implementation of the Filecoin protocol.",
      "Building Ethereum RPC methods to enable seamless interaction between Ethereum developers and Filecoin.",
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
  {
    title: "Core Team Member",
    company: "GDSC KJSCE",
    badge: "Oct 2024 - Present",
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
    company: "TopClub",
    badge: "Feb 2024 - Sept 2024",
    description: [
      "Built the frontend for a fantasy football app using React.js and SCSS, focusing on intuitive UX for team building and player card collection.",
      "Developed backend services in Node.js with scalable APIs for real-time player stats and leaderboard functionality.",
      "Integrated RapidAPI services to fetch live player data and match performance metrics.",
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
];

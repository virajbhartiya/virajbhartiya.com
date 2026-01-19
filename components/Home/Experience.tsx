const experiences = [
  {
    title: "Software Engineer",
    company: "SatsTerminal",
    description: [
      "Building swap infrastructure on Canton Network for institutional-grade Bitcoin transactions.",
      "Developing the Borrow SDK to enable Bitcoin-backed lending and yield products.",
    ],
    badge: "Jan 2025 - Present",
  },
  {
    title: "Open Source Engineer",
    company: "Protocol Labs",
    description: [
      "Contributing to Lotus, the Go-based reference implementation of the Filecoin decentralized storage network.",
      "Collaborating with ChainSafe on Forest, the Rust implementation of the Filecoin protocol.",
      "Building Ethereum RPC methods to enable seamless interaction between Ethereum developers and Filecoin.",
    ],
    badge: "Oct 2024 - Present",
  },
  {
    title: "Committee Head",
    company: "KJSCE CodeCell",
    description: [
      "Built websites for the Debating Society, Voices of Somaiya Vidyavihar University, and the tech fest KJSCE DevOpia.",
      "Conducted workshops on competitive programming, covering C++ fundamentals and algorithmic problem-solving.",
    ],
    badge: "Nov 2023 - Present",
  },
  {
    title: "Core Team Member",
    company: "GDSC KJSCE",
    description: [
      "Organizing technical events and workshops as part of the Google Developer Student Club.",
    ],
    badge: "Oct 2024 - Present",
  },
  {
    title: "Web and ML Lead",
    company: "IICPC",
    description: [
      "Built the official website for India's largest competitive programming camp, involving 30+ colleges including IITs, NITs, and BITS.",
      "Achieved 70,000+ page views and 15,000+ unique visitors during the Codefest event.",
    ],
    badge: "May 2024",
  },
  {
    title: "Software Developer",
    company: "TopClub",
    description: [
      "Built the frontend for a fantasy football app using React.js and SCSS, focusing on intuitive UX for team building and player card collection.",
      "Developed backend services in Node.js with scalable APIs for real-time player stats and leaderboard functionality.",
      "Integrated RapidAPI services to fetch live player data and match performance metrics.",
    ],
    badge: "Feb 2024 - Sept 2024",
  },
  {
    title: "Software Developer",
    company: "MGPEL",
    description: [
      "Built a creator and brand platform using React.js, Tailwind CSS, Node.js, with AWS RDS (PostgreSQL) and S3 for storage.",
      "Developed analytics dashboards and personalized storefronts for creator and brand onboarding.",
      "Achieved 19,000+ page views and 7,800+ unique visitors in the first month with a focus on performance and SEO.",
    ],
    badge: "Mar 2024 - Present",
  },
];

export const Experience = () => {
  return (
    <section aria-label="Professional Experience">
      <h2 className="mt-24 md:mt-auto text-center text-3xl font-light accent proto">
        Experience
      </h2>
      <div className="relative pl-12 mt-8">
        <div className="absolute top-0 left-6 w-1 bg-[var(--accent)] h-full"></div>
        {experiences.map((experience, index) => (
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            key={index}
            className="relative mb-16 flex items-start"
          >
            <div className="flex flex-col md:flex-row gap-8 relative w-full">
              <div className="flex-shrink-0 md:w-1/4">
                <p className="text-2xl font-semibold accent proto">
                  {experience.title}
                </p>
                <p className="text-lg text-gray-400">{experience.company}</p>
              </div>
              <div className="flex-grow md:w-3/4">
                {experience.description.map((desc, descIndex) => (
                  <p key={descIndex} className="text-base text-gray-300 mt-2">
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

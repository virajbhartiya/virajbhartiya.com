import { AsciiDivider } from "@/components/ascii";

const experiences = [
  {
    title: "Open Source Engineer",
    company: "Protocol Labs",
    description: [
      "Contributed to the development of Lotus, the Go-based reference implementation of the Filecoin protocol, a decentralized storage network.",
      "Collaborated with ChainSafe to enhance Forest, the Rust-based implementation of the Filecoin protocol.",
      "Developed Ethereum RPC methods to simplify interactions between Ethereum developers and the Filecoin network.",
    ],
    badge: "Oct 2024 - Present",
  },
  {
    title: "Committee Head",
    company: "KJSCE CodeCell, Mumbai",
    description: [
      "Developed responsive websites for the Debating Society, Voices of Somaiya Vidyavihar University, and the tech fest - KJSCE DevOpia.",
      "Conducted a workshop on competitive programming, teaching participants the basics of C++ and algorithms used in competitive programming.",
    ],
    badge: "Nov 2023 - Present",
  },
  {
    title: "Core Team Member",
    company: "GDSC KJSCE, Mumbai",
    description: [
      "Served as a core team member of the Google Developer Student Club at KJSCE, Mumbai.",
    ],
    badge: "Oct 2024 - Present",
  },
  {
    title: "Web and ML Lead",
    company: "InterCollegiate Informatic and Competitive Programming Camp",
    description: [
      "Designed and developed the official website for the InterCollegiate Informatic and Competitive Programming Camp, India's largest competitive programming camp, involving 30+ colleges, including IITs, NITs, and BITS.",
      "Achieved over 70,000 page views and 15,000+ unique visitors during the event.",
    ],
    badge: "May 2024",
  },
  {
    title: "Software Developer",
    company: "TopClub, New Jersey",
    description: [
      "Engineered the front end with React.js and SCSS, delivering a user interface characterized by innovative UX solutions that significantly elevated user engagement and satisfaction.",
      "Architected and implemented highly robust backend services in Node.js, establishing an ultra-scalable server-side infrastructure and fortifying APIs to ensure peak performance and security.",
      "Integrated cutting-edge third-party services via RapidAPI to retrieve real-time player data, substantially enhancing the app's functionality and user interaction.",
    ],
    badge: "Feb 2024 - Sept 2024",
  },
  {
    title: "Software Developer",
    company: "MGPEL, Mumbai",
    description: [
      "Designed and implemented the backend and frontend infrastructure for the company's website, utilizing React.js and Tailwind CSS for the front end and Node.js for the backend, alongside AWS RDS for PostgreSQL and S3 for storage.",
      "Facilitated creator and brand onboarding, providing analytics, insights, and personalized stores.",
      "Achieved 19,000+ page views and 7,800+ unique visitors within the first month of launch, focusing on accessibility and optimization for performance and SEO.",
    ],
    badge: "Mar 2024 - Present",
  },
];

export const Experience = () => {
  return (
    <section aria-label="Professional Experience" className="mt-24 md:mt-32 px-4">
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-[var(--accent)] text-xs">{">>>"}</span>
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide">
            EXPERIENCE
          </h2>
          <span className="hidden md:inline text-white/20 text-xs flex-1 overflow-hidden whitespace-nowrap">
            {"─".repeat(40)}
          </span>
        </div>
      </div>

      <AsciiDivider variant="dashed" className="mb-8" />

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute left-0 md:left-[200px] top-0 w-px h-16 bg-gradient-to-b from-[var(--accent)] to-transparent" />

        {/* Experience items */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-[200px_1fr] gap-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-[200px] top-2 w-2 h-2 -translate-x-[3px] bg-black border border-[var(--accent)] z-10" />

              {/* Date column */}
              <div className="hidden md:block text-right pr-8">
                <span className="font-mono text-xs text-[var(--accent)]">
                  {experience.badge}
                </span>
              </div>

              {/* Content */}
              <div className="group relative border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:border-[var(--accent)]/30 transition-colors card-hover">
                {/* Corner decorations */}
                <span className="absolute -top-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                <span className="absolute -top-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                <span className="absolute -bottom-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                <span className="absolute -bottom-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>

                {/* Mobile date */}
                <div className="md:hidden font-mono text-xs text-[var(--accent)] mb-2">
                  {experience.badge}
                </div>

                {/* Header */}
                <div className="mb-4">
                  <h3 className="font-mono text-lg text-white">
                    {experience.title}
                  </h3>
                  <p className="font-mono text-sm text-white/40">
                    {experience.company}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  {experience.description.map((desc, descIndex) => (
                    <p key={descIndex} className="font-mono text-xs text-white/60 leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>

                {/* Index marker */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-white/20">
                  [{(index + 1).toString().padStart(2, "0")}]
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

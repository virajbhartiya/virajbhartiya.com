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
    title: "Web Developer",
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

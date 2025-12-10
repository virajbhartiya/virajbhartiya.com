import { Project } from "@/components/Home/Project";
import { projectData } from "@/data/projectData";

export const Projects = () => {
  return (
    <section
      aria-label="Projects Portfolio"
      className="mt-24 space-y-10 md:mt-32"
      id="projects"
    >
      <div className="space-y-4 text-center md:text-left">
        <h2 className="gradient proto text-4xl font-light tracking-tight drop-shadow-[0_8px_20px_rgba(0,239,166,0.35)] md:text-5xl">
          Proof of Work
        </h2>
        <div className="mx-auto h-0.5 w-20 bg-[var(--accent)]/60 md:mx-0" />
        <p className="mx-auto max-w-2xl text-sm text-white/70 md:mx-0 md:text-base">
          Minimal snapshots of shipped things—one design system across stacks,
          surfaces, and problem sets.
        </p>
      </div>

      <div className="space-y-4">
        {projectData.map((project, index) => (
          <Project key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

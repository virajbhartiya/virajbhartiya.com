import { Project } from "@/components/Home/Project";
import { projectData } from "@/data/projectData";
import { AsciiDivider } from "@/components/ascii";

export const Projects = () => {
  return (
    <section
      aria-label="Projects Portfolio"
      className="mt-24 space-y-10 md:mt-32 px-4"
      id="projects"
    >
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-[var(--accent)] text-xs">{">>>"}</span>
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide">
            PROJECTS
          </h2>
          <span className="hidden md:inline text-white/20 text-xs flex-1 overflow-hidden whitespace-nowrap">
            {"─".repeat(40)}
          </span>
          <span className="font-mono text-xs text-white/30">
            [{projectData.length.toString().padStart(2, "0")}]
          </span>
        </div>

        <p className="font-mono text-xs text-white/50 max-w-2xl leading-relaxed">
          Minimal snapshots of shipped things—one design system across stacks, surfaces, and problem sets.
        </p>
      </div>

      <AsciiDivider variant="dashed" />

      {/* Projects Grid */}
      <div className="space-y-3 stagger-fade-in">
        {projectData.map((project, index) => (
          <Project key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

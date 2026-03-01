import { SectionLabel } from "@/components/ui/SectionLabel";
import { FeedRow } from "@/components/ui/FeedRow";
import { projectData } from "@/data/projectData";

export function ProjectsFeed() {
  return (
    <section id="projects" className="mt-24">
      <SectionLabel label="Projects" count={projectData.length} className="mb-6" />
      <div className="border-t border-border/50">
        {/* Column headers */}
        <div className="grid grid-cols-[100px_1fr_auto] gap-4 py-2 px-2 -mx-2">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">
            Name
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60"></span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">
            Tags
          </span>
        </div>
        {projectData.map((project, i) => (
          <FeedRow
            key={i}
            date={String(i + 1).padStart(2, "0")}
            name={project.title}
            tags={project.tags}
            href={project.link}
          />
        ))}
      </div>
    </section>
  );
}

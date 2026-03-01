import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { GenerativeCanvas } from "@/components/canvas/GenerativeCanvas";
import { projectData } from "@/data/projectData";

export function ProjectsFeed() {
  return (
    <section id="projects" className="mt-32">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight">
        Router
        <span className="text-accent ml-3 text-[0.5em] align-top">
          ({projectData.length})
        </span>
      </h2>

      {/* Router-style layout: canvas on left, topics on right */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Left: generative art canvas + links */}
        <div className="hidden md:block">
          <div className="aspect-square border border-border/50 relative">
            <GenerativeCanvas
              config={{ variant: "swirl", seed: 42, color: "#00efa6", speed: 0.3 }}
              className="w-full h-full"
            />
            <span className="absolute bottom-2 left-3 font-mono text-[10px] text-muted uppercase">
              Fig. 1
            </span>
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <a
              href="https://github.com/virajbhartiya"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-accent uppercase tracking-wider hover:text-fg transition-colors"
            >
              ■ View all on Github
            </a>
          </div>
        </div>

        {/* Right: all project topics */}
        <div>
          <SectionLabel label="Topics" className="mb-6" />
          <div className="space-y-6">
            {projectData.map((project, i) => (
              <div key={i} className="border-b border-border/30 pb-5">
                <h3 className="font-mono text-sm text-fg mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-3 max-w-lg">
                  {project.description.length > 120
                    ? project.description.slice(0, 120) + "..."
                    : project.description}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs border border-border px-3 py-1 text-fg hover:bg-fg hover:text-[var(--bg)] transition-colors"
                  >
                    View project
                  </a>
                  <div className="flex gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { IProject } from "@/types/interface";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  project: IProject;
  index: number;
}

export const Project = ({ project, index }: ProjectProps) => {
  const indexLabel = (index + 1).toString().padStart(2, "0");

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <article className="rounded-[24px] border border-white/10 bg-black/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-white/5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="proto text-xs uppercase tracking-[0.4em] text-white/60">
                [{indexLabel}]
              </span>
              <div>
                <p className="proto text-[0.65rem] uppercase tracking-[0.35em] text-white/45">
                  Proof point
                </p>
                <h3 className="mt-1 text-2xl font-light leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>
            <ArrowUpRight className="h-6 w-6 text-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
          <p className="text-sm text-white/70">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-normal proto text-[0.65rem] uppercase tracking-wide"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </a>
  );
};

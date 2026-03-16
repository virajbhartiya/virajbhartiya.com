"use client";

import { useState } from "react";
import { projectData } from "@/data/projectData";
import { AsciiBar } from "@/components/ui/AsciiAnimate";

const TYPES = ["all", "web", "mobile", "cli", "ai/ml", "blockchain", "package", "desktop", "extension"] as const;

function getProjectType(tags: string[]): string {
  if (tags.some((t) => ["Blockchain", "Filecoin", "ETHGlobal"].includes(t))) return "blockchain";
  if (tags.some((t) => ["Machine Learning", "NLP", "Reinforcement Learning", "PyTorch", "OpenCV", "OpenAI", "Stable Diffusion"].includes(t))) return "ai/ml";
  if (tags.some((t) => ["Flutter", "Kotlin"].includes(t))) return "mobile";
  if (tags.includes("CLI")) return "cli";
  if (tags.includes("NPM Package")) return "package";
  if (tags.includes("Electron")) return "desktop";
  if (tags.includes("Chrome Extension")) return "extension";
  return "web";
}

export function ProjectsFeed() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? projectData
    : projectData.filter((p) => getProjectType(p.tags) === filter);

  return (
    <section id="projects" className="mt-20">
      <h2 className="section-heading text-xs text-accent uppercase tracking-widest mb-5">
        projects <span className="text-muted/30 ml-1">({filtered.length})</span>
      </h2>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`text-xs px-2.5 py-1 border transition-all duration-200 ${
              filter === type
                ? "border-accent/40 text-accent bg-accent/5"
                : "border-transparent text-muted/30 hover:text-muted hover:border-border"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((project, i) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group border border-border p-4 block relative"
          >
            <span className="absolute top-2 right-3 text-[10px] text-muted/10 group-hover:text-muted/25 transition-colors select-none" aria-hidden="true">
              #{String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex items-start justify-between gap-3 mb-2 pr-6">
              <span className="text-sm text-fg group-hover:text-accent transition-colors leading-snug">
                {project.title}
              </span>
              <span className="text-[10px] text-accent-blue shrink-0 uppercase mt-0.5">
                {getProjectType(project.tags)}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed line-clamp-2 group-hover:text-muted/80 transition-colors">
              {project.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] text-muted/25 group-hover:text-muted/40 transition-colors">
                    #{tag.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted/10 group-hover:text-accent transition-colors select-none" aria-hidden="true">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="border border-border p-8 text-center">
          <pre className="text-muted/20 text-[10px] mb-3 select-none" aria-hidden="true">{`
  ¯\\_(ツ)_/¯
`}</pre>
          <p className="text-xs text-muted">
            no projects match &ldquo;{filter}&rdquo;
          </p>
          <button
            onClick={() => setFilter("all")}
            className="mt-2 text-xs text-accent hover:text-fg transition-colors"
          >
            clear filter
          </button>
        </div>
      )}

      {/* Stats bar */}
      <div className="mt-4 flex items-center gap-3 text-[10px] text-muted/15 overflow-hidden">
        <AsciiBar width={12} className="text-accent/15 shrink-0" />
        <span className="text-muted/15" aria-hidden="true">
          total:{projectData.length} web:{projectData.filter(p => getProjectType(p.tags) === "web").length} chain:{projectData.filter(p => getProjectType(p.tags) === "blockchain").length} mobile:{projectData.filter(p => getProjectType(p.tags) === "mobile").length} ai:{projectData.filter(p => getProjectType(p.tags) === "ai/ml").length}
        </span>
      </div>
    </section>
  );
}

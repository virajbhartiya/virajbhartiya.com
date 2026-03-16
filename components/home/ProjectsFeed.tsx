"use client";

import { useState } from "react";
import { projectData } from "@/data/projectData";

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
    <section id="projects" className="mt-14">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2 className="text-xs text-accent uppercase tracking-widest">
          projects <span className="text-muted/30">({filtered.length})</span>
        </h2>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`text-xs px-2 py-0.5 border transition-colors ${
              filter === type
                ? "border-accent/40 text-accent"
                : "border-transparent text-muted/30 hover:text-muted hover:border-border"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Project grid — 2-column cards with ASCII borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((project, i) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-border hover:border-accent/20 p-4 transition-colors block"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="text-sm text-fg group-hover:text-accent transition-colors leading-snug">
                {project.title}
              </span>
              <span className="text-[10px] text-accent-blue shrink-0 uppercase mt-0.5">
                {getProjectType(project.tags)}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] text-muted/30">
                  #{tag.toLowerCase().replace(/\s+/g, "-")}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="border border-border p-8 text-center">
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
    </section>
  );
}

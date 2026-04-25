"use client";

import { useState } from "react";
import { projectData } from "@/data/projectData";

const TYPES = [
  "all",
  "systems",
  "web",
  "mobile",
  "cli",
  "ai/ml",
  "blockchain",
  "package",
  "desktop",
  "extension",
] as const;

function getProjectType(tags: string[]): string {
  if (
    tags.some((t) =>
      [
        "Blockchain",
        "Filecoin",
        "ETHGlobal",
        "Bitcoin",
        "Ethereum",
        "HTLC",
      ].includes(t),
    )
  )
    return "blockchain";
  if (
    tags.some((t) =>
      [
        "Machine Learning",
        "NLP",
        "Reinforcement Learning",
        "PyTorch",
        "OpenCV",
        "OpenAI",
        "Stable Diffusion",
      ].includes(t),
    )
  )
    return "ai/ml";
  if (tags.some((t) => ["Flutter", "Kotlin"].includes(t))) return "mobile";
  if (tags.includes("CLI")) return "cli";
  if (tags.includes("NPM Package")) return "package";
  if (tags.includes("Electron")) return "desktop";
  if (tags.includes("Chrome Extension")) return "extension";
  if (tags.some((t) => ["Distributed Systems", "Consensus"].includes(t)))
    return "systems";
  return "web";
}

export function ProjectsFeed() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? projectData
      : projectData.filter((p) => getProjectType(p.tags) === filter);

  return (
    <section
      id="projects"
      className="mt-16 sm:mt-20"
      aria-labelledby="projects-heading"
    >
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2
          id="projects-heading"
          className="section-heading text-xs text-accent uppercase tracking-widest"
        >
          projects
        </h2>
        <span className="text-xs text-muted tabular-nums" aria-live="polite">
          <span className="text-accent">{filtered.length}</span>
          <span className="text-border mx-1" aria-hidden="true">
            /
          </span>
          {projectData.length}
        </span>
      </div>

      {/* Filter bar */}
      <div
        className="flex flex-wrap items-center gap-1 mb-6 text-[13px]"
        role="group"
        aria-label="Filter projects by type"
      >
        {TYPES.map((type) => {
          const active = filter === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              aria-pressed={active}
              className={`px-3 min-h-[44px] inline-flex items-center transition-colors border ${
                active
                  ? "text-[var(--bg)] bg-accent border-accent"
                  : "text-muted hover:text-fg border-transparent hover:border-border"
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Project grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0">
        {filtered.map((project) => (
          <li key={project.title} className="contents">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group border border-border p-5 block relative flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="text-[15px] text-fg group-hover:text-accent transition-colors leading-snug">
                  {project.title}
                </h3>
                <span className="text-[11px] text-accent-blue shrink-0 uppercase tracking-wider">
                  {getProjectType(project.tags)}
                </span>
              </div>
              <div className="relative flex-1">
                <p className="text-[13px] text-fg/75 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-0 w-12 h-[1.6em] bg-gradient-to-l from-[var(--bg)] to-transparent"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-x-2.5 gap-y-1 min-w-0">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[11px] text-muted">
                      #{tag.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                  ))}
                </div>
                <span
                  className="text-sm text-muted group-hover:text-accent transition-colors select-none shrink-0"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="border border-border p-8 text-center">
          <pre
            className="text-muted text-xs mb-3 select-none"
            aria-hidden="true"
          >{`
  ¯\\_(ツ)_/¯
`}</pre>
          <p className="text-sm text-fg/85">
            no projects match &ldquo;{filter}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-2 text-xs text-accent hover:text-fg transition-colors min-h-[44px] inline-flex items-center px-2"
          >
            clear filter
          </button>
        </div>
      )}
    </section>
  );
}

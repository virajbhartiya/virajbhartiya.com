"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { GenerativeCanvas } from "@/components/canvas/GenerativeCanvas";
import { DraggableCard } from "@/components/ui/DraggableCard";
import { projectData } from "@/data/projectData";
import { playClick, playToggle } from "@/lib/audio";

const filterGroups: Record<string, { label: string; matchTags: string[] }[]> = {
  Type: [
    { label: "Web", matchTags: ["React", "TailwindCSS", "Sass", "WebRTC"] },
    { label: "Mobile", matchTags: ["Flutter", "Kotlin"] },
    { label: "CLI", matchTags: ["CLI"] },
    {
      label: "AI/ML",
      matchTags: [
        "Machine Learning",
        "NLP",
        "Reinforcement Learning",
        "PyTorch",
        "OpenCV",
        "OpenAI",
        "Stable Diffusion",
        "PyGame",
      ],
    },
    { label: "Blockchain", matchTags: ["Blockchain", "Filecoin", "ETHGlobal"] },
    { label: "Package", matchTags: ["NPM Package"] },
    { label: "Desktop", matchTags: ["Electron"] },
    { label: "Extension", matchTags: ["Chrome Extension"] },
  ],
  Topic: [
    { label: "React", matchTags: ["React"] },
    { label: "Flutter", matchTags: ["Flutter"] },
    { label: "Rust", matchTags: ["Rust"] },
    { label: "Python", matchTags: ["Python"] },
    { label: "TypeScript", matchTags: ["TypeScript", "Typescript"] },
    { label: "Firebase", matchTags: ["Firebase"] },
    { label: "Node.js", matchTags: ["Node.js"] },
    { label: "PostgreSQL", matchTags: ["PostgreSQL", "pgvector"] },
  ],
};

function getProjectType(tags: string[]): string {
  if (tags.some((t) => ["Blockchain", "Filecoin", "ETHGlobal"].includes(t)))
    return "BLOCKCHAIN";
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
    return "AI/ML";
  if (tags.some((t) => ["Flutter", "Kotlin"].includes(t))) return "MOBILE";
  if (tags.includes("CLI")) return "CLI";
  if (tags.includes("NPM Package")) return "PACKAGE";
  if (tags.includes("Electron")) return "DESKTOP";
  if (tags.includes("Chrome Extension")) return "EXTENSION";
  return "WEB";
}

export function ProjectsFeed() {
  const [activeFilters, setActiveFilters] = useState<
    Record<string, Set<string>>
  >({});
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = Object.values(activeFilters).some(
    (s) => s.size > 0,
  );

  const filteredProjects = projectData.filter((project) => {
    if (!hasActiveFilters) return true;
    for (const [category, selectedLabels] of Object.entries(activeFilters)) {
      if (selectedLabels.size === 0) continue;
      const group = filterGroups[category];
      const matches = Array.from(selectedLabels).some((label) => {
        const filter = group.find((f) => f.label === label);
        return filter?.matchTags.some((t) => project.tags.includes(t));
      });
      if (!matches) return false;
    }
    return true;
  });

  const toggleFilter = (category: string, label: string) => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      const set = new Set(prev[category] || []);
      const isOn = !set.has(label);
      if (isOn) set.add(label);
      else set.delete(label);
      next[category] = set;
      playToggle(isOn);
      return next;
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    playClick();
  };

  const groupEntries = Object.entries(filterGroups);

  return (
    <section id="projects" className="mt-10">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight">
        Feed
        <span className="text-accent ml-3 text-[0.5em] align-top">
          ({filteredProjects.length})
        </span>
      </h2>

      {/* Mobile filter toggle */}
      <div className="md:hidden mt-4 flex items-center gap-3">
        <button
          onClick={() => { setShowFilters(!showFilters); playClick(); }}
          className="font-mono text-xs text-accent uppercase tracking-wider border border-accent/30 px-3 py-1.5"
        >
          {showFilters ? "Hide Filters" : "Filters"}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="font-mono text-xs text-muted uppercase tracking-wider hover:text-fg transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Mobile filters — collapsible */}
      {showFilters && (
        <div className="md:hidden mt-3 flex flex-wrap gap-2">
          {groupEntries.map(([category, filters]) =>
            filters.map((filter) => {
              const isActive = activeFilters[category]?.has(filter.label);
              return (
                <button
                  key={`${category}-${filter.label}`}
                  onClick={() => toggleFilter(category, filter.label)}
                  className={`font-mono text-xs px-2 py-1 border transition-colors ${
                    isActive
                      ? "border-accent text-accent"
                      : "border-border/50 text-muted/60"
                  }`}
                >
                  {filter.label}
                </button>
              );
            }),
          )}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Left: Filter tree sidebar — desktop only */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel label="Filter" />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="font-mono text-xs text-accent uppercase tracking-wider hover:text-fg transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tree structure */}
          <div className="font-mono text-xs">
            {groupEntries.map(([category, filters], groupIdx) => {
              const isLastGroup = groupIdx === groupEntries.length - 1;
              const activeCount = filters.filter((f) =>
                activeFilters[category]?.has(f.label),
              ).length;

              return (
                <div key={category}>
                  {/* Category root node */}
                  <div className="flex items-center gap-1 py-1 text-muted">
                    <span className="select-none w-4 text-center text-border">
                      {isLastGroup ? "\u2514" : "\u251C"}
                    </span>
                    <span className="select-none text-border">{"\u2500"}</span>
                    <span className="uppercase tracking-widest text-xs text-muted/60">
                      {category}
                    </span>
                    {activeCount > 0 && (
                      <span className="text-accent text-xs">
                        [{activeCount}]
                      </span>
                    )}
                  </div>

                  {/* Filter leaf nodes */}
                  {filters.map((filter, filterIdx) => {
                    const isActive = activeFilters[category]?.has(filter.label);
                    const isLastFilter = filterIdx === filters.length - 1;
                    const count = projectData.filter((p) =>
                      filter.matchTags.some((t) => p.tags.includes(t)),
                    ).length;

                    return (
                      <button
                        key={filter.label}
                        onClick={() => toggleFilter(category, filter.label)}
                        className="flex items-center gap-1 py-0.5 w-full text-left group"
                      >
                        {/* Vertical line from parent */}
                        <span className="select-none w-4 text-center text-border">
                          {isLastGroup ? " " : "\u2502"}
                        </span>
                        {/* Branch connector */}
                        <span className="select-none w-4 text-center text-border">
                          {isLastFilter ? "\u2514" : "\u251C"}
                        </span>
                        <span className="select-none text-border">
                          {"\u2500"}
                        </span>
                        {/* Checkbox */}
                        <span
                          className={`w-3 h-3 border flex items-center justify-center text-[7px] transition-colors ${
                            isActive
                              ? "border-accent bg-accent text-black"
                              : "border-border group-hover:border-muted"
                          }`}
                        >
                          {isActive && "\u25A0"}
                        </span>
                        {/* Label */}
                        <span
                          className={`ml-1 transition-colors ${
                            isActive
                              ? "text-accent"
                              : "text-muted group-hover:text-fg"
                          }`}
                        >
                          {filter.label}
                        </span>
                        {/* Count */}
                        <span className="text-xs text-muted/30 ml-auto">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Small canvas */}
          <DraggableCard className="mt-5">
            <div className="aspect-square border border-border/50 relative bg-[var(--bg)]">
              <GenerativeCanvas
                config={{
                  variant: "swirl",
                  seed: 42,
                  color: "#00efa6",
                  speed: 0.3,
                }}
                className="w-full h-full"
              />
              <span className="absolute bottom-2 left-3 font-mono text-[10px] text-muted uppercase">
                Fig. 3
              </span>
            </div>
          </DraggableCard>
        </div>

        {/* Right: Feed table */}
        <div>
          <div className="border-t border-border/50">
            <div className="grid grid-cols-[40px_1fr] sm:grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_auto] gap-4 py-2 px-2 -mx-2">
              <span className="font-mono text-xs tracking-widest uppercase text-muted/60">
                /Idx
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-muted/60">
                /Name
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-muted/60 hidden sm:block">
                /Type
              </span>
            </div>

            {filteredProjects.map((project, i) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="group grid grid-cols-[40px_1fr] sm:grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_auto] items-center gap-4 py-3 px-2 -mx-2 border-b border-border/50 hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-mono text-xs text-muted">
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm text-fg group-hover:text-accent transition-colors truncate">
                  {project.title}
                </span>
                <div className="hidden sm:flex items-center gap-2">
                  <Tag
                    label={getProjectType(project.tags)}
                    className="border-transparent text-accent"
                  />
                </div>
              </a>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-mono text-sm text-muted">
                No projects match the selected filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-3 font-mono text-xs text-accent hover:text-fg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

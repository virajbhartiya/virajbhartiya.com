"use client";

import { useId, useState } from "react";
import { experienceData } from "@/data/experienceData";

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section
      id="experience"
      className="mt-16 sm:mt-20"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2
          id={`${baseId}-heading`}
          className="section-heading text-xs text-accent uppercase tracking-widest"
        >
          experience
        </h2>
        <span className="text-xs text-muted tabular-nums">
          <span className="text-accent">{experienceData.length}</span>
          <span className="text-border mx-1.5" aria-hidden="true">
            ·
          </span>
          roles
        </span>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 sm:pl-7">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

        {experienceData.map((exp, i) => {
          const isOpen = openIndex === i;
          const panelId = `${baseId}-panel-${i}`;
          const buttonId = `${baseId}-button-${i}`;

          return (
            <div key={i} className="relative pb-5 last:pb-0">
              {/* Node dot */}
              <div
                className={`absolute -left-6 sm:-left-7 top-[6px] w-[15px] h-[15px] flex items-center justify-center text-[10px] leading-none bg-[var(--bg)] transition-colors duration-300 ${
                  isOpen ? "text-accent timeline-node-active" : "text-muted"
                }`}
                aria-hidden="true"
              >
                {isOpen ? "◆" : "◇"}
              </div>

              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full text-left group block py-1.5"
              >
                {/* Top row: company + role */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-[15px] sm:text-base text-fg group-hover:text-accent transition-colors min-w-0 break-words">
                    {exp.company}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-accent-blue uppercase tracking-[0.18em] shrink-0">
                    {exp.title}
                  </span>
                </div>

                {/* Bottom row: collapsed preview / expand affordance */}
                <div className="flex items-baseline gap-3 mt-1.5 text-[13px] text-muted">
                  {!isOpen && (
                    <p className="leading-relaxed line-clamp-1 min-w-0 flex-1">
                      <span
                        className="text-accent/60 mr-1.5"
                        aria-hidden="true"
                      >
                        ›
                      </span>
                      {exp.description[0]}
                    </p>
                  )}
                  <span
                    className={`shrink-0 ml-auto text-[11px] uppercase tracking-widest flex items-center gap-1.5 transition-colors ${
                      isOpen
                        ? "text-accent"
                        : "text-muted/80 group-hover:text-fg"
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? "less" : "more"}
                    <span
                      className={`text-[12px] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </span>
                </div>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                {...(!isOpen ? { inert: true } : {})}
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="mt-3 pt-3 border-t border-border/60 space-y-2.5">
                    {exp.description.map((line, j) => (
                      <p
                        key={j}
                        className="text-[13px] sm:text-[14px] text-fg/85 leading-relaxed flex gap-2"
                      >
                        <span
                          className="text-accent/70 select-none shrink-0"
                          aria-hidden="true"
                        >
                          ›
                        </span>
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

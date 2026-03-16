"use client";

import { useState } from "react";
import { experienceData } from "@/data/experienceData";
import { opensourceData } from "@/data/opensourceData";

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="mt-14">
      <h2 className="text-xs text-accent uppercase tracking-widest mb-5">
        experience
      </h2>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />

        {experienceData.map((exp, i) => {
          const isOpen = openIndex === i;
          const isLast = i === experienceData.length - 1;

          return (
            <div key={i} className={`relative ${isLast ? "" : "pb-4"}`}>
              {/* Node dot */}
              <div
                className={`absolute -left-6 top-[6px] w-[15px] h-[15px] flex items-center justify-center text-[8px] leading-none ${
                  isOpen ? "text-accent" : "text-muted/40"
                }`}
              >
                {isOpen ? "◆" : "◇"}
              </div>

              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left group"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="text-sm text-fg group-hover:text-accent transition-colors shrink-0">
                      {exp.company}
                    </span>
                    <span className="text-xs text-muted/50 truncate hidden sm:inline">
                      {exp.title}
                    </span>
                  </div>
                  <span className="text-xs text-accent-blue shrink-0 hidden sm:inline">
                    {exp.badge}
                  </span>
                </div>
              </button>

              {/* Mobile title */}
              <div className="sm:hidden text-xs text-muted/50 mt-0.5">
                {exp.title}
              </div>

              {/* Expandable description */}
              <div
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="mt-2 space-y-1">
                    {exp.description.map((line, j) => (
                      <p key={j} className="text-xs text-muted leading-relaxed">
                        <span className="text-border select-none mr-2">›</span>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Open Source — inline badges */}
      <div className="mt-10 border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-accent-blue">&#9632;</span>
          <span className="text-xs text-muted uppercase tracking-widest">
            open source
          </span>
          <span className="text-xs text-muted/30">
            {opensourceData.length} organizations
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {opensourceData.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted border border-border px-2 py-0.5 hover:text-accent-blue hover:border-accent-blue/30 transition-colors"
            >
              {org.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

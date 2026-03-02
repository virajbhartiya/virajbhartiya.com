"use client";

import { useState } from "react";
import { experienceData } from "@/data/experienceData";
import { opensourceData } from "@/data/opensourceData";

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="mt-10">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight mb-6">
        Experience
        <span className="text-accent ml-3 text-[0.5em] align-top">
          ({experienceData.length})
        </span>
      </h2>

      <div>
        {experienceData.map((exp, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i} className="border-t border-border/50 last:border-b">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-4 text-left group"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-pixel text-[clamp(0.85rem,2.5vw,1.5rem)] text-fg leading-none shrink-0 group-hover:text-accent transition-colors">
                    {exp.company}
                  </span>
                  <span className="font-mono text-xs text-muted truncate hidden sm:inline">
                    {exp.title}
                  </span>
                </div>
                <span className="font-mono text-xs text-accent/50 shrink-0 select-none">
                  {isOpen ? "▾" : "▸"}
                </span>
              </button>

              {/* Mobile: show title below company */}
              <span className="font-mono text-xs text-muted sm:hidden block -mt-2 mb-2 pl-0.5">
                {exp.title}
              </span>

              {/* Expandable content */}
              <div
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div className="pb-4">
                    {exp.description.map((line, j) => (
                      <p
                        key={j}
                        className="font-mono text-xs text-muted leading-relaxed mt-1 max-w-2xl"
                      >
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

      {/* Open Source */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent/40">
            Open Source · {opensourceData.length} organizations
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {opensourceData.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              {org.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

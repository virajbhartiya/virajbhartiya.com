import { experienceData } from "@/data/experienceData";
import { opensourceData } from "@/data/opensourceData";

export function Experience() {
  return (
    <section id="experience" className="mt-10">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight mb-6">
        Experience
        <span className="text-accent ml-3 text-[0.5em] align-top">
          ({experienceData.length})
        </span>
      </h2>

      <div className="relative pl-4 md:pl-6">
        {/* Vertical timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/20" />

        {experienceData.map((exp, i) => (
          <div key={i} className="relative">
            {/* Timeline dot */}
            <div
              className="absolute -left-4 md:-left-6 top-4 w-2 h-2 border border-accent/50 bg-[var(--bg)]"
              style={{ transform: "translateX(-50%) rotate(45deg)" }}
            />

            {/* Content */}
            <div className="py-3 border-b border-border/30">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-fg">
                  {exp.title}
                </span>
                <span className="font-mono text-xs text-accent shrink-0">
                  {exp.company}
                </span>
              </div>
              <span className="font-mono text-xs text-accent/30 mt-0.5 block">
                {exp.badge}
              </span>
              <p className="font-mono text-xs text-muted leading-relaxed mt-1.5 max-w-xl">
                <span className="text-accent/40 select-none mr-1.5">
                  {">_"}
                </span>
                {exp.description[0]}
              </p>
            </div>
          </div>
        ))}
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

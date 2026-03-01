import { SectionLabel } from "@/components/ui/SectionLabel";
import { experienceData } from "@/data/experienceData";

export function Experience() {
  return (
    <section id="experience" className="mt-32">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight mb-2">
        Experience
      </h2>

      <div className="mt-8">
        <SectionLabel label="Roles" count={experienceData.length} className="mb-4" />

        {/* Column headers */}
        <div className="border-t border-border/50">
          <div className="grid grid-cols-[140px_1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 py-2 px-2 -mx-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">
              Date
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">
              Role
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60 hidden md:block">
              Company
            </span>
          </div>

          {experienceData.map((exp, i) => (
            <div
              key={i}
              className="group grid grid-cols-[140px_1fr_auto] md:grid-cols-[180px_1fr_auto] items-start gap-4 py-3 px-2 -mx-2 border-b border-border/50 hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-mono text-xs text-muted">{exp.badge}</span>
              <div>
                <span className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                  {exp.title}
                </span>
                <span className="font-mono text-xs text-muted md:hidden ml-2">
                  @ {exp.company}
                </span>
              </div>
              <span className="font-mono text-xs text-accent hidden md:block">
                {exp.company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

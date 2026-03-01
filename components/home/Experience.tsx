import { SectionLabel } from "@/components/ui/SectionLabel";
import { experienceData } from "@/data/experienceData";

export function Experience() {
  return (
    <section id="experience" className="mt-24">
      <SectionLabel label="Experience" className="mb-8" />
      <div className="space-y-6">
        {experienceData.map((exp, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-4 border-b border-border/30"
          >
            <div className="font-mono text-xs text-muted">{exp.badge}</div>
            <div>
              <h3 className="font-mono text-sm text-fg">{exp.title}</h3>
              <p className="font-mono text-xs text-accent mt-0.5">
                {exp.company}
              </p>
              <ul className="mt-2 space-y-1">
                {exp.description.map((item, j) => (
                  <li key={j} className="text-xs text-muted leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

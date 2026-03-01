import { opensourceData } from "@/data/opensourceData";

export function OpenSource() {
  return (
    <section id="opensource" className="mt-14">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight mb-6">
        Open Source
      </h2>

      <div className="flex flex-wrap gap-2">
        {opensourceData.map((org) => (
          <a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-3 py-1.5 border border-border/50 text-muted/60 hover:text-accent hover:border-accent/40 transition-colors"
          >
            {org.name}
          </a>
        ))}
      </div>
    </section>
  );
}

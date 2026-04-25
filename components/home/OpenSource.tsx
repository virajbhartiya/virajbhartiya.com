"use client";

import { opensourceData } from "@/data/opensourceData";
import { AsciiCycle, AsciiScramble } from "@/components/ui/AsciiAnimate";

export function OpenSource() {
  return (
    <section id="opensource" className="mt-16 sm:mt-20">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2 className="section-heading text-xs text-accent uppercase tracking-widest">
          open source
        </h2>
        <div className="flex items-center gap-2 text-xs text-muted">
          <AsciiCycle
            chars={["◆", "◇", "◈"]}
            interval={700}
            className="text-accent-blue text-sm"
          />
          <span className="tabular-nums">
            <span className="text-accent-blue">{opensourceData.length}</span>
            <span className="text-border mx-1.5">·</span>
            organizations
          </span>
        </div>
      </div>

      {/* Banner strip — categorical tags from the actual contribution data */}
      <div className="relative border border-accent-blue/25 p-4 sm:p-6 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.04] via-transparent to-accent/[0.02] pointer-events-none" />
        <span className="absolute top-1 left-1.5 text-accent-blue/50 text-[10px] select-none">
          ╔
        </span>
        <span className="absolute top-1 right-1.5 text-accent-blue/50 text-[10px] select-none">
          ╗
        </span>
        <span className="absolute bottom-1 left-1.5 text-accent-blue/50 text-[10px] select-none">
          ╚
        </span>
        <span className="absolute bottom-1 right-1.5 text-accent-blue/50 text-[10px] select-none">
          ╝
        </span>

        <div className="relative flex items-center justify-between gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-accent-blue mb-3">
              <AsciiCycle chars={["▸", "▹"]} interval={600} />
              <AsciiScramble text="CONTRIBUTING TO" speed={45} delay={100} />
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-[13px] text-fg/80">
              <span>core protocols</span>
              <span className="text-border">·</span>
              <span>editors</span>
              <span className="text-border">·</span>
              <span>runtimes</span>
              <span className="text-border">·</span>
              <span>blockchain clients</span>
              <span className="text-border">·</span>
              <span>3D engines</span>
              <span className="text-border">·</span>
              <span>dev tooling</span>
            </div>
          </div>
          <pre
            className="hidden md:block text-accent-blue/25 text-[9px] leading-[1.1] select-none shrink-0"
            aria-hidden="true"
          >{`   /\\
  /  \\
 /----\\
/      \\
\\      /
 \\----/
  \\  /
   \\/`}</pre>
        </div>
      </div>

      {/* Org cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {opensourceData.map((org, i) => (
          <a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-border p-4 relative hover:border-accent-blue/40 hover:bg-accent-blue/[0.02] transition-colors"
          >
            <span className="absolute top-2 right-3 text-[10px] text-muted group-hover:text-accent-blue transition-colors tabular-nums select-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex items-baseline justify-between gap-2 mb-1.5 pr-7">
              <h3 className="text-[15px] text-fg group-hover:text-accent-blue transition-colors leading-tight break-words min-w-0">
                {org.name}
              </h3>
            </div>
            <p className="text-[13px] text-fg/65 leading-relaxed">
              {org.contribution}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted min-w-0">
              <span className="text-accent-blue/40 select-none shrink-0">
                └&gt;
              </span>
              <span className="truncate">
                {org.url.replace("https://github.com/", "github.com/")}
              </span>
              <span className="ml-auto text-muted group-hover:text-accent-blue transition-colors select-none">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

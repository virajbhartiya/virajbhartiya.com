"use client";

import dynamic from "next/dynamic";
import { AsciiCycle } from "@/components/ui/AsciiAnimate";

const AsciiSketch = dynamic(
  () => import("@/components/canvas/AsciiSketch").then((m) => m.AsciiSketch),
  { ssr: false },
);

export function Hero() {
  return (
    <section className="pt-10 sm:pt-14 pb-6">
      {/* ASCII animation — taller, more immersive */}
      <div className="relative border border-border mb-8 overflow-hidden">
        <span className="absolute top-2 left-3 text-[10px] text-muted/20 select-none z-10">fig.00</span>
        <div className="absolute top-2 right-3 flex items-center gap-1.5 z-10">
          <AsciiCycle chars={["●", "○"]} interval={1000} className="text-[8px] text-accent" />
          <span className="text-[10px] text-accent/30 select-none">LIVE</span>
        </div>
        <AsciiSketch className="w-full h-[220px] sm:h-[280px]" />
        {/* Overlay with name */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl text-fg leading-none tracking-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.95)]">
              Viraj Bhartiya
            </h1>
            <p className="text-xs sm:text-sm text-accent mt-2 tracking-widest uppercase drop-shadow-[0_0_15px_rgba(0,0,0,0.95)]">
              software engineer
            </p>
          </div>
        </div>
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <p className="text-sm text-muted leading-relaxed">
          I enjoy creating things that live on the internet. What started as a
          pastime in my summer vacations has now turned into my life.
          I build weird, wonderful things that make people go &ldquo;wow&rdquo;.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Self-taught developer. I can help you build websites, apps, or basically
          anything that runs on silicon.
        </p>
      </div>

      {/* Links */}
      <div className="mt-6 flex items-center gap-2 text-xs text-muted">
        <AsciiCycle chars={["$", ">", "#", "%"]} interval={2000} className="text-accent" />
        <span className="select-none">find me at</span>
        <span className="text-border select-none">|</span>
        <a href="https://github.com/virajbhartiya" target="_blank" rel="noopener noreferrer" className="link-glow text-fg hover:text-accent transition-colors">github</a>
        <span className="text-border select-none">&middot;</span>
        <a href="https://www.linkedin.com/in/viraj-bhartiya/" target="_blank" rel="noopener noreferrer" className="link-glow text-fg hover:text-accent transition-colors">linkedin</a>
        <span className="text-border select-none">&middot;</span>
        <a href="https://twitter.com/heyxviraj" target="_blank" rel="noopener noreferrer" className="link-glow text-fg hover:text-accent transition-colors">twitter</a>
        <span className="text-border select-none">&middot;</span>
        <a href="/Viraj_Bhartiya.pdf" target="_blank" className="link-glow text-accent hover:text-fg transition-colors">resume</a>
      </div>
    </section>
  );
}

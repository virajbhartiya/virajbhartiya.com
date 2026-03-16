"use client";

import { AsciiCycle } from "@/components/ui/AsciiAnimate";

export function Footer() {
  return (
    <footer className="mt-24 mb-6 max-w-5xl mx-auto px-4 sm:px-6">
      <pre className="text-border/20 text-[10px] leading-none overflow-hidden mb-8 select-none" aria-hidden="true">
        {`+${"─".repeat(80)}+`}
      </pre>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AsciiCycle
              chars={["■", "□", "▪", "▫"]}
              interval={1500}
              className="text-accent text-lg leading-none"
            />
            <span className="text-xs text-fg">Viraj Bhartiya</span>
          </div>
          <p className="text-xs text-muted/35 max-w-sm leading-relaxed">
            Building software at the intersection of systems engineering and applied research.
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted">
            <a href="mailto:vlbhartiya@gmail.com" className="link-glow hover:text-fg transition-colors">vlbhartiya@gmail.com</a>
            <a href="https://github.com/virajbhartiya" target="_blank" rel="noopener noreferrer" className="link-glow hover:text-fg transition-colors">github</a>
            <a href="https://www.linkedin.com/in/viraj-bhartiya/" target="_blank" rel="noopener noreferrer" className="link-glow hover:text-fg transition-colors">linkedin</a>
            <a href="https://twitter.com/heyxviraj" target="_blank" rel="noopener noreferrer" className="link-glow hover:text-fg transition-colors">twitter</a>
          </div>
        </div>

        <pre className="text-muted/8 text-[9px] leading-tight select-none hidden sm:block" aria-hidden="true">{`
    *  .  *
  .    *    .
    .  *  .
  *    .    *
    .  *  .`}</pre>
      </div>

      <div className="mt-8 flex items-center justify-between text-[10px] text-muted/15">
        <span>&copy; {new Date().getFullYear()}</span>
        <AsciiCycle
          chars={["EOF", "···", "EOF", " · "]}
          interval={2000}
          className="text-muted/15 hidden sm:inline"
        />
      </div>
    </footer>
  );
}

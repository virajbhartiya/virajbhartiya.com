"use client";

import { AsciiCycle } from "@/components/ui/AsciiAnimate";

export function Footer() {
  return (
    <footer className="mt-24 mb-8 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="border-t border-border pt-8">
        <div className="flex items-center gap-2 mb-3">
          <AsciiCycle
            chars={["■", "□", "▪", "▫"]}
            interval={1500}
            className="text-accent text-sm leading-none"
          />
          <span className="text-sm text-fg">Viraj Bhartiya</span>
        </div>
        <p className="text-xs text-fg/60 max-w-md leading-relaxed">
          Building software at the intersection of systems engineering and applied research.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-muted">
          <a href="mailto:vlbhartiya@gmail.com" className="link-glow hover:text-fg transition-colors">vlbhartiya@gmail.com</a>
          <span className="text-border select-none">·</span>
          <a href="https://github.com/virajbhartiya" target="_blank" rel="noopener noreferrer" className="link-glow hover:text-fg transition-colors">github</a>
          <span className="text-border select-none">·</span>
          <a href="https://www.linkedin.com/in/viraj-bhartiya/" target="_blank" rel="noopener noreferrer" className="link-glow hover:text-fg transition-colors">linkedin</a>
          <span className="text-border select-none">·</span>
          <a href="https://twitter.com/heyxviraj" target="_blank" rel="noopener noreferrer" className="link-glow hover:text-fg transition-colors">twitter</a>
        </div>

        <div className="mt-8 flex items-center justify-between text-[10px] text-muted">
          <span className="tabular-nums">&copy; {new Date().getFullYear()}</span>
          <AsciiCycle
            chars={["EOF", "···", "EOF", " · "]}
            interval={2000}
            className="hidden sm:inline"
          />
        </div>
      </div>
    </footer>
  );
}

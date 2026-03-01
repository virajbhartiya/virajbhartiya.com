import { SectionLabel } from "@/components/ui/SectionLabel";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 overflow-hidden">
        <div className="font-pixel text-[clamp(3rem,10vw,8rem)] text-[var(--border)] leading-none select-none opacity-60">
          DEVELOPER
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <SectionLabel label="Docs" className="mb-3" />
          <a href="/Viraj_Bhartiya.pdf" target="_blank" className="block font-mono text-xs text-muted hover:text-fg transition-colors">
            Resume
          </a>
        </div>
        <div>
          <SectionLabel label="Social" className="mb-3" />
          <div className="space-y-1.5">
            {[
              ["Github", "https://github.com/virajbhartiya"],
              ["LinkedIn", "https://www.linkedin.com/in/viraj-bhartiya/"],
              ["Twitter", "https://twitter.com/heyxviraj"],
              ["YouTube", "https://www.youtube.com/@virajbhartiya"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block font-mono text-xs text-muted hover:text-fg transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Resources" className="mb-3" />
          <div className="space-y-1.5">
            <a href="/blog" className="block font-mono text-xs text-muted hover:text-fg transition-colors">Blog</a>
            <a href="/#projects" className="block font-mono text-xs text-muted hover:text-fg transition-colors">Projects</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-8 flex justify-between items-center">
        <span className="font-mono text-[10px] text-muted">
          © {new Date().getFullYear()} Viraj Bhartiya
        </span>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/10 bg-black/60 backdrop-blur-sm">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Branding */}
          <div className="space-y-4">
            <div className="font-mono text-sm hover-bracket-bounce">
              <span className="text-[var(--accent)] bracket-left">[</span>
              <span className="text-white text-shimmer">VIRAJ BHARTIYA</span>
              <span className="text-[var(--accent)] bracket-right">]</span>
            </div>
            <p className="font-mono text-xs text-white/40 leading-relaxed">
              Blockchain Developer & Full-Stack Engineer<br />
              Building the decentralized future
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-white/30">QUICK LINKS</div>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <Link to="/" className="text-white/60 hover:text-[var(--accent)] transition-colors underline-grow">
                Home
              </Link>
              <Link to="/blog" className="text-white/60 hover:text-[var(--accent)] transition-colors underline-grow">
                Blog
              </Link>
              <a href="/Viraj_Bhartiya.pdf" target="_blank" className="text-white/60 hover:text-[var(--accent)] transition-colors underline-grow">
                Resume
              </a>
              <a href="mailto:virajbhartiya@gmail.com" className="text-white/60 hover:text-[var(--accent)] transition-colors underline-grow">
                Contact
              </a>
            </div>
          </div>

          {/* Right - Status */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-white/30">STATUS</div>
            <div className="font-mono text-xs space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                <span className="w-2 h-2 bg-[var(--accent)] animate-status-pulse" />
                <span>Available for work</span>
              </div>
              <div className="text-white/40 hover-glitch">
                Mumbai, India
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/30">
            <div className="flex items-center gap-2">
              <span>{"─".repeat(10)}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Crafted with code</span>
              <span>|</span>
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{"─".repeat(10)}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

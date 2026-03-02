export function Footer() {
  return (
    <footer className="mt-20 font-mono">
      {/* ASCII top border */}
      <div className="max-w-6xl mx-auto px-4">
        <pre className="text-border text-xs leading-none select-none overflow-hidden" aria-hidden="true">
{`┌${"─".repeat(120)}┐`}
        </pre>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Main three-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col gap-3">
            <a href="/" className="text-accent text-2xl leading-none w-fit">
              ■
            </a>
            <p className="text-muted text-xs leading-relaxed max-w-[240px]">
              Building software that sits at the intersection of systems
              engineering and applied research.
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="text-fg text-xs uppercase tracking-widest">
              Quick Links
            </span>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="/blog"
                className="text-muted hover:text-accent transition-colors w-fit"
              >
                Blog
              </a>
              <a
                href="/#projects"
                className="text-muted hover:text-accent transition-colors w-fit"
              >
                Projects
              </a>
              <a
                href="/Viraj_Bhartiya.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors w-fit"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Right: Social */}
          <div className="flex flex-col gap-3">
            <span className="text-fg text-xs uppercase tracking-widest">
              Social
            </span>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="https://github.com/virajbhartiya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors w-fit"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/viraj-bhartiya/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors w-fit"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/heyxviraj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors w-fit"
              >
                Twitter
              </a>
              <a
                href="https://www.youtube.com/@virajbhartiya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors w-fit"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8">
          <pre className="text-border text-xs leading-none select-none overflow-hidden" aria-hidden="true">
{`├${"─".repeat(120)}┤`}
          </pre>
        </div>

        {/* Bottom row: email + copyright */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs">
          <a
            href="mailto:vlbhartiya@gmail.com"
            className="text-muted hover:text-accent transition-colors"
          >
            vlbhartiya@gmail.com
          </a>
          <span className="text-muted/40">
            &copy; {new Date().getFullYear()} Viraj Bhartiya
          </span>
        </div>
      </div>

      {/* ASCII bottom border */}
      <div className="max-w-6xl mx-auto px-4">
        <pre className="text-border text-xs leading-none select-none overflow-hidden" aria-hidden="true">
{`└${"─".repeat(120)}┘`}
        </pre>
      </div>

      <div className="h-4" />
    </footer>
  );
}

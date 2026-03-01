export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: links */}
        <nav className="flex items-center gap-3 sm:gap-4 flex-wrap font-mono text-xs text-muted">
          <a
            href="https://github.com/virajbhartiya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/viraj-bhartiya/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/heyxviraj"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://www.youtube.com/@virajbhartiya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            YouTube
          </a>
          <span className="text-border hidden sm:inline">|</span>
          <a
            href="mailto:vlbhartiya@gmail.com"
            className="hover:text-accent transition-colors"
          >
            vlbhartiya@gmail.com
          </a>
        </nav>

        {/* Right: copyright */}
        <span className="font-mono text-xs text-muted/40">
          &copy; {new Date().getFullYear()} Viraj Bhartiya
        </span>
      </div>
    </footer>
  );
}

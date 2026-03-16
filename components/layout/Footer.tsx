export function Footer() {
  return (
    <footer className="mt-20 mb-6 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="border-t border-border pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-4">
            <a
              href="mailto:vlbhartiya@gmail.com"
              className="hover:text-fg transition-colors"
            >
              vlbhartiya@gmail.com
            </a>
            <a
              href="https://github.com/virajbhartiya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/viraj-bhartiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
            >
              linkedin
            </a>
            <a
              href="https://twitter.com/heyxviraj"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors"
            >
              twitter
            </a>
          </div>
          <span className="text-muted/60">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

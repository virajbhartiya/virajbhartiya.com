export function Hero() {
  return (
    <section className="pt-10 sm:pt-14 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start">
        {/* Name */}
        <div className="shrink-0">
          <h1 className="text-3xl sm:text-4xl text-fg leading-none tracking-tight">
            Viraj Bhartiya
          </h1>
          <p className="text-xs text-accent mt-2">software engineer</p>
        </div>

        {/* Bio */}
        <div className="sm:pt-1">
          <p className="text-sm text-muted leading-relaxed">
            I enjoy creating things that live on the internet. What started as a
            pastime in my summer vacations has now turned into my life.
            I build weird, wonderful things that make people go &ldquo;wow&rdquo;.
          </p>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Self-taught developer. I can help you build websites, apps, or basically
            anything that runs on silicon.
          </p>
        </div>
      </div>

      {/* Links as a command-line style row */}
      <div className="mt-6 flex items-center gap-2 text-xs text-muted">
        <span className="text-accent select-none">$</span>
        <span className="select-none">find me at</span>
        <span className="text-border select-none">|</span>
        <a
          href="https://github.com/virajbhartiya"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg hover:text-accent transition-colors"
        >
          github
        </a>
        <span className="text-border select-none">&middot;</span>
        <a
          href="https://www.linkedin.com/in/viraj-bhartiya/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg hover:text-accent transition-colors"
        >
          linkedin
        </a>
        <span className="text-border select-none">&middot;</span>
        <a
          href="https://twitter.com/heyxviraj"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg hover:text-accent transition-colors"
        >
          twitter
        </a>
        <span className="text-border select-none">&middot;</span>
        <a
          href="/Viraj_Bhartiya.pdf"
          target="_blank"
          className="text-accent hover:text-fg transition-colors"
        >
          resume
        </a>
      </div>
    </section>
  );
}

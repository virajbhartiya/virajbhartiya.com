import { useEffect, useState } from "react";
import { AsciiInteractiveHero, AsciiDivider, AsciiMagneticText } from "@/components/ascii";

export const About = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      aria-label="About Viraj Bhartiya"
    >
      {/* Interactive ASCII Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <AsciiInteractiveHero width={100} height={35} />
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-[0.02]" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {showContent && (
          <>
            {/* ASCII Art Name */}
            <div className="mb-8">
              <pre className="font-mono text-[var(--accent)] text-[8px] sm:text-[10px] md:text-xs leading-none select-none hover:text-shadow-glow transition-all duration-300">
{`
██╗   ██╗██╗██████╗  █████╗      ██╗
██║   ██║██║██╔══██╗██╔══██╗     ██║
██║   ██║██║██████╔╝███████║     ██║
╚██╗ ██╔╝██║██╔══██╗██╔══██║██   ██║
 ╚████╔╝ ██║██║  ██║██║  ██║╚█████╔╝
  ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝
`}
              </pre>
              <div className="font-mono text-white/60 text-sm mt-2">
                <AsciiMagneticText
                  text="BLOCKCHAIN DEVELOPER & FULL-STACK ENGINEER"
                  className="text-white/60 tracking-wide"
                />
              </div>
            </div>

            <AsciiDivider className="my-8" variant="dashed" />

            {/* About section */}
            <div className="font-mono space-y-6">
              <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-6">
                {/* Corner decorations */}
                <span className="absolute -top-[1px] -left-[1px] text-[var(--accent)] text-[10px]">+</span>
                <span className="absolute -top-[1px] -right-[1px] text-[var(--accent)] text-[10px]">+</span>
                <span className="absolute -bottom-[1px] -left-[1px] text-[var(--accent)] text-[10px]">+</span>
                <span className="absolute -bottom-[1px] -right-[1px] text-[var(--accent)] text-[10px]">+</span>

                <div className="space-y-4 text-sm">
                  <p className="text-white/80 leading-relaxed">
                    I enjoy creating things that{" "}
                    <span className="text-[var(--accent)]">live on the internet.</span>
                  </p>

                  <p className="text-white/60 leading-relaxed">
                    What started as a pastime in my summer vacations has now turned into my life.
                    I like to build{" "}
                    <span className="text-[var(--accent)]">weird, wacky, wonderful things</span>{" "}
                    that make people go "Wow, that's cool".
                  </p>

                  <p className="text-white/60 leading-relaxed">
                    I'm a self-taught developer who loves to learn new things and experiment with them.
                    I can help you build websites, apps, or basically anything that can run on a piece of silicon.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="/Viraj_Bhartiya.pdf"
                  target="_blank"
                  className="
                    group relative px-6 py-3 font-mono text-sm
                    border border-[var(--accent)] text-[var(--accent)]
                    hover:bg-[var(--accent)] hover:text-black
                    transition-all duration-300 hover-bracket-bounce ascii-box-hover
                  "
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="bracket-left">[</span>
                    <span>DOWNLOAD CV</span>
                    <span className="bracket-right">]</span>
                  </span>
                </a>

                <a
                  href="mailto:virajbhartiya@gmail.com"
                  className="
                    px-6 py-3 font-mono text-sm
                    border border-white/20 text-white/60
                    hover:border-white/40 hover:text-white
                    transition-all duration-300 hover-bracket-bounce
                  "
                >
                  <span className="flex items-center gap-2">
                    <span className="bracket-left">[</span>
                    <span>CONTACT ME</span>
                    <span className="bracket-right">]</span>
                  </span>
                </a>
              </div>

              {/* Status indicators */}
              <div className="flex flex-wrap gap-8 mt-12 font-mono text-xs text-white/30">
                <div className="flex items-center gap-2 hover-glow-pulse">
                  <span className="w-2 h-2 bg-[var(--accent)] status-dot animate-status-pulse" />
                  <span>AVAILABLE FOR WORK</span>
                </div>
                <div className="flex items-center gap-2 hover-glitch">
                  <span className="w-2 h-2 border border-[var(--accent)]" />
                  <span>MUMBAI, INDIA</span>
                </div>
                <div className="flex items-center gap-2 hover-glitch">
                  <span className="w-2 h-2 border border-[var(--accent)]" />
                  <span>WEB3 & BLOCKCHAIN</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Decorative ASCII corners */}
      <div className="absolute top-20 left-4 font-mono text-[var(--accent)]/20 text-xs hidden lg:block">
        <pre>{`┌──────
│
│
└──`}</pre>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[var(--accent)]/20 text-xs hidden lg:block">
        <pre>{`    ──┐
      │
      │
   ───┘`}</pre>
      </div>
    </section>
  );
};

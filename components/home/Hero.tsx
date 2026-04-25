"use client";

import { AsciiCycle } from "@/components/ui/AsciiAnimate";
import { LazySplineScene } from "@/components/canvas/LazySplineScene";

const ID_CARD_SCENE =
  "https://prod.spline.design/QTcY0LeJK6LnYjqo/scene.splinecode";

export function Hero() {
  return (
    <section
      className="pt-12 pb-12 sm:pt-20 sm:pb-20"
      aria-labelledby="hero-name"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_360px] gap-10 md:gap-12 lg:gap-16 md:items-center">
        {/* Left — content */}
        <div className="min-w-0">
          {/* Prompt prefix */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted mb-6 sm:mb-8">
            <AsciiCycle
              chars={["▸", "▹"]}
              interval={1200}
              className="text-accent"
            />
            <span>whoami</span>
          </div>

          <h1
            id="hero-name"
            className="text-[2.75rem] sm:text-6xl md:text-[5.25rem] lg:text-[6rem] text-fg leading-[0.92] tracking-tight"
          >
            Viraj
            <br />
            Bhartiya
          </h1>

          <p className="text-sm sm:text-[15px] text-accent mt-5 sm:mt-6 tracking-[0.18em] uppercase flex items-center gap-2">
            <span aria-hidden="true">›</span>
            software engineer
          </p>

          <p className="mt-7 sm:mt-9 text-[15px] sm:text-base text-fg/85 leading-relaxed max-w-[42ch]">
            I build things that live on the internet — weird, wonderful, and
            probably over-engineered.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 text-accent py-2"
            >
              <span className="border-b border-accent group-hover:border-fg group-hover:text-fg pb-0.5 transition-colors">
                see projects
              </span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
            <a
              href="mailto:vlbhartiya@gmail.com"
              className="group inline-flex items-center gap-1.5 text-muted hover:text-fg transition-colors py-2"
            >
              say hi
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>

          {/* Social rail */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <a
              href="https://github.com/virajbhartiya"
              target="_blank"
              rel="noopener noreferrer"
              className="link-glow hover:text-fg transition-colors"
            >
              github
            </a>
            <span className="text-border" aria-hidden="true">
              ·
            </span>
            <a
              href="https://www.linkedin.com/in/viraj-bhartiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-glow hover:text-fg transition-colors"
            >
              linkedin
            </a>
            <span className="text-border" aria-hidden="true">
              ·
            </span>
            <a
              href="https://twitter.com/heyxviraj"
              target="_blank"
              rel="noopener noreferrer"
              className="link-glow hover:text-fg transition-colors"
            >
              twitter
            </a>
            <span className="text-border" aria-hidden="true">
              ·
            </span>
            <a
              href="/Viraj_Bhartiya.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-glow text-accent/85 hover:text-fg transition-colors"
            >
              resume.pdf
            </a>
          </div>
        </div>

        {/* Right — 3D id-card scene */}
        <div
          className="relative w-full max-w-[420px] mx-auto md:mx-0 md:max-w-none h-[440px] sm:h-[500px] md:h-[480px] lg:h-[540px]"
          aria-hidden="true"
        >
          <LazySplineScene scene={ID_CARD_SCENE} className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}

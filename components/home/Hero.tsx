"use client";

import { useEffect, useState } from "react";
import { GenerativeCanvas } from "@/components/canvas/GenerativeCanvas";
import { DraggableCard } from "@/components/ui/DraggableCard";
import { playClick } from "@/lib/audio";

export function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-[50vh] flex flex-col justify-center pt-8 sm:pt-12 pb-2">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Left: Identity */}
        <div>
          <div className="font-mono text-xs text-muted/40 tracking-widest uppercase mb-3 flex items-center gap-4">
            <span className="tabular-nums">{time || "--:--:--"}</span>
          </div>

          <h1 className="font-pixel text-[clamp(2.5rem,8vw,7rem)] leading-[1.05] tracking-tight">
            Viraj
            <br />
            Bhartiya
          </h1>

          <p className="mt-5 text-sm sm:text-base text-muted max-w-lg leading-relaxed">
            I enjoy creating things that live on the internet. What started as a
            past time in my summer vacations has now turned into my life.
          </p>
          <p className="mt-3 text-sm sm:text-base text-muted max-w-lg leading-relaxed">
            I like to build weird, wacky, wonderful things that make people go
            &ldquo;Wow, that&rsquo;s cool&rdquo;. I am a self-taught developer
            who loves to learn new things and experiment with them. I can help
            you build websites or apps or basically anything that can run on a
            piece of silicon*
          </p>
          <p className="mt-1 text-xs text-muted/40 italic">
            *(or whatever, who knows what the future holds?)
          </p>

          {/* Quick links */}
          <div className="mt-6 flex items-center gap-3 sm:gap-4 flex-wrap">
            <a
              href="https://github.com/virajbhartiya"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="font-mono text-xs border border-border px-3 sm:px-4 py-1.5 text-fg hover:bg-fg hover:text-[var(--bg)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/viraj-bhartiya/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="font-mono text-xs border border-border px-3 sm:px-4 py-1.5 text-fg hover:bg-fg hover:text-[var(--bg)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/Viraj_Bhartiya.pdf"
              target="_blank"
              onClick={() => playClick()}
              className="font-mono text-xs text-accent hover:text-fg transition-colors"
            >
              Resume &rarr;
            </a>
          </div>

        </div>

        {/* Right: Draggable canvas cards */}
        <div className="hidden md:flex flex-col gap-3">
          {/* Main canvas — swirl */}
          <DraggableCard>
            <div className="border border-border/50 bg-[var(--bg)]">
              <div className="aspect-[4/3]">
                <GenerativeCanvas
                  config={{
                    variant: "swirl",
                    seed: 13,
                    color: "#00efa6",
                    speed: 0.3,
                  }}
                  className="w-full h-full"
                />
              </div>
              <div className="border-t border-border/50 px-3 py-1.5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted uppercase">
                  Fig. 0
                </span>
                <span className="font-mono text-[10px] text-accent">
                  {"\u25A0"} Live
                </span>
              </div>
            </div>
          </DraggableCard>

          {/* Two small canvases side by side */}
          <div className="grid grid-cols-2 gap-3">
            <DraggableCard>
              <div className="border border-border/50 bg-[var(--bg)]">
                <div className="aspect-square">
                  <GenerativeCanvas
                    config={{
                      variant: "grid",
                      seed: 7,
                      color: "#00efa6",
                      speed: 0.25,
                    }}
                    className="w-full h-full"
                  />
                </div>
                <div className="border-t border-border/50 px-2 py-1">
                  <span className="font-mono text-[9px] text-muted uppercase">
                    Fig. 1
                  </span>
                </div>
              </div>
            </DraggableCard>
            <DraggableCard>
              <div className="border border-border/50 bg-[var(--bg)]">
                <div className="aspect-square">
                  <GenerativeCanvas
                    config={{
                      variant: "particles",
                      seed: 31,
                      color: "#00efa6",
                      speed: 0.3,
                    }}
                    className="w-full h-full"
                  />
                </div>
                <div className="border-t border-border/50 px-2 py-1">
                  <span className="font-mono text-[9px] text-muted uppercase">
                    Fig. 2
                  </span>
                </div>
              </div>
            </DraggableCard>
          </div>
        </div>
      </div>
    </section>
  );
}

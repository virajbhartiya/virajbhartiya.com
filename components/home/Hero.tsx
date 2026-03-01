"use client";

import { useScramble } from "use-scramble";
import { GenerativeCanvas } from "@/components/canvas/GenerativeCanvas";

export function Hero() {
  const { ref } = useScramble({
    text: "Blockchain developer and full-stack engineer building decentralized systems.",
    speed: 0.8,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  return (
    <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
      <div className="space-y-6">
        <h1 className="font-pixel text-[clamp(2.5rem,6vw,5rem)] leading-tight">
          Viraj
          <br />
          <span className="text-accent-yellow">Bhartiya</span>
        </h1>
        <p
          ref={ref}
          className="font-mono text-sm text-muted max-w-md leading-relaxed"
        />
      </div>
      <div className="h-[400px] md:h-[500px]">
        <GenerativeCanvas
          config={{ variant: "swirl", seed: 42, color: "#00efa6" }}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

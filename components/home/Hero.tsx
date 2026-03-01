"use client";

import { useScramble } from "use-scramble";

export function Hero() {
  const { ref } = useScramble({
    text: "Blockchain developer and full-stack engineer building decentralized systems, smart contracts, and high-performance web applications.",
    speed: 0.8,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  return (
    <section className="min-h-[70vh] flex flex-col justify-center pt-24 pb-16">
      <h1 className="font-pixel text-[clamp(2.5rem,8vw,7rem)] leading-[1.1] tracking-tight">
        Viraj
        <br />
        Bhartiya <span className="text-accent">Dev</span>
      </h1>
      <p
        ref={ref}
        className="mt-8 text-base text-muted max-w-lg leading-relaxed"
      />
    </section>
  );
}

"use client";

import { GenerativeCanvas } from "@/components/canvas/GenerativeCanvas";

export function Hero() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center pt-24 pb-16 relative">
      {/* Background ASCII animation */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <GenerativeCanvas
          config={{ variant: "grid", seed: 99, color: "#00efa6", speed: 0.2 }}
          className="w-full h-full"
        />
      </div>

      <h1 className="font-pixel text-[clamp(2.5rem,8vw,7rem)] leading-[1.1] tracking-tight">
        Viraj
        <br />
        Bhartiya <span className="text-accent">Dev</span>
      </h1>
      <p className="mt-8 text-base text-muted max-w-lg leading-relaxed">
        Blockchain developer and full-stack engineer building decentralized
        systems, smart contracts, and high-performance web applications.
      </p>
    </section>
  );
}

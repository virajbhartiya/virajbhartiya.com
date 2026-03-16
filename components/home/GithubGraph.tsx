"use client";

import { AsciiCycle } from "@/components/ui/AsciiAnimate";
import { ContributionGrid } from "./ContributionGrid";

import { useEffect, useState } from "react";

interface ContributionData {
  weeks: any[];
  total: number;
}

export function GithubGraph() {
  const [data, setData] = useState<ContributionData | null>(null);

  useEffect(() => {
    fetch("/api/contributions")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || data.weeks.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="section-heading text-xs text-accent uppercase tracking-widest">
          contributions
        </h2>
        <a
          href="https://github.com/virajbhartiya"
          target="_blank"
          rel="noopener noreferrer"
          className="link-glow text-xs text-muted hover:text-fg transition-colors"
        >
          @virajbhartiya
        </a>
      </div>

      <ContributionGrid weeks={data.weeks} total={data.total} />

      <div className="mt-3 flex items-center gap-3 text-[10px] text-muted/15">
        <AsciiCycle
          chars={["·", "░", "▒", "▓", "█", "▓", "▒", "░"]}
          interval={200}
          className="text-accent/20"
        />
        <span className="text-muted/15" aria-hidden="true">src: github.com/virajbhartiya | cache: 1h | render: ·░▒▓█</span>
      </div>
    </section>
  );
}

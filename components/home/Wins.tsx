"use client";

import { winsData } from "@/data/winsData";
import { AsciiCycle } from "@/components/ui/AsciiAnimate";

export function Wins() {
  return (
    <section id="wins" className="mt-16 sm:mt-20">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2 className="section-heading text-xs text-accent uppercase tracking-widest">
          wins
        </h2>
        <div className="flex items-center gap-2 text-xs text-muted">
          <AsciiCycle
            chars={["★", "☆", "✦", "✧"]}
            interval={900}
            className="text-accent text-sm"
          />
          <span className="tabular-nums">
            <span className="text-accent">{winsData.length}</span> entries
          </span>
        </div>
      </div>

      <div className="border-t border-border">
        {winsData.map((win, i) => {
          const awardLower = win.award.toLowerCase();
          const isWinner = awardLower.includes("winner");
          const isNotable =
            awardLower.includes("finalist") || awardLower.includes("showcase");
          const awardColor = isWinner
            ? "text-accent"
            : isNotable
              ? "text-accent"
              : "text-fg/75";

          return (
            <div
              key={i}
              className="group grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-baseline gap-x-4 sm:gap-x-6 gap-y-1 py-4 sm:py-5 border-b border-border transition-colors hover:bg-accent/[0.02]"
            >
              {/* Year + month */}
              <div className="self-start pt-0.5 leading-none">
                <span className="text-lg sm:text-xl text-accent-blue tabular-nums">
                  {win.year}
                </span>
                {win.month && (
                  <span className="block text-[10px] text-muted uppercase tracking-wider mt-1 tabular-nums">
                    {win.month}
                  </span>
                )}
              </div>

              {/* Event + project */}
              <div className="min-w-0">
                <h3 className="text-[15px] sm:text-base text-fg group-hover:text-accent transition-colors leading-snug">
                  {win.title}
                </h3>
                <p className="text-[13px] text-fg/75 mt-1">{win.project}</p>
              </div>

              {/* Award — wraps below on mobile */}
              <div className="col-span-2 sm:col-span-1 col-start-2 sm:col-start-3 flex items-center gap-2 sm:justify-end">
                <span className="text-accent/50 select-none text-xs shrink-0" aria-hidden="true">
                  {isWinner ? "★" : "◆"}
                </span>
                <span className={`text-[12px] sm:text-[13px] uppercase tracking-wider whitespace-nowrap ${awardColor}`}>
                  {win.award}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

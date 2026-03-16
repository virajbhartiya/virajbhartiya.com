"use client";

import { winsData } from "@/data/winsData";
import { AsciiCycle } from "@/components/ui/AsciiAnimate";

export function Wins() {
  const winnerCount = winsData.filter(w => w.award.toLowerCase().includes("winner")).length;

  return (
    <section id="wins" className="mt-20">
      <h2 className="section-heading text-xs text-accent uppercase tracking-widest mb-5">
        wins
      </h2>

      <div className="flex items-start gap-4 mb-5">
        <div className="hidden sm:block shrink-0 relative">
          <pre className="text-accent/15 text-[9px] leading-tight select-none" aria-hidden="true">{`
  ___
 |   |
 |___|
  )|(
 /___\\`}</pre>
          <AsciiCycle
            chars={["★", "☆", "✦", "✧"]}
            interval={800}
            className="absolute -top-1 left-1/2 -translate-x-1/2 text-accent/30 text-[10px]"
          />
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted/40 uppercase tracking-wider">
                <th className="text-left py-2 pr-4 font-normal">event</th>
                <th className="text-left py-2 pr-4 font-normal hidden sm:table-cell">project</th>
                <th className="text-left py-2 pr-4 font-normal">award</th>
                <th className="text-right py-2 font-normal">year</th>
              </tr>
            </thead>
            <tbody>
              {winsData.map((win, i) => (
                <tr key={i} className="border-b border-border/50 table-row-hover">
                  <td className="py-2.5 pr-4 text-sm text-fg">{win.title}</td>
                  <td className="py-2.5 pr-4 text-muted hidden sm:table-cell">{win.project}</td>
                  <td className="py-2.5 pr-4">
                    <span className={`${
                      win.award.toLowerCase().includes("winner")
                        ? "text-accent"
                        : win.award.toLowerCase().includes("finalist") || win.award.toLowerCase().includes("showcase")
                          ? "text-accent-blue"
                          : "text-muted"
                    }`}>
                      {win.award.toLowerCase().includes("winner") && <span className="mr-1" aria-hidden="true">*</span>}
                      {win.award}
                    </span>
                  </td>
                  <td className="py-2.5 text-right text-accent-blue">{win.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

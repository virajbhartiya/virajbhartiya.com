"use client";

import { useEffect, useRef, useCallback, useState, Fragment } from "react";
import type { ContributionDay, ContributionWeek } from "@/lib/github";

const LEVEL_CHARS = ["·", "░", "▒", "▓", "█"];
const LEVEL_BG = [
  "rgba(0, 239, 166, 0.02)",
  "rgba(0, 239, 166, 0.08)",
  "rgba(0, 239, 166, 0.16)",
  "rgba(0, 239, 166, 0.26)",
  "rgba(0, 239, 166, 0.38)",
];
const LEVEL_FG = [
  "rgba(0, 239, 166, 0.12)",
  "rgba(0, 239, 166, 0.4)",
  "rgba(0, 239, 166, 0.6)",
  "rgba(0, 239, 166, 0.8)",
  "rgba(0, 239, 166, 1)",
];
const LEVEL_LABELS = ["0", "1-3", "4-7", "8-12", "13+"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface ContributionGridProps {
  weeks: ContributionWeek[];
  total: number;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getCountText(day: ContributionDay) {
  if (day.count !== undefined) {
    return `${day.count}`;
  }
  return `~${LEVEL_LABELS[day.level]}`;
}

export function ContributionGrid({ weeks, total }: ContributionGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // On mobile, only show the last 16 weeks so cells stay tappable without horizontal scroll
  const visibleWeeks = isMobile ? weeks.slice(-16) : weeks;
  const numWeeks = visibleWeeks.length;

  // Build month label positions
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  visibleWeeks.forEach((week, i) => {
    if (week.length > 0) {
      const month = new Date(week[0].date + "T00:00:00").getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], col: i });
        lastMonth = month;
      }
    }
  });

  // Direct DOM manipulation for smooth tooltip — no re-renders
  const showTooltip = useCallback(
    (e: React.MouseEvent, day: ContributionDay) => {
      const tip = tooltipRef.current;
      const box = containerRef.current;
      if (!tip || !box) return;

      const cell = e.currentTarget as HTMLElement;
      const boxRect = box.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();

      const x = cellRect.left - boxRect.left + cellRect.width / 2;
      const y = cellRect.top - boxRect.top;

      tip.style.left = `${x}px`;
      tip.style.top = `${y - 6}px`;
      tip.style.opacity = "1";

      const dateEl = tip.querySelector<HTMLElement>("[data-date]");
      const charEl = tip.querySelector<HTMLElement>("[data-char]");
      const infoEl = tip.querySelector<HTMLElement>("[data-info]");

      if (dateEl) dateEl.textContent = formatDate(day.date);
      if (charEl) {
        charEl.textContent = LEVEL_CHARS[day.level];
        charEl.style.color = LEVEL_FG[day.level];
      }
      if (infoEl) infoEl.textContent = getCountText(day);
    },
    [],
  );

  const hideTooltip = useCallback(() => {
    const tip = tooltipRef.current;
    if (tip) tip.style.opacity = "0";
  }, []);

  const periodLabel = isMobile ? "the last 16 weeks" : "the last year";

  return (
    <div
      ref={containerRef}
      className="border border-border/50 p-2 sm:p-3 md:p-4 relative"
      role="img"
      aria-label={`GitHub contribution graph: ${total.toLocaleString()} contributions in ${periodLabel}.`}
    >
      <div aria-hidden="true">
        {/* Month labels */}
        <div
          className="relative h-4 mb-0.5 hidden sm:block"
          style={{ marginLeft: "24px" }}
        >
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="absolute font-mono text-[10px] text-muted uppercase tracking-wider"
              style={{ left: `${(m.col / numWeeks) * 100}%` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Grid — tight gap, cells with background fill */}
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `18px repeat(${numWeeks}, 1fr)`,
            gridAutoRows: "1fr",
            gap: "1px",
          }}
        >
          {Array.from({ length: 7 }, (_, dayIdx) => (
            <Fragment key={dayIdx}>
              <div className="flex items-center justify-end pr-1 font-mono text-[9px] text-muted">
                {dayIdx === 1
                  ? "M"
                  : dayIdx === 3
                    ? "W"
                    : dayIdx === 5
                      ? "F"
                      : ""}
              </div>

              {visibleWeeks.map((week, weekIdx) => {
                const day = week.find(
                  (d) => new Date(d.date + "T00:00:00").getDay() === dayIdx,
                );

                if (!day) {
                  return (
                    <div
                      key={`${dayIdx}-${weekIdx}`}
                      className="aspect-square"
                    />
                  );
                }

                return (
                  <div
                    key={`${dayIdx}-${weekIdx}`}
                    className="aspect-square flex items-center justify-center font-mono cursor-crosshair contrib-cell"
                    style={{
                      backgroundColor: LEVEL_BG[day.level],
                      color: LEVEL_FG[day.level],
                      fontSize: "clamp(5px, 1vw, 11px)",
                    }}
                    onMouseEnter={(e) => showTooltip(e, day)}
                    onMouseLeave={hideTooltip}
                  >
                    {LEVEL_CHARS[day.level]}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50 flex-wrap gap-2">
        <div className="flex items-center gap-1 font-mono text-xs">
          <span className="text-muted mr-1">Less</span>
          {LEVEL_CHARS.map((ch, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center w-3.5 h-3.5 text-[11px]"
              style={{
                backgroundColor: LEVEL_BG[i],
                color: LEVEL_FG[i],
              }}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
          <span className="text-muted ml-1">More</span>
        </div>

        {total > 0 && (
          <span className="font-mono text-xs text-fg/75">
            <span className="text-accent-blue tabular-nums">
              {total.toLocaleString()}
            </span>{" "}
            <span className="text-muted">contributions in {periodLabel}</span>
          </span>
        )}
      </div>

      {/* Tooltip — positioned via refs, no re-renders */}
      <div
        ref={tooltipRef}
        className="absolute z-50 pointer-events-none border border-border bg-[var(--bg)] px-3 py-2 font-mono opacity-0 transition-opacity duration-75 hidden sm:block"
        style={{ transform: "translate(-50%, -100%)" }}
        aria-hidden="true"
      >
        <div data-date className="text-xs text-fg whitespace-nowrap" />
        <div className="flex items-center gap-1 mt-0.5">
          <span data-char className="text-xs" />
          <span data-info className="text-xs text-muted whitespace-nowrap" />
          <span className="text-xs text-muted">contributions</span>
        </div>
      </div>
    </div>
  );
}

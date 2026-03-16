/** Small ASCII decorative elements used throughout the site */

export function AsciiDivider({ variant = "dots" }: { variant?: "dots" | "wave" | "line" | "arrows" | "blocks" }) {
  const patterns: Record<string, string> = {
    dots: "· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·",
    wave: "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~",
    line: "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─",
    arrows: "› › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › › ›",
    blocks: "░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░",
  };

  return (
    <div className="overflow-hidden select-none my-10" aria-hidden="true">
      <p className="text-[10px] text-border whitespace-nowrap">{patterns[variant]}</p>
    </div>
  );
}

export function AsciiCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const chars: Record<string, string> = {
    tl: "┌",
    tr: "┐",
    bl: "└",
    br: "┘",
  };

  const posClasses: Record<string, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };

  return (
    <span
      className={`absolute ${posClasses[position]} text-border/50 text-xs leading-none select-none pointer-events-none`}
      aria-hidden="true"
    >
      {chars[position]}
    </span>
  );
}

export function AsciiLabel({ text, color = "muted" }: { text: string; color?: "muted" | "accent" | "blue" }) {
  const colorClass = color === "accent" ? "text-accent" : color === "blue" ? "text-accent-blue" : "text-muted/30";
  return (
    <span className={`text-[10px] ${colorClass} select-none`} aria-hidden="true">
      [{text}]
    </span>
  );
}

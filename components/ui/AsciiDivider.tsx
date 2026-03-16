import { cn } from "@/lib/utils";

interface AsciiDividerProps {
  variant?: "line" | "dots" | "wave" | "box";
  label?: string;
  className?: string;
}

export function AsciiDivider({
  variant = "line",
  label,
  className,
}: AsciiDividerProps) {
  return (
    <div
      className={cn("w-full font-mono text-sm select-none", className)}
      aria-hidden="true"
    >
      {variant === "line" && <LineDivider label={label} />}
      {variant === "dots" && <DotsDivider label={label} />}
      {variant === "wave" && <WaveDivider label={label} />}
      {variant === "box" && <BoxDivider label={label} />}
    </div>
  );
}

function LineDivider({ label }: { label?: string }) {
  if (!label) {
    return (
      <div className="flex items-center">
        <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap">
          {"─".repeat(200)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap">
        {"─".repeat(200)}
      </span>
      <span className="text-accent/40 uppercase tracking-widest text-xs shrink-0">
        <span className="text-accent/30">/</span>
        {label}
      </span>
      <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap">
        {"─".repeat(200)}
      </span>
    </div>
  );
}

function DotsDivider({ label }: { label?: string }) {
  const dot = "\u00B7";
  const dotPattern = `${dot} `.repeat(100);

  if (!label) {
    return (
      <div className="flex items-center justify-center">
        <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap text-center tracking-[0.5em]">
          {dotPattern}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap tracking-[0.5em]">
        {dotPattern}
      </span>
      <span className="text-accent/40 uppercase tracking-widest text-xs shrink-0">
        <span className="text-accent/30">/</span>
        {label}
      </span>
      <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap tracking-[0.5em]">
        {dotPattern}
      </span>
    </div>
  );
}

function WaveDivider({ label }: { label?: string }) {
  const wave = "~\u00B7".repeat(100);

  if (!label) {
    return (
      <div className="flex items-center">
        <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap">
          {wave}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap">
        {wave}
      </span>
      <span className="text-accent/40 uppercase tracking-widest text-xs shrink-0">
        <span className="text-accent/30">/</span>
        {label}
      </span>
      <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap">
        {wave}
      </span>
    </div>
  );
}

function BoxDivider({ label }: { label?: string }) {
  const line = "─".repeat(200);

  if (!label) {
    return (
      <div className="text-muted/20 overflow-hidden whitespace-nowrap">
        <span>{"┌"}</span>
        <span>{line}</span>
        <span>{"┐"}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center overflow-hidden whitespace-nowrap">
      <span className="text-muted/20">{"┌"}</span>
      <span className="text-muted/20">{"───"}</span>
      <span className="text-accent/40 uppercase tracking-widest text-xs mx-2 shrink-0">
        {label}
      </span>
      <span className="flex-1 text-muted/20 overflow-hidden whitespace-nowrap">
        {line}
      </span>
      <span className="text-muted/20">{"┐"}</span>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  count?: number;
  className?: string;
}

export function SectionLabel({ label, count, className }: SectionLabelProps) {
  return (
    <div className={cn("font-mono text-xs tracking-widest uppercase text-muted", className)}>
      <span className="text-accent">/</span> {label}
      {count !== undefined && (
        <span className="ml-2 text-accent-yellow">({count})</span>
      )}
    </div>
  );
}

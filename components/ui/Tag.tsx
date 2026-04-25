import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs tracking-wider uppercase px-2 py-0.5 border border-border text-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}

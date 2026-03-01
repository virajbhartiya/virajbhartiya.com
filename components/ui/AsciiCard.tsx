import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tag } from "./Tag";

interface AsciiCardProps {
  figure: number;
  title: string;
  description: string;
  tags?: string[];
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AsciiCard({ figure, title, description, tags, href, className, children }: AsciiCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block border border-border hover:border-accent/40 transition-colors",
        className
      )}
    >
      <div className="aspect-[4/3] bg-bg relative overflow-hidden">
        {children}
        <span className="absolute bottom-2 left-3 font-mono text-[10px] text-muted uppercase">
          Fig. {figure}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
          {title}{" "}
          <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            ↗
          </span>
        </h3>
        <p className="text-xs text-muted line-clamp-2">{description}</p>
        {tags && (
          <div className="flex gap-1.5 flex-wrap pt-1">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

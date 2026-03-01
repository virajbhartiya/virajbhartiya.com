"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tag } from "./Tag";
import { playClick } from "@/lib/audio";

interface FeedRowProps {
  date: string;
  name: string;
  type?: string;
  tags?: string[];
  href: string;
  external?: boolean;
  className?: string;
}

export function FeedRow({ date, name, type, tags, href, external, className }: FeedRowProps) {
  const isExternal = external ?? href.startsWith("http");
  const sharedClassName = cn(
    "group grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr_auto] items-center gap-3 sm:gap-4 py-3 px-2 -mx-2 border-b border-border/50 hover:bg-white/[0.02] transition-colors",
    className
  );

  const content = (
    <>
      <span className="font-mono text-[10px] sm:text-xs text-muted">{date}</span>
      <span className="font-mono text-xs sm:text-sm text-fg group-hover:text-accent transition-colors truncate">
        {name}
      </span>
      <div className="hidden md:flex items-center gap-2">
        {tags?.slice(0, 2).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
        {type && <Tag label={type} className="border-accent/30 text-accent" />}
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={sharedClassName} onClick={() => playClick()}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName} onClick={() => playClick()}>
      {content}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { playClick } from "@/lib/audio";

interface BracketLinkProps {
  label: string;
  shortcut: string;
  href: string;
  external?: boolean;
  className?: string;
}

export function BracketLink({
  label,
  shortcut,
  href,
  external,
  className,
}: BracketLinkProps) {
  const content = (
    <span
      className={cn(
        "font-mono text-xs tracking-wider uppercase text-muted hover:text-fg transition-colors",
        className,
      )}
    >
      <span className="text-accent">[</span>
      <span className="text-accent">{shortcut}</span>
      <span className="text-accent">]</span> {label}
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playClick()}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={() => playClick()}>
      {content}
    </Link>
  );
}

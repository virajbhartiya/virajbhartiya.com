"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/utils";

interface Props {
  items: TocItem[];
  className?: string;
  /** Show the "on this page" label above the list. Defaults to true. */
  showHeader?: boolean;
}

export function TableOfContents({ items, className, showHeader = true }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => !!el);
    if (headings.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const h of headings) obs.observe(h);
    return () => obs.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className={className}>
      {showHeader && (
        <p className="text-[10px] uppercase tracking-widest text-muted mb-4">
          on this page
        </p>
      )}
      <ul className="list-none m-0 p-0 border-l border-border/60">
        {items.map((item) => {
          const isActive = activeSlug === item.slug;
          const indent = item.level === 3 ? "pl-6" : "pl-3";
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                className={`block leading-snug py-1.5 -ml-px border-l-2 transition-colors ${indent} ${
                  item.level === 3 ? "text-[11px]" : "text-[12px]"
                } ${
                  isActive
                    ? "text-accent border-accent"
                    : "text-muted hover:text-fg border-transparent"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

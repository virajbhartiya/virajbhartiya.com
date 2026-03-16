"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "blog", shortcut: "b", href: "/blog" },
  { label: "projects", shortcut: "p", href: "/#projects" },
  { label: "github", shortcut: "g", href: "https://github.com/virajbhartiya", external: true },
  { label: "resume", shortcut: "r", href: "/Viraj_Bhartiya.pdf", external: true },
];

export function Header() {
  const router = useRouter();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const item = NAV_ITEMS.find((n) => n.shortcut === e.key.toLowerCase());
      if (item) {
        if (item.external) {
          window.open(item.href, "_blank");
        } else {
          router.push(item.href);
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [router]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-[var(--bg)]">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-10 flex items-center gap-4 sm:gap-6 text-xs overflow-x-auto">
        <a href="/" className="text-accent shrink-0">~</a>
        <span className="text-border select-none">/</span>
        {NAV_ITEMS.map((item) => {
          return (
            <a
              key={item.shortcut}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-muted hover:text-fg transition-colors shrink-0"
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

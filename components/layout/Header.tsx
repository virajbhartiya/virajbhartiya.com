"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BracketLink } from "@/components/ui/BracketLink";

const NAV_ITEMS = [
  { label: "Blog", shortcut: "B", href: "/blog" },
  { label: "Projects", shortcut: "P", href: "/#projects" },
  { label: "Github", shortcut: "G", href: "https://github.com/virajbhartiya", external: true },
  { label: "Resume", shortcut: "R", href: "/Viraj_Bhartiya.pdf", external: true },
];

export function Header() {
  const router = useRouter();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const item = NAV_ITEMS.find((n) => n.shortcut.toLowerCase() === e.key.toLowerCase());
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-[var(--bg)]/80">
      <nav className="max-w-6xl mx-auto px-4 h-12 flex items-center gap-3 sm:gap-6 overflow-x-auto">
        <a href="/" className="text-accent text-lg shrink-0">■</a>
        {NAV_ITEMS.map((item) => (
          <BracketLink key={item.shortcut} {...item} className="shrink-0" />
        ))}
      </nav>
    </header>
  );
}

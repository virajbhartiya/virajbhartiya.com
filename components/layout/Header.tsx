"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

const NAV_ITEMS = [
  { label: "blog", shortcut: "b", href: "/blog" },
  { label: "projects", shortcut: "p", href: "/#projects" },
  { label: "github", shortcut: "g", href: "https://github.com/virajbhartiya", external: true },
  { label: "resume", shortcut: "r", href: "/Viraj_Bhartiya.pdf", external: true },
] as const;

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#") || href === "/") return pathname === "/";
  if (href.startsWith("http") || href.endsWith(".pdf")) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip keyboard shortcuts on touch-only devices — they have no kbd hints visible
    if (window.matchMedia("(hover: none)").matches) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const item = NAV_ITEMS.find((n) => n.shortcut === e.key.toLowerCase());
      if (!item) return;

      if ("external" in item && item.external) {
        const win = window.open(item.href, "_blank", "noopener,noreferrer");
        if (win) win.opener = null;
      } else {
        router.push(item.href);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [router]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-[var(--bg)]">
      <nav
        aria-label="Primary"
        className="max-w-5xl mx-auto px-4 sm:px-6 h-10 flex items-center text-xs overflow-x-auto"
      >
        <a
          href="/"
          aria-label="Home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="text-accent shrink-0 flex items-center"
        >
          ~<BlinkingCursor />
        </a>
        <span className="text-border select-none mx-3" aria-hidden="true">/</span>
        <ul className="flex items-center gap-4 sm:gap-6 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.shortcut} className="shrink-0">
                <a
                  href={item.href}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors shrink-0 ${
                    active
                      ? "text-fg border-b border-accent pb-px"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto hidden md:flex items-center gap-1.5 text-[11px] text-muted shrink-0">
          <span aria-hidden="true">press</span>
          {NAV_ITEMS.map((item) => (
            <kbd
              key={item.shortcut}
              className="border border-border px-1.5 py-px text-fg/80 tabular-nums"
              aria-label={`shortcut ${item.shortcut} for ${item.label}`}
            >
              {item.shortcut}
            </kbd>
          ))}
        </div>
      </nav>
    </header>
  );
}

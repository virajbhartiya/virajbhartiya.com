# ASCII Website Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild virajbhartiya.com from scratch with an ASCII/developer-focused aesthetic inspired by stripe.dev — pixel typography, generative canvas art, bracket navigation, table feeds.

**Architecture:** Next.js App Router with Tailwind CSS. Custom Canvas 2D generative art. Geist font family (Sans + Mono + Pixel). All content (blog markdown, project data, experience data) preserved. Current site backed up to `legacy/` folder.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 3.4, Geist fonts (via `geist` npm), framer-motion, use-scramble, gray-matter, Canvas 2D API.

---

## Task 1: Branch Setup & Legacy Backup

**Step 1: Create new branch**
```bash
git checkout -b feat/ascii-redesign
```

**Step 2: Copy current site to legacy folder**
```bash
mkdir legacy
cp -r app components data lib types public legacy/
cp tailwind.config.js legacy/
cp next.config.js legacy/
cp globals.css legacy/ 2>/dev/null || true
```

**Step 3: Commit the backup**
```bash
git add legacy/
git commit -m "chore: backup current site to legacy/"
```

---

## Task 2: Clean Slate — Strip to Bare Next.js

**Step 1: Remove old source directories**
```bash
rm -rf app/blog app/providers.tsx app/not-found.tsx
rm -rf components/Home components/Marquees components/custom components/shared components/ui
rm -rf data/navbarData.tsx
```

**Step 2: Install geist package & clean up unused deps**
```bash
npm install geist
npm uninstall @splinetool/react-spline aos react-animated-cursor react-contribution-calendar react-contribution-viewer react-day-picker react-fast-marquee react-github-calendar react-responsive sonner @types/aos @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons mini-svg-data-uri
```

Keep: `framer-motion`, `use-scramble`, `gray-matter`, `lucide-react`, `class-variance-authority`, `tailwind-merge`, `tailwindcss-animate`, `@radix-ui/react-slot`, `@vercel/analytics`.

**Step 3: Rewrite `app/layout.tsx`** — fresh layout with Geist fonts

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viraj Bhartiya",
  description: "Blockchain developer and full-stack engineer building decentralized systems.",
  openGraph: {
    title: "Viraj Bhartiya",
    description: "Blockchain developer and full-stack engineer building decentralized systems.",
    url: "https://virajbhartiya.com",
    siteName: "Viraj Bhartiya",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viraj Bhartiya",
    description: "Blockchain developer and full-stack engineer building decentralized systems.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--fg)] font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

Note: The `geist` npm package may export fonts differently. Check actual exports after install:
- Try `geist/font/sans`, `geist/font/mono`
- If those don't work, try `import localFont from 'next/font/local'` with the woff2 files from the geist package

For Geist Pixel — check if `geist/font/pixel` exists after install. If not, download the font files from https://github.com/vercel/geist-font/releases and place in `public/fonts/`. Load via `@font-face` or `next/font/local`.

**Step 4: Rewrite `app/globals.css`** — new design system tokens

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0a0f1a;
  --fg: #e2e8f0;
  --accent: #00efa6;
  --accent-yellow: #facc15;
  --muted: #64748b;
  --border: #1e293b;
  --card-bg: rgba(15, 23, 42, 0.6);
  --radius: 0.5rem;
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}

::selection {
  background-color: var(--accent);
  color: #000;
}

body {
  background-color: var(--bg);
  color: var(--fg);
}

/* Utility classes */
.font-pixel {
  font-family: var(--font-pixel), monospace;
}

.font-mono {
  font-family: var(--font-geist-mono), monospace;
}

.section-label {
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.accent {
  color: var(--accent);
}
```

**Step 5: Rewrite `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        accent: "var(--accent)",
        "accent-yellow": "var(--accent-yellow)",
        muted: "var(--muted)",
        border: "var(--border)",
        "card-bg": "var(--card-bg)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Step 6: Stub `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="font-pixel text-6xl p-8">Viraj Bhartiya</h1>
      <p className="font-mono text-muted px-8">Site under construction</p>
    </main>
  );
}
```

**Step 7: Verify it builds**
```bash
npm run build
```

**Step 8: Commit**
```bash
git add -A
git commit -m "chore: clean slate with new design system tokens and font setup"
```

---

## Task 3: Component Primitives

**Files to create:**
- `components/ui/SectionLabel.tsx`
- `components/ui/BracketLink.tsx`
- `components/ui/Tag.tsx`
- `components/ui/FeedRow.tsx`
- `components/ui/AsciiCard.tsx`
- `lib/utils.ts`

**Step 1: Create `lib/utils.ts`**

```tsx
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}
```

**Step 2: Create `components/ui/SectionLabel.tsx`**

```tsx
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
```

**Step 3: Create `components/ui/BracketLink.tsx`**

```tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BracketLinkProps {
  label: string;
  shortcut: string;
  href: string;
  external?: boolean;
  className?: string;
}

export function BracketLink({ label, shortcut, href, external, className }: BracketLinkProps) {
  const content = (
    <span className={cn(
      "font-mono text-xs tracking-wider uppercase text-muted hover:text-fg transition-colors",
      className
    )}>
      <span className="text-accent">[</span>
      <span className="text-accent">{shortcut}</span>
      <span className="text-accent">]</span>
      {" "}{label}
    </span>
  );

  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  return <Link href={href}>{content}</Link>;
}
```

**Step 4: Create `components/ui/Tag.tsx`**

```tsx
import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className }: TagProps) {
  return (
    <span className={cn(
      "font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border border-border text-muted",
      className
    )}>
      {label}
    </span>
  );
}
```

**Step 5: Create `components/ui/FeedRow.tsx`**

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tag } from "./Tag";

interface FeedRowProps {
  date: string;
  name: string;
  type?: string;
  tags?: string[];
  href: string;
  className?: string;
}

export function FeedRow({ date, name, type, tags, href, className }: FeedRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group grid grid-cols-[100px_1fr_auto] items-center gap-4 py-3 px-2 -mx-2 border-b border-border/50 hover:bg-white/[0.02] transition-colors",
        className
      )}
    >
      <span className="font-mono text-xs text-muted">{date}</span>
      <span className="font-mono text-sm text-fg group-hover:text-accent transition-colors truncate">
        {name}
      </span>
      <div className="flex items-center gap-2">
        {tags?.slice(0, 2).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
        {type && <Tag label={type} className="border-accent/30 text-accent" />}
      </div>
    </Link>
  );
}
```

**Step 6: Create `components/ui/AsciiCard.tsx`**

```tsx
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
  children?: React.ReactNode; // for canvas slot
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
          {title} <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
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
```

**Step 7: Verify build**
```bash
npm run build
```

**Step 8: Commit**
```bash
git add components/ui/ lib/utils.ts
git commit -m "feat: add ASCII design system component primitives"
```

---

## Task 4: Generative Canvas Art System

**Files to create:**
- `components/canvas/GenerativeCanvas.tsx`
- `components/canvas/art.ts` (parametric algorithms)

**Step 1: Create `components/canvas/art.ts`** — Pure functions for each art variant

Implement three art generators as pure functions that take a canvas context + config:

1. **Swirl** — Parametric spiral using sine/cosine with twist, noise, and velocity params
2. **Grid** — Dot grid with wave distortion based on time + seed
3. **Particles** — Floating particles with line connections within a radius

Each function signature:
```ts
type ArtConfig = {
  variant: "swirl" | "grid" | "particles";
  seed: number;
  color: string;       // accent color
  speed?: number;
};

type ArtRenderer = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  config: ArtConfig,
) => void;
```

Implement `renderSwirl`, `renderGrid`, `renderParticles` — each draws on the canvas per frame using `requestAnimationFrame` time.

Use deterministic pseudo-random from seed (simple mulberry32 PRNG) so each card gets consistent unique art.

**Step 2: Create `components/canvas/GenerativeCanvas.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import type { ArtConfig } from "./art";
import { render } from "./art";

interface GenerativeCanvasProps {
  config: ArtConfig;
  className?: string;
}

export function GenerativeCanvas({ config, className }: GenerativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      render(ctx, rect.width, rect.height, time, config);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [config]);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%" }} />;
}
```

**Step 3: Verify canvas renders on stub page, then commit**
```bash
git add components/canvas/
git commit -m "feat: add generative canvas art system with swirl, grid, particle variants"
```

---

## Task 5: Header & Footer Layout Shell

**Files to create:**
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`

**Step 1: Create `components/layout/Header.tsx`**

Fixed top navigation bar with bracket shortcuts. Keyboard listener for shortcut keys.

```tsx
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
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-bg/80">
      <nav className="max-w-6xl mx-auto px-6 h-12 flex items-center gap-6">
        <a href="/" className="text-accent text-lg">■</a>
        {NAV_ITEMS.map((item) => (
          <BracketLink key={item.shortcut} {...item} />
        ))}
      </nav>
    </header>
  );
}
```

**Step 2: Create `components/layout/Footer.tsx`**

Footer with large pixel text + three-column links.

```tsx
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-32">
      {/* Large pixel display text */}
      <div className="max-w-6xl mx-auto px-6 py-16 overflow-hidden">
        <div className="font-pixel text-[clamp(3rem,10vw,8rem)] text-border/60 leading-none select-none">
          DEVELOPER
        </div>
      </div>

      {/* Link columns */}
      <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <SectionLabel label="Docs" className="mb-3" />
          <a href="/Viraj_Bhartiya.pdf" target="_blank" className="block font-mono text-xs text-muted hover:text-fg transition-colors">
            Resume
          </a>
        </div>
        <div>
          <SectionLabel label="Social" className="mb-3" />
          <div className="space-y-1.5">
            {[
              ["Github", "https://github.com/virajbhartiya"],
              ["LinkedIn", "https://www.linkedin.com/in/viraj-bhartiya/"],
              ["Twitter", "https://twitter.com/heyxviraj"],
              ["YouTube", "https://www.youtube.com/@virajbhartiya"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block font-mono text-xs text-muted hover:text-fg transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Resources" className="mb-3" />
          <div className="space-y-1.5">
            <a href="/blog" className="block font-mono text-xs text-muted hover:text-fg transition-colors">Blog</a>
            <a href="/#projects" className="block font-mono text-xs text-muted hover:text-fg transition-colors">Projects</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-6 pb-8 flex justify-between items-center">
        <span className="font-mono text-[10px] text-muted">
          © {new Date().getFullYear()} Viraj Bhartiya
        </span>
      </div>
    </footer>
  );
}
```

**Step 3: Wire Header + Footer into `app/layout.tsx`**

Add `<Header />` before `{children}` and `<Footer />` after in the body.

**Step 4: Verify build, commit**
```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add Header with bracket nav + keyboard shortcuts, Footer with pixel text"
```

---

## Task 6: Home Page — Hero Section

**File:** `app/page.tsx`, create `components/home/Hero.tsx`

**Step 1: Create `components/home/Hero.tsx`**

Two-column hero: left = pixel font name + tagline + scramble animation, right = large generative canvas.

```tsx
"use client";

import { useScramble } from "use-scramble";
import { GenerativeCanvas } from "@/components/canvas/GenerativeCanvas";

export function Hero() {
  const { ref } = useScramble({
    text: "Blockchain developer and full-stack engineer building decentralized systems.",
    speed: 0.8,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  return (
    <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24">
      <div className="space-y-6">
        <h1 className="font-pixel text-[clamp(2.5rem,6vw,5rem)] leading-tight">
          Viraj<br />
          <span className="text-accent-yellow">Bhartiya</span>
        </h1>
        <p ref={ref} className="font-mono text-sm text-muted max-w-md leading-relaxed" />
      </div>
      <div className="h-[400px] md:h-[500px]">
        <GenerativeCanvas
          config={{ variant: "swirl", seed: 42, color: "#00efa6" }}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
```

**Step 2: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6">
      <Hero />
    </main>
  );
}
```

**Step 3: Verify, commit**
```bash
git add components/home/Hero.tsx app/page.tsx
git commit -m "feat: add hero section with pixel typography and generative canvas"
```

---

## Task 7: Home Page — Featured Cards Section

**File:** Create `components/home/Featured.tsx`

Two side-by-side AsciiCards — one for a featured project, one for a featured blog post. Each has a generative canvas thumbnail.

Import latest blog post via `getRecentPosts(1)` in `app/page.tsx` (server) and pass as prop. Feature the first project from `projectData`.

**Commit message:** `feat: add featured project + post cards with generative art thumbnails`

---

## Task 8: Home Page — Experience Section

**File:** Create `components/home/Experience.tsx`

Move experience data to `data/experienceData.ts` (extract from legacy). Render as a clean monospace table/list with date ranges, roles, companies. No timeline dots — just clean rows.

**Commit message:** `feat: add experience section with monospace table layout`

---

## Task 9: Home Page — Projects Feed

**File:** Create `components/home/ProjectsFeed.tsx`

Use `projectData` from `data/projectData.tsx` (keep existing data file). Render as a feed table using `FeedRow` components. Section title with count badge: `/PROJECTS (22)`.

Add `date` field to project data entries (currently commented out in IProject). Populate dates.

**Commit message:** `feat: add projects feed table with filterable rows`

---

## Task 10: Home Page — Blog Feed

**File:** Create `components/home/BlogFeed.tsx`

Server component. Call `getAllPosts()` and render as feed table using `FeedRow`. Section title: `/FEED`.

**Commit message:** `feat: add blog feed section with date/name/type table`

---

## Task 11: Home Page — Assembly

**File:** `app/page.tsx`

Wire all sections together in order:
1. Hero
2. Featured
3. Experience
4. ProjectsFeed
5. BlogFeed

Wrap each section with appropriate spacing (`mt-24`). Add scroll-reveal animations with framer-motion `motion.div` (fade-up on viewport enter).

**Commit message:** `feat: assemble complete home page with all sections`

---

## Task 12: Blog Listing Page (`/blog`)

**Files:** Create `app/blog/page.tsx`

Full-page feed table. Keep the `gray-matter` blog system from `lib/blog.ts` (copy from legacy if removed). Header + Footer shell. Title in pixel font. Filterable by tags.

**Commit message:** `feat: add blog listing page with feed table`

---

## Task 13: Blog Post Page (`/blog/[slug]`)

**Files:** Create `app/blog/[slug]/page.tsx`, `app/blog/[slug]/BlogContent.tsx`

- Hero: pixel font title, date, tags
- Body: Geist Sans, max-w-3xl centered, markdown rendered
- Code blocks: Geist Mono with accent syntax highlighting
- Copy from legacy `BlogContent.tsx` for the markdown renderer, restyle to match

**Commit message:** `feat: add blog post page with pixel title and markdown body`

---

## Task 14: 404 Page

**File:** Create `app/not-found.tsx`

ASCII art "404" with scramble animation. Simple centered layout with a "go home" BracketLink.

**Commit message:** `feat: add ASCII 404 page with scramble animation`

---

## Task 15: Animations & Polish

- Scroll reveal: framer-motion `motion.div` with `whileInView` on each home section
- Hover effects: border glow on AsciiCards, row highlight on FeedRows
- Keyboard shortcut visual feedback: brief flash on bracket when key pressed
- Ensure responsive (mobile: single column, smaller pixel font, stack hero vertically)

**Commit message:** `feat: add scroll animations, hover effects, and responsive polish`

---

## Task 16: Preserve Config & Public Assets

Ensure these are preserved from original:
- `next.config.js` — keep all redirects (`/cv`, `/resume`, `/meet`, social shortcuts)
- `public/` — keep `og-image.png`, `Viraj_Bhartiya.pdf`, favicons, `robots.txt`, `sitemap.xml`, `images/Blog/` (for blog post images)
- `content/blog/` — all markdown files (already in place, not in legacy)
- `lib/blog.ts` — the blog utility functions

Remove from public: `languages/` (tech logos), `images/Projects/` (old project thumbnails), `fonts/protoMono/` (replaced by geist mono).

**Commit message:** `chore: clean up public assets and preserve config`

---

## Task 17: Final Build & Cleanup

**Step 1: Full build verification**
```bash
npm run build
npm run type-check
npm run format
```

**Step 2: Delete legacy folder**
```bash
rm -rf legacy/
rm -rf ui/  # stripe.dev screenshots
```

**Step 3: Final commit**
```bash
git add -A
git commit -m "chore: remove legacy backup and finalize ASCII redesign"
```

# Viraj Bhartiya - The Portfolio

_My portfolio. Because apparently everyone needs one. Here's mine._

---

## What This Is

It's a website. About me. Built because recruiters kept asking for one and I got tired of explaining what I do.

**Not another generic developer portfolio.** This one actually works, looks decent, and doesn't make your eyes bleed.

### What I Actually Care About

- **It works**: No broken links, no 404s, no "coming soon" bullshit
- **It's fast**: Because nobody has time for slow websites
- **It's responsive**: Works on your phone, tablet, and that weird ultrawide monitor you bought
- **It's accessible**: Reduced-motion support, semantic HTML, real focus states. Not everyone can see.
- **It's honest**: No fake metrics, no inflated numbers, just real projects

---

## Tech Stack (The Stuff That Actually Matters)

| Thing         | What I Used                | Why                                            |
| ------------- | -------------------------- | ---------------------------------------------- |
| **Framework** | Next.js 16 (App Router)    | Because RSC + ISR + dynamic OG is a free lunch |
| **Language**  | TypeScript                 | Because runtime errors are for amateurs        |
| **Styling**   | Tailwind CSS               | Because writing CSS is boring                  |
| **Font**      | Geist Mono                 | Monospace or it doesn't count                  |
| **3D**        | Spline                     | Because static is boring                       |
| **Blog**      | Markdown + custom renderer | Because MDX would have been overkill           |
| **OG Images** | next/og (satori)           | Per-post cards generated at build time         |
| **Analytics** | Vercel Analytics           | Because curiosity                              |
| **Hosting**   | Vercel                     | Because it just works                          |

---

## Features (The Cool Shit)

### What You'll Actually Notice

- An ASCII/terminal aesthetic — monospace, dark, no rounded corners
- A 3D ID-card scene in the hero (drag it around)
- Smooth section transitions that respect `prefers-reduced-motion`
- A real GitHub contribution graph fetched server-side and cached for an hour
- Blog posts with reading progress, sticky table of contents, and per-post OG cards

### What You Won't Notice (But Should)

- **A11y**: skip-to-content link, ARIA on the experience accordion and contribution grid, focus-visible everywhere
- **Perf**: Spline scenes lazy-loaded via `IntersectionObserver`, blog images wrapped in aspect-ratio containers (zero CLS), GitHub graph is a server component (no client fetch jank)
- **SEO**: dynamic sitemap (every blog post auto-included), robots.txt, JSON-LD `Person` + `WebSite` + per-post `Article` schemas, full OG/Twitter metadata
- **Type safety**: TypeScript everywhere, `tsc --noEmit` in CI

---

## Project Structure

```
app/                           # Next.js App Router
  page.tsx                     # Homepage (sections compose here)
  opengraph-image.tsx          # Dynamic OG card for /
  sitemap.ts, robots.ts        # SEO routes
  blog/
    page.tsx                   # /blog index
    opengraph-image.tsx        # OG card for /blog
    [slug]/
      page.tsx                 # Individual blog post
      BlogContent.tsx          # Markdown renderer
      opengraph-image.tsx      # Per-post OG card
components/
  home/                        # Section components (Hero, Experience, Wins, ...)
  layout/                      # Header, Footer
  ui/                          # Shared primitives (TableOfContents, ReadingProgress, ...)
  canvas/                      # Spline + ASCII canvas wrappers
content/blog/*.md              # Blog posts (gray-matter frontmatter)
data/                          # Static data: projects, experience, wins, opensource
lib/                           # blog.ts, github.ts, og.ts, utils.ts
```

---

## Getting Started (If You Really Want To)

### Prerequisites

- Node.js v18+
- npm (or yarn, I don't care)
- Basic understanding of how computers work

### Installation

```bash
# Clone this thing
git clone https://github.com/virajbhartiya/virajbhartiya.com.git

# Go into the folder
cd virajbhartiya.com

# Install stuff
npm install

# Run it
npm run dev
```

Open `http://localhost:3000` and there you go.

### Commands That Actually Work

| Command                | What It Does                                |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Starts the dev server                       |
| `npm run build`        | Builds for production                       |
| `npm run start`        | Serves the built version                    |
| `npm run type-check`   | `tsc --noEmit` — yells at you for bad types |
| `npm run format`       | Prettier-format the whole repo              |
| `npm run format:check` | Check formatting without writing            |

### Adding a Blog Post

Drop a markdown file in `content/blog/` with frontmatter:

```md
---
title: "Your Post Title"
description: "One-liner that shows in OG cards and feeds."
publishedAt: "2026-04-25"
tags: ["tag1", "tag2"]
image: "/images/Blog/your-banner.png"
author: "Viraj Bhartiya"
---

# Heading

Body...
```

The slug is derived from the title. Sitemap, RSS-style feed, and per-post OG card are all generated automatically.

---

## Deployment

It's on **Vercel** because:

- It's free
- It works
- I don't have to think about it

CI runs prettier and type-check on every push. Vercel previews every push.

**Live at**: [virajbhartiya.com](https://virajbhartiya.com)

---

## Contributions

Not accepting any. This is my personal site — code is here for reading, not for PRs. If you spot something genuinely broken, ping me; otherwise please don't open issues or pull requests.

---

## Contact (If You Really Need To)

[![Website](https://img.shields.io/badge/Website-Portfolio-4A90E2?style=for-the-badge)](https://virajbhartiya.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/virajbhartiya/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/virajbhartiya)

---

**Built by [Viraj Bhartiya](https://virajbhartiya.com) because apparently this is what we do now.**

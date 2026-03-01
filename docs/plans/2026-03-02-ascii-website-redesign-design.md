# ASCII Website Redesign — Design Document

## Overview

Complete redesign of virajbhartiya.com with an ASCII/developer-focused aesthetic inspired by stripe.dev. Same content (portfolio + blog), entirely new design system. Work happens on a separate branch.

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0a0f1a` | Deep navy-black background |
| `--fg` | `#e2e8f0` | Primary text |
| `--accent` | `#00efa6` | Signature mint green — links, highlights, borders |
| `--accent-yellow` | `#facc15` | Pixel font highlights (like stripe.dev's yellow "Dev") |
| `--muted` | `#64748b` | Dates, secondary labels |
| `--border` | `#1e293b` | Subtle teal-tinted borders |

### Typography

All fonts from the `geist` npm package (already installed).

| Role | Font | Usage |
|------|------|-------|
| Display | **Geist Pixel** | Large headings: "Viraj Bhartiya", section titles |
| Mono | **Geist Mono** | Nav, labels, dates, tags, `/SECTION` headers |
| Body | **Geist Sans** | Descriptions, paragraphs, body text |

### Component Primitives

- **BracketLink** — `[B] BLOG` style nav items with working keyboard shortcuts
- **SectionLabel** — `/SECTION_NAME` slash-prefixed monospace section header
- **Tag** — monospace bordered pill: `BLOCKCHAIN`, `RUST`, `VIDEO`
- **AsciiCard** — bordered card with generative art canvas thumbnail, `Fig. N` label
- **FeedRow** — table row with date, name, type columns
- **GenerativeCanvas** — parametric art component (swirl, grid, particle variants)

## Generative Art System

Custom Canvas 2D API — no external library.

### Art Variants

1. **Swirl** — parametric spiral with configurable twist, noise, velocity (hero background)
2. **Grid** — dot/line grid with wave distortion (card thumbnails)
3. **Particle Field** — floating particles with connections (alternate thumbnails)

Each canvas accepts a seed/config object for deterministic unique visuals per project/post.

## Page Layouts

### Navigation (all pages)

```
■  [B] BLOG  [P] PROJECTS  [G] GITHUB  [R] RESUME     [C] CONTACT
```

- Bracket items are clickable and respond to keyboard shortcuts
- Fixed top bar with backdrop blur
- Monospace (Geist Mono)

### Home Page (`/`)

1. **Hero** — Two-column: Geist Pixel name + tagline (left), large generative art canvas (right)
2. **Featured** — Two AsciiCards side by side: featured project + featured blog post, each with canvas thumbnail and `Fig. N` label
3. **Experience** — Timeline table: date range, role, company. Monospace layout
4. **Projects** — Feed table with `/DATE`, `/NAME`, `/TAGS` columns. Count badge `(21)` next to section title
5. **Blog Feed** — Feed table with `/DATE`, `/NAME`, `/TYPE` columns
6. **Footer** — Large wireframe pixel text "DEVELOPER", three-column links (docs/social/resources), copyright

### Blog Listing (`/blog`)

Full-page version of the Feed section with filters by topic/type.

### Blog Post (`/blog/[slug]`)

- Hero with post title (Geist Pixel), date, tags
- Body in Geist Sans, max-width centered
- Code blocks in Geist Mono with accent-colored syntax
- Share button and back navigation

### 404 Page

ASCII art "404" with scramble animation.

## Animations

- **Generative canvas** — continuous parametric animation (requestAnimationFrame)
- **Text scramble** — existing `use-scramble` for hero name on load
- **Keyboard nav** — bracket items highlight on keypress
- **Hover effects** — subtle border glow on cards, row highlight on feed items
- **Scroll reveals** — fade-up on section entry (keep AOS or replace with Framer Motion)

## Technical Decisions

- **Remove:** Spline 3D scenes, react-fast-marquee, react-github-calendar
- **Keep:** Next.js App Router, Tailwind CSS, shadcn/ui primitives, framer-motion, use-scramble, gray-matter blog system
- **Add:** Geist Pixel font import, custom canvas generative art components, keyboard shortcut handler
- **Branch:** All work on `feat/ascii-redesign` branch

## Pages & Routes (unchanged)

| Route | Description |
|-------|-------------|
| `/` | Home — all sections |
| `/blog` | Blog feed listing |
| `/blog/[slug]` | Individual blog post |
| `/cv`, `/resume` | Redirect to PDF |
| `/meet` | Redirect to cal.com |
| `/github`, `/linkedin`, `/twitter`, `/youtube` | Social redirects |

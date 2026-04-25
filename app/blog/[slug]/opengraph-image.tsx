import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const alt = "Blog post by Viraj Bhartiya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer | null> {
  try {
    // Request the full font (no text subset). The text-subset endpoint
    // sometimes returns GSUB tables that satori's opentype parser can't
    // handle ("lookupType: 6 - substFormat: 1 is not yet supported").
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`;
    const css = await (
      await fetch(url, {
        headers: {
          // The CSS endpoint serves WOFF2 by default to modern UAs; faking a
          // legacy UA gets a TTF, which the parser handles more reliably.
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
        },
      })
    ).text();
    const match = css.match(/src:\s*url\((.+?)\)\s*format/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

const COLORS = {
  bg: "#0a0a0a",
  fg: "#c8c8c8",
  accent: "#00efa6",
  accentBlue: "#5eafff",
  muted: "#6a6a6a",
  border: "#222",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Blog";
  const description =
    post?.description ??
    "Writing about blockchain, distributed systems, and software engineering.";
  const author = post?.author ?? "Viraj Bhartiya";
  const publishedAt = post?.publishedAt
    ? formatDate(post.publishedAt)
    : "";
  const readTime = post?.readTime ?? 0;
  const tags = post?.tags ?? [];

  const [regular, medium] = await Promise.all([
    loadGoogleFont("Geist Mono", 400),
    loadGoogleFont("Geist Mono", 500),
  ]);

  const fonts = [
    ...(regular
      ? [{ name: "GeistMono", data: regular, style: "normal" as const, weight: 400 as const }]
      : []),
    ...(medium
      ? [{ name: "GeistMono", data: medium, style: "normal" as const, weight: 500 as const }]
      : []),
  ];

  // Truncate long titles/descriptions so they don't overflow
  const truncate = (s: string, n: number) =>
    s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

  const safeTitle = truncate(title, 85);
  const safeDescription = truncate(description, 160);
  const fontFamily = fonts.length ? "GeistMono, monospace" : "monospace";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: COLORS.bg,
          color: COLORS.fg,
          fontFamily,
          position: "relative",
        }}
      >
        {/* subtle accent grid in background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 80% 20%, rgba(0,239,166,0.08), transparent 45%), radial-gradient(circle at 15% 85%, rgba(94,175,255,0.05), transparent 50%)`,
            display: "flex",
          }}
        />

        {/* terminal top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 56px",
            borderBottom: `1px solid ${COLORS.border}`,
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: COLORS.accent,
              }}
            />
            <span style={{ color: COLORS.muted }}>
              ~/viraj/blog · {slug}.md
            </span>
          </div>
          <div style={{ color: COLORS.accent, letterSpacing: 3, fontSize: 20 }}>
            LIVE
          </div>
        </div>

        {/* content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {/* metadata */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 22,
                color: COLORS.muted,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {publishedAt && (
                <span style={{ color: COLORS.accentBlue }}>{publishedAt}</span>
              )}
              {publishedAt && readTime > 0 && (
                <span style={{ color: COLORS.border }}>·</span>
              )}
              {readTime > 0 && <span>{readTime} min read</span>}
            </div>

            {/* title */}
            <div
              style={{
                display: "flex",
                fontSize: safeTitle.length > 50 ? 68 : 82,
                lineHeight: 1.05,
                color: "#f5f5f5",
                letterSpacing: -1,
                fontWeight: 500,
                maxWidth: 1056,
              }}
            >
              {safeTitle}
            </div>

            {/* description */}
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "rgba(200,200,200,0.72)",
                lineHeight: 1.45,
                maxWidth: 960,
              }}
            >
              {safeDescription}
            </div>
          </div>

          {/* bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 22,
              color: COLORS.muted,
              borderTop: `1px solid ${COLORS.border}`,
              paddingTop: 28,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: COLORS.accent }}>$</span>
              <span style={{ color: "rgba(200,200,200,0.85)" }}>by</span>
              <span style={{ color: "#f5f5f5" }}>{author}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: COLORS.accent }}>▸</span>
              <span style={{ color: COLORS.fg }}>virajbhartiya.com</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}

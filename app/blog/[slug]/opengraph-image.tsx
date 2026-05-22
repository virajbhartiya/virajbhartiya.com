import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { loadGeistMonoFonts, OG_COLORS, OG_SIZE } from "@/lib/og";

export const alt = "Blog post by Viraj Bhartiya";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

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
  const publishedAt = post?.publishedAt ? formatDate(post.publishedAt) : "";
  const readTime = post?.readTime ?? 0;

  const { fonts, fontFamily } = await loadGeistMonoFonts();

  const truncate = (s: string, n: number) =>
    s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

  const safeTitle = truncate(title, 85);
  const safeDescription = truncate(description, 160);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: OG_COLORS.bg,
          color: OG_COLORS.fg,
          fontFamily,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 80% 20%, rgba(0,239,166,0.08), transparent 45%), radial-gradient(circle at 15% 85%, rgba(94,175,255,0.05), transparent 50%)`,
            display: "flex",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 56px",
            borderBottom: `1px solid ${OG_COLORS.border}`,
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ color: OG_COLORS.muted }}>
              ~/viraj/blog · {slug}.md
            </span>
          </div>
          <div
            style={{
              color: OG_COLORS.accent,
              letterSpacing: 3,
              fontSize: 20,
            }}
          >
            LIVE
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Metadata */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 22,
                color: OG_COLORS.muted,
                letterSpacing: 2,
                textTransform: "lowercase",
              }}
            >
              {publishedAt && (
                <span style={{ color: OG_COLORS.accentBlue }}>
                  {publishedAt}
                </span>
              )}
              {publishedAt && readTime > 0 && (
                <span style={{ color: OG_COLORS.border }}>·</span>
              )}
              {readTime > 0 && <span>{readTime} min read</span>}
            </div>

            {/* Title */}
            <div
              style={{
                display: "flex",
                fontSize: safeTitle.length > 50 ? 68 : 82,
                lineHeight: 1.05,
                color: OG_COLORS.fgBright,
                letterSpacing: -1,
                fontWeight: 500,
                maxWidth: 1056,
              }}
            >
              {safeTitle}
            </div>

            {/* Description */}
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

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 22,
              color: OG_COLORS.muted,
              borderTop: `1px solid ${OG_COLORS.border}`,
              paddingTop: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: OG_COLORS.accent }}>$</span>
              <span style={{ color: "rgba(200,200,200,0.85)" }}>by</span>
              <span style={{ color: OG_COLORS.fgBright }}>{author}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: OG_COLORS.accent }}>{">"}</span>
              <span style={{ color: OG_COLORS.fg }}>virajbhartiya.com</span>
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

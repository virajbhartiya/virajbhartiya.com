import { ImageResponse } from "next/og";
import { loadGeistMonoFonts, OG_COLORS, OG_SIZE } from "@/lib/og";
import { getAllPosts } from "@/lib/blog";

export const alt = "Blog — Viraj Bhartiya";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OgImage() {
  const { fonts, fontFamily } = await loadGeistMonoFonts();
  const posts = getAllPosts();
  const postCount = posts.length;

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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                background: OG_COLORS.accent,
                color: OG_COLORS.bg,
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: -1,
              }}
            >
              VB
            </div>
            <span style={{ color: OG_COLORS.muted }}>~/viraj/blog</span>
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
            padding: "72px 72px 56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Section label */}
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
              <span style={{ color: OG_COLORS.accent }}>▸</span>
              <span>writing</span>
              {postCount > 0 && (
                <>
                  <span style={{ color: OG_COLORS.border }}>·</span>
                  <span style={{ color: OG_COLORS.accentBlue }}>
                    {postCount} {postCount === 1 ? "post" : "posts"}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <div
              style={{
                display: "flex",
                fontSize: 124,
                lineHeight: 0.95,
                color: OG_COLORS.fgBright,
                letterSpacing: -3,
                fontWeight: 500,
              }}
            >
              Blog
            </div>

            {/* Description */}
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "rgba(200,200,200,0.78)",
                lineHeight: 1.45,
                maxWidth: 960,
                marginTop: 8,
              }}
            >
              Notes on blockchain, distributed systems, and software engineering
              — the hard-won lessons that don&apos;t fit on a resume.
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
              paddingTop: 22,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: OG_COLORS.accent }}>$</span>
              <span style={{ color: "rgba(200,200,200,0.85)" }}>by</span>
              <span style={{ color: OG_COLORS.fgBright }}>Viraj Bhartiya</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: OG_COLORS.accent }}>▸</span>
              <span style={{ color: OG_COLORS.fg }}>
                virajbhartiya.com/blog
              </span>
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

/**
 * Load a Google-hosted font for use in next/og ImageResponse.
 *
 * Forces TTF over WOFF2 (via a legacy UA) and skips the text-subset
 * endpoint because that path returns GSUB tables satori's opentype
 * parser cannot read ("lookupType: 6 - substFormat: 1 is not yet
 * supported"). Returns null on failure so the caller can fall back to
 * the system monospace.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+",
    )}:wght@${weight}`;
    const css = await (
      await fetch(url, {
        headers: {
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

export async function loadGeistMonoFonts() {
  const [regular, medium] = await Promise.all([
    loadGoogleFont("Geist Mono", 400),
    loadGoogleFont("Geist Mono", 500),
  ]);
  const fonts = [
    ...(regular
      ? [
          {
            name: "GeistMono" as const,
            data: regular,
            style: "normal" as const,
            weight: 400 as const,
          },
        ]
      : []),
    ...(medium
      ? [
          {
            name: "GeistMono" as const,
            data: medium,
            style: "normal" as const,
            weight: 500 as const,
          },
        ]
      : []),
  ];
  return {
    fonts,
    fontFamily: fonts.length ? "GeistMono, monospace" : "monospace",
  };
}

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLORS = {
  bg: "#0a0a0a",
  fg: "#c8c8c8",
  fgBright: "#f5f5f5",
  accent: "#00efa6",
  accentBlue: "#5eafff",
  muted: "#7a7a7a",
  border: "#2a2a2a",
} as const;

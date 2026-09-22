import { readFile } from "fs/promises";
import path from "path";

const GEIST_MONO_DIR = path.join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-mono",
);

/**
 * Load a Geist Mono TTF from the `geist` package for next/og ImageResponse.
 *
 * Reads the complete font from disk rather than Google Fonts: the Google
 * CSS is split into unicode-range subsets, and taking the first one gave
 * satori a Cyrillic-only face, so Latin text silently fell back to the
 * default sans. Returns null on failure so the caller can fall back to
 * the system monospace.
 */
async function loadGeistMonoFile(file: string): Promise<ArrayBuffer | null> {
  try {
    const data = await readFile(path.join(GEIST_MONO_DIR, file));
    return data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
  } catch {
    return null;
  }
}

export async function loadGeistMonoFonts() {
  const [regular, medium] = await Promise.all([
    loadGeistMonoFile("GeistMono-Regular.ttf"),
    loadGeistMonoFile("GeistMono-Medium.ttf"),
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

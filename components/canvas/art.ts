export type ArtConfig = {
  variant: "swirl" | "grid" | "particles" | "ring" | "matrix" | "scope";
  seed: number;
  color: string;
  speed?: number;
};

const ASCII_CHARS = ".·:;+*#@%&";

// Deterministic PRNG (mulberry32)
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

// ─── ORIGINAL VARIANTS (used in Feed & Router sidebars) ──────────────────────

function renderSwirl(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  config: ArtConfig,
) {
  const rand = mulberry32(config.seed);
  const speed = config.speed ?? 0.4;
  const t = time * 0.001 * speed;
  const cx = w / 2;
  const cy = h / 2;
  const charSize = 12;
  const cols = Math.floor(w / charSize);
  const rows = Math.floor(h / charSize);
  const maxR = Math.min(w, h) * 0.45;
  const arms = 3 + Math.floor(rand() * 2);
  const twist = 3 + rand() * 3;

  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * charSize + charSize / 2;
      const y = row * charSize + charSize / 2;

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      let intensity = 0;
      for (let arm = 0; arm < arms; arm++) {
        const armAngle = (arm / arms) * Math.PI * 2;
        const spiralAngle = armAngle + (dist / maxR) * twist + t;
        const diff = Math.abs(
          ((angle - spiralAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI,
        );
        intensity += Math.max(0, 1 - diff * 2) * Math.max(0, 1 - dist / maxR);
      }

      intensity = Math.min(1, intensity);
      if (intensity < 0.05) continue;

      const charIdx = Math.floor(intensity * (ASCII_CHARS.length - 1));
      const alpha = Math.floor(intensity * 180 + 40);
      ctx.fillStyle =
        config.color + alpha.toString(16).padStart(2, "0");
      ctx.fillText(ASCII_CHARS[charIdx], x, y);
    }
  }
}

function renderGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  config: ArtConfig,
) {
  const rand = mulberry32(config.seed);
  const speed = config.speed ?? 0.5;
  const t = time * 0.001 * speed;
  const charSize = 14;
  const cols = Math.floor(w / charSize);
  const rows = Math.floor(h / charSize);
  const baseChars = "░▒▓█·.+*";

  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const offsets: number[] = [];
  for (let i = 0; i < cols * rows; i++) {
    offsets.push(rand() * Math.PI * 2);
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * charSize + charSize / 2;
      const y = row * charSize + charSize / 2;
      const idx = row * cols + col;

      const wave1 = Math.sin(x * 0.03 + t * 1.2 + offsets[idx]) * 0.5 + 0.5;
      const wave2 = Math.cos(y * 0.025 - t * 0.8) * 0.5 + 0.5;
      const intensity = wave1 * wave2;

      const dx = x - w / 2;
      const dy = y - h / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.sqrt(w * w + h * h) / 2;
      const fade = 1 - (dist / maxDist) * 0.6;

      const finalIntensity = intensity * fade;
      if (finalIntensity < 0.1) continue;

      const charIdx = Math.floor(finalIntensity * (baseChars.length - 1));
      const alpha = Math.floor(finalIntensity * 150 + 30);
      ctx.fillStyle =
        config.color + alpha.toString(16).padStart(2, "0");
      ctx.fillText(baseChars[charIdx], x, y);
    }
  }
}

function renderParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  config: ArtConfig,
) {
  const rand = mulberry32(config.seed);
  const speed = config.speed ?? 0.3;
  const t = time * 0.001 * speed;
  const count = 80;
  const connectionDist = 80;
  const charSize = 10;

  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const particles: Array<{ bx: number; by: number; char: string }> = [];
  const particleChars = "*+·.@#";
  for (let i = 0; i < count; i++) {
    particles.push({
      bx: rand() * w,
      by: rand() * h,
      char: particleChars[Math.floor(rand() * particleChars.length)],
    });
  }

  const positions = particles.map((p, i) => ({
    x: p.bx + Math.sin(t + i * 0.5) * 25,
    y: p.by + Math.cos(t * 0.7 + i * 0.3) * 25,
    char: p.char,
  }));

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionDist) {
        const alpha = (1 - dist / connectionDist) * 0.3;
        const steps = Math.floor(dist / charSize);
        ctx.fillStyle =
          config.color +
          Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0");
        for (let s = 1; s < steps; s++) {
          const frac = s / steps;
          const mx = positions[i].x + dx * -frac;
          const my = positions[i].y + dy * -frac;
          ctx.fillText("·", mx, my);
        }
      }
    }
  }

  positions.forEach((p) => {
    ctx.fillStyle = config.color + "bb";
    ctx.fillText(p.char, p.x, p.y);
  });
}

// ─── HERO VARIANTS ───────────────────────────────────────────────────────────

/**
 * RING KALEIDOSCOPE — mandala of ASCII characters
 * count=106, kaleids=6.43, twirl=0.5, velocity=0.379
 */
function renderRing(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  config: ArtConfig,
) {
  const rand = mulberry32(config.seed);
  const speed = config.speed ?? 0.379;
  const t = time * 0.001 * speed;

  const cx = w / 2;
  const cy = h / 2;
  const charSize = 10;
  const kaleids = 6.43;
  const twirlAmt = 0.5;
  const maxR = Math.min(w, h) * 0.44;
  const numRings = 8;
  const [cr, cg, cb] = hexToRgb(config.color);

  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const ringChars = ["·", ".", ":", "+", "░", "▒", "▓", "█"];
  const segAngle = (Math.PI * 2) / kaleids;
  const numK = Math.ceil(kaleids);
  const fractionalK = kaleids % 1;

  for (let ring = 0; ring < numRings; ring++) {
    const ringR = ((ring + 1) / numRings) * maxR;
    const pts = Math.floor(((8 + ring * 4) / kaleids) * kaleids);
    const ringChar = ringChars[ring % ringChars.length];

    const ringPhase = rand() * Math.PI * 2;
    const ringPulse = 1 + 0.08 * Math.sin(t * 1.5 + ringPhase);

    for (let p = 0; p < pts; p++) {
      const baseAngle = (p / pts) * segAngle;

      const twirl =
        twirlAmt * (ringR / maxR) * Math.sin(t * 0.6 + ring * 0.8);

      for (let k = 0; k < numK; k++) {
        const kAngle = k * segAngle;
        const mirrored = k % 2 === 1;
        const angle =
          (mirrored ? segAngle - baseAngle : baseAngle) +
          kAngle +
          twirl +
          t * 0.12;

        const r = ringR * ringPulse;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (x < -5 || x > w + 5 || y < -5 || y > h + 5) continue;

        const intensity =
          0.2 +
          0.8 *
            (0.5 +
              0.5 *
                Math.sin(baseAngle * kaleids * 3 + t * 1.2 + ring * 0.5));

        const kaleidFade = k < Math.floor(kaleids) ? 1 : fractionalK;
        const ringFade = 0.5 + 0.5 * (ring / numRings);
        const alpha = intensity * kaleidFade * ringFade * 0.8;

        if (alpha < 0.03) continue;

        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx.fillText(ringChar, x, y);
      }
    }
  }

  ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.6)`;
  ctx.fillText("◎", cx, cy);
}

/**
 * MATRIX RAIN — falling columns of mixed ASCII + katakana
 */
function renderMatrix(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  config: ArtConfig,
) {
  const rand = mulberry32(config.seed);
  const speed = config.speed ?? 0.4;
  const t = time * 0.001 * speed;
  const charSize = 13;
  const cols = Math.floor(w / charSize);
  const rows = Math.floor(h / charSize);
  const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const [cr, cg, cb] = hexToRgb(config.color);

  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const colSpeed: number[] = [];
  const colOffset: number[] = [];
  const colLength: number[] = [];
  for (let c = 0; c < cols; c++) {
    colSpeed.push(0.5 + rand() * 1.5);
    colOffset.push(rand() * rows * 2);
    colLength.push(5 + Math.floor(rand() * 15));
  }

  for (let col = 0; col < cols; col++) {
    const headRow =
      ((t * colSpeed[col] * 8 + colOffset[col]) % (rows + colLength[col])) -
      colLength[col] / 2;

    for (let row = 0; row < rows; row++) {
      const dist = headRow - row;
      if (dist < 0 || dist > colLength[col]) continue;

      const brightness = 1 - dist / colLength[col];
      const isHead = dist < 1.5;

      const x = col * charSize + charSize / 2;
      const y = row * charSize + charSize / 2;

      const charSeed = Math.floor(t * 3 + col * 7 + row * 13);
      const ch = chars[Math.abs(charSeed) % chars.length];

      if (isHead) {
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.9})`;
      } else {
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${brightness * 0.7})`;
      }
      ctx.fillText(ch, x, y);
    }
  }
}

/**
 * OSCILLOSCOPE — analogue waveform display with grid and scan lines
 */
function renderScope(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  config: ArtConfig,
) {
  const rand = mulberry32(config.seed);
  const speed = config.speed ?? 0.5;
  const t = time * 0.001 * speed;
  const charSize = 12;
  const cols = Math.floor(w / charSize);
  const rows = Math.floor(h / charSize);
  const [cr, cg, cb] = hexToRgb(config.color);

  ctx.font = `${charSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Faint grid
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * charSize + charSize / 2;
      const y = row * charSize + charSize / 2;
      if (col % 4 === 0 && row % 4 === 0) {
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.08)`;
        ctx.fillText("·", x, y);
      }
      if (row === Math.floor(rows / 2)) {
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.06)`;
        ctx.fillText("─", x, y);
      }
      if (col === Math.floor(cols / 2)) {
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.06)`;
        ctx.fillText("│", x, y);
      }
    }
  }

  // Waveforms
  const waveParams: Array<{
    freq: number;
    amp: number;
    phase: number;
    alpha: number;
  }> = [];
  for (let i = 0; i < 3; i++) {
    waveParams.push({
      freq: 1 + rand() * 3,
      amp: 0.15 + rand() * 0.25,
      phase: rand() * Math.PI * 2,
      alpha: 0.3 + rand() * 0.5,
    });
  }

  for (const wave of waveParams) {
    let prevRow = -1;

    for (let col = 0; col < cols; col++) {
      const x = col / cols;
      const waveY =
        Math.sin(x * wave.freq * Math.PI * 2 + t * 2 + wave.phase) *
          wave.amp +
        Math.sin(x * wave.freq * 0.5 * Math.PI * 2 + t * 1.3 + wave.phase) *
          wave.amp *
          0.3;

      const row = Math.floor((0.5 + waveY) * rows);
      if (row < 0 || row >= rows) {
        prevRow = row;
        continue;
      }

      const px = col * charSize + charSize / 2;
      const py = row * charSize + charSize / 2;

      let ch: string;
      if (prevRow === -1 || Math.abs(row - prevRow) === 0) {
        ch = "─";
      } else if (row < prevRow) {
        ch = "/";
      } else {
        ch = "\\";
      }

      ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${wave.alpha})`;
      ctx.fillText(ch, px, py);

      if (prevRow !== -1 && Math.abs(row - prevRow) > 1) {
        const step = row > prevRow ? 1 : -1;
        for (let r = prevRow + step; r !== row; r += step) {
          if (r >= 0 && r < rows) {
            ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${wave.alpha * 0.5})`;
            ctx.fillText("│", px, r * charSize + charSize / 2);
          }
        }
      }

      prevRow = row;
    }
  }

  // Label
  ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.2)`;
  ctx.font = `${charSize - 2}px monospace`;
  ctx.textAlign = "left";
  ctx.fillText("SCOPE", charSize, charSize);
  ctx.fillText(`${(t * 10).toFixed(1)}ms`, charSize, charSize * 2);
}

// ─── DISPATCHER ──────────────────────────────────────────────────────────────

export function render(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  config: ArtConfig,
) {
  switch (config.variant) {
    case "swirl":
      renderSwirl(ctx, w, h, time, config);
      break;
    case "grid":
      renderGrid(ctx, w, h, time, config);
      break;
    case "particles":
      renderParticles(ctx, w, h, time, config);
      break;
    case "ring":
      renderRing(ctx, w, h, time, config);
      break;
    case "matrix":
      renderMatrix(ctx, w, h, time, config);
      break;
    case "scope":
      renderScope(ctx, w, h, time, config);
      break;
  }
}

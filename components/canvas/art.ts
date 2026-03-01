export type ArtConfig = {
  variant: "swirl" | "grid" | "particles";
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

      // Spiral intensity
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
        config.color +
        alpha.toString(16).padStart(2, "0");
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

  // Pre-generate grid offsets from seed
  const offsets: number[] = [];
  for (let i = 0; i < cols * rows; i++) {
    offsets.push(rand() * Math.PI * 2);
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * charSize + charSize / 2;
      const y = row * charSize + charSize / 2;
      const idx = row * cols + col;

      // Wave-based intensity
      const wave1 = Math.sin(x * 0.03 + t * 1.2 + offsets[idx]) * 0.5 + 0.5;
      const wave2 = Math.cos(y * 0.025 - t * 0.8) * 0.5 + 0.5;
      const intensity = wave1 * wave2;

      // Distance fade from center
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
        config.color +
        alpha.toString(16).padStart(2, "0");
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

  // Generate stable particle positions
  const particles: Array<{ bx: number; by: number; char: string }> = [];
  const particleChars = "*+·.@#";
  for (let i = 0; i < count; i++) {
    particles.push({
      bx: rand() * w,
      by: rand() * h,
      char: particleChars[Math.floor(rand() * particleChars.length)],
    });
  }

  // Animate positions
  const positions = particles.map((p, i) => ({
    x: p.bx + Math.sin(t + i * 0.5) * 25,
    y: p.by + Math.cos(t * 0.7 + i * 0.3) * 25,
    char: p.char,
  }));

  // Draw connections as dashes
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

  // Draw particles
  positions.forEach((p) => {
    ctx.fillStyle = config.color + "bb";
    ctx.fillText(p.char, p.x, p.y);
  });
}

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
  }
}

export type ArtConfig = {
  variant: "swirl" | "grid" | "particles";
  seed: number;
  color: string;
  speed?: number;
};

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
  const speed = config.speed ?? 0.5;
  const t = time * 0.001 * speed;
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.45;
  const arms = 3 + Math.floor(rand() * 3); // 3-5 arms
  const twist = 2 + rand() * 4;
  const points = 200;

  ctx.lineWidth = 1;

  for (let arm = 0; arm < arms; arm++) {
    const armOffset = (arm / arms) * Math.PI * 2;
    ctx.beginPath();

    for (let i = 0; i < points; i++) {
      const frac = i / points;
      const r = frac * maxR;
      const angle = armOffset + frac * twist + t;
      const wobble = Math.sin(frac * 8 + t * 2) * (r * 0.05);

      const x = cx + Math.cos(angle) * (r + wobble);
      const y = cy + Math.sin(angle) * (r + wobble);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    const alpha = 0.15 + rand() * 0.2;
    ctx.strokeStyle =
      config.color +
      Math.floor(alpha * 255)
        .toString(16)
        .padStart(2, "0");
    ctx.stroke();
  }

  // Center glow
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.3);
  gradient.addColorStop(0, config.color + "15");
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
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
  const spacing = 20 + Math.floor(rand() * 10);
  const cols = Math.ceil(w / spacing);
  const rows = Math.ceil(h / spacing);

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * spacing + spacing / 2;
      const y = row * spacing + spacing / 2;

      // Wave distortion
      const distX = Math.sin(y * 0.02 + t) * 5;
      const distY = Math.cos(x * 0.02 + t * 0.7) * 5;

      const dist = Math.sqrt(
        Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2),
      );
      const maxDist = Math.sqrt(w * w + h * h) / 2;
      const alpha = Math.max(0.05, 0.4 - (dist / maxDist) * 0.35);

      const radius = 1 + Math.sin(dist * 0.01 - t * 2) * 0.8;

      ctx.beginPath();
      ctx.arc(x + distX, y + distY, Math.max(0.5, radius), 0, Math.PI * 2);
      ctx.fillStyle =
        config.color +
        Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0");
      ctx.fill();
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
  const count = 60;
  const connectionDist = 100;

  // Generate stable particle positions from seed
  const particles: Array<{ bx: number; by: number }> = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      bx: rand() * w,
      by: rand() * h,
    });
  }

  // Animate positions
  const positions = particles.map((p, i) => ({
    x: p.bx + Math.sin(t + i * 0.5) * 30,
    y: p.by + Math.cos(t * 0.7 + i * 0.3) * 30,
  }));

  // Draw connections
  ctx.lineWidth = 0.5;
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionDist) {
        const alpha = (1 - dist / connectionDist) * 0.2;
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[j].x, positions[j].y);
        ctx.strokeStyle =
          config.color +
          Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.stroke();
      }
    }
  }

  // Draw particles
  positions.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = config.color + "60";
    ctx.fill();
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

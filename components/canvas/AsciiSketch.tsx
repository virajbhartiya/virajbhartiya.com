"use client";

import { useRef, useEffect, useState } from "react";
import type p5Type from "p5";

// Character sets ordered by visual density (sparse to dense)
const SPARSE = ["·", ".", ":", "+", "×"];
const MEDIUM = ["░", "◇", "○", "*", "~"];
const DENSE = ["▒", "▓", "█", "◆", "●"];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const GREEN: [number, number, number] = [0, 239, 166];
const BLUE: [number, number, number] = [94, 175, 255];
const BG = 10; // #0a0a0a

type IdleHandle = number;
type RequestIdle = (cb: () => void, opts?: { timeout: number }) => IdleHandle;
type CancelIdle = (id: IdleHandle) => void;

export function AsciiSketch({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5Type | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Defer p5 mount until the browser is idle so it doesn't block the LCP.
  useEffect(() => {
    if (reducedMotion) return;
    const w = window as unknown as {
      requestIdleCallback?: RequestIdle;
      cancelIdleCallback?: CancelIdle;
    };
    let idleId: IdleHandle | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    } else {
      timeoutId = setTimeout(() => setReady(true), 600);
    }

    return () => {
      if (idleId !== undefined && w.cancelIdleCallback)
        w.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    if (!containerRef.current) return;

    let cancelled = false;

    import("p5").then((mod) => {
      if (cancelled || !containerRef.current) return;
      const p5 = mod.default;

      const sketch = (p: p5Type) => {
        const CELL = 14;
        let cols = 0;
        let rows = 0;

        // Per-cell state stored as flat typed arrays for performance
        let cellOffsetX: Float32Array; // drift offset x
        let cellOffsetY: Float32Array; // drift offset y
        let cellPhase: Float32Array; // noise phase per cell
        let cellSpeed: Float32Array; // individual drift speed

        // Ripple system
        interface Ripple {
          x: number;
          y: number;
          t: number; // age in frames
          strength: number;
        }
        let ripples: Ripple[] = [];
        let lastRippleFrame = 0;

        // Mouse state
        let mouseActive = false;
        let mx = -1000;
        let my = -1000;
        let prevMx = -1000;
        let prevMy = -1000;
        let mouseSpeed = 0;

        function idx(col: number, row: number) {
          return row * cols + col;
        }

        function initCells() {
          const total = cols * rows;
          cellOffsetX = new Float32Array(total);
          cellOffsetY = new Float32Array(total);
          cellPhase = new Float32Array(total);
          cellSpeed = new Float32Array(total);
          for (let i = 0; i < total; i++) {
            cellPhase[i] = p.random(0, 1000);
            cellSpeed[i] = p.random(0.3, 1.0);
          }
        }

        p.setup = () => {
          const w = containerRef.current!.offsetWidth;
          const h = containerRef.current!.offsetHeight;
          p.createCanvas(w, h);
          p.textFont("monospace");
          p.textAlign(p.CENTER, p.CENTER);
          p.noStroke();
          p.colorMode(p.RGB, 255);
          cols = Math.floor(w / CELL);
          rows = Math.floor(h / CELL);
          initCells();
        };

        p.mouseMoved = () => {
          if (!containerRef.current) return;
          const newMx = p.mouseX;
          const newMy = p.mouseY;

          // Check if mouse is inside canvas
          if (
            newMx >= 0 &&
            newMx <= p.width &&
            newMy >= 0 &&
            newMy <= p.height
          ) {
            prevMx = mx;
            prevMy = my;
            mx = newMx;
            my = newMy;
            mouseActive = true;

            const dx = mx - prevMx;
            const dy = my - prevMy;
            mouseSpeed = Math.sqrt(dx * dx + dy * dy);

            // Spawn ripple on movement, throttled
            if (p.frameCount - lastRippleFrame > 8 && mouseSpeed > 2) {
              ripples.push({
                x: mx,
                y: my,
                t: 0,
                strength: Math.min(mouseSpeed / 10, 1.5),
              });
              lastRippleFrame = p.frameCount;
              // Cap ripple count
              if (ripples.length > 12) ripples.shift();
            }
          } else {
            mouseActive = false;
          }
        };

        p.draw = () => {
          p.background(BG);

          // Detect mouse leaving canvas
          if (
            mouseActive &&
            (p.mouseX < 0 ||
              p.mouseX > p.width ||
              p.mouseY < 0 ||
              p.mouseY > p.height)
          ) {
            mouseActive = false;
          }

          const t = p.frameCount * 0.01;
          const mouseInfluenceRadius = 160;
          const mouseInfluenceRadiusSq =
            mouseInfluenceRadius * mouseInfluenceRadius;

          // Update ripples
          for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].t++;
            if (ripples[i].t > 90) {
              ripples.splice(i, 1);
            }
          }

          // Render grid
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const i = idx(col, row);
              const phase = cellPhase[i];
              const speed = cellSpeed[i];

              // Base position with organic drift
              const driftX =
                Math.sin(t * speed + phase) * 1.5 +
                Math.sin(t * 0.7 * speed + phase * 2.3) * 0.8;
              const driftY =
                Math.cos(t * 0.8 * speed + phase * 1.7) * 1.2 +
                Math.sin(t * 0.5 * speed + phase * 3.1) * 0.6;

              cellOffsetX[i] = driftX;
              cellOffsetY[i] = driftY;

              const px = col * CELL + CELL / 2 + driftX;
              const py = row * CELL + CELL / 2 + driftY;

              // --- Mouse proximity ---
              let mouseProximity = 0;
              if (mouseActive) {
                const mdx = px - mx;
                const mdy = py - my;
                const distSq = mdx * mdx + mdy * mdy;
                if (distSq < mouseInfluenceRadiusSq) {
                  const dist = Math.sqrt(distSq);
                  mouseProximity = 1 - dist / mouseInfluenceRadius;
                  // Ease it for smoother falloff
                  mouseProximity = mouseProximity * mouseProximity;
                }
              }

              // --- Ripple contribution ---
              let rippleValue = 0;
              for (let r = 0; r < ripples.length; r++) {
                const rip = ripples[r];
                const rdx = px - rip.x;
                const rdy = py - rip.y;
                const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
                const rippleRadius = rip.t * 4; // expands outward
                const rippleWidth = 40;
                const distFromRing = Math.abs(rDist - rippleRadius);
                if (distFromRing < rippleWidth) {
                  const rippleAge = 1 - rip.t / 90; // fade with age
                  const ringIntensity = 1 - distFromRing / rippleWidth;
                  rippleValue += ringIntensity * rippleAge * rip.strength * 0.6;
                }
              }
              rippleValue = Math.min(rippleValue, 1);

              // --- Combined intensity ---
              // Base: subtle noise-based breathing
              const baseNoise =
                Math.sin(t * 1.2 + phase + col * 0.15) * 0.5 + 0.5;
              const breathe = 0.08 + baseNoise * 0.12; // base alpha range 0.08-0.20

              const intensity = Math.min(
                breathe + mouseProximity * 0.85 + rippleValue * 0.7,
                1,
              );

              // --- Character selection ---
              let ch: string;
              if (intensity > 0.7) {
                // Near cursor or strong ripple: dense/glyph chars
                if (mouseProximity > 0.6 && p.random() < 0.3) {
                  ch = GLYPHS[Math.floor(p.random(0, GLYPHS.length))];
                } else {
                  ch = DENSE[Math.floor(intensity * (DENSE.length - 0.01))];
                }
              } else if (intensity > 0.35) {
                const mi = Math.floor(
                  ((intensity - 0.35) / 0.35) * (MEDIUM.length - 0.01),
                );
                ch = MEDIUM[mi];
              } else {
                // Sparse background
                const si = Math.floor(
                  (intensity / 0.35) * (SPARSE.length - 0.01),
                );
                ch = SPARSE[Math.max(0, si)];
              }

              // --- Color ---
              // Blend green->blue based on a spatial wave + mouse proximity
              const colorWave =
                Math.sin(col * 0.08 + row * 0.12 + t * 2) * 0.5 + 0.5;
              let blueBlend = colorWave * 0.25; // subtle base blue accent
              // Mouse influence pushes toward blue
              blueBlend += mouseProximity * 0.5;
              // Ripples carry blue tint
              blueBlend += rippleValue * 0.4;
              blueBlend = Math.min(blueBlend, 1);

              const cr = GREEN[0] + (BLUE[0] - GREEN[0]) * blueBlend;
              const cg = GREEN[1] + (BLUE[1] - GREEN[1]) * blueBlend;
              const cb = GREEN[2] + (BLUE[2] - GREEN[2]) * blueBlend;

              // Alpha from intensity
              const alpha = intensity * 255;

              // --- Size ---
              // Characters near cursor get slightly larger
              const size = CELL + mouseProximity * 5 + rippleValue * 2;

              p.textSize(size);
              p.fill(cr, cg, cb, alpha);
              p.text(ch, px, py);
            }
          }

          // --- Floating accent particles (sparse, decorative) ---
          // A handful of brighter characters that float independently
          const particleCount = 8;
          for (let i = 0; i < particleCount; i++) {
            const seed = i * 137.5;
            const fx =
              ((Math.sin(t * 0.4 + seed) * 0.5 + 0.5) * (cols - 2) + 1) * CELL;
            const fy =
              ((Math.cos(t * 0.3 + seed * 1.3) * 0.5 + 0.5) * (rows - 2) + 1) *
              CELL;
            const flicker = Math.sin(t * 3 + seed * 2.7) * 0.5 + 0.5;
            const pAlpha = flicker * 180 + 40;
            const isBlue = i % 3 === 0;
            const pc = isBlue ? BLUE : GREEN;

            p.textSize(CELL + flicker * 3);
            p.fill(pc[0], pc[1], pc[2], pAlpha);
            const pch = DENSE[Math.floor(flicker * (DENSE.length - 0.01))];
            p.text(pch, fx, fy);
          }
        };

        p.windowResized = () => {
          if (!containerRef.current) return;
          const w = containerRef.current.offsetWidth;
          const h = containerRef.current.offsetHeight;
          p.resizeCanvas(w, h);
          cols = Math.floor(w / CELL);
          rows = Math.floor(h / CELL);
          initCells();
        };
      };

      sketchRef.current = new p5(sketch, containerRef.current!);
    });

    return () => {
      cancelled = true;
      sketchRef.current?.remove();
    };
  }, [ready, reducedMotion]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      {reducedMotion && (
        <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-muted">
          [sketch paused — reduced motion]
        </div>
      )}
    </div>
  );
}

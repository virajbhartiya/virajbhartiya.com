"use client";

import { useState, useEffect, useRef } from "react";

const SCRAMBLE_CHARS = "░▒▓█■□●◆◇".split("");

/** Cycles through random ASCII characters before settling on final text (one-time on mount) */
export function AsciiScramble({
  text,
  className,
  speed = 40,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [display, setDisplay] = useState(text);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const chars = text.split("");
    const resolved = new Array(chars.length).fill(false);
    let frame = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (!mounted.current) return;
        frame++;

        const next = chars.map((ch, i) => {
          if (ch === " ") return " ";
          if (resolved[i]) return ch;
          if (frame > (i + 1) * 2 + 3) {
            resolved[i] = true;
            return ch;
          }
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        });

        setDisplay(next.join(""));

        if (resolved.every(Boolean)) {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      mounted.current = false;
      clearTimeout(timeout);
    };
  }, [text, speed, delay]);

  return <span className={className}>{display}</span>;
}

/** Continuously cycles a set of ASCII characters in place */
export function AsciiCycle({
  chars = ["◇", "◆", "○", "●", "□", "■"],
  interval = 600,
  className,
}: {
  chars?: string[];
  interval?: number;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % chars.length);
    }, interval);
    return () => clearInterval(id);
  }, [chars.length, interval]);

  return <span className={className} aria-hidden="true">{chars[idx]}</span>;
}

/** Smooth wave animation — characters pulse opacity in sequence */
export function AsciiWave({
  text,
  className,
  speed = 120,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), speed);
    return () => clearInterval(id);
  }, [speed]);

  return (
    <span className={className} aria-hidden="true">
      {text.split("").map((ch, i) => {
        const wave = Math.sin((tick + i) * 0.4) * 0.5 + 0.5;
        const opacity = 0.15 + wave * 0.35;
        return (
          <span key={i} style={{ opacity }}>{ch}</span>
        );
      })}
    </span>
  );
}

/** Animated progress/loading bar using ASCII */
export function AsciiBar({
  width = 20,
  className,
}: {
  width?: number;
  className?: string;
}) {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPos((p) => (p + 1) % (width + 4));
    }, 100);
    return () => clearInterval(id);
  }, [width]);

  const bar = Array.from({ length: width }, (_, i) => {
    const dist = Math.abs(i - pos);
    if (dist === 0) return "█";
    if (dist === 1) return "▓";
    if (dist === 2) return "▒";
    if (dist === 3) return "░";
    return "·";
  }).join("");

  return <span className={className} aria-hidden="true">[{bar}]</span>;
}

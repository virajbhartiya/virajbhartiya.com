"use client";

import { useEffect, useRef } from "react";
import { type ArtConfig, render } from "./art";

interface GenerativeCanvasProps {
  config: ArtConfig;
  className?: string;
}

export function GenerativeCanvas({ config, className }: GenerativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const animate = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, rect.width, rect.height);
      render(ctx, rect.width, rect.height, time, config);
      animationId = requestAnimationFrame(animate);
    };

    // Delay initial setup to ensure layout is complete
    requestAnimationFrame(() => {
      resize();
      animationId = requestAnimationFrame(animate);
    });

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

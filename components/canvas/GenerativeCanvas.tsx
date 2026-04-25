"use client";

import { useEffect, useRef, useCallback } from "react";
import { type ArtConfig, render } from "./art";
import { playClick } from "@/lib/audio";

interface GenerativeCanvasProps {
  config: ArtConfig;
  className?: string;
}

export function GenerativeCanvas({ config, className }: GenerativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedMultiplierRef = useRef(1);
  const sizeRef = useRef({ w: 0, h: 0 });

  const handlePointerDown = useCallback(() => {
    speedMultiplierRef.current = 3;
    playClick();
  }, []);

  const handlePointerUp = useCallback(() => {
    speedMultiplierRef.current = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let running = true;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;
      // Only resize if dimensions actually changed
      if (sizeRef.current.w === w && sizeRef.current.h === h) return;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let virtualTime = 0;
    let prevRealTime = 0;

    const animate = (realTime: number) => {
      if (!running) return;
      const { w, h } = sizeRef.current;

      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (prevRealTime > 0) {
        const dt = Math.min(realTime - prevRealTime, 100); // cap dt to avoid jumps
        virtualTime += dt * speedMultiplierRef.current;
      } else {
        virtualTime = realTime;
      }
      prevRealTime = realTime;

      ctx.clearRect(0, 0, w, h);
      render(ctx, w, h, virtualTime, config);
      animationId = requestAnimationFrame(animate);
    };

    // Delay to ensure layout is complete
    const initId = requestAnimationFrame(() => {
      resize();
      animationId = requestAnimationFrame(animate);
    });

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      running = false;
      cancelAnimationFrame(initId);
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [config, handlePointerUp]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        cursor: "pointer",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    />
  );
}

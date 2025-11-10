"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function UseLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);

    if (prefersReducedMotion || isTouch) {
      return;
    }

    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.4,
      lerp: 0.1,
      wheelMultiplier: 0.92,
      touchMultiplier: 0.9,
      easing: (x: number) => 1 - Math.pow(1 - x, 1.6),
    });

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    let rafId = requestAnimationFrame(raf);

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}

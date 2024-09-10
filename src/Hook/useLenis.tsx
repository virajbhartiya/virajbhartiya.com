"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function UseLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      easing: (x: number) => 1 - Math.pow(1 - x, 5),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

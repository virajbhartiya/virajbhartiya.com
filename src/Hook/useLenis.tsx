"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function UseLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on("scroll", (e: any) => {
      console.log(e);
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

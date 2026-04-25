"use client";

import { LazySplineScene } from "@/components/canvas/LazySplineScene";

export function Hello() {
  return (
    <section id="hello" className="mt-16 sm:mt-20">
      <LazySplineScene
        scene="https://prod.spline.design/5FXqsFsRkQCB37UF/scene.splinecode"
        className="h-[240px] sm:h-[420px] md:h-[480px] w-full overflow-hidden"
      />
    </section>
  );
}

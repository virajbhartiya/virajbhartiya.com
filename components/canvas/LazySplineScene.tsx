"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface LazySplineSceneProps {
  scene: string;
  className?: string;
  fallback?: ReactNode;
}

export function LazySplineScene({
  scene,
  className,
  fallback,
}: LazySplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapperRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  const fallbackElement = fallback ?? (
    <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-widest text-muted">
      {reducedMotion ? "scene paused (reduced motion)" : "loading scene..."}
    </div>
  );

  return (
    <div ref={wrapperRef} className={className}>
      {shouldLoad && !reducedMotion ? (
        <Suspense fallback={fallbackElement}>
          <Spline scene={scene} />
        </Suspense>
      ) : (
        fallbackElement
      )}
    </div>
  );
}

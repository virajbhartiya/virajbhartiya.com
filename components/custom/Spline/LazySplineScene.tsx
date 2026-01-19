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

type LazySplineSceneProps = {
  scene: string;
  className?: string;
  fallback?: ReactNode;
};

export const LazySplineScene = ({
  scene,
  className,
  fallback,
}: LazySplineSceneProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  const fallbackElement = fallback ?? (
    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-muted-foreground/60">
      Loading scene...
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <Suspense fallback={fallbackElement}>
          <Spline scene={scene} />
        </Suspense>
      ) : (
        fallbackElement
      )}
    </div>
  );
};

"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const Spline = lazy(() => import("@splinetool/react-spline"));

// IntersectionObserver support never changes for the lifetime of the page, so
// there is nothing to subscribe to. This just defers the check until after
// hydration — assuming support on the server keeps the markup identical.
const subscribeNever = () => () => {};
const hasIntersectionObserver = () =>
  typeof IntersectionObserver !== "undefined";
const assumeSupported = () => true;

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
  const [intersected, setIntersected] = useState(false);
  const reducedMotion = useReducedMotion();
  const supportsObserver = useSyncExternalStore(
    subscribeNever,
    hasIntersectionObserver,
    assumeSupported,
  );

  useEffect(() => {
    if (reducedMotion || !supportsObserver) return;
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIntersected(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion, supportsObserver]);

  // Without IntersectionObserver there is no way to detect the wrapper
  // scrolling into view, so load eagerly rather than never.
  const shouldLoad = intersected || !supportsObserver;

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

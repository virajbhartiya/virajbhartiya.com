"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

// document.referrer is fixed for the lifetime of the page, so there is nothing
// to subscribe to. Reading it through useSyncExternalStore defers the check
// until after hydration without syncing it into state from an effect.
const subscribeNever = () => () => {};

function getCanGoBack(): boolean {
  try {
    const ref = document.referrer;
    if (!ref) return false;
    return (
      new URL(ref).origin === window.location.origin &&
      ref !== window.location.href
    );
  } catch {
    // Invalid referrer URL — stick with fallback
    return false;
  }
}

function assumeCannotGoBack(): boolean {
  return false;
}

interface BackLinkProps {
  fallback: string;
  fallbackLabel: string;
  backLabel?: string;
  className?: string;
}

export function BackLink({
  fallback,
  fallbackLabel,
  backLabel = "back",
  className,
}: BackLinkProps) {
  const router = useRouter();
  const canGoBack = useSyncExternalStore(
    subscribeNever,
    getCanGoBack,
    assumeCannotGoBack,
  );

  const handleClick = (e: React.MouseEvent) => {
    if (canGoBack) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <a href={fallback} onClick={handleClick} className={className}>
      &larr; {canGoBack ? backLabel : fallbackLabel}
    </a>
  );
}

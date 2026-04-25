"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    try {
      const ref = document.referrer;
      if (!ref) return;
      const refOrigin = new URL(ref).origin;
      if (refOrigin === window.location.origin && ref !== window.location.href) {
        setCanGoBack(true);
      }
    } catch {
      // Invalid referrer URL — stick with fallback
    }
  }, []);

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

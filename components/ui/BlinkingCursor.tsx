"use client";

export function BlinkingCursor() {
  return (
    <span
      className="inline-block w-[6px] h-[14px] bg-accent ml-1 motion-safe:animate-pulse"
      aria-hidden="true"
    />
  );
}

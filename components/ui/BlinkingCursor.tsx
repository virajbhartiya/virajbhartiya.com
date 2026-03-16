"use client";

export function BlinkingCursor() {
  return (
    <span className="inline-block w-[6px] h-[14px] bg-accent animate-pulse ml-1" aria-hidden="true" />
  );
}

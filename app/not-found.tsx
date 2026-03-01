"use client";

import { useScramble } from "use-scramble";
import { BracketLink } from "@/components/ui/BracketLink";

export default function NotFound() {
  const { ref } = useScramble({
    text: "The page you're looking for doesn't exist or has been moved.",
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 6,
    seed: 0,
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <pre className="font-mono text-accent text-xs leading-tight mb-8 select-none">
{`
 ██╗  ██╗ ██████╗ ██╗  ██╗
 ██║  ██║██╔═══██╗██║  ██║
 ███████║██║   ██║███████║
 ╚════██║██║   ██║╚════██║
      ██║╚██████╔╝     ██║
      ╚═╝ ╚═════╝      ╚═╝
`}
      </pre>
      <h1 className="font-pixel text-2xl mb-4">Page Not Found</h1>
      <p ref={ref} className="font-mono text-sm text-muted max-w-md text-center mb-8" />
      <BracketLink label="Home" shortcut="H" href="/" />
    </main>
  );
}

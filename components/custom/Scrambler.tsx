"use client";

import { useScramble } from "use-scramble";

const Scrambler = ({ text, duration }: { text: string; duration?: number }) => {
  const scrambleDuration = duration ?? 1;
  const { ref, replay } = useScramble({
    text: text,
    range: [65, 125],
    speed: 0.4,
    tick: 1,
    step: 5,
    scramble: scrambleDuration,
    seed: 2,
    chance: 1,
    overdrive: true,
  });

  return (
    <span ref={ref} onMouseOver={replay} onFocus={replay} className="proto" />
  );
};

export default Scrambler;

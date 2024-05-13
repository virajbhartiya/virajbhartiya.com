import { useScramble } from "use-scramble";

const Scrambler = ({ text }: { text: string }) => {
  const { ref, replay } = useScramble({
    text: text,
    range: [65, 125],
    speed: 0.2,
    tick: 1,
    step: 5,
    scramble: Infinity,
    seed: 2,
    chance: 1,
    overdrive: true,
  });

  return (
    <a ref={ref} onMouseOver={replay} onFocus={replay} className="proto" />
  );
};

export default Scrambler;

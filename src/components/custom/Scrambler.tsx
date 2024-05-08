import { useScramble } from 'use-scramble'

const Scrambler = ({ text }: { text: string }) => {
  const { ref, replay } = useScramble({
    text: text,
    range: [65, 125],
    speed: 0.4,
    tick: 1,
    step: 5,
    scramble: 6,
    seed: 2,
    chance: 1,
    overdrive: true,
    overflow: true,
  })

  return <a ref={ref} onMouseOver={replay} onFocus={replay} />
}

export default Scrambler

import Marquee from "react-fast-marquee";

export function SentenceMarquee() {
  const sentence = ["It's", "Nice", "To", "Meet", "You"];

  return (
    <div className="py-14">
      <h3 className="text-center text-2xl font-thin accent proto">
        Proficiencies
      </h3>
      <div className="relative mt-6 overflow-hidden">
        <Marquee speed={100}>
          {sentence.map((word) => (
            <h1 className="proto text-5xl mx-4 accent">{word} </h1>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

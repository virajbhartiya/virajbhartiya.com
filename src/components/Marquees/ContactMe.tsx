import Marquee from "react-fast-marquee";
import Scrambler from "../custom/Scrambler";

export function ContactMarquee() {
  const elements = [
    <p className="accent proto text-2xl md:text-6xl m-6">Freelance?</p>,
    <a href="mailto:vlbhartiya@gmail.com">
      <p className="proto bg-[var(--accent)] text-black text-2xl md:text-6xl">
        <Scrambler duration={5} text="Email me" />
      </p>
    </a>,
    <p className="accent proto text-2xl md:text-6xl m-6">Collaboration?</p>,
    <a href="mailto:vlbhartiya@gmail.com">
      <p className="proto bg-[var(--accent)] text-black text-2xl md:text-6xl">
        <Scrambler duration={5} text="Email me" />
      </p>
    </a>,
  ];

  return (
    <a>
      <div className="w-full h-0.5 bg-[var(--accent)]" />

      <div className="relative overflow-hidden ">
        <Marquee pauseOnHover={true} speed={150}>
          {elements.map((element) => element)}
        </Marquee>
      </div>

      <div className="w-full h-0.5 bg-[var(--accent)]" />
    </a>
  );
}

"use client";

import Marquee from "react-fast-marquee";
import Scrambler from "../custom/Scrambler";

export function ContactMarquee() {
  const elements = [
    <p key="freelance" className="accent proto text-2xl md:text-6xl m-6">
      Freelance?
    </p>,
    <a key="email1" href="mailto:vlbhartiya@gmail.com">
      <p className="proto bg-[var(--accent)] text-black text-2xl md:text-6xl">
        <Scrambler duration={5} text="Email me" />
      </p>
    </a>,
    <p key="collaboration" className="accent proto text-2xl md:text-6xl m-6">
      Collaboration?
    </p>,
    <a key="email2" href="mailto:vlbhartiya@gmail.com">
      <p className="proto bg-[var(--accent)] text-black text-2xl md:text-6xl">
        <Scrambler duration={5} text="Email me" />
      </p>
    </a>,
  ];

  return (
    <div>
      <div className="w-full h-0.5 bg-[var(--accent)]" />

      <div className="relative overflow-hidden ">
        <Marquee pauseOnHover={true} speed={60} gradient={false}>
          {elements.map((element) => element)}
        </Marquee>
      </div>

      <div className="w-full h-0.5 bg-[var(--accent)]" />
    </div>
  );
}

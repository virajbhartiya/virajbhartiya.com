import Marquee from "react-fast-marquee";

export function ContactMarquee() {
  const elements = [
    <p className="accent proto text-2xl md:text-6xl m-6">
      Let's Create Something TOgether
    </p>,
    <p className="proto bg-[var(--accent)] text-black text-2xl md:text-6xl">
      Email me
    </p>,
  ];

  return (
    <a>
      <div className="w-full h-0.5 bg-[var(--accent)]" />
      <a href="mailto:vlbhartiya@gmail.com">
        <div className="relative overflow-hidden ">
          <Marquee pauseOnHover={true} speed={150}>
            {elements.map((element) => element)}
          </Marquee>
        </div>
      </a>
      <div className="w-full h-0.5 bg-[var(--accent)]" />
    </a>
  );
}

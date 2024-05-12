import Marquee from "react-fast-marquee";

export function DownloadCVMarquee() {
  const sentence = ["Resume"];

  return (
    <div className="relative overflow-hidden ">
      <Marquee speed={100}>
        {sentence.map((word) => (
          <p className="proto accent mx-4 ">{word}</p>
        ))}
      </Marquee>
    </div>
  );
}

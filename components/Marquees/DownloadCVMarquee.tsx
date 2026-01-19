"use client";

import Marquee from "react-fast-marquee";

export function DownloadCVMarquee() {
  const sentence = [
    "Resume",
    "Resume",
    "Resume",
    "Resume",
    "Resume",
    "Resume",
    "Resume",
  ];

  return (
    <div className="relative overflow-hidden ">
      <Marquee speed={100}>
        {sentence.map((word, index) => (
          <p key={index} className="proto accent mx-4 ">
            {word}
          </p>
        ))}
      </Marquee>
    </div>
  );
}

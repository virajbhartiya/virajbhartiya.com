"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Arrow } from "../svg/arrow";

export function LanguageMaqruee() {
  const languages = [
    "TS",
    "Postman",
    "MongoDB",
    "Python",
    "Firebase",
    "React",
    "AWS",
    "Flutter",
    "Rust",
    "Docker",
    "Express",
    "Tailwind",
    "Appscript",
    "PostgreSQL",
    "Nodejs",
    "Shopify",
    "Sass",
    "Swift",
    "Git",
    "Figma",
    "Terraform",
    "Golang",
  ];

  return (
    <div className="py-14">
      <div
        className="flex-row w-max flex"
        style={{ transform: "rotate(4deg)" }}
      >
        <p className="accent proto">Stuff I&apos;ve Worked with</p>
        <Arrow />
      </div>
      <div className="relative mt-6 overflow-hidden">
        <Marquee
          speed={60}
          direction="right"
          gradient={false}
          pauseOnHover={true}
        >
          {languages.map((logo, idx) => (
            <Image
              key={idx}
              src={`/languages/${logo}.png`}
              width={40}
              height={40}
              className="h-10 w-auto [margin:var(--gap)] grayscale"
              alt={`logo-${logo}`}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

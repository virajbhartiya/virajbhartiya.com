"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

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
      <h2 className="text-3xl font-light accent proto text-center">
        Technologies
      </h2>
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

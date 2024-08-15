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
  ];

  return (
    <div className="py-14">
      <div
        className="flex-row w-max flex"
        style={{ transform: "rotate(4deg)" }}
      >
        <p className="accent proto">Stuff I've Worked with</p>
        <Arrow />
      </div>
      <div className="relative mt-6 overflow-hidden">
        <Marquee speed={125}>
          {languages.map((logo, idx) => (
            <img
              key={idx}
              src={`/languages/${logo}.png`}
              className="h-10 [margin:var(--gap)] grayscale"
              alt={`logo-${logo}`}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

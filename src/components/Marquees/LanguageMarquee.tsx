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
    "Vercel",
    "AWS",
    "Flutter",
    "Express",
    "Tailwind",
    "Appscript",
    "Nodejs",
    "Sass",
    "Swift",
    "Git",
    "Figma",
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
      <h3 className="md:hidden text-center text-2xl font-thin accent proto">
        Proficiencies
      </h3>
      <div className="relative mt-6 overflow-hidden">
        <Marquee speed={50}>
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

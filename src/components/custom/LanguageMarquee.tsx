import Marquee from "react-fast-marquee";

export function LanguageMaqruee() {
  const languages = [
    "TS",
    "Postman",
    "MongoDB",
    "Python",
    "Firebase",
    "React",
    "Flutter",
    "Express",
    "Tailwind",
    "Appscript",
    "Nodejs",
    "Sass",
    "Git",
    "Figma",
  ];

  return (

      <div className="py-14">
          <h3 className="text-center text-3xl font-thin accent proto">
            Proficiencies
          </h3>
          <div className="relative mt-6 overflow-hidden">
              <Marquee speed={50}
              >
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

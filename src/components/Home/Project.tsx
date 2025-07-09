import { useState } from "react";
import { IProject } from "@/types/interface";
import { Badge } from "@/components/ui/badge";

export const Project = ({
  project,
  index,
}: {
  project: IProject;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  const isMobileOrTablet = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };

  const handleMouseEnter = () => {
    if (!isMobileOrTablet()) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileOrTablet()) {
      setHovered(false);
    }
  };

  return (
    <a href={project.link} target="_blank" rel="noreferrer">
      <div
        className={`border my-4 p-4 rounded ${hovered ? "border-[var(--accent)] " : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="w-full justify-between flex flex-col md:flex-row gap-4"
        >
          <div className={`flex flex-row items-center gap-4`}>
            <div className={`proto ${hovered ? "text-white" : "accent"}`}>
              [{index}]
            </div>

            <p className="text-2xl ">{project.title}</p>
          </div>
          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <Badge
                variant={"outline"}
                className={`font-normal proto `}
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {hovered && (
          <div className="absolute z-10 w-full justify-between flex">
            <div className="absolute z-10 max-w-[30vw] max-h-[10vh] ">
              <img
                src={project.image}
                alt={`${project.title} - ${project.description.substring(0, 100)}...`}
                className="rounded-lg w-full border border-[var(--accent)] bg-black"
              />
            </div>
            <div className="bg-black p-4 rounded m-2 w-3/12 right-0 absolute border border-[var(--accent)]">
              <p>{project.description}</p>
            </div>
          </div>
        )}
      </div>
    </a>
  );
};

import { IProject } from "@/types/interface";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const Project = ({ project }: { project: IProject }) => {
  return (
    <>
      <div className="w-full pb-4 space-y-2">
        <div className="w-full justify-between flex">
          <Link to={project.github}>
            <p className="accent underline-offset-4 underline ">
              {/* {project.title} */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Link>
          <div className="flex gap-2">
            <Badge
              variant={"outline"}
              className="font-light whitespace-nowrap "
            >
              {project.date}
            </Badge>
          </div>
        </div>
        <p className=" text-muted-foreground text-sm  ">
          {/* {project.description} */}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
          mollitia laudantium minus excepturi quia voluptatem ad! Iusto,
          consectetur necessitatibus nostrum voluptatibus repudiandae atque qui
          soluta, ratione, quas cumque accusantium. Voluptate.
        </p>
      </div>
    </>
  );
};

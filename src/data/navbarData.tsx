import { IRoute, IShareIcon } from "@/types/interface";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

export const routeList: IRoute[] = [
  {
    href: "/",
    label: "/",
  },
  {
    href: "/projects",
    label: "/projects",
  },
  {
    href: "/courses",
    label: "/courses",
  },
];

export const shareIcons: IShareIcon[] = [
  {
    icon: <Github size={16} />,
    link: "https://github.com/virajbhartiya",
  },
  {
    icon: <Linkedin size={16} />,
    link: "https://www.linkedin.com/in/viraj-bhartiya/",
  },
  {
    icon: <Twitter size={16} />,
    link: "https://twitter.com/heyxviraj",
  },
  {
    icon: <Youtube size={16} />,
    link: "https://www.youtube.com/channel/UCvwfCZDYeUKWdmHUAGhgsnQ",
  },
];

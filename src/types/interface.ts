export interface IRoute {
  href: string;
  label: string;
}

export interface IShareIcon {
  icon: React.ReactNode;
  link: string;
}

export interface IProject {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  // date: string;
}

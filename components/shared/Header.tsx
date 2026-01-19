"use client";

import Link from "next/link";
import Image from "next/image";
import { shareIcons } from "@/data/navbarData";
import { UnderlineHover } from "../custom/UnderlineHover";

const Header = () => {
  return (
    <header className="fixed w-[-webkit-fill-available] top-0 flex items-center justify-between p-4 z-50 backdrop-blur-sm">
      <div className="fixed top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
        <Image
          src="/images/star.png"
          width={100}
          height={100}
          className="rotate-animation"
          alt="Decorative rotating star animation"
          priority
        />
      </div>
      <div className="flex flex-col gap-2">
        <Link href="/">
          <UnderlineHover text="virajbhartiya.com" />
        </Link>
        <div className="flex gap-4">
          {shareIcons.map((shareIcon, index) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              href={shareIcon.link}
            >
              {shareIcon.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

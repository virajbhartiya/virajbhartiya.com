"use client";

import Link from "next/link";
import { UnderlineHover } from "../custom/UnderlineHover";

export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row gap-2 w-full shrink-0 items-center justify-center py-4 px-4 md:px-6">
      <span className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Viraj Bhartiya
      </span>
      <span className="hidden sm:inline text-gray-600">&middot;</span>
      <div className="flex gap-4 text-sm">
        <Link href="/blog">
          <UnderlineHover text="Blog" />
        </Link>
        <a
          href="https://github.com/virajbhartiya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UnderlineHover text="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/viraj-bhartiya/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UnderlineHover text="LinkedIn" />
        </a>
      </div>
    </footer>
  );
}

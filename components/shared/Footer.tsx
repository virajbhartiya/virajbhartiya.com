"use client";

import Link from "next/link";
import { UnderlineHover } from "../custom/UnderlineHover";
import { HeartIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex gap-2 sm:flex-row w-full shrink-0 items-center justify-center py-2 px-4 md:px-6">
      Made with <HeartIcon size={16} color="#00efa6" /> by{" "}
      <Link href="/">
        <UnderlineHover text="Viraj Bhartiya" />
      </Link>
    </footer>
  );
}

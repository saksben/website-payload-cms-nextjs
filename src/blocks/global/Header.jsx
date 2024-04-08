import React from "react";
import header from "@/globalData/header.json";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-screen bg-white py-4 px-6 border border-b-red-500 text-black flex justify-between items-center">
      <div className="relative h-10 w-20">
        <Image src={header.logo.url} fill className="object-contain" />
      </div>
      <div className="flex gap-2">
        {header.navLinks.map((link) => {
          return (
            <div>
              <Link href={link.link}>
                {link.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

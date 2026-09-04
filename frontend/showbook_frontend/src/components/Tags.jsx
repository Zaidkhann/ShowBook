"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Tags() {
  const pathname = usePathname();
  const links = [
    {name: "Home", href: "/"},
    { name: "Movies", href: "/movies" },
    { name: "Theaters", href: "/theatresbylocation" },
  ];

  return (
    <nav className="flex w-max shrink-0 items-center justify-center gap-5 ml-4 md:ml-24 md:gap-10"> {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
         return (
        <Link
          key={link.name}
          href={link.href}
          className={`
            ${
              isActive ? "text-white after:w-full" : "text-[#D5D7DC] hover:text-white after:w-0 hover:after:w-full"
            }
            relative
            py-2
            text-[15px]
            font-medium
            tracking-wide
           
            transition-all
            duration-200
            after:absolute
            after:bottom-0
            after:left-1/2
            after:h-[2px]
            after:-translate-x-1/2
            after:bg-red-600
            after:transition-all
            after:duration-200
          `}
        >
          {link.name}
        </Link>
         )
})}
    </nav>
  );
}

export default Tags;
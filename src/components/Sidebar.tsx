"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Vista 1",
    href: "/view/1",
  },
  {
    title: "Vista 2",
    href: "/view/2",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="[grid-area:aside] hidden md:flex border-r p-5 flex-col space-y-4">
      <div className="border py-3 flex justify-center">
        <h2>Logo</h2>
      </div>
      <nav className="flex flex-col pace-y-1">
        {
          links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === link.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {link.title}
            </Link>
          ))
        }
      </nav>
    </aside>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import useLanguage from "@/hooks/useLanguage";
import { Badge } from "../ui/badge";

export function HeaderNavItem({
    label,
    length,
}: {
    label: keyof MainNav;
    length: number;
}) {
    const pathname = usePathname();

    const { strings } = useLanguage();
    const mainNav = strings.mainNav as unknown as {
        [key: string]: { href: string; label: string };
    };
    const activeLink =
        "text-violet-500 font-semibold hover:text-violet-500 focus:text-violet-500";

    return (
        <Link
            href={mainNav[label].href}
            className={`max-h-10 flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                pathname === mainNav[label].href && activeLink
            }`}
        >
            <span className="text-sm font-medium leading-none">
                {mainNav[label].label}
            </span>
            {length > 0 && (
                <Badge className="ml-auto flex h-4 w-4 p-1 items-center justify-center rounded-full">
                    {length}
                </Badge>
            )}
        </Link>
    );
}

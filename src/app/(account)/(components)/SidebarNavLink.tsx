"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNavLink({
    label,
    href,
    Icon,
}: {
    label: string;
    href: string;
    Icon: LucideIcon;
}) {
    // const navItem = JSON.parse(item);
    const pathname = usePathname();

    // const IconComponent = item.icon;
    // const Icon = item.icon as LucideIcon;

    return (
        <Link
            key={label}
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
            <Icon className="h-6 w-6" />
            {label}
        </Link>
    );
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarNavLink({
    label,
    href,
    children,
}: {
    label: string;
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive
                    ? "text-primary font-semibold bg-zinc-100"
                    : "text-muted-foreground hover:text-primary"
            }`}
        >
            {children}
            {label}
        </Link>
    );
}

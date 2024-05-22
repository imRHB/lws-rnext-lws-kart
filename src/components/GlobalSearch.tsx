"use client";

import { usePathname } from "next/navigation";

import Search from "./Search";

export default function GlobalSearch() {
    const pathname = usePathname();

    return (
        <div>
            <Search route={pathname} />
        </div>
    );
}

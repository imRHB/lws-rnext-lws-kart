"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchContext } from "@/context";

export default function SearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [search, setSearch] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        const handleRouteChange = () => {
            setSearch("");
        };

        handleRouteChange();
    }, [pathname]);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

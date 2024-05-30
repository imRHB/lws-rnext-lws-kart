"use client";

import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import useLanguage from "@/hooks/useLanguage";
import useSearch from "@/hooks/useSearch";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";
import { Input } from "./ui/input";

interface Props {
    route: string;
}

export default function Search({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { strings } = useLanguage();
    const { search, setSearch } = useSearch();

    const query = searchParams.get("q");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "q",
                    value: search,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["q"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, route, pathname, router, searchParams, query]);

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
                placeholder={strings.search.placeholder}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
    );
}

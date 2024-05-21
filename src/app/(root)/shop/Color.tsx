"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";

interface Props {
    route: string;
}

export default function Color({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("color");

    const [color, setColor] = useState(query || "");

    useEffect(() => {
        if (color) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "color",
                value: color,
            });

            router.push(newUrl, { scroll: false });
        } else {
            if (pathname === route) {
                const newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["color"],
                });

                router.push(newUrl, { scroll: false });
            }
        }
    }, [color, route, pathname, router, searchParams, query]);

    return (
        <div>
            <ToggleGroup
                onValueChange={(value) => setColor(value)}
                type="single"
                value={color}
                variant="outline"
            >
                <ToggleGroupItem
                    value="violet"
                    className="rounded-full p-2 border-none"
                >
                    <div className="size-6 bg-violet-400 rounded-full" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="green"
                    className="rounded-full p-2 border-none"
                >
                    <div className="size-6 bg-green-400 rounded-full" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="orange"
                    className="rounded-full p-2 border-none"
                >
                    <div className="size-6 bg-orange-400 rounded-full" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";

interface Props {
    route: string;
}

export default function Size({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("size");

    const [size, setSize] = useState(query || "");

    useEffect(() => {
        if (size) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "size",
                value: size,
            });

            router.push(newUrl, { scroll: false });
        } else {
            if (pathname === route) {
                const newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["size"],
                });

                router.push(newUrl, { scroll: false });
            }
        }
    }, [size, route, pathname, router, searchParams, query]);

    return (
        <div>
            <ToggleGroup
                onValueChange={(value) => setSize(value)}
                type="single"
                value={size}
                variant="outline"
            >
                <ToggleGroupItem value="sm">S</ToggleGroupItem>
                <ToggleGroupItem value="md">M</ToggleGroupItem>
                <ToggleGroupItem value="lg">L</ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}

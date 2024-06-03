"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";

interface Props {
    route: string;
}

export default function Price({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pMinQuery = searchParams.get("pmin");
    const pMaxQuery = searchParams.get("pmax");

    const [priceMin, setPriceMin] = useState(Number(pMinQuery) || 0);
    const [priceMax, setPriceMax] = useState(Number(pMaxQuery) || 0);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (priceMin) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "pmin",
                    value: priceMin.toString(),
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["pmin"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [route, pathname, router, searchParams, priceMin]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (priceMax) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "pmax",
                    value: priceMax.toString(),
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["pmax"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [route, pathname, router, searchParams, priceMax]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
                <Label className="text-zinc-600">min</Label>
                <Input
                    type="number"
                    placeholder="min"
                    value={priceMin}
                    onChange={(evt) => setPriceMin(evt.target.valueAsNumber)}
                />
            </div>
            <div className="grid gap-3">
                <Label className="text-zinc-600">max</Label>
                <Input
                    type="number"
                    placeholder="max"
                    value={priceMax}
                    onChange={(evt) => setPriceMax(evt.target.valueAsNumber)}
                />
            </div>
        </div>
    );
}

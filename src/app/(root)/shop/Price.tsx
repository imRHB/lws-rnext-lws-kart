"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";

interface Props {
    route: string;
}

export default function Price({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pmin = searchParams.get("pmin");
    const pmax = searchParams.get("pmax");

    const [price, setPrice] = useState(
        { pmin: Number(pmin), pmax: Number(pmax) } || { pmin: 0, pmax: 0 }
    );

    console.log(price);

    useEffect(() => {
        if (price) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "pmin",
                value: price.pmin.toString(),
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
    }, [price, route, pathname, router, searchParams, pmin, pmax]);

    const onPriceChange = (evt) => {
        setPrice({
            ...price,
            [evt.target.id]: evt.target.value,
        });
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
                {/* <Label htmlFor="firstName">First Name</Label> */}
                <Input
                    id="pmin"
                    type="number"
                    placeholder="min"
                    value={price.pmin}
                    onChange={(evt) => onPriceChange(evt)}
                />
            </div>
            <div className="grid gap-3">
                {/* <Label htmlFor="lastName">Last Name</Label> */}
                <Input
                    id="pmax"
                    type="number"
                    placeholder="max"
                    value={price.pmax}
                    onChange={(evt) => onPriceChange(evt)}
                />
            </div>
        </div>
    );
}

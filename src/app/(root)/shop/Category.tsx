"use client";

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    route: string;
}

const categories = [
    { label: "Bedroom", value: "bedroom" },
    { label: "Living Room", value: "living_room" },
    { label: "Sofa", value: "sofa" },
];

export default function Category({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("category");

    const [category, setCategory] = useState(query || "");

    const [checkedState, setCheckedState] = useState([]);

    function handleCheckboxChange(value: string, checked: boolean) {}

    const filteredCategories = categories.filter((category) =>
        selectedCat.includes(category.value)
    );

    useEffect(() => {
        if (category) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "category",
                value: category,
            });

            router.push(newUrl, { scroll: false });
        } else {
            if (pathname === route) {
                const newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["category"],
                });

                router.push(newUrl, { scroll: false });
            }
        }
    }, [category, pathname, route, router, searchParams]);

    return (
        <div>
            <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Filter items by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {categories.map((cat, idx) => (
                    <div
                        key={cat.value}
                        className="flex items-center space-x-2"
                    >
                        <input
                            type="checkbox"
                            id={cat.value}
                            value={cat.value}
                            checked={false}
                            onChange={(evt) =>
                                handleCheckboxChange(
                                    evt.target.value,
                                    evt.target.checked
                                )
                            }
                        />
                        <label
                            htmlFor={cat.value}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {cat.label}
                        </label>
                    </div>
                ))}
            </CardContent>
        </div>
    );
}

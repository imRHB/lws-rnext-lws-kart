"use client";

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";
import { getCategories } from "@/lib/actions/category.action";
import { ICategory } from "@/models/category.model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    route: string;
}

export default function Category({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const categories = await getCategories();
            setCategories(categories);
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        const query = searchParams.get("category");

        if (query) {
            setSelectedCategories(query.split(","));
        } else {
            setSelectedCategories([]);
        }
    }, [searchParams]);

    useEffect(() => {
        const newQuery = selectedCategories.join(",");

        const newUrl = newQuery
            ? formUrlQuery({
                  params: searchParams.toString(),
                  key: "category",
                  value: newQuery,
              })
            : removeKeysFromQuery({
                  params: searchParams.toString(),
                  keysToRemove: ["category"],
              });

        router.push(newUrl, { scroll: false });
    }, [selectedCategories, pathname, route, router, searchParams]);

    function handleCheckboxChange(value: string) {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((category) => category !== value)
                : [...prevSelected, value]
        );
    }

    return (
        <div>
            <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>Filter items by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={cat.name}
                            value={cat.name}
                            checked={selectedCategories.includes(cat.name)}
                            onChange={(evt) =>
                                handleCheckboxChange(evt.target.value)
                            }
                        />
                        <label
                            htmlFor={cat.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {cat.name}
                        </label>
                    </div>
                ))}
            </CardContent>
        </div>
    );
}

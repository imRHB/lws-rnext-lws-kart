"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formUrlQuery, removeKeysFromQuery } from "@/lib";
import { getCategories } from "@/lib/actions/category.action";

interface Props {
    route: string;
}

export default function Category({ route }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [categories, setCategories] = useState<
        { slug: string; name: string }[]
    >([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const categories = await getCategories();

            setCategories(
                categories.map((category) => {
                    return {
                        slug: category.slug,
                        name: category.name,
                    };
                })
            );
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
                    <div key={cat.slug} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={cat.slug}
                            value={cat.slug}
                            checked={selectedCategories.includes(cat.slug)}
                            onChange={(evt) =>
                                handleCheckboxChange(evt.target.value)
                            }
                        />
                        <label
                            htmlFor={cat.slug}
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

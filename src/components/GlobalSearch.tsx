"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getProducts } from "@/lib/actions/product.action";
import { IProduct } from "@/models/product.model";
import Search from "./Search";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

export default function GlobalSearch() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [docCount, setDocCount] = useState<number | null>(null);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    let query: string | null;
    query = searchParams.get("q");

    useEffect(() => {
        async function fetchProducts() {
            const results = await getProducts({
                searchQuery: query!,
            });

            setDocCount(results.docCount);
            setProducts(results.products);
        }

        if (query) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [query]);

    return (
        <div className="relative">
            <Search route={pathname} />

            {pathname !== "/shop" && query && (
                <Card className="mt-2 z-50 max-h-96 overflow-auto absolute w-full">
                    <CardHeader>
                        <CardDescription className="text-md">
                            Search results for{" "}
                            <span className="font-semibold italic">
                                {query}
                            </span>
                        </CardDescription>
                        {docCount && (
                            <CardDescription className="flex items-center justify-between gap-4">
                                {docCount > 0 && (
                                    <span>
                                        Total {docCount}
                                        {docCount > 1
                                            ? " products found"
                                            : " product found"}
                                    </span>
                                )}
                                {products.length !== docCount && (
                                    <Link
                                        href="/shop"
                                        className="text-violet-500 font-semibold rounded-md underline underline-offset-4"
                                    >
                                        visit shop
                                    </Link>
                                )}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        {products.length > 0 ? (
                            <div className="flex flex-col space-y-2">
                                {products.map((product) => (
                                    <Link
                                        key={String(product._id)}
                                        href={`/product/${String(product._id)}`}
                                        className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-zinc-100"
                                    >
                                        <Image
                                            src={product.thumbnail}
                                            height={48}
                                            width={64}
                                            alt={product.title}
                                            className="aspect-video object-cover rounded"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-semibold line-clamp-1">
                                                {product.title}
                                            </p>
                                            <p className="text-sm">
                                                ${product.price}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <CardDescription className="text-center font-bold">
                                No product found
                            </CardDescription>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

import React from "react";

import GlobalSearch from "@/components/GlobalSearch";
import ProductCard from "@/components/product/ProductCard";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProducts } from "@/lib/actions/product.action";
import { SearchParamsProps } from "@/types";
import Category from "./Category";
import Price from "./Price";
import Size from "./Size";

export default async function ShopPage({ searchParams }: SearchParamsProps) {
    const products = await getProducts({
        searchQuery: searchParams.q,
        category: searchParams.category,
        pmin: searchParams.pmin,
        pmax: searchParams.pmax,
        size: searchParams.size,
    });

    return (
        <React.Fragment>
            <div className="container p-4">
                <GlobalSearch route="/shop" />
            </div>

            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <div className="col-span-1 overflow-hidden hidden md:block">
                    <Card>
                        <Category route="/shop" />

                        {/* <Category route="/shop" /> */}

                        <Separator />

                        {/* <CheckboxSingle /> */}

                        {/* <Separator /> */}

                        <div>
                            <CardHeader>
                                <CardTitle>Price</CardTitle>
                                <CardDescription>
                                    Filter items by price
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Price route="/shop" />
                            </CardContent>
                        </div>

                        <Separator />

                        <div>
                            <CardHeader>
                                <CardTitle>Size</CardTitle>
                                <CardDescription>
                                    Filter items by size
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Size route="/shop" />
                            </CardContent>
                        </div>
                    </Card>
                </div>

                <div className="col-span-3">
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                productId={String(product._id)}
                                name={product.name}
                                price={product.price}
                                discount={product.discount}
                                thumbnail={product.thumbnail}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

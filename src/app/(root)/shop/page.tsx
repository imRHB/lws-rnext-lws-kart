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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getProducts } from "@/lib/actions/product.action";
import { SearchParamsProps } from "@/types";
import Size from "./Size";

export default async function ShopPage({ searchParams }: SearchParamsProps) {
    const { minimalProducts: products } = await getProducts({
        searchQuery: searchParams.q,
    });

    return (
        <React.Fragment>
            <div className="container p-4">
                <GlobalSearch route="/shop" />
            </div>

            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <div className="col-span-1 overflow-hidden hidden md:block">
                    <Card>
                        <div>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                                <CardDescription>
                                    Filter items by category
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="bedroom" />
                                    <label
                                        htmlFor="bedroom"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Bedroom
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="livingRoom" />
                                    <label
                                        htmlFor="livingRoom"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Living Room
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="sofa" />
                                    <label
                                        htmlFor="sofa"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Sofa
                                    </label>
                                </div>
                            </CardContent>
                        </div>

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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        {/* <Label htmlFor="firstName">First Name</Label> */}
                                        <Input
                                            id="pmin"
                                            type="number"
                                            placeholder="min"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        {/* <Label htmlFor="lastName">Last Name</Label> */}
                                        <Input
                                            id="pmax"
                                            type="number"
                                            placeholder="max"
                                        />
                                    </div>
                                </div>
                                {/* <Price route="/shop" /> */}
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
                                productId={JSON.stringify(product._id)}
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

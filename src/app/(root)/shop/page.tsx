import type { Metadata } from "next";

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
import Color from "./Color";
import NotFound from "./NotFound";
import Price from "./Price";
import Size from "./Size";

export const metadata: Metadata = {
    title: "LWS Kart | Shop",
    description: "An online shop brought to you by Learn With Sumit",
};

export default async function ShopPage({ searchParams }: SearchParamsProps) {
    const products = await getProducts({
        searchQuery: searchParams.q,
        category: searchParams.category,
        pmin: searchParams.pmin,
        pmax: searchParams.pmax,
        color: searchParams.color,
        size: searchParams.size,
    });

    return (
        <section className="container pt-4 pb-16">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6 items-start">
                <div className="col-span-1 overflow-hidden hidden md:block sticky top-36">
                    <Card>
                        <Category route="/shop" />
                        <Separator />
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
                                <CardTitle>Color</CardTitle>
                                <CardDescription>
                                    Filter items by color
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Color route="/shop" />
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
                    {products.length > 0 ? (
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={String(product._id)}
                                    productId={String(product._id)}
                                    name={product.name}
                                    price={product.price}
                                    discount={product.discount}
                                    thumbnail={product.thumbnail}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col h-[40vh] items-center justify-center gap-2">
                            <NotFound />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

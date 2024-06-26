import type { Metadata } from "next";

import PageNavigation from "@/components/PageNavigation";
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
import { IProduct } from "@/models/product.model";
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
    const results = await getProducts({
        searchQuery: searchParams.q,
        category: searchParams.category,
        pmin: searchParams.pmin,
        pmax: searchParams.pmax,
        color: searchParams.color,
        size: searchParams.size,
        page: searchParams.page ? +searchParams.page : 1,
    });

    return (
        <section className="container pt-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="col-span-1 overflow-hidden hidden md:block max-w-64">
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

                <div className="md:col-span-2 xl:col-span-3">
                    {results.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {results.products.map((product: IProduct) => (
                                <ProductCard
                                    key={String(product._id)}
                                    productId={String(product._id)}
                                    title={product.title}
                                    price={product.price}
                                    discountPercentage={
                                        product.discountPercentage
                                    }
                                    thumbnail={product.thumbnail}
                                    stock={product.stock}
                                    size={product.sizes?.[0] ?? null}
                                    color={product.colors?.[0] ?? null}
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

            <div className="my-4">
                <PageNavigation
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={results?.isNext}
                    pageCount={results?.pageCount}
                />
            </div>
        </section>
    );
}

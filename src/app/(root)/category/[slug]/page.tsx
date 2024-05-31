import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductCard from "@/components/product/ProductCard";
import { getCategoryByName } from "@/lib/actions/category.action";
import { getProductsByCategory } from "@/lib/actions/product.action";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;

    const category = await getCategoryByName({
        name: decodeURIComponent(slug),
    });

    return {
        title: `LWS Kart | ${category ? category.name : "not found"}`,
        description: category.description,
        openGraph: {
            title: `LWS Kart | ${category ? category.name : "not found"}`,
            description: category.description,
            images: [
                {
                    url: category?.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: category.name,
                },
            ],
            siteName: "LWS Kart",
            type: "website",
        },
    };
}

export default async function CategoryWiseProductPage({ params }: Props) {
    const category = await getCategoryByName({
        name: decodeURIComponent(params.slug),
    });

    if (!category) notFound();

    const { name, description, thumbnail } = category || {};

    const products = await getProductsByCategory({
        category: decodeURIComponent(params.slug),
    });

    return (
        <section className="container pt-4 pb-16 space-y-8">
            <CategoryBanner
                name={name}
                description={description}
                thumbnail={thumbnail}
            />

            {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={String(product._id)}
                            productId={String(product._id)}
                            name={product.name}
                            price={product.price}
                            discount={product.discount}
                            thumbnail={product.thumbnail}
                            stock={product.stock}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col h-[40vh] items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold text-zinc-800">
                        No products found
                    </h3>
                    <p className="text-md text-zinc-600 text-center max-w-lg">
                        No products found for this category, try different
                        category
                    </p>
                </div>
            )}
        </section>
    );
}

interface CategoryBannerProps {
    name: string;
    description: string;
    thumbnail: string;
}

function CategoryBanner({ name, description, thumbnail }: CategoryBannerProps) {
    return (
        <div
            className="bg-cover w-full bg-no-repeat bg-center py-36 rounded-lg relative overflow-hidden"
            style={{
                backgroundImage: `url('${thumbnail}')`,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 rounded-lg">
                <div className="p-6 flex flex-col justify-center gap-4 h-full">
                    <h1 className="text-4xl md:text-6xl text-white font-bold capitalize">
                        {name}
                    </h1>
                    <p className="max-w-xl text-zinc-200">{description}</p>
                </div>
            </div>
        </div>
    );
}

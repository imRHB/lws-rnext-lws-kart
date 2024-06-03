import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { getProductById } from "@/lib/actions/product.action";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";
import RelatedProducts from "./RelatedProducts";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { productId } = params;

    const product = await getProductById({ productId });

    return {
        title: `LWS Kart | ${product ? product.title : "not found"}`,
        description: product.description,
        openGraph: {
            title: `LWS Kart | ${product ? product.title : "not found"}`,
            description: product.description,
            images: [
                {
                    url: product?.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: product?.title,
                },
            ],
            siteName: "LWS Kart",
            type: "website",
        },
    };
}

interface Props {
    params: {
        productId: string;
    };
}

export default async function ProductPage({ params }: Props) {
    const { productId } = params;

    const product = await getProductById({ productId });

    if (!product) notFound();

    const {
        _id,
        title,
        description,
        brand,
        category,
        sku,
        price,
        discountPercentage,
        stock,
        thumbnail,
        images,
        sizes,
        colors,
    } = product || {};

    return (
        <React.Fragment>
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 my-4">
                <ProductImageGallery
                    thumbnail={thumbnail}
                    images={images ?? []}
                />

                <ProductDetails
                    productId={JSON.stringify(_id)}
                    title={title}
                    brand={brand ?? null}
                    category={category}
                    sku={sku}
                    price={price}
                    discountPercentage={discountPercentage}
                    stock={stock}
                    sizes={JSON.stringify(sizes)}
                    colors={JSON.stringify(colors)}
                />
            </div>

            {/* <ProductDescription features={product.features ?? []} /> */}

            <RelatedProducts productId={productId} />
        </React.Fragment>
    );
}

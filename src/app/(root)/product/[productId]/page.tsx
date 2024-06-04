import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { getProductById } from "@/lib/actions/product.action";
import ProductDescription from "./ProductDescription";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";
import RelatedProducts from "./RelatedProducts";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { productId } = params;

    const product = await getProductById({ productId });

    return {
        title: `LWS Kart | ${product ? product.title : "not found"}`,
        description: product?.description,
        openGraph: {
            title: `LWS Kart | ${product ? product.title : "not found"}`,
            description: product?.description,
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
        dimensions,
        sku,
        price,
        discountPercentage,
        stock,
        thumbnail,
        images,
        sizes,
        colors,
        weight,
        warrantyInformation,
        shippingInformation,
        returnPolicy,
    } = product || {};

    return (
        <React.Fragment>
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 my-4 space-y-6">
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
            <div className="container">
                <Separator />
            </div>
            <ProductDescription
                description={description}
                dimensions={dimensions}
                weight={weight}
                warrantyInformation={warrantyInformation}
                shippingInformation={shippingInformation}
                returnPolicy={returnPolicy}
            />

            <RelatedProducts productId={productId} />
        </React.Fragment>
    );
}

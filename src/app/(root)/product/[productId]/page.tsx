import { notFound } from "next/navigation";
import React from "react";

import { getProductById } from "@/lib/actions/product.action";
import ProductDescription from "./ProductDescription";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";
import RelatedProducts from "./RelatedProducts";

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
        name,
        brand,
        category,
        sku,
        price,
        discount,
        stock,
        thumbnail,
        images,
        features,
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
                    name={name}
                    brand={brand}
                    category={category}
                    sku={sku}
                    price={price}
                    discount={discount}
                    stock={stock}
                />
            </div>

            <ProductDescription features={product.features ?? []} />

            <RelatedProducts productId={productId} />
        </React.Fragment>
    );
}

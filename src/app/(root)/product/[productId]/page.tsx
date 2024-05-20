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
    const product = await getProductById({ productId: params.productId });
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
            <div className="container grid grid-cols-2 gap-6 my-4">
                <ProductImageGallery
                    thumbnail={product.thumbnail}
                    images={product.images ?? []}
                />
                <ProductDetails
                    productId={_id}
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
            <RelatedProducts />
        </React.Fragment>
    );
}

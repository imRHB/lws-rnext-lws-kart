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

    return (
        <React.Fragment>
            <div className="container grid grid-cols-2 gap-6 my-4">
                <ProductImageGallery
                    thumbnail={product?.thumbnail}
                    images={product?.images}
                />
                <ProductDetails />
            </div>
            <ProductDescription />
            <RelatedProducts />
        </React.Fragment>
    );
}

import React from "react";

import ProductDescription from "./ProductDescription";
import ProductDetails from "./ProductDetails";
import ProductImageGallery from "./ProductImageGallery";
import RelatedProducts from "./RelatedProducts";

export default function ProductPage() {
    return (
        <React.Fragment>
            <div className="container grid grid-cols-2 gap-6">
                <ProductImageGallery />
                <ProductDetails />
            </div>
            <ProductDescription />
            <RelatedProducts />
        </React.Fragment>
    );
}

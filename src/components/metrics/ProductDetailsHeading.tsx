"use client";

import useLanguage from "@/hooks/useLanguage";

export default function ProductDetailsHeading() {
    const { strings } = useLanguage();

    return (
        <h2 className="text-2xl font-medium text-gray-800 uppercase">
            {strings.product.productDetails}
        </h2>
    );
}

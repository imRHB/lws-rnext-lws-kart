"use client";

import React from "react";

import useLanguage from "@/hooks/useLanguage";

export default function NotFound() {
    const { strings } = useLanguage();

    return (
        <React.Fragment>
            <h3 className="text-3xl font-semibold text-zinc-800">
                {strings.product.notFound.title}
            </h3>
            <p className="text-md text-zinc-600 text-center max-w-lg">
                {strings.product.notFound.description}
            </p>
        </React.Fragment>
    );
}

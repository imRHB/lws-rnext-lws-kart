"use client";

import useLanguage from "@/hooks/useLanguage";

export default function CategoryHeading() {
    const { strings } = useLanguage();

    return (
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            {strings.sectionTitle.shopByCategory.title}
        </h2>
    );
}

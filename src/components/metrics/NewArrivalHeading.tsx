"use client";

import useLanguage from "@/hooks/useLanguage";

export default function NewArrivalHeading() {
    const { strings } = useLanguage();

    return (
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            {strings.sectionTitle.topNewArrival.title}
        </h2>
    );
}

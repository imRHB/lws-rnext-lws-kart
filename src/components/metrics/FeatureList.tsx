"use client";

import useLanguage from "@/hooks/useLanguage";
import React from "react";
import { FeatureCard } from "../Features";

export default function FeatureList() {
    const { strings } = useLanguage();

    return (
        <React.Fragment>
            {strings.features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
            ))}
        </React.Fragment>
    );
}

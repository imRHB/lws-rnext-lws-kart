"use client";

import { useContext } from "react";

import { LanguageContext } from "@/context";

export default function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}

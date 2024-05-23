"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { LanguageContext } from "@/context";
import { getLocalizationStrings } from "@/lib/locales/localization";
import { LocalizationStrings } from "@/types";

export default function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [locale, setLocaleState] = useState<string>(() => {
        const storedLocale = localStorage.getItem("locale");
        return storedLocale || "en";
    });
    const [strings, setStrings] = useState<LocalizationStrings | null>(null);

    useEffect(() => {
        const loadStrings = async () => {
            const localizationStrings = await getLocalizationStrings(locale);
            setStrings(localizationStrings);
        };
        loadStrings();
    }, [locale]);

    const setLocale = (newLocale: string) => {
        localStorage.setItem("locale", newLocale);
        setLocaleState(newLocale);
    };

    return (
        <LanguageContext.Provider
            value={{ locale, strings: strings!, setLocale }}
        >
            {strings ? (
                children
            ) : (
                <div className="h-screen flex flex-col items-center justify-center">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin text-zinc-400" />
                </div>
            )}
        </LanguageContext.Provider>
    );
}

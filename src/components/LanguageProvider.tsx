"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { LanguageContext } from "@/context";
import { getLocalizationStrings } from "@/lib/locales/localization";
import { LocalizationStrings } from "@/types";

const validLocales = ["en", "bn"];

export default function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [locale, setLocaleState] = useState<string>(() => {
        const browserLanguages = navigator.languages || [navigator.language];
        for (const lang of browserLanguages) {
            const language = lang.split("-")[0];
            if (validLocales.includes(language)) {
                return language;
            }
        }

        return "en";
    });
    const [strings, setStrings] = useState<LocalizationStrings | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedLocale = localStorage.getItem("locale");
            const initialLocale = validLocales.includes(storedLocale!)
                ? storedLocale!
                : locale;
            setLocaleState(initialLocale);

            const loadStrings = async () => {
                const localizationStrings = await getLocalizationStrings(
                    initialLocale
                );
                setStrings(localizationStrings);
            };
            loadStrings();
        }
    }, [locale]);

    const setLocale = (newLocale: string) => {
        if (typeof window !== "undefined") {
            const validatedLocale = validLocales.includes(newLocale)
                ? newLocale
                : "en";
            localStorage.setItem("locale", validatedLocale);
            setLocaleState(validatedLocale);
        }
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

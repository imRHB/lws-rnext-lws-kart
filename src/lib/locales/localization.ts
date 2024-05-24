import { LocalizationStrings } from "@/types";

const locales: {
    [key: string]: () => Promise<{ default: LocalizationStrings }>;
} = {
    en: () => import("./en/common.json").then((mod) => mod),
    bn: () => import("./bn/common.json").then((mod) => mod),
};

export const getLocalizationStrings = async (
    locale: string
): Promise<LocalizationStrings> => {
    const loadLocale = locales[locale];

    if (loadLocale) {
        const strings = await loadLocale();

        return strings.default;
    }

    throw new Error(`Locale ${locale} not found`);
};

import { LocalizationStrings } from "@/types";

export interface LanguageContextProps {
    locale: string;
    strings: LocalizationStrings;
    setLocale: (locale: string) => void;
}

export interface SearchContextProps {
    search: string;
    setSearch: (value: string) => void;
}

import { LocalizationStrings } from "@/types";

interface LanguageContextProps {
    locale: string;
    strings: LocalizationStrings;
    setLocale: (locale: string) => void;
}

"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useLanguage from "@/hooks/useLanguage";

export default function LanguageToggler() {
    const { locale, setLocale } = useLanguage();

    return (
        <Select
            onValueChange={() => {
                setLocale(locale === "bn" ? "en" : "bn");
            }}
            defaultValue={
                locale === "bn"
                    ? "bn"
                    : locale === "en"
                    ? "en"
                    : "Select Language"
            }
        >
            <SelectTrigger className="w-32">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="bn">বাংলা</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

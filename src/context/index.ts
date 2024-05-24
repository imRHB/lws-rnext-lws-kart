import { createContext } from "react";

import { LanguageContextProps, SearchContextProps } from "./shared.types";

export const LanguageContext = createContext<LanguageContextProps | undefined>(
    undefined
);
export const SearchContext = createContext<SearchContextProps | undefined>(
    undefined
);

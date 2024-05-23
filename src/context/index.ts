import { createContext } from "react";

import { LanguageContextProps } from "./shared.types";

export const LanguageContext = createContext<LanguageContextProps | undefined>(
    undefined
);

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

/* font awesome config */
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import LanguageProvider from "@/components/LanguageProvider";
import NextAuthProvider from "@/components/NextAuthProvider";
import SearchProvider from "@/components/SearchProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LWS Kart",
    description: "An online shop brought to you by Learn With Sumit",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-zinc-50`}>
                {/* <NextBreadcrumb
                    homeElement={"Home"}
                    separator={<span> | </span>}
                    activeClasses="text-amber-500"
                    containerClasses="flex py-5 bg-gradient-to-r from-purple-600 to-blue-600"
                    listClasses="hover:underline mx-2 font-bold"
                    capitalizeLinks
                /> */}
                <LanguageProvider>
                    <NextAuthProvider>
                        <SearchProvider>
                            {children}
                            <Toaster />
                        </SearchProvider>
                    </NextAuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}

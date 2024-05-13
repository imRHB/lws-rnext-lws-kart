import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

/* font awesome config */
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import NextAuthProvider from "@/components/NextAuthProvider";
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
            <body className={inter.className}>
                <NextAuthProvider>
                    {children}
                    <Toaster />
                </NextAuthProvider>
            </body>
        </html>
    );
}

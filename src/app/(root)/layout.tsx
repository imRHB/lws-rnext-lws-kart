import type { Metadata } from "next";
import React from "react";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
    title: "LWS Kart",
    description: "An online shop brought to you by Learn With Sumit",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <React.Fragment>
            <Header />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </React.Fragment>
    );
}

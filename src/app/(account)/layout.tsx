import { Menu, Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ACCOUNT_SIDEBAR_LINKS } from "@/constants";
import { IAccountLinkItem } from "@/types";
import SignOut from "./(components)/SignOut";

export default async function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-slate-50 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="">LWS Kart</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 font-medium lg:px-4">
                            {ACCOUNT_SIDEBAR_LINKS.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <AccountIcon item={item} />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card>
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>{session?.user?.name}</CardTitle>
                                <CardDescription>
                                    {session?.user?.email}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <SignOut />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-slate-50 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">LWS Kart</span>
                                </Link>
                                {ACCOUNT_SIDEBAR_LINKS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <AccountIcon item={item} />
                                        {item.label}
                                        {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                            6
                                        </Badge> */}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {session?.user?.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {session?.user?.email}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <SignOut />
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

function AccountIcon({ item }: { item: IAccountLinkItem }) {
    const IconComponent = item.icon;

    return <IconComponent className="h-5 w-5" />;
}

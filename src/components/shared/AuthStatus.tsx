"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import useLanguage from "@/hooks/useLanguage";
import { getInitials } from "@/lib";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

export default function AuthStatus() {
    const { data: session, status } = useSession();

    const { strings } = useLanguage();

    function handleSignOut() {
        signOut({ callbackUrl: "/" });
    }

    return (
        <React.Fragment>
            {status === "loading" ? (
                <Skeleton className="h-8 w-8 rounded-full" />
            ) : session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage
                                src={session?.user?.image!}
                                alt={session?.user?.name!}
                            />
                            <AvatarFallback>
                                {getInitials(session?.user?.name!)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="flex flex-col">
                            <span>{session?.user?.name}</span>
                            <span className="text-xs font-normal">
                                {session?.user?.email}
                            </span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={strings.accountNav.account.href}
                                className="w-full"
                            >
                                {strings.accountNav.account.label}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <span
                                onClick={handleSignOut}
                                className="cursor-pointer w-full"
                            >
                                {strings.auth.signOut.label}
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/sign-in">
                    <Button>Sign in</Button>
                </Link>
            )}
        </React.Fragment>
    );
}

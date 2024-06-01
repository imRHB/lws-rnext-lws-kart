"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import useLanguage from "@/hooks/useLanguage";

export default function SignOut() {
    const { strings } = useLanguage();

    function handleSignOut() {
        signOut({ callbackUrl: "/" });
    }

    return (
        <Button size="sm" className="w-full" onClick={handleSignOut}>
            {strings.auth.signOut.label}
        </Button>
    );
}

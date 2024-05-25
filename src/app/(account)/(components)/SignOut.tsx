"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function SignOut() {
    const router = useRouter();

    function handleSignOut() {
        signOut({
            redirect: false,
            callbackUrl: "/sign-in",
        });

        router.push("/sign-in");
    }

    return (
        <Button size="sm" className="w-full" onClick={handleSignOut}>
            Sign out
        </Button>
    );
}

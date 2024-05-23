"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h3 className="font-semibold">Something went wrong!</h3>
            <Button variant="destructive" onClick={() => reset()}>
                Try again
            </Button>
        </div>
    );
}

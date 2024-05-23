"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalErrorPage({
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
        <html>
            <body>
                <div className="flex flex-col items-center justify-center h-screen gap-2">
                    <h3 className="font-semibold">Something went wrong!</h3>
                    <Button variant="destructive" onClick={() => reset()}>
                        Try again
                    </Button>
                </div>
            </body>
        </html>
    );
}

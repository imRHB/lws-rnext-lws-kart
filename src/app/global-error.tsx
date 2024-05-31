"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [stateError, setStateError] = useState<
        (Error & { digest?: string }) | null
    >(null);

    useEffect(() => {
        setStateError(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center h-screen gap-2">
                    <h2 className="font-semibold text-red-400">
                        {stateError
                            ? stateError?.message
                            : "Something went wrong!"}
                    </h2>
                    <Button variant="destructive" onClick={() => reset()}>
                        Try again
                    </Button>
                </div>
            </body>
        </html>
    );
}

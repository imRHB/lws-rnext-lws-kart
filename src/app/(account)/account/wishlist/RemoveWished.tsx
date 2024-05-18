"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { removeProductFromWishlist } from "@/lib/actions/user.action";

export default function RemoveWished({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    async function removeWished() {
        if (session) {
            await removeProductFromWishlist({
                email: session?.user?.email!,
                productId,
                path: pathname,
            });
        }
    }

    return (
        <Button onClick={removeWished} variant="destructive">
            Remove
        </Button>
    );
}

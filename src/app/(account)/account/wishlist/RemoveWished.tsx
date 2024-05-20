"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
            <Heart className="h-4 w-4" />
            <Separator orientation="vertical" className="mx-4" />
            Remove
        </Button>
    );
}

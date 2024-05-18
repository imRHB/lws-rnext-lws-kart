"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { addProductToWishlist } from "@/lib/actions/user.action";

export default function AddToWishlist({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    async function addToWishlist() {
        if (session) {
            await addProductToWishlist({
                email: session?.user?.email!,
                productId,
                path: pathname,
            });
        }
    }

    return (
        <Button size="icon" variant="ghost" onClick={addToWishlist}>
            <Heart className="h-4 w-4" />
        </Button>
    );
}

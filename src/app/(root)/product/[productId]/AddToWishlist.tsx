"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useLanguage from "@/hooks/useLanguage";
import { addProductToWishlist } from "@/lib/actions/user.action";

export default function AddToWishlist({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { strings } = useLanguage();

    async function saveToWishlist() {
        if (session) {
            await addProductToWishlist({
                email: session?.user?.email!,
                productId,
                path: pathname,
            });
        }
    }

    return (
        <Button onClick={saveToWishlist} variant="outline">
            <Heart className="h-4 w-4" />
            <Separator orientation="vertical" className="mx-4" />
            {strings.wishlist.buttonText}
        </Button>
    );
}

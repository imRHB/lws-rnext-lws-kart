"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/user.action";

export default function AddToCart({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    async function handleAddToCart() {
        await addToCart({
            email: session?.user?.email!,
            cartData: {
                quantity: 1,
                size: "md",
                color: "orange",
            },
            productId,
            path: pathname,
        });
    }

    return <Button onClick={handleAddToCart}>Add to cart</Button>;
}

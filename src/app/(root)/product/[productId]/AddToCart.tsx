"use client";

import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { addToCart } from "@/lib/actions/user.action";

export default function AddToCart({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { toast } = useToast();

    async function handleAddToCart() {
        if (session) {
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

            toast({
                title: "Product added to the cart",
            });
        } else {
            toast({
                title: "Please login to add to cart",
            });
        }
    }

    return (
        <Button onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            <Separator orientation="vertical" className="mx-4" />
            Add to cart
        </Button>
    );
}

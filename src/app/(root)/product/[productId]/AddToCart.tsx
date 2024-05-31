"use client";

import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import useLanguage from "@/hooks/useLanguage";
import { addToCart } from "@/lib/actions/user.action";

export default function AddToCart({
    productId,
    stock,
    cartData,
}: {
    productId: string;
    stock: number;
    cartData: string;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { strings } = useLanguage();

    const { toast } = useToast();

    const parsedCartData = JSON.parse(cartData);

    async function handleAddToCart() {
        if (session) {
            if (stock >= parsedCartData?.quantity) {
                await addToCart({
                    email: session?.user?.email!,
                    cartData: { ...parsedCartData },
                    productId,
                    path: pathname,
                });

                toast({
                    title: strings.cart.addText,
                });
            } else {
                toast({
                    title: "Product is out of stock",
                });
            }
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
            {strings.cart.buttonText}
        </Button>
    );
}

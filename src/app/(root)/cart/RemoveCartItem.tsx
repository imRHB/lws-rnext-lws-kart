"use client";

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { removeProductFromCart } from "@/lib/actions/user.action";

export default function RemoveCartItem({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    async function removeCartItem() {
        if (session) {
            await removeProductFromCart({
                email: session?.user?.email!,
                productId,
                path: pathname,
            });
        }
    }

    return (
        <Button size="icon" variant="ghost" onClick={removeCartItem}>
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}

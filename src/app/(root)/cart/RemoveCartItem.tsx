"use client";

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import useLanguage from "@/hooks/useLanguage";
import { removeProductFromCart } from "@/lib/actions/user.action";

export default function RemoveCartItem({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { strings } = useLanguage();

    const { toast } = useToast();

    async function removeCartItem() {
        if (session) {
            await removeProductFromCart({
                email: session?.user?.email!,
                productId,
                path: pathname,
            });

            toast({
                title: strings.cart.removeText,
            });
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={removeCartItem}
                    >
                        <Trash2 className="h-4 w-4" color="#ef4444" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Remove from cart</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

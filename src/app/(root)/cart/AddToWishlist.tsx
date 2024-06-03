"use client";

import { Heart } from "lucide-react";
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
import { addProductToWishlist } from "@/lib/actions/user.action";

export default function AddToWishlist({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { strings } = useLanguage();

    const { toast } = useToast();

    async function addToWishlist() {
        if (session) {
            await addProductToWishlist({
                email: session?.user?.email!,
                productId,
                path: pathname,
            });

            toast({
                title: strings.wishlist.addText,
            });
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" onClick={addToWishlist}>
                        <Heart className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to wishlist</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

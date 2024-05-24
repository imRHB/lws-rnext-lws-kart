"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useLanguage from "@/hooks/useLanguage";
import { addToCart, toggleWishlist } from "@/lib/actions/user.action";
import { Button } from "../ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

interface Props {
    productId: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
}

export default function ProductCard({
    productId,
    discount,
    name,
    price,
    thumbnail,
}: Props) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { locale, strings } = useLanguage();

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

    async function handleToggleWishlist() {
        if (session) {
            await toggleWishlist({
                email: session.user!.email,
                productId,
                path: pathname,
            });

            toast({
                title: "Product added to the wishlist",
            });
        } else {
            toast({
                title: "Please login to add to wishlist",
            });
        }
    }

    return (
        <Card className="relative">
            <Link href={`/product/${productId}`}>
                <span className="absolute inset-0" />
            </Link>
            <Image
                src={thumbnail}
                height={200}
                width={300}
                className="w-full aspect-video rounded-t-lg"
                alt={name}
            />
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <div className="flex gap-4 items-baseline">
                    <CardDescription className="text-lg font-bold text-red-500">
                        ${(price - (discount * price) / 100).toFixed(2)}
                    </CardDescription>
                    <CardDescription className="font-semibold line-through">
                        ${price}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="flex items-center gap-4">
                <Button className="w-full z-10" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4" />
                    <Separator orientation="vertical" className="mx-4" />
                    {strings.product.addToCart}
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                className="z-10"
                                onClick={handleToggleWishlist}
                            >
                                <Heart className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{strings.product.addToWishlist}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    );
}

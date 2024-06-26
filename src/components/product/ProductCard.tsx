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
    title: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
    stock: number;
    size: string | null | undefined;
    color: string | null | undefined;
}

export default function ProductCard({
    productId,
    discountPercentage,
    title,
    price,
    thumbnail,
    stock,
    size,
    color,
}: Props) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const { strings } = useLanguage();

    const { toast } = useToast();

    async function handleAddToCart() {
        if (session) {
            if (stock > 0) {
                await addToCart({
                    email: session?.user?.email!,
                    cartData: {
                        quantity: 1,
                        size,
                        color,
                    },
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

    async function handleToggleWishlist() {
        if (session) {
            await toggleWishlist({
                email: session.user!.email,
                productId,
                path: pathname,
            });

            toast({
                title: strings.wishlist.addText,
            });
        } else {
            toast({
                title: "Please login to add to wishlist",
            });
        }
    }

    return (
        <Card className="relative hover:shadow-lg transition-all">
            <Link href={`/product/${productId}`}>
                <span className="absolute inset-0" />
            </Link>
            <Image
                src={thumbnail}
                height={200}
                width={300}
                className="w-full aspect-[3/2] object-cover rounded-t-lg"
                alt={title}
            />
            <Separator />
            <CardHeader className="bg-gradient-to-t from-zinc-50 to-white">
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <div className="flex gap-4 items-baseline">
                    <CardDescription className="text-lg font-bold text-red-500">
                        $
                        {(price - (discountPercentage * price) / 100).toFixed(
                            2
                        )}
                    </CardDescription>
                    <CardDescription className="font-semibold line-through">
                        ${price}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="flex items-center gap-4 bg-gradient-to-t from-zinc-100 to-zinc-50 rounded-b-lg">
                <Button className="w-full z-10" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4" />
                    <Separator orientation="vertical" className="mx-4" />
                    {strings.cart.buttonText}
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
                            <p>{strings.wishlist.buttonText}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    );
}

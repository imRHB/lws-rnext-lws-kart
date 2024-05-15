"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { toggleWishlist } from "@/lib/actions/user.action";
import { Button } from "../ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

interface Props {
    _id: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
}

export default function ProductCard({ product }: { product: Props }) {
    const { _id, discount, name, price, thumbnail } = product;

    const { data: session } = useSession();
    const pathname = usePathname();

    const { toast } = useToast();

    const productData = {
        productId: _id,
        size: "lg",
        color: "violet",
        updatedAt: new Date(),
    };

    async function handleToggleWishlist() {
        if (session) {
            await toggleWishlist({
                email: session.user!.email,
                productData,
                path: pathname,
            });
        } else {
            toast({
                title: "Please login to add to wishlist",
            });
        }
    }

    return (
        <Card className="relative">
            <Link href={`/product/${_id}`}>
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
                <Button className="w-full z-10">Add to cart</Button>
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
                            <p>Add to wishlist</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    );
}

/* 

<div className="relative">
                <Image
                    src={product.thumbnail}
                    height={200}
                    width={300}
                    className="w-full h-auto"
                    alt={product.name}
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                    <Link
                        href="/"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <Link
                        href="/"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="add to wishlist"
                    >
                        <i className="fa-solid fa-heart"></i>
                    </Link>
                </div>
            </div>
            <div className="pt-4 pb-3 px-4">
                <Link href="/">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product.name}
                    </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">$45.00</p>
                    <p className="text-sm text-gray-400 line-through">
                        ${product.price}
                    </p>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <span>
                            <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                            <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                            <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                            <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                            <i className="fa-solid fa-star"></i>
                        </span>
                    </div>
                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
            </div>
            <Link
                href="/"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
                Add to cart
            </Link>

*/

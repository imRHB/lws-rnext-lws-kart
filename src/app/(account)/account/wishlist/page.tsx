import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import UserWishlistIntro from "@/components/metrics/UserWishlistIntro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getWishlist } from "@/lib/actions/user.action";
import Link from "next/link";
import AddToCart from "./AddToCart";
import RemoveWished from "./RemoveWished";

interface Props {
    productId: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    sku: string;
    stock: number;
    size: string;
    color: string;
}

export const metadata: Metadata = {
    title: "LWS Kart | Wishlist",
    description: "An online shop brought to you by Learn With Sumit",
};

export default async function AccountWishlistPage() {
    const session = await auth();

    if (!session) {
        redirect("/sign-in?callbackUrl=/account/wishlist");
    }

    const wishlist = await getWishlist({ email: session?.user?.email! });

    return (
        <React.Fragment>
            <UserWishlistIntro />

            {(wishlist && (wishlist as any[])).length > 0 ? (
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[150px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Price
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Discount
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Availability
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(wishlist as any[]).map((product: any) => (
                                <WishlistItemTableRow
                                    key={product._id}
                                    productId={String(product._id)}
                                    name={product.name}
                                    price={product.price}
                                    discount={product.discount}
                                    thumbnail={product.thumbnail}
                                    stock={product.stock}
                                    sku={product.sku}
                                    size={product.size?.[0]}
                                    color={product.color?.[0]}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold text-zinc-800">
                        Empty
                    </h3>
                    <p className="text-md text-zinc-600">
                        You haven&apos;t add any items to your wishlist.
                    </p>
                    <Link href="/shop" className="mt-4">
                        <Button>Visit shop</Button>
                    </Link>
                </div>
            )}
        </React.Fragment>
    );
}

function WishlistItemTableRow({
    productId,
    discount,
    name,
    price,
    thumbnail,
    sku,
    stock,
    size,
    color,
}: Props) {
    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                <Image
                    src={thumbnail}
                    height={200}
                    width={200}
                    className="aspect-video rounded-md"
                    alt={name}
                />
            </TableCell>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell className="hidden md:table-cell">{sku}</TableCell>
            <TableCell className="hidden md:table-cell">${price}</TableCell>
            <TableCell className="hidden md:table-cell">{discount}%</TableCell>
            <TableCell className="hidden md:table-cell">
                {stock > 0 ? (
                    <Badge variant="secondary">In stock</Badge>
                ) : (
                    <Badge variant="secondary">Out of stock</Badge>
                )}
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-4">
                    <AddToCart
                        productId={productId}
                        stock={stock}
                        size={size}
                        color={color}
                    />
                    <RemoveWished productId={productId} />
                </div>
            </TableCell>
        </TableRow>
    );
}

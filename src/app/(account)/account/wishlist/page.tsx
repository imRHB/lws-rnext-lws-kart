import Image from "next/image";
import React from "react";

import { auth } from "@/auth";
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
import AccountSectionIntro from "../../(components)/AccountSectionIntro";
import AddToCart from "./AddToCart";
import RemoveWished from "./RemoveWished";

interface Props {
    productId: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
}

export default async function AccountWishlistPage() {
    const session = await auth();

    const { wishlist } = await getWishlist({ email: session?.user?.email! });

    return (
        <React.Fragment>
            <AccountSectionIntro
                title="Wishlist"
                description="Your wishlist products"
            />

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
                                Quantity
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Ordered at
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {wishlist.map((product: any) => (
                            <WishlistItemTableRow
                                key={product._id}
                                productId={String(product._id)}
                                name={product.name}
                                price={product.price}
                                discount={product.discount}
                                thumbnail={product.thumbnail}
                            />
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </React.Fragment>
    );
}

function WishlistItemTableRow({
    productId,
    discount,
    name,
    price,
    thumbnail,
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
            <TableCell className="hidden md:table-cell">LWS-K-SKU</TableCell>
            <TableCell className="hidden md:table-cell">${price}</TableCell>
            <TableCell className="hidden md:table-cell">25</TableCell>
            <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-4">
                    <AddToCart />
                    <RemoveWished productId={productId} />
                </div>
            </TableCell>
        </TableRow>
    );
}

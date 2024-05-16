import Image from "next/image";
import React from "react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWishlist } from "@/lib/actions/user.action";
import AccountSectionIntro from "../../(components)/AccountSectionIntro";
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

    const { wishlist } = await getWishlist({ email: session?.user?.email });
    console.log("wishlist:", wishlist);

    return (
        <React.Fragment>
            <AccountSectionIntro
                title="Wishlist"
                description="Your wishlist products"
            />

            <div className="space-y-6">
                {wishlist.map((product: any) => (
                    <WishlistItemCard
                        key={product._id}
                        productId={String(product._id)}
                        name={product.name}
                        price={product.price}
                        discount={product.discount}
                        thumbnail={product.thumbnail}
                    />
                ))}
            </div>
        </React.Fragment>
    );
}

function WishlistItemCard({
    productId,
    discount,
    name,
    price,
    thumbnail,
}: Props) {
    return (
        <Card className="flex items-center gap-6 p-4">
            <div className="w-28">
                <Image
                    src={thumbnail}
                    height={120}
                    width={120}
                    className="rounded"
                    alt={name}
                />
            </div>

            <CardHeader>
                <div>
                    <CardTitle>{name}</CardTitle>
                    {/* <CardDescription>Description</CardDescription> */}
                </div>
            </CardHeader>

            <CardContent className="flex gap-6 items-center">
                <h3>${price}</h3>
                <Button>Add to cart</Button>
                <RemoveWished productId={productId} />
            </CardContent>
        </Card>
    );
}

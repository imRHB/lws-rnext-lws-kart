import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PRODUCT_CARD_LIST } from "@/constants";
import { IProductCard } from "@/types";
import AccountSectionContent from "../../(components)/AccountSectionContent";
import AccountSectionIntro from "../../(components)/AccountSectionIntro";

export default function AccountWishlistPage() {
    return (
        <React.Fragment>
            <AccountSectionIntro title="Wishlist" description="Your wishlist" />

            <div className="space-y-4">
                {PRODUCT_CARD_LIST.map((product) => (
                    <WishlistItemCard key={product.name} product={product} />
                ))}
            </div>

            <AccountSectionContent>
                <p>Wishlist</p>
            </AccountSectionContent>
        </React.Fragment>
    );
}

function WishlistItemCard({ product }: { product: IProductCard }) {
    return (
        <Card className="flex items-center gap-6 p-4">
            <div className="w-28">
                <Image
                    src="/assets/images/products/product1.jpg"
                    height={120}
                    width={120}
                    className="rounded"
                    alt="Product"
                />
            </div>

            <CardHeader>
                <div className="">
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </div>
            </CardHeader>

            <CardContent className="flex gap-6 items-center">
                <h3>$55.00</h3>
                <Button>Add to cart</Button>
            </CardContent>
        </Card>
    );
}

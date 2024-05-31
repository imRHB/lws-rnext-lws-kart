import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getCart } from "@/lib/actions/user.action";
import AddToWishlist from "./AddToWishlist";
import CartCounter from "./CartCounter";
import CartSummary from "./CartSummary";
import RemoveCartItem from "./RemoveCartItem";

interface Props {
    productId: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    stock: number;
    quantity: number;
    size: string;
    color: string;
}

export const metadata: Metadata = {
    title: "LWS Kart | Cart",
    description: "An online shop brought to you by Learn With Sumit",
};

export default async function CartPage() {
    const session = await auth();

    if (!session) {
        redirect("/sign-in?callbackUrl=/cart");
    }

    const cart = await getCart({ email: session?.user?.email! });

    const SHIPPING_CHARGE = 20;
    const SUB_TOTAL = (cart as { product: any; quantity: number }[]).reduce(
        (acc: number, item: any) =>
            acc +
            (item.product.price -
                (item.product.discount * item.product.price) / 100) *
                item.quantity,
        0
    );

    return (
        <section className="container pb-16 pt-4">
            {(cart as any[]).length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6">
                    <div className="lg:col-span-2">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="hidden w-[150px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Variants</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(cart as any[]).map((item) => (
                                    <WishlistItemTableRow
                                        key={item._id}
                                        productId={String(item.product._id)}
                                        name={item.product.name}
                                        price={item.product.price}
                                        discount={item.product.discount}
                                        thumbnail={item.product.thumbnail}
                                        stock={item.product.stock}
                                        quantity={item.quantity}
                                        size={item.size}
                                        color={item.color}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <CartSummary />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-[40vh] items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold text-zinc-800">
                        Empty
                    </h3>
                    <p className="text-md text-zinc-600">
                        You haven&apos;t add any items to your cart.
                    </p>
                    <Link href="/shop" className="mt-4">
                        <Button>Visit shop</Button>
                    </Link>
                </div>
            )}
        </section>
    );
}

function WishlistItemTableRow({
    productId,
    discount,
    name,
    price,
    thumbnail,
    stock,
    quantity,
    size,
    color,
}: Props) {
    return (
        <TableRow className="hover:bg-transparent">
            <TableCell className="hidden sm:table-cell">
                <Image
                    src={thumbnail}
                    height={160}
                    width={160}
                    className="aspect-video rounded-md"
                    alt={name}
                />
            </TableCell>
            <TableCell>
                <Link
                    href={`/product/${productId}`}
                    className="font-medium text-lg"
                >
                    {name}
                </Link>
                <p>Only {stock} left</p>
            </TableCell>
            <TableCell className="flex flex-col">
                <span className="font-semibold text-lg text-red-500">
                    ${(price - (discount * price) / 100).toFixed(2)}
                </span>
                <span className="line-through">${price}</span>
                <span>-{discount}%</span>
            </TableCell>
            <TableCell>
                <div className="space-y-3">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center p-1 h-6 w-8 rounded ring-2 ring-zinc-200 ring-offset-2 bg-white">
                            <span className="uppercase">{size}</span>
                        </div>
                        <div
                            className="flex items-center justify-center p-2 h-6 w-6 rounded-full ring-2 ring-zinc-200 ring-offset-2"
                            style={{
                                backgroundColor: color,
                            }}
                        >
                            <span className="sr-only">{color}</span>
                        </div>
                    </div>
                    <CartCounter
                        productId={productId}
                        quantity={quantity}
                        stock={stock}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <AddToWishlist productId={productId} />
                    <RemoveCartItem productId={productId} />
                </div>
            </TableCell>
        </TableRow>
    );
}

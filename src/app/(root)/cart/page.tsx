import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

export default async function CartPage() {
    const session = await auth();

    const { cart } = await getCart({ email: session?.user?.email! });

    const SHIPPING_CHARGE = 20;
    const SUB_TOTAL = cart.reduce(
        (acc: number, item: any) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <section className="container grid grid-cols-1 lg:grid-cols-3 items-start pb-16 pt-4 gap-6">
            <div className="lg:col-span-2">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="hidden w-[150px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="">Price</TableHead>
                            <TableHead className="">Ordered at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cart.map((item: any) => (
                            <WishlistItemTableRow
                                key={item._id}
                                productId={String(item.product._id)}
                                name={item.product.name}
                                price={item.product.price}
                                discount={item.product.discount}
                                thumbnail={item.product.thumbnail}
                                stock={item.product.quantity}
                                quantity={item.quantity}
                                size={item.size}
                                color={item.color}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>
                            {cart.length} {cart.length > 1 ? "items" : "item"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="flex items-center justify-between gap-4">
                            <span className="font-semibold">Subtotal</span>
                            <span>${SUB_TOTAL.toFixed(2)}</span>
                        </CardDescription>
                        {/* promo code, if any, input and button */}
                    </CardContent>
                    <CardContent>
                        <CardDescription className="flex items-center justify-between gap-4">
                            <span className="font-semibold">
                                Shipping charge
                            </span>
                            <span>${SHIPPING_CHARGE.toFixed(2)}</span>
                        </CardDescription>
                        {/* promo code, if any, input and button */}
                    </CardContent>
                    <CardContent>
                        <CardDescription className="flex items-center justify-between gap-4">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-semibold text-lg">
                                ${(SUB_TOTAL + SHIPPING_CHARGE).toFixed(2)}
                            </span>
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button>Proceed to checkout</Button>
                    </CardFooter>
                </Card>
            </div>
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
                <p>Color: {color}</p>
                <p>Size: {size.toUpperCase()}</p>
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
                <CartCounter
                    productId={productId}
                    quantity={quantity}
                    stock={stock}
                />
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

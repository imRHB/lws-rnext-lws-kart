import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CartCounter from "@/app/(account)/account/cart/CartCounter";
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
import RemoveWished from "./RemoveWished";

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
                        <CardDescription>Subtotal</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* promo code, if any, input and button */}
                        <CardDescription>Total</CardDescription>
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
                <CartCounter />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <Heart className="h-4 w-4" />
                    </Button>
                    <RemoveWished productId={productId} />
                </div>
            </TableCell>
        </TableRow>
    );
}

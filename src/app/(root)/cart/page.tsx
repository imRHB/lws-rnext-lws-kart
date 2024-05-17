import Image from "next/image";

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
import { getWishlist } from "@/lib/actions/user.action";
import Link from "next/link";

interface Props {
    productId: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
}

export default async function CartPage() {
    const session = await auth();

    const { wishlist } = await getWishlist({ email: session?.user?.email });
    console.log(wishlist);

    return (
        <section className="container grid grid-cols-12 lg:grid-cols-3 items-start pb-16 pt-4 gap-6">
            <div className="col-span-2">
                <>
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
                </>
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
}: Props) {
    return (
        <TableRow className="hover:bg-transparent">
            <TableCell className="hidden sm:table-cell">
                <Image
                    src={thumbnail}
                    height={200}
                    width={200}
                    className="aspect-video rounded-md"
                    alt={name}
                />
            </TableCell>
            <TableCell className="font-medium">
                <Link href={`/product/${productId}`}>{name}</Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">LWS-K-SKU</TableCell>
            <TableCell className="hidden md:table-cell">${price}</TableCell>
            <TableCell className="hidden md:table-cell">25</TableCell>
            <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-4">
                    {/* <AddToCart />
                    <RemoveWished productId={productId} /> */}
                </div>
            </TableCell>
        </TableRow>
    );
}

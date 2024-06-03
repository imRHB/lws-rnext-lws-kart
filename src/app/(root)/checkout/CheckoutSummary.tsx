import Image from "next/image";

import { auth } from "@/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCart } from "@/lib/actions/user.action";

export default async function CheckoutSummary() {
    const session = await auth();

    const cart = await getCart({ email: session?.user?.email! });

    const SHIPPING_CHARGE = 20;
    const SUB_TOTAL = (cart as { product: any; quantity: number }[]).reduce(
        (acc: number, item: any) =>
            acc +
            (item.product.price -
                (item.product.discountPercentage * item.product.price) / 100) *
                item.quantity,
        0
    );
    const TAX_AMOUNT = (7 * SUB_TOTAL) / 100;

    return (
        <div className="col-span-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>
                        You have ordered {(cart as any[]).length} items
                    </CardDescription>
                </CardHeader>

                <Separator />

                {(cart as any[]).map((item: any) => (
                    <div key={item._id} className="mt-4 space-y-4">
                        <CardContent className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={item.product.thumbnail}
                                    height={64}
                                    width={64}
                                    className="aspect-video object-cover rounded-md"
                                    alt={item.product.title}
                                />
                                <CardDescription className="flex flex-col gap-1">
                                    <span className="font-semibold">
                                        {item.product.title}
                                    </span>
                                    <span className="font-semibold">
                                        $
                                        {(
                                            item.product.price -
                                            (item.product.discountPercentage *
                                                item.product.price) /
                                                100
                                        ).toFixed(2)}
                                    </span>
                                </CardDescription>
                            </div>
                            <CardDescription>
                                <span className="font-semibold">
                                    x{item.quantity}
                                </span>
                            </CardDescription>
                        </CardContent>
                    </div>
                ))}

                <Separator />

                <CardFooter className="mt-4 flex flex-col gap-4">
                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-semibold">
                            ${SUB_TOTAL.toFixed(2)}
                        </span>
                    </CardDescription>
                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="font-semibold">Shipping</span>
                        <span className="font-semibold">
                            ${SHIPPING_CHARGE}
                        </span>
                    </CardDescription>
                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="font-semibold">Taxes</span>
                        <span className="font-semibold">
                            ${TAX_AMOUNT.toFixed(2)}
                        </span>
                    </CardDescription>

                    <Separator />

                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">
                            $
                            {(SUB_TOTAL + SHIPPING_CHARGE + TAX_AMOUNT).toFixed(
                                2
                            )}
                        </span>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}

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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { getCart } from "@/lib/actions/user.action";
import { Info } from "lucide-react";

export default async function CartSummary() {
    const session = await auth();

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
        <div className="col-span-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Cart Summary</CardTitle>
                    <CardDescription>
                        You have {(cart as any[]).length} items in your cart
                    </CardDescription>
                </CardHeader>

                <Separator />

                <CardContent className="mt-4 flex flex-col gap-4">
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

                    <Separator />

                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">
                            ${(SUB_TOTAL + SHIPPING_CHARGE).toFixed(2)}
                        </span>
                    </CardDescription>
                </CardContent>

                <Separator />

                <CardFooter className="mt-4">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Taxes information!</AlertTitle>
                        <AlertDescription>
                            Taxes may be added at checkout.
                        </AlertDescription>
                    </Alert>
                </CardFooter>
            </Card>

            <div>
                <Link href="/checkout">
                    <Button className="w-full">Proceed to checkout</Button>
                </Link>
            </div>
        </div>
    );
}

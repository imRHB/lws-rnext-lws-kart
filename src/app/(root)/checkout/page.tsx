import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import { getCart, getUserByEmail } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AddressCard from "./AddressCard";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";

export const metadata: Metadata = {
    title: "LWS Kart | Checkout",
    description: "An online shop brought to you by Learn With Sumit",
};

export default async function CheckoutPage({
    searchParams,
}: SearchParamsProps) {
    const session = await auth();

    if (!session) {
        redirect("/sign-in?callbackUrl=/checkout");
    }

    let user;
    if (session) user = await getUserByEmail({ email: session?.user?.email! });

    const shippingAddress = user?.shippingAddress ?? {};
    const billingAddress = user?.billingAddress ?? {};

    const cart = await getCart({ email: session?.user?.email! });
    const checkoutItems = (cart as any[]).map((item) => {
        return {
            product: String(item.product._id),
            quantity: item.quantity,
            unitPrice: Number(
                (
                    item.product.price -
                    (item.product.discount * item.product.price) / 100
                ).toFixed(2)
            ),
            size: item.size,
            color: item.color,
        };
    });

    const SHIPPING_CHARGE = (cart as any[]).length > 0 ? 20 : 0;
    const SUB_TOTAL = (cart as { product: any; quantity: number }[]).reduce(
        (acc: number, item: any) =>
            acc +
            (item.product.price -
                (item.product.discount * item.product.price) / 100) *
                item.quantity,
        0
    );
    const TAX_AMOUNT = (7 * SUB_TOTAL) / 100;
    const totalAmount = (SUB_TOTAL + SHIPPING_CHARGE + TAX_AMOUNT).toFixed(2);

    const validOrderId = await user.orders.some(
        (orderId: string) => String(orderId) === searchParams?.oid
    );

    return (
        <section className="container pb-16 pt-4">
            {(cart as any[]).length > 0 ? (
                <div className="grid grid-cols-12 items-start gap-6">
                    <div className="col-span-8 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <AddressCard
                                address={JSON.stringify(shippingAddress)}
                                label="Shipping Address"
                            />
                            <AddressCard
                                address={JSON.stringify(billingAddress)}
                                label="Billing Address"
                            />
                        </div>
                        <CheckoutForm
                            userId={String(user._id)}
                            shippingAddress={JSON.stringify(shippingAddress)}
                            billingAddress={JSON.stringify(billingAddress)}
                            items={JSON.stringify(checkoutItems)}
                            amount={Number(totalAmount)}
                        />
                    </div>
                    <CheckoutSummary />
                </div>
            ) : searchParams?.oid ? (
                <React.Fragment>
                    {validOrderId ? (
                        <div className="flex flex-col h-[40vh] items-center justify-center gap-2">
                            <h3 className="text-3xl font-semibold text-zinc-800">
                                Successful
                            </h3>
                            <p className="text-md text-zinc-600">
                                You order is successfully completed.
                            </p>

                            <Link
                                href="/account/orders"
                                className="flex items-center py-2.5 px-4 bg-zinc-100 rounded-lg"
                            >
                                Check orders
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col h-[40vh] items-center justify-center gap-2">
                            <h3 className="text-3xl font-semibold text-zinc-800">
                                Not found
                            </h3>
                            <p className="text-md text-zinc-600">
                                Unfortunately, the order not found or you have
                                no access!
                            </p>
                        </div>
                    )}
                </React.Fragment>
            ) : (
                <div className="flex flex-col h-[40vh] items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold text-zinc-800">
                        Empty
                    </h3>
                    <p className="text-md text-zinc-600">
                        You haven&apos;t add any items to your cart.
                    </p>
                </div>
            )}
        </section>
    );
}

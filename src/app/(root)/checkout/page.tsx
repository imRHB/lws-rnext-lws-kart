import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCart, getUserByEmail } from "@/lib/actions/user.action";
import AddressCard from "./AddressCard";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";

export default async function CheckoutPage() {
    const session = await auth();

    if (!session) {
        redirect("/sign-in");
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

    return (
        <section className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
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
        </section>
    );
}

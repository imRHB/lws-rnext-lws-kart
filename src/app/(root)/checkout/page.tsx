import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions/user.action";
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
                    shippingAddress={JSON.stringify(shippingAddress)}
                    billingAddress={JSON.stringify(billingAddress)}
                />
            </div>
            <CheckoutSummary />
        </section>
    );
}

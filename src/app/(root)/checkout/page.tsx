import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions/user.action";
import AddressCard from "./AddressCard";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";

export default async function CheckoutPage() {
    const session = await auth();

    let user;
    if (session) user = await getUserByEmail({ email: session?.user?.email! });

    return (
        <section className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
            <div className="col-span-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AddressCard
                        address={JSON.stringify(user.shippingAddress ?? {})}
                        label="Shipping Address"
                    />
                    <AddressCard
                        address={JSON.stringify(user.billingAddress ?? {})}
                        label="Billing Address"
                    />
                </div>
                <CheckoutForm />
            </div>
            <CheckoutSummary />
        </section>
    );
}

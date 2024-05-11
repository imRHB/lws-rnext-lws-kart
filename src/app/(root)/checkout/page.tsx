import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";

export default function CheckoutPage() {
    return (
        <section className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
            <CheckoutForm />
            <CheckoutSummary />
        </section>
    );
}

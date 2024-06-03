import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import { getOrderById } from "@/lib/actions/order.action";
import { InvoiceData } from "@/types";

export const metadata: Metadata = {
    title: "LWS Kart | Invoice",
    description: "An online shop brought to you by Learn With Sumit",
};

interface Props {
    params: {
        id: string;
    };
}

export default async function InvoicePage({ params }: Props) {
    const { id } = params;

    const session = await auth();

    if (!session) {
        redirect("/sign-in?callbackUrl=/account/orders");
    }

    const order = await getOrderById({ orderId: id });

    if (!order) notFound();

    const invoiceData: InvoiceData = {
        businessName: "LWS Kart",
        businessAddress: "Dhaka, Bangladesh",
        businessEmail: "lws-kart@mail.com",
        phoneNumber: "+880 1234 567890",
        invoiceNumber: String(order._id),
        invoiceDate: new Date().toLocaleDateString(),
        customerName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        customerAddress: `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.zip}`,
        customerEmail: order.shippingAddress.email,
        items: order.items.map((item: any) => ({
            _id: String(item.product._id),
            title: item.product.title,
            description: `Size: ${item.size}, Color: ${item.color}`,
            quantity: item.quantity,
            price: item.unitPrice,
        })),
        subTotal: order.amount,
        taxAmount: (order.amount * 0.1).toFixed(2),
        totalAmount: (order.amount * 1.1).toFixed(2),
        paymentMethods: order.payment.method,
        dueDate: new Date().toLocaleDateString(),
    };

    return (
        <div className="container pt-4 pb-16">
            <InvoiceGenerator invoiceData={invoiceData} />
        </div>
    );
}

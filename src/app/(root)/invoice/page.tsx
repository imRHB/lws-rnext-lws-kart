import type { Metadata } from "next";

import InvoiceGenerator from "@/components/InvoiceGenerator";

const invoiceData = {
    businessName: "Starlight Electronics",
    businessAddress: "123 Main Street, Anytown, CA 12345",
    businessEmail: "sales@starlightelectronics.com",
    phoneNumber: "(555) 555-1234",
    invoiceNumber: "INV-2024-05-29-001",
    invoiceDate: new Date().toLocaleDateString(), // Today's date
    customerName: "John Doe",
    customerAddress: "456 Elm Street, Anytown, CA 98765",
    customerEmail: "john.doe@email.com",
    items: [
        {
            id: 1,
            name: "Gaming Laptop (Model XYZ)",
            description:
                "High-performance laptop with powerful graphics card for intense gaming",
            quantity: 1,
            price: 1499.99,
        },
        {
            id: 2,
            name: "Wireless Gaming Headset",
            description:
                "Immersive surround sound and comfortable design for extended gaming sessions",
            quantity: 1,
            price: 99.99,
        },
        {
            id: 3,
            name: "Gaming Mouse (RGB Lighting)",
            description:
                "High-precision mouse with customizable RGB lighting for enhanced control",
            quantity: 1,
            price: 79.99,
        },
        {
            id: 4,
            name: '27" Curved Gaming Monitor',
            description:
                "Immersive viewing experience with high refresh rate for smooth game play",
            quantity: 1,
            price: 349.99,
        },
        {
            id: 5,
            name: "Anti-Virus Software (1 Year Subscription)",
            description:
                "Protects your system from viruses, malware, and online threats",
            quantity: 1,
            price: 39.99,
        },
    ],
    subTotal: 2069.96,
    taxAmount: 124.19,
    totalAmount: 2194.15,
    paymentMethods: "Credit Card",
    dueDate: new Date().toLocaleDateString(),
};

export const metadata: Metadata = {
    title: "LWS Kart | Invoice",
    description: "An online shop brought to you by Learn With Sumit",
};

export default function InvoicePage() {
    return <InvoiceGenerator invoiceData={invoiceData} />;
}

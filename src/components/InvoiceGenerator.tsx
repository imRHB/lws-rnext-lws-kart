"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";
import { useRef } from "react";

interface InvoiceData {
    businessName: string;
    businessAddress: string;
    businessEmail: string;
    phoneNumber: string;
    invoiceNumber: string;
    invoiceDate: string;
    customerName: string;
    customerAddress: string;
    customerEmail: string;
    items: {
        id: number;
        name: string;
        description: string;
        quantity: number;
        price: number;
    }[];
    subTotal: number;
    taxAmount: number;
    totalAmount: number;
    paymentMethods: string;
    dueDate: string;
}

export default function InvoiceGenerator({
    invoiceData,
}: {
    invoiceData: InvoiceData;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        businessName,
        businessAddress,
        businessEmail,
        phoneNumber,
        invoiceNumber,
        invoiceDate,
        customerName,
        customerAddress,
        customerEmail,
        items,
        subTotal,
        taxAmount,
        totalAmount,
        paymentMethods,
        dueDate,
    } = invoiceData;

    const handleGeneratePDF = async () => {
        if (!containerRef.current) return;

        try {
            const canvas = await html2canvas(containerRef.current, {
                scale: 1.5,
            }); // Adjusted scale factor
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait", // or 'landscape'
                unit: "mm",
                format: "a4",
            });
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            // Compress PDF
            const pdfBytes = await pdf.output("arraybuffer");
            const compressedPdf = await PDFDocument.load(pdfBytes);
            const compressedPdfBytes = await compressedPdf.save();

            const blob = new Blob([compressedPdfBytes], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `invoice-${invoiceData.invoiceNumber}.pdf`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const renderItems = () => {
        return items.map((item) => (
            <tr key={item.id}>
                <td className="p-2 border text-left">{item.name}</td>
                <td className="p-2 border text-center">{item.quantity}</td>
                <td className="p-2 border text-right">{item.price}</td>
                <td className="p-2 border text-right">
                    {item.quantity * item.price}
                </td>
            </tr>
        ));
    };

    return (
        <div>
            <div
                className="container mx-auto p-4 bg-white rounded shadow my-8"
                ref={containerRef}
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">Invoice</div>

                    <div className="text-sm text-gray-600">
                        {businessAddress} <br />
                        {businessEmail} {phoneNumber && `- ${phoneNumber}`}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Invoice</h2>
                    <div>
                        <p className="text-base font-medium">
                            Invoice Number: {invoiceNumber}
                        </p>
                        <p className="text-base font-medium">
                            Invoice Date: {invoiceDate}
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-base font-medium">Billing To:</h3>
                    <p className="text-sm">{customerName}</p>
                    <p className="text-sm">{customerAddress}</p>
                    {customerEmail && (
                        <p className="text-sm">{customerEmail}</p>
                    )}
                </div>

                <hr />

                <div className="flex flex-col sm:flex-row justify-between gap-8">
                    {/* company */}
                    <div>
                        <p className="text-sm">LWS Kart</p>
                        <p className="text-sm">Dhaka, bangladesh</p>
                        <p className="text-sm">lws-kart@mail.com</p>
                        <p className="text-sm">+880 1234 567890</p>
                    </div>

                    {/* customer */}
                    <div className="sm:text-right">
                        <h4 className="font-semibold">Billing To:</h4>
                        <p className="text-sm">Jane Doe</p>
                        <p className="text-sm">Dhaka, bangladesh</p>
                        <p className="text-sm">jane@mail.com</p>
                        <p className="text-sm">+880 1234 567890</p>
                    </div>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-sm font-medium">
                            <th className="p-2 border text-left">Item</th>
                            <th className="p-2 border text-center">Quantity</th>
                            <th className="p-2 border text-right">
                                Unit Price
                            </th>
                            <th className="p-2 border text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>{renderItems()}</tbody>
                </table>

                <div className="flex flex-col items-end">
                    <div className="w-96 space-y-2">
                        <p className="flex justify-between gap-4">
                            <span>Subtotal</span>
                            <span>$1200</span>
                        </p>
                        <p className="flex justify-between gap-4">
                            <span>Tax</span>
                            <span>$60</span>
                        </p>
                        <p className="flex justify-between gap-4">
                            <span>Total</span>
                            <span>$1260</span>
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex justify-between">
                    <div className="text-sm">
                        <p>Subtotal: {subTotal}</p>
                        <p>Tax (if applicable): {taxAmount}</p>
                    </div>
                    <div className="text-xl font-bold">
                        Total: {totalAmount}
                    </div>
                </div>

                <div className="mt-4">
                    <h2 className="text-base font-medium">
                        Payment Information
                    </h2>
                    <p>Payment methods accepted: {paymentMethods}</p>
                    <p>Payment due date: {dueDate}</p>
                </div>

                <div className="text-center mt-4">
                    <p>Thank you for your shopping!</p>
                </div>
            </div>

            <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>
    );
}

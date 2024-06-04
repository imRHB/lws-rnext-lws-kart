"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FileDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useRef } from "react";

import { InvoiceData } from "@/types";
import { Button } from "./ui/button";

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
        businessPhone,
        invoiceNumber,
        invoiceDate,
        customerName,
        customerAddress,
        customerEmail,
        customerPhone,
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
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
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
            <tr key={item._id}>
                <td className="p-2 border text-left">{item.title}</td>
                <td className="p-2 border text-center">{item.quantity}</td>
                <td className="p-2 border text-right">${item.price}</td>
                <td className="p-2 border text-right">
                    ${item.quantity * item.price}
                </td>
            </tr>
        ));
    };

    return (
        <div className="space-y-6">
            <div
                ref={containerRef}
                className="space-y-8 mx-auto p-16 bg-white rounded shadow"
            >
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

                <div className="flex flex-col sm:flex-row justify-between gap-8">
                    {/* company */}
                    <div>
                        <p className="text-sm">{businessName}</p>
                        <p className="text-sm">{businessAddress}</p>
                        <p className="text-sm">{businessEmail}</p>
                        <p className="text-sm">{businessPhone}</p>
                    </div>

                    {/* customer */}
                    <div className="sm:text-right">
                        <h4 className="font-semibold">Billing To:</h4>
                        <p className="text-sm">{customerName}</p>
                        <p className="text-sm">{customerAddress}</p>
                        <p className="text-sm">{customerEmail}</p>
                        <p className="text-sm">{customerPhone}</p>
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
                            <span>${subTotal}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                            <span>Tax</span>
                            <span>${taxAmount}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                            <span>Total</span>
                            <span>${totalAmount}</span>
                        </p>
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

            <div className="text-center">
                <Button onClick={handleGeneratePDF}>
                    <FileDown className="mr-2 h-4 w-4" /> Invoice
                </Button>
            </div>
        </div>
    );
}

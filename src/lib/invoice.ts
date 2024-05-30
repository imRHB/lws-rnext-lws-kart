import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { jsPDF } from "jspdf";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateInvoice(invoiceData: any): Promise<string> {
    const { customer, items, amount, payment, note, status, createdAt, _id } =
        invoiceData;
    const invoiceElement = document.createElement("div");
    invoiceElement.innerHTML = `
        <h1>Invoice #${_id}</h1>
        <p>Date: ${new Date(createdAt).toLocaleDateString()}</p>
        <h2>Customer</h2>
        <p>${customer.name}</p>
        <h2>Items</h2>
        <ul>
            ${items
                .map(
                    (item: any) =>
                        `<li>${item.product.name} - ${item.quantity} x $${item.unitPrice}</li>`
                )
                .join("")}
        </ul>
        <h2>Total: $${amount}</h2>
        <p>Payment Method: ${payment.method}</p>
        <p>Note: ${note}</p>
    `;

    const canvas = await html2canvas(invoiceElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    return pdf.output("datauristring");
}

/* working version */
export async function generateInvoicePdfWorked(
    order: any
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const {
        customer,
        items,
        amount,
        payment,
        note,
        shippingAddress,
        billingAddress,
    } = order;

    const fontSize = 12;
    const yStart = 750;
    let yPosition = yStart;

    // Embed font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add title
    page.drawText("Invoice", {
        x: 50,
        y: yPosition,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    // Add customer details
    page.drawText(`Customer: ${customer.name || ""}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    yPosition -= 20;
    page.drawText(`Email: ${customer.email || ""}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    yPosition -= 20;
    page.drawText(`Shipping Address: ${shippingAddress || ""}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    yPosition -= 40;

    // Add item table headers
    page.drawText("Item", {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    page.drawText("Quantity", {
        x: 200,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    page.drawText("Unit Price", {
        x: 300,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    page.drawText("Total", {
        x: 400,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    yPosition -= 20;

    // Add items
    items.forEach((item: any) => {
        const productName = item.product.name || "Unknown Product";
        const quantity = item.quantity.toString();
        const unitPrice = item.unitPrice.toString();
        const total = (item.quantity * item.unitPrice).toString();

        page.drawText(productName, {
            x: 50,
            y: yPosition,
            size: fontSize,
            font: timesRomanFont,
        });
        page.drawText(quantity, {
            x: 200,
            y: yPosition,
            size: fontSize,
            font: timesRomanFont,
        });
        page.drawText(unitPrice, {
            x: 300,
            y: yPosition,
            size: fontSize,
            font: timesRomanFont,
        });
        page.drawText(total, {
            x: 400,
            y: yPosition,
            size: fontSize,
            font: timesRomanFont,
        });
        yPosition -= 20;
    });

    // Add total amount
    yPosition -= 20;
    page.drawText(`Total Amount: $${amount}`, {
        x: 400,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });

    // Add payment details
    yPosition -= 40;
    page.drawText(`Payment Method: ${payment.method || ""}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });
    yPosition -= 20;
    page.drawText(`Payment Note: ${note || "N/A"}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: timesRomanFont,
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

export async function generateInvoicePdf(order: any): Promise<Uint8Array> {
    const {
        customer,
        items,
        amount,
        payment,
        note,
        shippingAddress,
        billingAddress,
    } = order;

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Define y position for text rendering
    let y = 20;

    // Add title
    pdf.text("Invoice", 10, y);
    y += 10;

    // Add customer details
    pdf.text(`Customer: ${customer.name || ""}`, 10, y);
    y += 10;
    pdf.text(`Email: ${customer.email || ""}`, 10, y);
    y += 10;
    pdf.text(`Shipping Address: ${shippingAddress || ""}`, 10, y);
    y += 10;
    pdf.text(`Billing Address: ${billingAddress || ""}`, 10, y);
    y += 20;

    // Add item table headers
    pdf.text("Item", 10, y);
    pdf.text("Quantity", 50, y);
    pdf.text("Unit Price", 90, y);
    pdf.text("Total", 130, y);
    y += 10;

    // Add items
    items.forEach((item: any) => {
        const total = item.quantity * item.unitPrice;
        pdf.text(item.product.name, 10, y);
        pdf.text(item.quantity.toString(), 50, y);
        pdf.text(item.unitPrice.toString(), 90, y);
        pdf.text(total.toString(), 130, y);
        y += 10;
    });

    // Add total amount
    pdf.text(`Total Amount: $${amount}`, 10, y);
    y += 20;

    // Add payment details
    pdf.text(`Payment Method: ${payment.method || ""}`, 10, y);
    y += 10;
    pdf.text(`Payment Note: ${note || "N/A"}`, 10, y);

    // Save PDF to bytes
    const pdfBytes = pdf.output("arraybuffer");

    return new Uint8Array(pdfBytes);
}

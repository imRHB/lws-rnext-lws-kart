import nodemailer from "nodemailer";

export async function sendInvoiceEmail(
    invoiceData: any,
    pdfBuffer: Uint8Array
) {
    // const pdfData = await generateInvoice(invoiceData);

    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: "75a144002@smtp-brevo.com",
            pass: process.env.BREVO_SMTP_API_KEY,
        },
    });

    const mailOptions = {
        from: '"LWS Kart" <75a144002@smtp-brevo.com>',
        // to: invoiceData.customer.email,
        to: "rhbabu03@gmail.com",
        subject: `Invoice #${invoiceData._id}`,
        text: "Please find attached your invoice.",
        attachments: [
            {
                filename: `invoice-${invoiceData._id}.pdf`,
                content: Buffer.from(pdfBuffer),
                contentType: "application/pdf",
            },
        ],
    };

    await transporter.sendMail(mailOptions);
}

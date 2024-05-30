// app/api/send-invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    const { pdfData, recipientEmail, invoiceNumber } = await request.json();

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: "75a144002@smtp-brevo.com",
                pass: process.env.BREVO_SMTP_API_KEY,
            },
        });

        const mailOptions = {
            from: '"Your Company" <your-email@example.com>',
            to: recipientEmail,
            subject: `Invoice #${invoiceNumber}`,
            text: "Please find attached your invoice.",
            attachments: [
                {
                    filename: `invoice-${invoiceNumber}.pdf`,
                    content: Buffer.from(pdfData, "base64"),
                    contentType: "application/pdf",
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Invoice sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Error sending email" },
            { status: 500 }
        );
    }
}

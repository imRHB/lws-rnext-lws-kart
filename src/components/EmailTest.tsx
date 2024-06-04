"use client";

import { sendEmail } from "@/lib/actions/order.action";
import { Button } from "./ui/button";

export default function EmailTest() {
    const invoiceId = "665e8d569696c94907c3721a";

    async function handleSendEmail() {
        try {
            await sendEmail({
                toEmail: "rhbabu3@gmail.com",
                emailBody: `We have received your order. You can download your invoice from the following link: ${process.env.SITE_URL}/invoice/${invoiceId}`,
            });

            console.log("Email triggered");
        } catch (error) {
            console.log(error);
        }
    }

    return <Button onClick={handleSendEmail}>Send email</Button>;
}

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "gmail",
    auth: {
        user: "rhbabu3@gmail.com",
        pass: "cyiasgguvthemvsh",
    },
});

export const testTransporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "75a144002@smtp-brevo.com",
        pass: process.env.BREVO_SMTP_API_KEY,
    },
});
"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

import Order, { IOrder } from "@/models/order.model";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../mongoose";
import { transporter } from "../nodemailer";

interface CreateOrderParams {
    customer: string;
    shippingAddress: {
        firstName: string;
        lastName: string;
        street: string;
        city: string;
        zip: number;
        phone: string;
        email: string;
    };
    billingAddress: {
        firstName: string;
        lastName: string;
        street: string;
        city: string;
        zip: number;
        phone: string;
        email: string;
    };
    items: {
        product: string;
        quantity: number;
        unitPrice: number;
        size: string;
        color: string;
    }[];
    amount: number;
    payment: {
        method: string;
        name: string;
        cardNumber: string;
        expiryMonth: string;
        expiryYear: string;
        cvc: string;
    };
    note?: string;
    status: string;
    path: string;
}

export async function createOrder(params: CreateOrderParams): Promise<IOrder> {
    try {
        await connectToDatabase();

        const {
            customer,
            shippingAddress,
            billingAddress,
            items,
            amount,
            payment,
            note,
            status,
            path,
        } = params;

        const user = await User.findById(customer);

        const newOrder = await Order.create({
            customer: new ObjectId(customer),
            shippingAddress,
            billingAddress,
            items,
            amount,
            payment,
            note,
            status,
        });

        for (const item of user.cart) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        user.cart = [];
        if (!user.orders) {
            user.orders = [];
        }
        user.orders.push(newOrder._id);
        await user.save();

        // await sendTestEmail();
        // const invoiceData = { ...newOrder.toObject(), customer: user };
        // const pdfBuffer = await generateInvoicePdf(invoiceData);
        // await sendInvoiceEmail(invoiceData, pdfBuffer);
        const invoiceId = String(newOrder._id);
        await sendEmail({
            toEmail: billingAddress?.email,
            emailBody: `We have received your order. You can download your invoice from the following link: ${process.env.SITE_URL}/invoice/${invoiceId}`,
        });

        revalidatePath(path);
        redirect(`/checkout?oid=${invoiceId}`);
        // return newOrder;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface GetOrdersByCustomerIdProps {
    customer: string;
}

export async function getOrdersByCustomerId(
    params: GetOrdersByCustomerIdProps
) {
    try {
        await connectToDatabase();

        const { customer } = params;
        const user = await User.findById(customer);

        const orders = await Order.find({
            customer: user._id,
        })
            .populate({
                path: "items.product",
                model: Product,
                select: "_id name thumbnail",
            })
            .sort({ createdAt: -1 });

        const minimalOrders = orders.map((order) => {
            return {
                _id: order._id,
                items: order.items,
                amount: order.amount,
                status: order.status,
                createdAt: order.createdAt,
            };
        });

        return minimalOrders;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface GetOrderByIdProps {
    orderId: string;
}

export async function getOrderById(params: GetOrderByIdProps) {
    try {
        await connectToDatabase();

        const { orderId } = params;

        const order = await Order.findById(orderId).populate({
            path: "items.product",
            model: Product,
            select: "name",
        });

        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface SendResendEmailProps {
    orderId: string;
    email: string;
}

export async function sendResendEmail(params: SendResendEmailProps) {
    try {
        await connectToDatabase();

        const { orderId, email } = params;

        const order = await getOrderById({ orderId });
        const { billingAddress } = order || {};

        const resend = new Resend(process.env.RESEND_API_KEY);
        /* const emailBody = `Hello ${billingAddress.firstName} ${billingAddress.lastName}, your order with id ${order._id} is successfully created!`; */

        /* const sent = await resend.emails.send({
            from: "LWS KART <onboarding@resend.dev>",
            to: billingAddress.email,
            subject: "Order created successfully",
            react: EmailTemplate({ message: emailBody }),
        }); */
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface SendInvoiceParams {
    to: string;
    subject: string;
    htmlContent: string;
    attachment: Buffer;
    attachmentName: string;
}

export async function sendInvoice(props: SendInvoiceParams) {
    try {
        await connectToDatabase();

        const { to, subject, htmlContent, attachment, attachmentName } = props;

        await transporter.sendMail({
            from: "rhbabu3@gmail.com",
            to,
            subject,
            html: htmlContent,
            attachments: [{ filename: attachmentName, content: attachment }],
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface SendEmailProps {
    toEmail: string;
    emailBody: string;
}

export async function sendEmail(props: SendEmailProps) {
    const { toEmail, emailBody } = props;
    const mailOptions = {
        from: "'LWS Kart' <75a144002@smtp-brevo.com>",
        to: toEmail,
        subject: `Order confirmation`,
        text: emailBody,
    };

    try {
        transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

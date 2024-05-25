"use server";

import { ObjectId } from "mongodb";
import { Resend } from "resend";

import Order, { IOrder } from "@/models/order.model";
import { connectToDatabase } from "../mongoose";
import { log } from "console";

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
        size: string;
        color: string;
    }[];
    amount: number;
}

export async function createOrder(params: CreateOrderParams) {
    try {
        await connectToDatabase();

        const { customer, shippingAddress, billingAddress, items, amount } =
            params;

        const newOrder = await Order.create({
            customer: new ObjectId(customer),
            shippingAddress,
            billingAddress,
            items,
            amount,
        });

        // await sendEmail({ orderId: newOrder._id, email: billingAddress.email });

        return newOrder;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface GetOrderByIdProps {
    orderId: string;
}

export async function getOrderById(params: GetOrderByIdProps): Promise<IOrder> {
    try {
        await connectToDatabase();

        const { orderId } = params;

        const order = await Order.findById(orderId);

        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface SendEmailProps {
    orderId: string;
    email: string;
}

export async function sendEmail(params: SendEmailProps) {
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

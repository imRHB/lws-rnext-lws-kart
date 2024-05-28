"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

import Order, { IOrder } from "@/models/order.model";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import { connectToDatabase } from "../mongoose";

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

export async function createOrder(params: CreateOrderParams) {
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

        // await sendEmail({ orderId: newOrder._id, email: billingAddress.email });

        revalidatePath(path);
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

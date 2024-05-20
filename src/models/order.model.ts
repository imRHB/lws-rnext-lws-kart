import { Document, model, models, Schema } from "mongoose";

import { AddressSchema } from "./user.model";

export interface IOrder extends Document {
    customer: Schema.Types.ObjectId;
    shippingAddress: typeof AddressSchema;
    billingAddress: typeof AddressSchema;
    orderDate: Date;
    status: string;
    items: {
        product: Schema.Types.ObjectId;
        quantity: number;
        size?: string;
        color?: string;
        createdAt: Date;
    };
    payment: {
        method: string;
        transactionId: string;
    };
    amount: number;
    note?: string;
}

const OrderSchema = new Schema<IOrder>(
    {
        customer: { type: Schema.Types.ObjectId, ref: "User" },
        shippingAddress: AddressSchema,
        billingAddress: AddressSchema,
        orderDate: { type: Date, required: true },
        status: { type: String, required: true },
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, required: true },
                size: { type: String },
                color: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        payment: {
            method: { type: String, required: true },
            transactionId: { type: String, required: true },
        },
        amount: { type: Number, required: true },
        note: { type: String },
    },
    { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;

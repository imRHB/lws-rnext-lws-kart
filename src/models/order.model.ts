import { Document, model, models, Schema } from "mongoose";

import { AddressSchema } from "./user.model";

export interface IOrder extends Document {
    customer: Schema.Types.ObjectId;
    shippingAddress: typeof AddressSchema;
    billingAddress: typeof AddressSchema;
    items: {
        product: Schema.Types.ObjectId;
        quantity: number;
        unitPrice: number;
        size?: string | null | undefined;
        color?: string | null | undefined;
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
}

const OrderSchema = new Schema<IOrder>(
    {
        customer: { type: Schema.Types.ObjectId, ref: "User" },
        shippingAddress: AddressSchema,
        billingAddress: AddressSchema,
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, required: true },
                unitPrice: { type: Number, required: true },
                size: { type: String, default: null },
                color: { type: String, default: null },
            },
            { _id: false },
        ],
        amount: { type: Number, required: true },
        payment: {
            method: { type: String, required: true },
            name: { type: String, required: true },
            cardNumber: { type: String, required: true },
            expiryMonth: { type: String, required: true },
            expiryYear: { type: String, required: true },
            cvc: { type: String, required: true },
        },
        note: { type: String },
        status: { type: String, required: true, default: "pending" },
    },
    { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;

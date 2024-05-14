import { Document, model, models, Schema } from "mongoose";

import { IAddress, IShippingAndBillingAddress } from "@/types";

export interface ICartItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    size?: string;
    color?: string;
    updatedAt: Date;
}

export interface IWishlistItem {
    productId: Schema.Types.ObjectId;
    size?: string;
    color?: string;
    updatedAt: Date;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string;
    emailVerified?: boolean | null;
    phone?: "";
    address?: IShippingAndBillingAddress;
    wishlist?: IWishlistItem;
    cart?: ICartItem;
}

const AddressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
});

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        image: { type: String, required: true },
        emailVerified: { type: Boolean, default: null },
        phone: { type: String, required: true },
        address: { type: AddressSchema, required: true },
        // wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        wishlist: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                size: { type: String },
                color: { type: String },
                updatedAt: { type: Date, default: Date.now },
            },
        ],
        // cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        cart: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                quantity: { type: Number, required: true, default: 1 },
                size: { type: String },
                color: { type: String },
                // createdAt: {type: Date, default:Date.now},
                updatedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;

import { Document, model, models, Schema } from "mongoose";

export interface ICartItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    size?: string;
    color?: string;
    updatedAt: Date;
}

export const AddressSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: Number, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    { _id: false }
);

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    image?: string;
    emailVerified?: boolean | null;
    phone?: string;
    shippingAddress?: typeof AddressSchema | null;
    billingAddress?: typeof AddressSchema | null;
    wishlist?: Schema.Types.ObjectId[];
    cart?: {
        product: Schema.Types.ObjectId;
        quantity: number;
        size: string;
        color: string;
        updatedAt: Date;
    }[];
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: { type: String },
        emailVerified: { type: Boolean, default: null },
        phone: { type: String },
        shippingAddress: AddressSchema,
        billingAddress: AddressSchema,
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        cart: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, required: true, default: 1 },
                size: { type: String, required: true },
                color: { type: String, required: true },
                updatedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;

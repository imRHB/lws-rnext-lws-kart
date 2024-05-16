import { Document, model, models, Schema } from "mongoose";

export interface ICartItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    size?: string;
    color?: string;
    updatedAt: Date;
}

const AddressSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    image?: string;
    emailVerified?: boolean | null;
    phone?: number | null;
    shippingAddress?: typeof AddressSchema;
    billingAddress?: typeof AddressSchema;
    wishlist?: Schema.Types.ObjectId;
    cart?: ICartItem;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        image: { type: String, required: true },
        emailVerified: { type: Boolean, default: null },
        phone: { type: String, required: true },
        shippingAddress: AddressSchema,
        billingAddress: AddressSchema,
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
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

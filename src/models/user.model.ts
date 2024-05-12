import { Document, model, models, Schema, Types } from "mongoose";

import { IAddress, IShippingAndBillingAddress } from "@/types";

export interface IUser extends Document {
    name: string;
    email: string;
    image: string;
    emailVerified: boolean | null;
    phone: "";
    address: IShippingAndBillingAddress;
    wishlist: Types.ObjectId[];
    cart: Types.ObjectId[];
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
        image: { type: String, required: true },
        emailVerified: { type: Boolean, default: null },
        phone: { type: String, required: true },
        address: { type: AddressSchema, required: true },
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;

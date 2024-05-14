import { model, models, Schema, Types } from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    images?: string[];
    category: Types.ObjectId;
    features: string[];
    quantity: number;
    sku: string;
    brand: Types.ObjectId;
    views: number;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        images: [{ type: String, required: false }],
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        features: [{ type: String, required: true }],
        quantity: { type: Number, required: true },
        sku: { type: String, required: true },
        brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;

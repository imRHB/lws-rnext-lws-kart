import { model, models, Schema } from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    images?: string[];
    category: string;
    features?: string[];
    quantity: number;
    size: string[];
    color: string[];
    sku: string;
    brand: string;
    views: number;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        images: [{ type: String, required: false }],
        category: { type: String, required: true },
        features: [{ type: String, required: true }],
        quantity: { type: Number, required: true },
        size: [{ type: String, required: true }],
        color: [{ type: String, required: true }],
        sku: { type: String, required: true },
        brand: { type: String, required: true },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;

import { Document, model, models, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    images?: string[];
    category: string;
    features?: string[];
    size: string;
    color: string;
    sku: string;
    brand: string;
    stock: number;
    views: number;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        images: [{ type: String }],
        category: { type: String, required: true },
        features: [{ type: String, required: true }],
        size: [{ type: String, required: true }],
        color: [{ type: String, required: true }],
        sku: { type: String, required: true },
        brand: { type: String, required: true },
        stock: { type: Number, required: true },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;

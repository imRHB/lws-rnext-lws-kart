import { Document, model, models, Schema } from "mongoose";

export interface IReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface IDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface IProduct extends Document {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string | null | undefined;
    sizes?: string[] | null | undefined;
    colors?: string[] | null | undefined;
    sku: string;
    weight: number;
    dimensions: IDimensions;
    reviews: IReview[];
    createdAt: string;
    updatedAt: string;
    images: string[];
    thumbnail: string;
    views: number;
}

const ProductSchema = new Schema<IProduct>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        discountPercentage: { type: Number, required: true },
        rating: { type: Number, required: true },
        stock: { type: Number, required: true },
        tags: [{ type: String, required: true }],
        brand: { type: String, default: null },
        sizes: [{ type: String, default: null }],
        colors: [{ type: String, default: null }],
        sku: { type: String, required: true },
        weight: { type: Number, required: true },
        dimensions: {
            width: { type: Number, required: true },
            height: { type: Number, required: true },
            depth: { type: Number, required: true },
        },
        reviews: [
            {
                rating: { type: Number, required: true },
                comment: { type: String, required: true },
                date: { type: Date, required: true },
                reviewerName: { type: String, required: true },
                reviewerEmail: { type: String, required: true },
            },
        ],
        images: [{ type: String, required: true }],
        thumbnail: { type: String, required: true },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

ProductSchema.index({ name: "text", category: "text" });

const Product = models.Product || model("Product", ProductSchema);

export default Product;

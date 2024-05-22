import { Document, model, models, Schema } from "mongoose";

export interface IBrand extends Document {
    name: string;
    description: string;
    products: Schema.Types.ObjectId[];
}

const BrandSchema = new Schema<IBrand>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

const Brand = models.Brand || model("Brand", BrandSchema);

export default Brand;

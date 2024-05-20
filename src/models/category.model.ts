import { Document, model, models, Schema } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    icon: string;
    thumbnail: string;
    product?: Schema.Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        thumbnail: { type: String, required: true },
        product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;

import { model, models, Schema, Types } from "mongoose";

export interface ICategory {
    name: string;
    description: string;
    products: Types.ObjectId[];
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;

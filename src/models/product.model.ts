import { model, models, Schema } from "mongoose";

export interface IProduct {}

const ProductSchema = new Schema<IProduct>({});

const Product = models.Product || model("Product", ProductSchema);

export default Product;

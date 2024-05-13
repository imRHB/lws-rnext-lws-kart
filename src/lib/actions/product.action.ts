"use server";

import Product from "@/models/product.model";
import { connectToDatabase } from "../mongoose";
import { GetProductByIdParams } from "./shared.types";

export async function getProducts() {
    try {
        await connectToDatabase();

        const products = await Product.find({});
        const minimalProducts = products.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            thumbnail: product.thumbnail,
        }));

        return {
            products,
            minimalProducts,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProductById(params: GetProductByIdParams) {
    try {
        await connectToDatabase();

        const { productId } = params;
        const product = await Product.findById(productId);

        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/* 

export async function getProducts() {
    try {
        await connectToDatabase();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

*/

"use server";

import { FilterQuery } from "mongoose";

import Product from "@/models/product.model";
import { connectToDatabase } from "../mongoose";
import { GetProductByIdParams, GetProductsParams } from "./shared.types";

export async function getProducts(params: GetProductsParams) {
    try {
        await connectToDatabase();

        const { searchQuery, pmin, pmax } = params;

        const query: FilterQuery<typeof Product> = {};

        if (searchQuery) {
            query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
        }

        if (pmin !== undefined && pmax !== undefined) {
            query.price = { $gte: Number(pmin), $lte: Number(pmax) };
        }

        const products = await Product.find(query);

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

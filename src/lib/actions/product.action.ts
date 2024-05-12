"use server";

import Product from "@/models/product.model";
import { connectToDatabase } from "../mongoose";

export async function getProducts() {
    try {
        await connectToDatabase();

        const products = await Product.find({});

        return products;
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

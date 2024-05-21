"use server";

import { FilterQuery } from "mongoose";

import Product, { IProduct } from "@/models/product.model";
import { connectToDatabase } from "../mongoose";
import { GetProductByIdParams, GetProductsParams } from "./shared.types";

export async function getProducts(
    params: GetProductsParams
): Promise<IProduct[]> {
    try {
        await connectToDatabase();

        const { searchQuery, category, pmin, pmax, size } = params;

        const query: FilterQuery<typeof Product> = {};

        if (searchQuery) {
            query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
        }

        if (pmin !== undefined && pmax !== undefined) {
            query.price = { $gte: Number(pmin), $lte: Number(pmax) };
        }

        if (category) {
            const categoriesArray = category.split(",");
            query.category = { $in: categoriesArray };
        }

        if (size) {
            const sizeArray = [size];
            query.size = { $in: sizeArray };
        }

        const products = await Product.find(query);

        return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProductById(
    params: GetProductByIdParams
): Promise<IProduct> {
    try {
        await connectToDatabase();

        const { productId } = params;

        const product = await Product.findById(productId);
        await Product.findByIdAndUpdate(productId, { $inc: { views: 1 } });

        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface GetTrendingProductsParams {
    limit?: number;
    fields?: string;
}

export async function getTrendingProducts(
    params: GetTrendingProductsParams
): Promise<IProduct[]> {
    try {
        await connectToDatabase();

        const { limit, fields } = params;

        const query = Product.find({}).sort({ views: -1 });

        if (fields) {
            query.select(fields);
        }

        if (limit) {
            query.limit(limit);
        }

        const products = await query.exec();

        return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getNewArrivalProducts(
    params: GetTrendingProductsParams
): Promise<IProduct[]> {
    try {
        await connectToDatabase();

        const { limit, fields } = params;

        const query = Product.find({}).sort({ createdAt: -1 });

        if (fields) {
            query.select(fields);
        }

        if (limit) {
            query.limit(limit);
        }

        const products = await query.exec();

        return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface GetProductByCategoryParams {
    category: string;
}

export async function getProductsByCategory(
    params: GetProductByCategoryParams
): Promise<IProduct[]> {
    try {
        await connectToDatabase();

        const { category } = params;

        const products = await Product.find({ category }).sort({
            createdAt: -1,
        });

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

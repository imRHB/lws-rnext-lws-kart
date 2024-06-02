"use server";

import { FilterQuery } from "mongoose";

import Product, { IProduct } from "@/models/product.model";
import { connectToDatabase } from "../mongoose";
import { GetProductByIdParams, GetProductsParams } from "./shared.types";

export async function getProducts(
    params: GetProductsParams
): Promise<{ products: IProduct[]; isNext: boolean; pageCount: number }> {
    try {
        await connectToDatabase();

        const {
            searchQuery,
            category,
            pmin,
            pmax,
            color,
            size,
            page = 1,
            pageSize = 3,
        } = params;

        const skipAmount = (page - 1) * pageSize;

        const query: FilterQuery<typeof Product> = {};

        const prices = (await Product.find({})).map((product) => product.price);

        const minPrice =
            pmin !== undefined ? Number(pmin) : Math.min(...prices);
        const maxPrice =
            pmax !== undefined ? Number(pmax) : Math.max(...prices);

        if (searchQuery) {
            query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
        }

        query.price = { $gte: minPrice, $lte: maxPrice };

        if (category) {
            const categoriesArray = category.split(",");
            query.category = { $in: categoriesArray };
        }

        if (color) {
            const colorArray = [color];
            query.color = { $in: colorArray };
        }

        if (size) {
            const sizeArray = [size];
            query.size = { $in: sizeArray };
        }

        const products = await Product.find(query)
            .skip(skipAmount)
            .limit(pageSize);

        const totalProducts = await Product.countDocuments(query);
        const isNext = totalProducts > skipAmount + products.length;
        const pageCount = Math.ceil(totalProducts / pageSize);

        return {
            products,
            isNext,
            pageCount,
        };
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
    page: number;
    pageSize?: number;
}

export async function getProductsByCategory(
    params: GetProductByCategoryParams
): Promise<{ products: IProduct[]; isNext: boolean; pageCount: number }> {
    try {
        await connectToDatabase();

        const { category, page = 1, pageSize = 3 } = params;

        const skipAmount = (page - 1) * pageSize;

        const query: FilterQuery<typeof Product> = {};

        if (category) {
            const categoriesArray = category.split(",");
            query.category = { $in: categoriesArray };
        }

        const products = await Product.find(query)
            .skip(skipAmount)
            .limit(pageSize)
            .sort({
                createdAt: -1,
            });

        const totalProducts = await Product.countDocuments(query);
        const isNext = totalProducts > skipAmount + products.length;
        const pageCount = Math.ceil(totalProducts / pageSize);

        return {
            products,
            isNext,
            pageCount,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProductColors(): Promise<string[]> {
    try {
        await connectToDatabase();

        const products = await Product.find({});
        const allColors = products.map((product) => product.color);

        const flattenColors = allColors.flat(Infinity);
        const uniqueColors = [...new Set(flattenColors)];

        return uniqueColors;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getRelatedProducts(params: {
    productId: string;
}): Promise<IProduct[]> {
    try {
        await connectToDatabase();

        const { productId } = params;

        const product = await Product.findById(productId);

        if (!product) throw new Error("Product not found");

        const searchQuery = product.name
            .split(" ")
            .concat(product.category)
            .join(" ");
        const relatedProducts = await Product.aggregate([
            {
                $match: {
                    $text: { $search: searchQuery },
                    _id: { $ne: product._id },
                },
            },
            {
                $sort: { score: { $meta: "textScore" } },
            },
            { $limit: 6 },
        ]);

        return relatedProducts;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface GetProductStockByIdProps {
    productId: string;
}

export async function getProductStockById(params: GetProductStockByIdProps) {
    try {
        await connectToDatabase();

        const { productId } = params;

        const product = await Product.findById(productId);

        if (!product) throw new Error("Product not found");

        return product.stock;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

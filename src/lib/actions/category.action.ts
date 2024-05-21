"use server";

import Category, { ICategory } from "@/models/category.model";
import { connectToDatabase } from "../mongoose";

export async function getCategories(): Promise<ICategory[]> {
    try {
        await connectToDatabase();

        const categories = await Category.find({});

        return categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface GetCategoryByNameParams {
    name: string;
}

export async function getCategoryByName(
    params: GetCategoryByNameParams
): Promise<ICategory> {
    try {
        await connectToDatabase();

        const { name } = params;

        const category = await Category.findOne({ name });

        return category;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

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

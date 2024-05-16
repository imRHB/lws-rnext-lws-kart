"use server";

import { revalidatePath } from "next/cache";

import Product from "@/models/product.model";
import User from "@/models/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, ToggleWishlistParams } from "./shared.types";

export async function createUser(userData: CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(userData);

        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserByEmail(params: { email: string }) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ email: params.email });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function toggleWishlist(params: ToggleWishlistParams) {
    try {
        await connectToDatabase();

        const { email, productId, path } = params;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found!");
        }

        const isProductInWishlist = await user.wishlist.some(
            (item: any) => String(item._id) === productId
        );

        if (isProductInWishlist) {
            await User.findByIdAndUpdate(
                user._id,
                {
                    $pull: { wishlist: productId },
                },
                { new: true }
            );
        } else {
            await User.findByIdAndUpdate(
                user._id,
                { $addToSet: { wishlist: productId } },
                { new: true }
            );
        }

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getWishlist(params: {
    email: string | undefined | null;
}) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ email: params.email }).populate({
            path: "wishlist",
            model: Product,
            select: "_id name price discount thumbnail",
        });
        const wishlist = user.wishlist;

        return {
            wishlist,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface Params {
    email: string;
    addressType: string;
    addressData: {
        firstName: string;
        lastName: string;
        street: string;
        city: string;
        zip: number;
        phone: string;
        email: string;
    };
    path: string;
}

export async function updateAddress(params: Params) {
    try {
        await connectToDatabase();

        const { email, addressData, addressType, path } = params;

        await User.findOneAndUpdate(
            { email },
            { $set: { [addressType]: addressData } },
            { new: true }
        );

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/* 

export async function handleWishlist() {
    try {
        await connectToDatabase();
    } catch (error) {
        console.log(error);
        throw error;
    }
}


*/

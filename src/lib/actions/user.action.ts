"use server";

import { revalidatePath } from "next/cache";

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

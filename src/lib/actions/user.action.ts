"use server";

import { revalidatePath } from "next/cache";

import User, { IWishlistItem } from "@/models/user.model";
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

        const { email, productData, path } = params;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found!");
        }

        /* const isProductInWishlist = await user.wishlist.some(
            (item: IWishlistItem) =>
                String(item.productId) === String(productData.productId)
        ); */

        const isProductInWishlist = await user.wishlist.find(
            (item: IWishlistItem) =>
                String(item.productId) === String(productData.productId)
        );

        /* const isProductInWishlist = await user.wishlist.find(
            (item: any) => item.productId === productData.productId
        ); */

        console.log(isProductInWishlist);

        if (isProductInWishlist) {
            await User.findByIdAndUpdate(
                user._id,
                {
                    $pull: { wishlist: { productId: productData.productId } },
                },
                { new: true }
            );
        } else {
            await User.findByIdAndUpdate(
                user._id,
                { $addToSet: { wishlist: productData } },
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

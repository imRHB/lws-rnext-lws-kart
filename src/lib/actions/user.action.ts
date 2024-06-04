"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

import Product from "@/models/product.model";
import User, { IUser } from "@/models/user.model";
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

interface UpdateUserParams {
    email: string;
    name: string;
    phone: string;
    path: string;
}

export async function updateUser(params: UpdateUserParams) {
    try {
        await connectToDatabase();

        const { email, name, phone, path } = params;

        const user = await User.updateOne({ email }, { $set: { name, phone } });

        revalidatePath(path);
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
    email: string;
}): Promise<Pick<IUser, "wishlist">> {
    try {
        await connectToDatabase();

        const user = await User.findOne({ email: params.email }).populate({
            path: "wishlist",
            model: Product,
            select: "title price discountPercentage thumbnail stock sku",
        });
        const wishlist = user.wishlist;

        return wishlist;
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

interface AddToCartParams {
    email: string;
    productId: string;
    cartData: {
        quantity: number;
        size?: string | null | undefined;
        color?: string | null | undefined;
    };
    path: string;
}

export async function addToCart(params: AddToCartParams) {
    try {
        await connectToDatabase();

        const { email, cartData, productId, path } = params;

        const user = await User.findOne({ email });
        const product = await Product.findById(productId);

        const existingProductIndex = await user.cart.findIndex(
            (item: any) => item.product.toString() === productId
        );

        if (
            existingProductIndex > -1 &&
            user.cart[existingProductIndex].size === cartData.size &&
            user.cart[existingProductIndex].color === cartData.color
        ) {
            user.cart[existingProductIndex].quantity += cartData.quantity;
            user.cart[existingProductIndex].updatedAt = new Date();
            product.stock -= cartData.quantity;
        } else {
            user.cart.push({
                product: new ObjectId(productId),
                ...cartData,
                updatedAt: new Date(),
            });
            product.stock -= cartData.quantity;
        }

        await product.save();
        await user.save();

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getCart(params: {
    email: string;
}): Promise<Pick<IUser, "cart">> {
    try {
        await connectToDatabase();

        const { email } = params;

        const user = await User.findOne({ email }).populate({
            path: "cart",
            populate: [
                {
                    path: "product",
                    model: Product,
                    select: "title price discountPercentage thumbnail stock",
                },
            ],
        });
        const cart = user.cart;

        return cart;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface UpdateCartItemQuantityParams {
    email: string;
    productId: string;
    type: string;
    path: string;
}

export async function updateCartItemQuantity(
    params: UpdateCartItemQuantityParams
) {
    try {
        await connectToDatabase();

        const { email, productId, path, type } = params;

        const user = await User.findOne({ email });

        const cartItemIndex = user.cart.findIndex(
            (item: any) => item.product.toString() === productId
        );

        if (cartItemIndex === -1) throw new Error("Product not found");

        const cartItem = user.cart[cartItemIndex];
        const product = await Product.findById(productId);

        switch (type) {
            case "INCREASE": {
                if (product.stock < 1) {
                    throw new Error("Not enough quantity");
                }
                product.stock -= 1;
                cartItem.quantity += 1;

                break;
            }

            case "DECREASE": {
                if (cartItem.quantity > 1) {
                    product.stock += 1;
                    cartItem.quantity -= 1;
                } else {
                    product.stock += cartItem.quantity;
                    user.cart.splice(cartItemIndex, 1);
                }

                break;
            }

            default: {
                throw new Error("Invalid action type");
            }
        }

        await product.save();
        await user.save();

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface RemoveProductFromCartParams {
    email: string;
    productId: string;
    path: string;
}

export async function removeProductFromCart(
    params: RemoveProductFromCartParams
) {
    try {
        await connectToDatabase();

        const { email, productId, path } = params;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const cartItemIndex = user.cart.findIndex(
            (item: any) => item.product.toString() === productId
        );

        if (cartItemIndex === -1) {
            throw new Error("Product not found in cart");
        }

        const cartItem = user.cart[cartItemIndex];
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        product.stock += cartItem.quantity;
        await product.save();

        user.cart.splice(cartItemIndex, 1);
        await user.save();

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface AddOrRemoveProductToWishlistParams {
    email: string;
    productId: string;
    path: string;
}

export async function addProductToWishlist(
    params: AddOrRemoveProductToWishlistParams
) {
    try {
        await connectToDatabase();

        const { email, productId, path } = params;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found!");
        }

        const isProductInWishlist = user.wishlist.some(
            (item: any) => String(item._id) === productId
        );

        if (!isProductInWishlist) {
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

export async function removeProductFromWishlist(
    params: AddOrRemoveProductToWishlistParams
) {
    try {
        await connectToDatabase();

        const { email, productId, path } = params;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found!");
        }

        const isProductInWishlist = user.wishlist.some(
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

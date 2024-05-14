import { IWishlistItem } from "@/models/user.model";

export interface CreateUserParams {
    name: string;
    email: string;
}

export interface ToggleWishlistParams {
    email: string;
    productData: IWishlistItem;
    path: string;
}

export interface GetProductByIdParams {
    productId: string;
}

export interface GetProductsParams {
    searchQuery?: string;
    category?: string;
    pmin?: number;
    pmax?: number;
    size?: string;
}

import { IShippingAndBillingAddress } from "@/types";

export interface CreateUserParams {
    name: string;
    email: string;
}

export interface ToggleWishlistParams {
    email: string | null | undefined;
    productId: string;
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

export interface UpdateAddressParams {
    email: string | null | undefined;
    addressData: IShippingAndBillingAddress;
    path: string;
}

export enum CartItemQuantityUpdateType {
    increase = "INCREASE",
    decrease = "DECREASE",
}

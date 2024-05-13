export interface CreateUserParams {
    name: string;
    email: string;
}

export interface ToggleWishlistParams {
    email: string;
    productId: string;
    path: string;
}

export interface GetProductByIdParams {
    productId: string;
}

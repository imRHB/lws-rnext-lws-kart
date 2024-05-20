"use client";

import { Button } from "../ui/button";

export default function AddToCart() {
    async function handleAddToCart() {}

    return (
        <Button className="w-full z-10" onClick={handleAddToCart}>
            Add to cart
        </Button>
    );
}

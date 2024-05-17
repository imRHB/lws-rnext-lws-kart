"use client";

import { addToCart } from "@/lib/actions/user.action";
import { Button } from "../ui/button";

export default function AddToCart() {
    async function handleAddToCart() {
        await addToCart({});
    }

    return (
        <Button className="w-full z-10" onClick={handleAddToCart}>
            Add to cart
        </Button>
    );
}

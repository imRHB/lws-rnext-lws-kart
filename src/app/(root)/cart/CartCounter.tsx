"use client";

import { Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCartItemQuantity } from "@/lib/actions/user.action";

export default function CartCounter({
    productId,
    quantity,
    stock,
}: {
    productId: string;
    quantity: number;
    stock: number;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const min = 1;
    const max = stock;

    const [count, setCount] = useState(quantity);

    async function handleDecrease() {
        await updateCartItemQuantity({
            email: session?.user?.email!,
            productId,
            type: "DECREASE",
            path: pathname,
        });

        setCount(count - 1);
    }

    async function handleIncrease() {
        await updateCartItemQuantity({
            email: session?.user?.email!,
            productId,
            type: "INCREASE",
            path: pathname,
        });

        setCount(count + 1);
    }

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                onClick={handleDecrease}
                disabled={count === min}
            >
                <Minus className="h-4 w-4" />
            </Button>

            <Input
                type="number"
                value={count}
                onChange={(evt) => setCount(evt.target.valueAsNumber)}
                className="w-12 text-center focus:ring-0 focus:outline-none"
                readOnly
            />

            <Button
                variant="outline"
                size="icon"
                onClick={handleIncrease}
                disabled={count === max}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}

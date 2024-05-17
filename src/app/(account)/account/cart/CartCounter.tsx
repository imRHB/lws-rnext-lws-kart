"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartCounter() {
    const min = 1;
    const max = 99;

    const [count, setCount] = useState(min);

    const handleDecrease = () => {
        if (count <= min) return;
        setCount(count - 1);
    };

    const handleIncrease = () => {
        if (count >= max) return;
        setCount(count + 1);
    };

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

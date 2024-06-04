"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Minus, Plus } from "lucide-react";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

interface Props {
    productId: string;
    sizes: string;
    colors: string;
    stock: number;
}

export default function ProductActions(props: Props) {
    const { productId, sizes, colors, stock } = props;

    const variants = {
        sizes: JSON.parse(sizes),
        colors: JSON.parse(colors),
    };

    const [pdColor, setPdColor] = useState(variants.colors?.[0]);
    const [pdSize, setPdSize] = useState(variants.sizes?.[0]);
    const [pdCount, setPdCount] = useState(1);

    function handleDecrease() {
        setPdCount(pdCount - 1);
    }

    function handleIncrease() {
        setPdCount(pdCount + 1);
    }

    const cartData: {
        size: string;
        color: string;
        quantity: number;
    } = {
        size: pdSize,
        color: pdColor,
        quantity: pdCount,
    };

    return (
        <div className="flex flex-col items-start gap-4">
            {variants.sizes && (
                <div className="space-y-2">
                    <h4 className="font-semibold">Size</h4>

                    <RadioGroup
                        value={pdSize}
                        onValueChange={(value: string) => setPdSize(value)}
                        className="flex items-center gap-4"
                    >
                        {(variants.sizes as any[]).map((size) => (
                            <div key={size} className="flex items-center">
                                <RadioGroupItem
                                    value={size}
                                    id={size}
                                    className="sr-only"
                                />
                                <Label
                                    htmlFor={size}
                                    className={`flex items-center justify-center p-2 h-8 w-8 bg-zinc-100 rounded cursor-pointer ${
                                        pdSize === size &&
                                        "ring-2 ring-violet-500 ring-offset-2"
                                    }`}
                                >
                                    <span className="uppercase">{size}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            )}

            {variants.colors && (
                <div className="space-y-2">
                    <h4 className="font-semibold">Color</h4>

                    <RadioGroup
                        value={pdColor}
                        onValueChange={(value: string) => setPdColor(value)}
                        className="flex items-center gap-4"
                    >
                        {(variants.colors as any[]).map((color) => (
                            <div key={color} className="flex items-center">
                                <RadioGroupItem
                                    value={color}
                                    id={color}
                                    className="sr-only"
                                />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Label
                                                htmlFor={color}
                                                className={`flex items-center justify-center p-2 h-8 w-8 rounded-full cursor-pointer ${
                                                    pdColor === color &&
                                                    "ring-2 ring-violet-500 ring-offset-2"
                                                }`}
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            >
                                                <span className="sr-only">
                                                    {color}
                                                </span>
                                            </Label>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="capitalize">
                                                {color}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            )}

            <div className="space-y-2">
                <h4 className="font-semibold">Quantity</h4>

                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDecrease}
                        disabled={pdCount <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>

                    <Input
                        type="number"
                        value={pdCount}
                        onChange={(evt) => setPdCount(evt.target.valueAsNumber)}
                        className="w-12 h-[36px] text-center focus:ring-0 focus:outline-none"
                        readOnly
                    />

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleIncrease}
                        disabled={pdCount >= 99}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex gap-4">
                <AddToCart
                    productId={productId}
                    stock={stock}
                    cartData={JSON.stringify(cartData)}
                />
                <AddToWishlist productId={productId} />
            </div>
        </div>
    );
}

"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function Component() {
    const [selectedColor, setSelectedColor] = useState("pink");
    return (
        <div className="flex flex-col space-y-4">
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="pink"
                        id="color-pink"
                        className="sr-only"
                    />
                    <Label
                        htmlFor="color-pink"
                        className={`block p-0.5 rounded-full border border-white cursor-pointer ${
                            selectedColor === "pink"
                                ? "ring-2 ring-pink-500"
                                : "bg-pink-500"
                        }`}
                    >
                        <div className="w-4 h-4 bg-pink-500 rounded-full" />
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="purple"
                        id="color-purple"
                        className="sr-only"
                    />
                    <Label
                        htmlFor="color-purple"
                        className={`block p-0.5 rounded-full border border-white cursor-pointer ${
                            selectedColor === "purple"
                                ? "ring-2 ring-purple-500"
                                : "bg-purple-500"
                        }`}
                    >
                        <div className="w-4 h-4 bg-purple-500 rounded-full" />
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="blue"
                        id="color-blue"
                        className="sr-only"
                    />
                    <Label
                        htmlFor="color-blue"
                        className={`block p-0.5 rounded-full border border-white cursor-pointer ${
                            selectedColor === "blue"
                                ? "ring-2 ring-blue-500"
                                : "bg-blue-500"
                        }`}
                    >
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="green"
                        id="color-green"
                        className="sr-only"
                    />
                    <Label
                        htmlFor="color-green"
                        className={`block p-0.5 rounded-full border border-white cursor-pointer ${
                            selectedColor === "green"
                                ? "ring-2 ring-green-500"
                                : "bg-green-500"
                        }`}
                    >
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="yellow"
                        id="color-yellow"
                        className="sr-only"
                    />
                    <Label
                        htmlFor="color-yellow"
                        className={`block p-0.5 rounded-full border border-white cursor-pointer ${
                            selectedColor === "yellow"
                                ? "ring-2 ring-yellow-500"
                                : "bg-yellow-500"
                        }`}
                    >
                        <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
}

/* 

<div key={color} className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={color}
                            id={`color-${color}`}
                            className="sr-only"
                        />
                        <Label
                            htmlFor={`color-${color}`}
                            className={`block p-0.5 rounded-full border border-white cursor-pointer ${
                                pdColor === "green"
                                    ? "ring-2 ring-green-500"
                                    : "bg-green-500"
                            }`}
                        >
                            {pdColor === "green" ? (
                                <div
                                    className={`w-4 h-4 bg-green-500 rounded-full`}
                                />
                            ) : pdColor === "violet" ? (
                                <div
                                    className={`w-4 h-4 bg-violet-500 rounded-full`}
                                />
                            ) : pdColor === "orange" ? (
                                <div
                                    className={`w-4 h-4 bg-orange-500 rounded-full`}
                                />
                            ) : null}
                        </Label>
                    </div>

*/

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutSummary() {
    return (
        <div className="col-span-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>You have ordered 3 items</CardDescription>
                </CardHeader>

                <Separator />

                <CardContent className="mt-4 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <Image
                            src="/assets/images/products/product1.jpg"
                            height={64}
                            width={64}
                            className="rounded"
                            alt=""
                        />
                        <CardDescription className="flex flex-col gap-1">
                            <span className="font-semibold">T-shirt</span>
                            <span className="font-semibold">$50.00</span>
                        </CardDescription>
                        <CardDescription>
                            <span className="font-semibold">x3</span>
                        </CardDescription>
                        <CardDescription>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardDescription>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between gap-4">
                        <Image
                            src="/assets/images/products/product1.jpg"
                            height={64}
                            width={64}
                            className="rounded"
                            alt=""
                        />
                        <CardDescription className="flex flex-col gap-1">
                            <span className="font-semibold">T-shirt</span>
                            <span className="font-semibold">$50.00</span>
                        </CardDescription>
                        <CardDescription>
                            <span className="font-semibold">x3</span>
                        </CardDescription>
                        <CardDescription>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardDescription>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between gap-4">
                        <Image
                            src="/assets/images/products/product1.jpg"
                            height={64}
                            width={64}
                            className="rounded"
                            alt=""
                        />
                        <CardDescription className="flex flex-col gap-1">
                            <span className="font-semibold">T-shirt</span>
                            <span className="font-semibold">$50.00</span>
                        </CardDescription>
                        <CardDescription>
                            <span className="font-semibold">x3</span>
                        </CardDescription>
                        <CardDescription>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardDescription>
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className="mt-4 flex flex-col gap-4">
                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-semibold">$50.00</span>
                    </CardDescription>
                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="font-semibold">Shipping</span>
                        <span className="font-semibold">FREE</span>
                    </CardDescription>
                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="font-semibold">Taxes</span>
                        <span className="font-semibold">$5.00</span>
                    </CardDescription>

                    <Separator />

                    <CardDescription className="flex w-full items-center justify-between gap-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">$55.00</span>
                    </CardDescription>
                </CardFooter>
            </Card>

            <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                        You agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>

            <Button className="w-full">Place order</Button>
        </div>
    );
}

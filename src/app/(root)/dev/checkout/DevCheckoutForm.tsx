"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/lib/actions/order.action";

const zodAddressSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    street: z.string(),
    city: z.string(),
    zip: z.number().positive("Zip must be a positive number"),
    phone: z.string(),
    email: z.string().email("Invalid email format"),
});

const itemSchema = z.object({
    product: z.string().refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
        message: "Invalid product ID",
    }),
    quantity: z.number(),
    size: z.string(),
    color: z.string(),
});

const formSchema = z.object({
    customer: z.string().refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
        message: "Invalid customer ID",
    }),
    shippingAddress: zodAddressSchema,
    billingAddress: zodAddressSchema,
    items: z.array(itemSchema),
    amount: z.number(),
});

interface CheckoutFormProps {
    userId: string;
    shippingAddress: string;
    billingAddress: string;
    items: string;
    amount: number;
}

export default function DevCheckoutForm(params: CheckoutFormProps) {
    const { userId, shippingAddress, billingAddress, items, amount } = params;

    const parsedShippingAddress = JSON.parse(shippingAddress) as z.infer<
        typeof zodAddressSchema
    >;
    const parsedBillingAddress = JSON.parse(billingAddress) as z.infer<
        typeof zodAddressSchema
    >;
    const parsedItems = JSON.parse(items) as z.infer<typeof itemSchema>[];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer: userId,
            shippingAddress: parsedShippingAddress,
            billingAddress: parsedBillingAddress,
            items: parsedItems,
            amount,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        await createOrder(values);
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout Form</CardTitle>
                    <CardDescription>
                        Enter your shipping address to complete your order.
                    </CardDescription>
                </CardHeader>

                <Separator />

                <CardContent className="mt-4 space-y-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="customer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between gap-4">
                                                <FormLabel>Name</FormLabel>
                                                <FormMessage />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    placeholder="ObjectId"
                                                    disabled={
                                                        form.formState
                                                            .isSubmitting
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button className="w-full sm:w-fit">
                                Place order
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

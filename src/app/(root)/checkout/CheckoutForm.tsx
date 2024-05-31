"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Month, MONTHS } from "@/constants";
import { getYears } from "@/lib";
import { createOrder } from "@/lib/actions/order.action";

const luhnCheck = (cardNumber: string) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

const cardNumberSchema = z
    .string()
    .refine(
        (val) => {
            const sanitizedVal = val.replace(/\D/g, "");

            return (
                sanitizedVal.length >= 13 &&
                sanitizedVal.length <= 19 &&
                luhnCheck(sanitizedVal)
            );
        },
        {
            message: "Invalid credit card number",
        }
    )
    .transform((val) => {
        const sanitizedVal = val.replace(/\D/g, "");
        const last4Digits = sanitizedVal.slice(-4);
        const starGroups =
            sanitizedVal
                .slice(0, -4)
                .replace(/\d/g, "*")
                .match(/.{1,4}/g) || [];

        return `${starGroups.join(" ")} ${last4Digits}`;
    });

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
    unitPrice: z.number(),
    size: z.string(),
    color: z.string(),
});

const paymentSchema = z.object({
    method: z.string({ required_error: "Required" }),
    name: z.string().min(1, { message: "Required" }),
    cardNumber: cardNumberSchema,
    expiryMonth: z.nativeEnum(Month, {
        errorMap: () => ({ message: "Invalid month" }),
    }),
    expiryYear: z
        .string()
        .refine((val) => /^[0-9]{4}$/.test(val), { message: "Invalid year" }),
    cvc: z
        .string()
        .refine((val) => /^[0-9]{3}$/.test(val), { message: "Invalid cvc" }),
});

const formSchema = z.object({
    customer: z.string().refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
        message: "Invalid customer ID",
    }),
    shippingAddress: zodAddressSchema,
    billingAddress: zodAddressSchema,
    items: z.array(itemSchema),
    amount: z.number(),
    payment: paymentSchema,
    note: z.string().optional(),
    status: z.enum(["pending", "delivered"]),
});

const YEARS = getYears();

interface CheckoutFormProps {
    userId: string;
    shippingAddress: string;
    billingAddress: string;
    items: string;
    amount: number;
    isShipAdEmpty: boolean;
    isBillAdEmpty: boolean;
}

const paymentInfo = {
    method: "CreditCard",
    name: "John Doe",
    cardNumber: "4000056655665556",
    expiryMonth: "12",
    expiryYear: "2026",
    cvc: "123",
};

export default function CheckoutForm(params: CheckoutFormProps) {
    const pathname = usePathname();

    const { toast } = useToast();

    const {
        userId,
        shippingAddress,
        billingAddress,
        items,
        amount,
        isShipAdEmpty,
        isBillAdEmpty,
    } = params;

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
            payment: {
                method: "",
                name: "",
                cardNumber: "",
                expiryMonth: undefined,
                expiryYear: undefined,
                cvc: "",
            },
            note: "",
            status: "pending",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isShipAdEmpty || isBillAdEmpty) {
            toast({
                title: `Shipping or billing address is required! Please update!`,
            });
        } else {
            await createOrder({ ...values, path: pathname });
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout Form</CardTitle>
                </CardHeader>

                <Separator />

                <CardContent className="mt-4 space-y-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Payment Method
                                </legend>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="payment.method"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>
                                                        Payment Method
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        className="flex items-center gap-4"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="CreditCard" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Credit Card
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Bank" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Bank
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="payment.name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>Name</FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Jane Doe"
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
                                    <FormField
                                        control={form.control}
                                        name="payment.cardNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>
                                                        Card Number
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        placeholder="5105 1051 0510 5100"
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

                                <div className="grid grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="payment.expiryMonth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>
                                                        Expires
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        disabled={
                                                            form.formState
                                                                .isSubmitting
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Month" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {MONTHS.map(
                                                                (month) => (
                                                                    <SelectItem
                                                                        key={
                                                                            month.value
                                                                        }
                                                                        value={
                                                                            month.value
                                                                        }
                                                                    >
                                                                        {
                                                                            month.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="payment.expiryYear"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>Year</FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        disabled={
                                                            form.formState
                                                                .isSubmitting
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Year" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {YEARS.map(
                                                                (year: any) => (
                                                                    <SelectItem
                                                                        key={
                                                                            year
                                                                        }
                                                                        value={year.toString()}
                                                                    >
                                                                        {year}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="payment.cvc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>CVC</FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        placeholder="123"
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
                            </fieldset>

                            <div>
                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Note</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add extra note regarding your
                                                order or delivery"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                className="w-full sm:w-fit"
                                disabled={isShipAdEmpty || isBillAdEmpty}
                            >
                                Place order
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

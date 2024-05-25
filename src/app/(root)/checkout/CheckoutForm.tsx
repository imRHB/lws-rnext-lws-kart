"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Month, MONTHS } from "@/constants";
import { getYears } from "@/lib";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const phoneRegEx = /^(?:(?:\+|00)88|01)?\d{11}\r?$/;

enum DeliveryMethods {
    "Standard" = "standard",
    "Express" = "express",
}

enum PaymentMethods {
    "Card" = "card",
    "Bank" = "bank",
}

const years = getYears();

const formSchemaOriginal = z.object({
    delivery: z.nativeEnum(DeliveryMethods),
    payment: z.nativeEnum(PaymentMethods),
    name: z.string(),
    cardNumber: z.coerce.number(),
    expMonth: z.nativeEnum(Month),
    expYear: z.coerce.number().int().gte(2024).lte(2033),
    cvc: z.coerce.number().int().gte(100).lte(999),
});

interface Props {
    shippingAddress: string;
    billingAddress: string;
}

const AddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string().length(5),
    country: z.string(),
});

// Order item schema
const OrderItemSchema = z.object({
    product: z.string().refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
        message: "Invalid product ID",
    }),
    quantity: z.number().int().positive(),
    size: z.string().optional(),
    color: z.string().optional(),
});

// Payment schema
const PaymentSchema = z.object({
    method: z.nativeEnum(PaymentMethods),
    transactionId: z.string(),
});

// Order form schema
const formSchema = z.object({
    customer: z.string().refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
        message: "Invalid customer ID",
    }),
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    orderDate: z.date(),
    status: z.string(),
    items: z.array(OrderItemSchema),
    payment: PaymentSchema,
    amount: z.number().positive(),
    note: z.string().optional(),
    delivery: z.nativeEnum(DeliveryMethods),
    name: z.string(),
    cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), {
        message: "Invalid card number",
    }),
    expMonth: z.nativeEnum(Month),
    expYear: z.string().refine((val) => /^(202[4-9]|203[0-3])$/.test(val), {
        message: "Invalid expiration year",
    }),
    cvc: z
        .string()
        .refine((val) => /^\d{3}$/.test(val), { message: "Invalid CVC" }),
});

export default function CheckoutForm(params: Props) {
    const { data: session } = useSession();

    const { billingAddress, shippingAddress } = params;

    const parsedShippingAddress = JSON.parse(shippingAddress);
    const parsedBillingAddress = JSON.parse(billingAddress);

    const YEARS = getYears();

    const pathname = usePathname();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer: "", // Initially an empty string, replace with a valid ID as needed
            shippingAddress: parsedShippingAddress,
            billingAddress: parsedBillingAddress,
            orderDate: new Date(), // Defaults to the current date
            status: "", // Set the default status as appropriate
            items: [], // Start with an empty array, items can be added dynamically
            payment: {
                method: PaymentMethods.Card, // Assuming 'CreditCard' is a valid enum value
                transactionId: "", // Initially an empty string, replace with a valid transaction ID as needed
            },
            amount: 0, // Initially set to 0, update as needed
            note: "", // Optional, so it starts as an empty string
            delivery: DeliveryMethods.Standard,
            name: "",
            cardNumber: "", // Initially an empty string
            expMonth: Month.January,
            expYear: YEARS[0].toString(), // Set the first year in the generated range (2024)
            cvc: "", // Initially an empty string
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Delivery Method
                                </legend>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="delivery"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>
                                                        Delivery
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-baseline space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="standard" />
                                                            </FormControl>
                                                            <div>
                                                                <FormLabel className="font-normal">
                                                                    Standard
                                                                </FormLabel>
                                                                <FormDescription>
                                                                    3-5 business
                                                                    days
                                                                </FormDescription>
                                                                <FormDescription>
                                                                    FREE
                                                                </FormDescription>
                                                            </div>
                                                        </FormItem>
                                                        <FormItem className="flex items-baseline space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="express" />
                                                            </FormControl>
                                                            <div>
                                                                <FormLabel className="font-normal">
                                                                    Express
                                                                </FormLabel>
                                                                <FormDescription>
                                                                    1 business
                                                                    day
                                                                </FormDescription>
                                                                <FormDescription>
                                                                    $20
                                                                </FormDescription>
                                                            </div>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </fieldset>

                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Payment Method
                                </legend>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="delivery"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between gap-4">
                                                    <FormLabel>
                                                        Delivery
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="flex items-center gap-4"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="standard" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Credit Card
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="express" />
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
                                        name="name"
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
                                        name="cardNumber"
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
                                        name="expMonth"
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
                                                        defaultValue={
                                                            field.value
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
                                        name="expYear"
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
                                                                (year) => (
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
                                        name="cvc"
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

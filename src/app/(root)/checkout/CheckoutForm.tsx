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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const phoneRegEx = /^(?:(?:\+|00)88|01)?\d{11}\r?$/;

enum DeliveryMethods {
    "standard" = "Standard",
    "express" = "Express",
}

enum PaymentMethods {
    "card" = "Card",
    "bank" = "Bank",
}

const years = getYears();

const formSchema = z.object({
    delivery: z.nativeEnum(DeliveryMethods),
    payment: z.nativeEnum(PaymentMethods),
    name: z.string(),
    cardNumber: z.coerce.number(),
    expMonth: z.nativeEnum(Month),
    expYear: z.coerce.number().int().gte(2024).lte(2033),
    cvc: z.coerce.number().int().gte(100).lte(999),
});

interface Props {
    authEmail: string;
    address: string;
    addressType: string;
    legend: string;
}

export default function CheckoutForm() {
    const { data: session } = useSession();

    const YEARS = getYears();

    const pathname = usePathname();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
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
                                                        type="number"
                                                        placeholder="5105 1051 0510 5100"
                                                        disabled={
                                                            form.formState
                                                                .isSubmitting
                                                        }
                                                        {...field}
                                                        onChange={(evt) =>
                                                            field.onChange(
                                                                evt.target
                                                                    .valueAsNumber
                                                            )
                                                        }
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
                                                        type="number"
                                                        placeholder="123"
                                                        disabled={
                                                            form.formState
                                                                .isSubmitting
                                                        }
                                                        {...field}
                                                        onChange={(evt) =>
                                                            field.onChange(
                                                                evt.target
                                                                    .valueAsNumber
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

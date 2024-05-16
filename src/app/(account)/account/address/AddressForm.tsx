"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { City, CITY_LIST } from "@/constants";
import { devUpdateAddress } from "@/lib/actions/user.action";

const formSchema = z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    street: z.string().min(4).max(40),
    city: z.nativeEnum(City),
    zip: z.string().min(4).max(5),
    phone: z.string().min(11).max(14),
    email: z.string().email(),
});

interface Props {
    authEmail: string;
    address: string;
    addressType: string;
    legend: string;
}

export default function AddressForm({
    authEmail,
    address,
    addressType,
    legend,
}: Props) {
    const parsedAddress = JSON.parse(address);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: parsedAddress.firstName || "",
            lastName: parsedAddress.lastName || "",
            street: parsedAddress.street || "",
            zip: parsedAddress.zip || "",
            phone: parsedAddress.phone || "",
            email: parsedAddress.email || "",
            city: parsedAddress.city || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await devUpdateAddress({
            email: authEmail,
            addressType,
            addressData: values,
        });
    }

    return (
        <Card className="p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                            {legend}
                        </legend>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>First Name</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Jane"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>Last Name</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>
                                                Street Address
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Dhanmondi-32"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>City</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select City" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {CITY_LIST.map((city) => (
                                                        <SelectItem
                                                            key={city.value}
                                                            value={city.value}
                                                        >
                                                            {city.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>ZIP</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="1234"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>Phone</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="01234567890"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>Email</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="jane@mail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-end justify-end">
                                <Button
                                    className="w-full sm:w-fit"
                                    disabled={form.formState.isSubmitting}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </Form>
        </Card>
    );
}

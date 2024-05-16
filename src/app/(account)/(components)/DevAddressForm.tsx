"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
    firstName: z.string(),
    lastName: z.string(),
    street: z.string(),
    zip: z.number(),
    phone: z.string(),
    email: z.string().email(),
    city: z.nativeEnum(City),
});

interface Props {
    authEmail: string;
    address: string;
}

export default function DevAddressForm({ authEmail, address }: Props) {
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
        console.log(values);

        await devUpdateAddress({ email: authEmail, addressData: values });
    }

    return (
        <div className="bg-white rounded">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                            Address
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
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>ZIP</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="ZIP"
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
                                                placeholder="+880 1234 567890"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between gap-4">
                                            <FormLabel>City</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Dhaka"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            /> */}
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

                            <Button className="w-full sm:w-fit">Save</Button>
                        </div>
                    </fieldset>
                </form>
            </Form>
        </div>
    );
}

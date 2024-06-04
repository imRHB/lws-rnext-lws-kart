"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SquarePen } from "lucide-react";
import React, { useState } from "react";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useToast } from "./ui/use-toast";

interface Props {
    name: string;
    email: string;
    phone: string;
}

const phoneRegEx = /^(?:(?:\+|00)88|01)?\d{11}\r?$/;

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Too short" })
        .max(20, { message: "Too long" }),
    phone: z.string().regex(phoneRegEx, { message: "Invalid phone" }),
    email: z.string().email({ message: "Invalid email" }),
});

export default function ProfileCard({ name, email, phone }: Props) {
    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            email: email,
            phone: phone,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateUser({
                email,
                name: values.name,
                phone: values.phone,
                path: pathname,
            });

            setOpen(false);
        } catch (error) {
            console.error(error);
            throw error;
        }

        // await updateAddress({
        //     email: authEmail,
        //     addressType,
        //     addressData: values,
        //     path: pathname,
        // });

        toast({
            title: "Your profile is updated successfully",
        });
    }

    return (
        <Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-4">
                            <span>Personal Profile</span>
                            <Button variant="outline" size="icon">
                                <SquarePen className="h-4 w-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between gap-4">
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <React.Fragment>
                                                        <Input
                                                            placeholder="Jane Doe"
                                                            disabled={
                                                                form.formState
                                                                    .isSubmitting
                                                            }
                                                            {...field}
                                                        />
                                                        <FormMessage />
                                                    </React.Fragment>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between gap-4">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <React.Fragment>
                                                        <Input
                                                            placeholder="example@mail.com"
                                                            readOnly
                                                            {...field}
                                                        />
                                                        <FormMessage />
                                                    </React.Fragment>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between gap-4">
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <React.Fragment>
                                                        <Input
                                                            placeholder="+880 1234 567890"
                                                            disabled={
                                                                form.formState
                                                                    .isSubmitting
                                                            }
                                                            {...field}
                                                        />
                                                        <FormMessage />
                                                    </React.Fragment>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? (
                                            <React.Fragment>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving
                                            </React.Fragment>
                                        ) : (
                                            "Save changes"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>

            <CardContent>
                <CardDescription>{name}</CardDescription>
                <CardDescription>{email}</CardDescription>
                <CardDescription>{phone}</CardDescription>
            </CardContent>
        </Card>
    );
}

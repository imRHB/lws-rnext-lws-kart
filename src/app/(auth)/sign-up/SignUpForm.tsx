"use client";

import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "Too short" })
        .max(20, { message: "Too long" }),
    lastName: z
        .string()
        .min(2, { message: "Too short" })
        .max(20, { message: "Too long" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(4, { message: "Too short" }),
});

export default function SignUpForm() {
    const [error, setError] = useState<null | string>(null);

    const { toast } = useToast();

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: `${process.env.SITE_URL}/shop` });
    };

    const handleGitHubSignIn = () => {
        signIn("github", { callbackUrl: `${process.env.SITE_URL}/shop` });
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);

        try {
            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response?.status === 201) {
                form.reset();
                toast({
                    title: "Congratulations!",
                    description: "You have successfully signed up.",
                    action: (
                        <ToastAction altText="Sign in">
                            <Link href="/sign-in">Sign in</Link>
                        </ToastAction>
                    ),
                });
            }

            if (response?.status === 409) {
                setError("User already exists");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jane@mail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="* * * *"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    Create an account
                </Button>

                <div className="relative flex items-center justify-center py-2">
                    <Separator />
                    <p className="absolute -translate-y p-1 bg-white text-center font-semibold text-xs uppercase text-slate-500">
                        Or Continue With
                    </p>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignIn}
                        disabled={form.formState.isSubmitting}
                    >
                        <FontAwesomeIcon icon={faGoogle} size="lg" />{" "}
                        <span className="font-semibold ml-2">Google</span>
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGitHubSignIn}
                        disabled={form.formState.isSubmitting}
                    >
                        <FontAwesomeIcon icon={faGithub} size="lg" />{" "}
                        <span className="font-semibold ml-2">GitHub</span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}

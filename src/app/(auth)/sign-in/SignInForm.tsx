"use client";

import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
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

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(4, { message: "Too short" }),
});

export default function SignInForm() {
    const [error, setError] = useState<null | string>(null);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const handleGoogleSignIn = () => {
        signIn("google", {
            callbackUrl: callbackUrl
                ? `${process.env.SITE_URL}${callbackUrl}`
                : `${process.env.SITE_URL}/shop`,
        });
    };

    const handleGitHubSignIn = () => {
        signIn("github", {
            callbackUrl: callbackUrl
                ? `${process.env.SITE_URL}${callbackUrl}`
                : `${process.env.SITE_URL}/shop`,
        });
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);

        try {
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
                callbackUrl: callbackUrl
                    ? `${process.env.SITE_URL}${callbackUrl}`
                    : `${process.env.SITE_URL}/shop`,
            });

            if (!!response?.error) {
                setError(
                    response?.error === "Configuration"
                        ? "Invalid credentials"
                        : "An unknown error occurred"
                );
            }
        } catch (error) {
            setError(error as string);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    Sign in
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

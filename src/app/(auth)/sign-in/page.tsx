"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "http://localhost:3000" });
    };

    const handleGitHubSignIn = () => {
        signIn("github", { callbackUrl: "http://localhost:3000" });
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign In</CardTitle>
                    <CardDescription>
                        Enter your email below to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {/* <Link
                                    href="#"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link> */}
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleGoogleSignIn}
                            >
                                Sign in with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleGitHubSignIn}
                            >
                                Sign in with GitHub
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

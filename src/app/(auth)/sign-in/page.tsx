"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import SignInForm from "./SignInForm";

export default function SignInPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) router.push("/");
    }, [router, session]);

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            {status === "loading" ? (
                "checking auth"
            ) : (
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign In</CardTitle>
                        <CardDescription>
                            Enter your email below to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignInForm />
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <div className="text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/sign-up" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </section>
    );
}

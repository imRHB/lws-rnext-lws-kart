"use client";

import { Loader2 } from "lucide-react";
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
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) router.push("/");
    }, [router, session]);

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            {status === "loading" ? (
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-zinc-400" />
            ) : (
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignUpForm />
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <div className="text-sm">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </section>
    );
}

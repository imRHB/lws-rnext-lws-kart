import { SquarePen } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getUserByEmail } from "@/lib/actions/user.action";
import AccountSectionIntro from "../(components)/AccountSectionIntro";

export default async function AccountPage() {
    const session = await auth();

    if (!session) {
        redirect("/sign-in");
    }

    let user;
    if (session) {
        user = await getUserByEmail({ email: session?.user?.email! });
    }

    const { shippingAddress, billingAddress } = user || {};

    return (
        <section>
            <AccountSectionIntro
                title="Account"
                description="Your account overview"
            />

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-4">
                            <span>Personal Profile</span>
                            {/* <Button variant="outline" size="icon">
                                <Link href="/account">
                                    <SquarePen className="h-4 w-4" />
                                </Link>
                            </Button> */}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{user?.name}</CardDescription>
                        <CardDescription>{user?.email}</CardDescription>
                        <CardDescription>{user?.phone}</CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-4">
                            <span>Shipping Address</span>
                            <Link href="/account/address">
                                <Button variant="outline" size="icon">
                                    <SquarePen className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user?.shippingAddress ? (
                            <React.Fragment>
                                <CardDescription>
                                    {shippingAddress?.firstName}{" "}
                                    {shippingAddress?.lastName}
                                </CardDescription>
                                <CardDescription>
                                    {shippingAddress?.street},{" "}
                                    {shippingAddress?.city}
                                </CardDescription>
                                <CardDescription>
                                    {shippingAddress?.phone}
                                </CardDescription>
                                <CardDescription>
                                    {shippingAddress?.email}
                                </CardDescription>
                            </React.Fragment>
                        ) : (
                            <CardDescription>
                                Update your shipping address
                            </CardDescription>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-4">
                            <span>Billing Address</span>
                            <Link href="/account/address">
                                <Button variant="outline" size="icon">
                                    <SquarePen className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user?.billingAddress ? (
                            <React.Fragment>
                                <CardDescription>
                                    {billingAddress?.firstName}{" "}
                                    {billingAddress?.lastName}
                                </CardDescription>
                                <CardDescription>
                                    {billingAddress?.street},{" "}
                                    {billingAddress?.city}
                                </CardDescription>
                                <CardDescription>
                                    {billingAddress?.phone}
                                </CardDescription>
                                <CardDescription>
                                    {billingAddress?.email}
                                </CardDescription>
                            </React.Fragment>
                        ) : (
                            <CardDescription>
                                Update your billing address
                            </CardDescription>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

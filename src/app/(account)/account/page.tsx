import { SquarePen } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AccountSectionIntro from "../(components)/AccountSectionIntro";

export default function AccountPage() {
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
                            <Button variant="outline" size="icon">
                                <Link href="/account">
                                    <SquarePen className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Rakib Hasan Babu</CardDescription>
                        <CardDescription>rhbabu3@duck.com</CardDescription>
                        <CardDescription>+880 1234 567890</CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-4">
                            <span>Shipping Address</span>
                            <Button variant="outline" size="icon">
                                <Link href="/account">
                                    <SquarePen className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Rakib Hasan</CardDescription>
                        <CardDescription>Dhanmondi-32</CardDescription>
                        <CardDescription>Dhaka, Bangladesh</CardDescription>
                        <CardDescription>+880 1234 567890</CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-4">
                            <span>Billing Address</span>
                            <Button variant="outline" size="icon">
                                <Link href="/account">
                                    <SquarePen className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Rakib Hasan</CardDescription>
                        <CardDescription>Dhanmondi-32</CardDescription>
                        <CardDescription>Dhaka, Bangladesh</CardDescription>
                        <CardDescription>+880 1234 567890</CardDescription>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

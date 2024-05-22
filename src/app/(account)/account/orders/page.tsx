import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AccountSectionIntro from "../../(components)/AccountSectionIntro";

export default async function AccountOrderPage() {
    const session = await auth();

    if (!session) {
        redirect("/sign-in");
    }

    return (
        <section>
            <AccountSectionIntro
                title="Orders"
                description="Your order summary"
            />

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[150px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Price
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Quantity
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Ordered at
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    src="/assets/images/products/product1.jpg"
                                    height={200}
                                    width={200}
                                    className="aspect-video rounded-md"
                                    alt="Product image"
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                Laser Lemonade Machine
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Delivered</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                $499.99
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-07-12 10:42 AM
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">
                                                Toggle menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </section>
    );
}

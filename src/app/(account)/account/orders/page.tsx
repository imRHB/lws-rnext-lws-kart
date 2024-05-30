import User from "@/models/user.model";
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import UserOrdersIntro from "@/components/metrics/UserOrdersIntro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getOrdersByCustomerId } from "@/lib/actions/order.action";
import Link from "next/link";
import DownloadInvoice from "./DownloadInvoice";

interface Props {
    orderId: string;
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    thumbnail: string;
    status: string;
}

export const metadata: Metadata = {
    title: "LWS Kart | Orders",
    description: "An online shop brought to you by Learn With Sumit",
};

export default async function AccountOrdersPage() {
    const session = await auth();

    if (!session) {
        redirect("/sign-in");
    }

    const user = await User.findOne({ email: session?.user?.email });

    const orders = await getOrdersByCustomerId({ customer: String(user._id) });

    return (
        <React.Fragment>
            <UserOrdersIntro />

            {(orders as any[]).length > 0 ? (
                <React.Fragment>
                    {(orders as any[]).map((order: any) => (
                        <Card key={order._id}>
                            <CardHeader>
                                <CardDescription>
                                    Order ID: {String(order._id)}
                                </CardDescription>
                                <CardDescription>
                                    Amount: ${order.amount}
                                </CardDescription>
                            </CardHeader>
                            <Separator />
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="hidden w-[150px] sm:table-cell">
                                            <span className="sr-only">
                                                Image
                                            </span>
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Unit Price</TableHead>
                                        <TableHead className="table-cell">
                                            Quantity
                                        </TableHead>
                                        <TableHead className="table-cell">
                                            Status
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {(order?.items as any[]).map(
                                        (item: any) => (
                                            <OrderItemTableRow
                                                key={item._id}
                                                orderId={String(order._id)}
                                                productId={String(
                                                    item.product._id
                                                )}
                                                name={item.product.name}
                                                thumbnail={
                                                    item.product.thumbnail
                                                }
                                                quantity={item.quantity}
                                                unitPrice={item.unitPrice}
                                                status={order.status}
                                            />
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    ))}
                </React.Fragment>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-3xl font-semibold text-zinc-800">
                        Empty
                    </h3>
                    <p className="text-md text-zinc-600">
                        You haven&apos;t purchase anything from LWS Kart.
                    </p>
                    <Link href="/shop" className="mt-4">
                        <Button>Visit shop</Button>
                    </Link>
                </div>
            )}
        </React.Fragment>
    );
}

function OrderItemTableRow({
    orderId,
    productId,
    name,
    unitPrice,
    quantity,
    thumbnail,
    status,
}: Props) {
    return (
        <TableRow className="hover:bg-transparent">
            <TableCell className="hidden sm:table-cell">
                <Image
                    src="https://plus.unsplash.com/premium_photo-1670076515907-2736a3492f23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height={200}
                    width={200}
                    className="aspect-video rounded-md"
                    alt={name}
                />
            </TableCell>
            <TableCell className="font-medium">
                <Link
                    href={`/product/${productId}`}
                    className="text-violet-500"
                >
                    {name}
                </Link>
            </TableCell>
            <TableCell className="table-cell">${unitPrice}</TableCell>
            <TableCell className="table-cell">{quantity} pcs</TableCell>
            <TableCell className="table-cell">
                <Badge variant="secondary">
                    <span className="capitalize">{status}</span>
                </Badge>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-4">
                    <DownloadInvoice orderId={orderId} />
                </div>
            </TableCell>
        </TableRow>
    );
}

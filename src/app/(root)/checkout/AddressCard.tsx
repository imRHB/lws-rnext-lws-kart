import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function AddressCard({
    address,
    label,
}: {
    address: string;
    label: string;
}) {
    const parsedAddress = JSON.parse(address);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>

            <CardContent>
                {Object.keys(parsedAddress).length > 0 ? (
                    <React.Fragment>
                        <CardDescription>
                            {parsedAddress.firstName} {parsedAddress.lastName}
                        </CardDescription>
                        <CardDescription>
                            {parsedAddress.street}, {parsedAddress.city}
                        </CardDescription>
                        <CardDescription>{parsedAddress.phone}</CardDescription>
                        <CardDescription>{parsedAddress.email}</CardDescription>
                    </React.Fragment>
                ) : (
                    <CardDescription>
                        Update your shipping address
                    </CardDescription>
                )}
            </CardContent>
        </Card>
    );
}

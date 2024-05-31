import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

export default function AddressAlert() {
    return (
        <Card>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Shipping or billing address is required!
                    <br />
                    Before placing order, please add your shipping and billing
                    address properly from account!
                </AlertDescription>
            </Alert>
        </Card>
    );
}

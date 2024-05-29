"use client";
import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DownloadInvoice({ orderId }: { orderId: string }) {
    return (
        <Button>
            <FileDown className="mr-2 h-4 w-4" /> Invoice
        </Button>
    );
}

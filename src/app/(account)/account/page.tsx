import React from "react";

import { Button } from "@/components/ui/button";
import AccountSectionContent from "../(components)/AccountSectionContent";
import AccountSectionIntro from "../(components)/AccountSectionIntro";

export default function AccountPage() {
    return (
        <React.Fragment>
            <AccountSectionIntro
                title="Account"
                description="Your account overview"
            />

            <AccountSectionContent>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no products
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start selling as soon as you add a product.
                    </p>
                    <Button className="mt-4">Add Product</Button>
                </div>
            </AccountSectionContent>
        </React.Fragment>
    );
}

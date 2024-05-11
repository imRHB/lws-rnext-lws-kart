import React from "react";

import AccountSectionContent from "../../(components)/AccountSectionContent";
import AccountSectionIntro from "../../(components)/AccountSectionIntro";

export default function AccountOrderPage() {
    return (
        <React.Fragment>
            <AccountSectionIntro
                title="Orders"
                description="Your order overview"
            />

            <AccountSectionContent>
                <p>Orders</p>
            </AccountSectionContent>
        </React.Fragment>
    );
}

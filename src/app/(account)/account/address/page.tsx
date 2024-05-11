import React from "react";

import AccountSectionContent from "../../(components)/AccountSectionContent";
import AccountSectionIntro from "../../(components)/AccountSectionIntro";

export default function AccountAddressPage() {
    return (
        <React.Fragment>
            <AccountSectionIntro
                title="Address"
                description="Update your address information"
            />

            <AccountSectionContent>
                <p>Address</p>
            </AccountSectionContent>
        </React.Fragment>
    );
}

import React from "react";

import AccountSectionContent from "../../(components)/AccountSectionContent";
import AccountSectionIntro from "../../(components)/AccountSectionIntro";

export default function AccountWishlistPage() {
    return (
        <React.Fragment>
            <AccountSectionIntro title="Wishlist" description="Your wishlist" />

            <AccountSectionContent>
                <p>Wishlist</p>
            </AccountSectionContent>
        </React.Fragment>
    );
}

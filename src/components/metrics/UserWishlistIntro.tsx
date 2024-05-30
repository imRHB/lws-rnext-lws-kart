"use client";

import AccountSectionIntro from "@/app/(account)/(components)/AccountSectionIntro";
import useLanguage from "@/hooks/useLanguage";

export default function UserWishlistIntro() {
    const { strings } = useLanguage();

    return (
        <AccountSectionIntro
            title={strings.sectionTitle.wishlist.title}
            description={strings.sectionTitle.wishlist.description}
        />
    );
}

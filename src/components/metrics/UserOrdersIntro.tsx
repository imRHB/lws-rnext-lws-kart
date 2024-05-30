"use client";

import AccountSectionIntro from "@/app/(account)/(components)/AccountSectionIntro";
import useLanguage from "@/hooks/useLanguage";

export default function UserOrdersIntro() {
    const { strings } = useLanguage();

    return (
        <AccountSectionIntro
            title={strings.sectionTitle.orders.title}
            description={strings.sectionTitle.orders.description}
        />
    );
}

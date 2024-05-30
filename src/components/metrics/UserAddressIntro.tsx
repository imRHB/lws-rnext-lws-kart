"use client";

import AccountSectionIntro from "@/app/(account)/(components)/AccountSectionIntro";
import useLanguage from "@/hooks/useLanguage";

export default function UserAddressIntro() {
    const { strings } = useLanguage();

    return (
        <AccountSectionIntro
            title={strings.sectionTitle.address.title}
            description={strings.sectionTitle.address.description}
        />
    );
}

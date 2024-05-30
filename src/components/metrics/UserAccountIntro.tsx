"use client";

import AccountSectionIntro from "@/app/(account)/(components)/AccountSectionIntro";
import useLanguage from "@/hooks/useLanguage";

export default function UserAccountIntro() {
    const { strings } = useLanguage();

    return (
        <AccountSectionIntro
            title={strings.sectionTitle.account.title}
            description={strings.sectionTitle.account.description}
        />
    );
}

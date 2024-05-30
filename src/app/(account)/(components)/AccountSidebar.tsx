"use client";

import {
    CircleUserRound,
    Heart,
    LucideIcon,
    MapPinned,
    ShoppingCart,
} from "lucide-react";
import React from "react";

import useLanguage from "@/hooks/useLanguage";
import SidebarNavLink from "./SidebarNavLink";

const ICONS_MAP = {
    CircleUserRound,
    ShoppingCart,
    Heart,
    MapPinned,
};

interface IAccountLinkItem {
    icon: keyof typeof ICONS_MAP;
    label: string;
    href: string;
}

export default function AccountSidebar() {
    const { strings } = useLanguage();

    const SIDEBAR_LINKS: IAccountLinkItem[] = Object.entries(
        strings.accountNav
    ).map(([key, value]) => ({
        icon: key as keyof typeof ICONS_MAP,
        ...value,
    }));

    const ACCOUNT_SIDEBAR_LINKS: (IAccountLinkItem & { Icon: LucideIcon })[] =
        SIDEBAR_LINKS.map((item) => ({
            ...item,
            Icon: ICONS_MAP[item.icon],
        }));

    return (
        <React.Fragment>
            {ACCOUNT_SIDEBAR_LINKS.map((item) => (
                <SidebarNavLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                >
                    <AccountIcon Icon={item.Icon} />
                </SidebarNavLink>
            ))}
        </React.Fragment>
    );
}

function AccountIcon({ Icon }: { Icon: LucideIcon }) {
    if (!Icon) {
        return null;
    }

    return <Icon className="h-5 w-5" />;
}

import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions/user.action";
import GlobalSearch from "../GlobalSearch";
import LanguageToggler from "../LanguageToggler";
import { HeaderNavItem } from "../metrics/NavItem";

export default async function Header() {
    const session = await auth();

    let user;
    if (session) {
        user = await getUserByEmail({ email: session?.user?.email! });
    }

    const { wishlist, cart } = user || {};

    return (
        <header className="py-4 shadow-sm bg-zinc-50 sticky top-0 z-50">
            <div className="container flex items-center justify-between gap-4">
                <Link href="/">
                    <Image
                        src="/assets/images/logo.svg"
                        height={36}
                        width={120}
                        alt="Logo"
                    />
                </Link>

                <GlobalSearch />

                <div className="flex items-center space-x-1">
                    <HeaderNavItem
                        label="wishlist"
                        length={wishlist.length ?? 0}
                    />
                    <HeaderNavItem label="cart" length={cart.length ?? 0} />

                    <LanguageToggler />
                </div>
            </div>
        </header>
    );
}

import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions/user.action";
import GlobalSearch from "../GlobalSearch";
import LanguageToggler from "../LanguageToggler";
import { Badge } from "../ui/badge";

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
                    <Link
                        href="/account/wishlist"
                        className="flex items-baseline gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                        <span className="text-sm font-medium leading-none">
                            Wish
                        </span>
                        {wishlist && wishlist?.length > 0 && (
                            <Badge className="ml-auto flex h-4 w-4 p-1 items-center justify-center rounded-full">
                                {wishlist.length}
                            </Badge>
                        )}
                    </Link>
                    <Link
                        href="/cart"
                        className="flex items-baseline gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                        <span className="text-sm font-medium leading-none">
                            Cart
                        </span>
                        {cart && cart?.length > 0 && (
                            <Badge className="ml-auto flex h-4 w-4 p-1 items-center justify-center rounded-full">
                                {cart.length}
                            </Badge>
                        )}
                    </Link>

                    <LanguageToggler />
                </div>
            </div>
        </header>
    );
}

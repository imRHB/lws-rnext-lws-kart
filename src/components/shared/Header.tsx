import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions/user.action";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

export default async function Header() {
    const session = await auth();

    let user;
    if (session) {
        user = await getUserByEmail({ email: session?.user?.email! });
    }

    const { wishlist, cart } = user || {};

    return (
        <header className="py-4 shadow-sm bg-zinc-50 sticky top-0 z-50">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/assets/images/logo.svg"
                        height={36}
                        width={120}
                        alt="Logo"
                    />
                </Link>

                <div className="w-full max-w-xl relative flex">
                    <form className="w-full">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center space-x-1">
                    <Link
                        href="/account/wishlist"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                        <span className="text-sm font-medium leading-none">
                            Wish
                        </span>
                        {wishlist && wishlist?.length > 0 && (
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                {wishlist.length}
                            </Badge>
                        )}
                    </Link>
                    <Link
                        href="/cart"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                        <span className="text-sm font-medium leading-none">
                            Cart
                        </span>
                        {cart && cart?.length > 0 && (
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                {cart.length}
                            </Badge>
                        )}
                    </Link>
                    {/* <Link
                        href="/account"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-muted"
                    >
                        Account
                    </Link> */}
                </div>
            </div>
        </header>
    );
}

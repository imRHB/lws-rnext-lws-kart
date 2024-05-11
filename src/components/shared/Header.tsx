import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";

export default function Header() {
    return (
        <header className="py-4 shadow-sm bg-white">
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
                    <div className="w-full flex-1">
                        <form>
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
                </div>

                <div className="flex items-center space-x-4">
                    <a
                        href="#"
                        className="text-center text-gray-700 hover:text-primary transition relative"
                    >
                        <div className="text-2xl">
                            <i className="fa-regular fa-heart"></i>
                        </div>
                        <div className="text-xs leading-3">Wishlist</div>
                        <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                            8
                        </div>
                    </a>
                    <a
                        href="#"
                        className="text-center text-gray-700 hover:text-primary transition relative"
                    >
                        <div className="text-2xl">
                            <i className="fa-solid fa-bag-shopping"></i>
                        </div>
                        <div className="text-xs leading-3">Cart</div>
                        <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                            2
                        </div>
                    </a>
                    <a
                        href="#"
                        className="text-center text-gray-700 hover:text-primary transition relative"
                    >
                        <div className="text-2xl">
                            <i className="fa-regular fa-user"></i>
                        </div>
                        <div className="text-xs leading-3">Account</div>
                    </a>
                </div>
            </div>
        </header>
    );
}

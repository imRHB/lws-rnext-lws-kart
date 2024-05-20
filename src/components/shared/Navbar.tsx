import Image from "next/image";
import Link from "next/link";

import { NAVBAR_ITEMS } from "@/constants";
import { getCategories } from "@/lib/actions/category.action";
import AuthStatus from "./AuthStatus";

export default async function Navbar() {
    const categories = await getCategories();

    return (
        <nav className="bg-gray-800 sticky top-[72px] z-50">
            <div className="container flex h-[72px]">
                <div className="px-8 py-4 md:flex items-center cursor-pointer relative group hidden">
                    <span className="text-white">
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="capitalize text-white">
                        All Categories
                    </span>

                    <div
                        className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
                        style={{ width: "300px" }}
                    >
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                href="/"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src={category.icon}
                                    height={20}
                                    width={20}
                                    className="w-5 h-5 object-contain"
                                    alt="sofa"
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                    <div className="flex items-center space-x-6 capitalize">
                        {NAVBAR_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-gray-200 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <AuthStatus />
                </div>
            </div>
        </nav>
    );
}

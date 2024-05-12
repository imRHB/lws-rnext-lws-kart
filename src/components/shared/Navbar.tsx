import Image from "next/image";
import Link from "next/link";

import { NAVBAR_ITEMS } from "@/constants";
import AuthStatus from "./AuthStatus";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 sticky top-[72px] z-50">
            <div className="container flex h-[72px]">
                <div className="px-8 py-4 md:flex items-center cursor-pointer relative group hidden">
                    <span className="text-white">
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="capitalize ml-2 text-white">
                        All Categories
                    </span>

                    <div
                        className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
                        style={{ width: "300px" }}
                    >
                        <a
                            href="#"
                            className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                        >
                            <Image
                                src="/assets/images/icons/sofa.svg"
                                height={20}
                                width={20}
                                className="w-5 h-5 object-contain"
                                alt="sofa"
                            />
                            <span className="ml-6 text-gray-600 text-sm">
                                Sofa
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                        >
                            <Image
                                src="/assets/images/icons/terrace.svg"
                                height={20}
                                width={20}
                                className="w-5 h-5 object-contain"
                                alt="terrace"
                            />
                            <span className="ml-6 text-gray-600 text-sm">
                                Living Room
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                        >
                            <Image
                                src="/assets/images/icons/bed.svg"
                                height={20}
                                width={20}
                                className="w-5 h-5 object-contain"
                                alt="bed"
                            />
                            <span className="ml-6 text-gray-600 text-sm">
                                Bedroom
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                        >
                            <Image
                                src="/assets/images/icons/office.svg"
                                height={20}
                                width={20}
                                className="w-5 h-5 object-contain"
                                alt="Outdoor"
                            />
                            <span className="ml-6 text-gray-600 text-sm">
                                Outdoor
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                        >
                            <Image
                                src="/assets/images/icons/outdoor-cafe.svg"
                                height={20}
                                width={20}
                                className="w-5 h-5 object-contain"
                                alt="outdoor"
                            />
                            <span className="ml-6 text-gray-600 text-sm">
                                Outdoor
                            </span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                        >
                            <Image
                                src="/assets/images/icons/bed-2.svg"
                                height={20}
                                width={20}
                                className="w-5 h-5 object-contain"
                                alt="Mattress"
                            />
                            <span className="ml-6 text-gray-600 text-sm">
                                Mattress
                            </span>
                        </a>
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

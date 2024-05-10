import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-gray-800">
            <div className="container flex">
                <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                    <span className="text-white">
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="capitalize ml-2 text-white hidden">
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
                        <a
                            href="index.html"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Home
                        </a>
                        <a
                            href="pages/shop.html"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Shop
                        </a>
                        <a
                            href="#"
                            className="text-gray-200 hover:text-white transition"
                        >
                            About us
                        </a>
                        <a
                            href="#"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Contact us
                        </a>
                    </div>
                    <a
                        href="pages/login.html"
                        className="text-gray-200 hover:text-white transition"
                    >
                        Login
                    </a>
                </div>
            </div>
        </nav>
    );
}

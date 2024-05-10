import Image from "next/image";
import React from "react";

export default function Footer() {
    return (
        <React.Fragment>
            <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
                <div className="container grid grid-cols-1 ">
                    <div className="col-span-1 space-y-4">
                        <Image
                            src="assets/images/logo.svg"
                            height={64}
                            width={300}
                            className="w-30"
                            alt="logo"
                        />
                        <div className="mr-2">
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quia, hic?
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-facebook-square"></i>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-instagram-square"></i>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-twitter-square"></i>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-github-square"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    Solutions
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Marketing
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Analitycs
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Commerce
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Insights
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    Support
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Pricing
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Documentation
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Guides
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        API Status
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    Solutions
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Marketing
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Analytics
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Commerce
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Insights
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    Support
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Pricing
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Documentation
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        Guides
                                    </a>
                                    <a
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        API Status
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="bg-gray-800 py-4">
                <div className="container flex items-center justify-between">
                    <p className="text-white">
                        &copy; TailCommerce - All Right Reserved
                    </p>
                    <div>
                        <Image
                            src="/assets/images/methods.png"
                            height={24}
                            width={300}
                            alt="methods"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

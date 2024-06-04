import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategories } from "@/lib/actions/category.action";

const explore = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "FAQ", href: "#" },
];

export default async function Component() {
    const categories = await getCategories();

    return (
        <footer className="bg-gray-100 py-24">
            <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                        prefetch={false}
                    >
                        <Image
                            src="/assets/images/logo.svg"
                            height={64}
                            width={200}
                            className="w-30"
                            alt="logo"
                        />
                        <span className="sr-only">LWS Kart</span>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400">
                        An online shop brought to you by Learn With Sumit.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Shop</h3>
                    {categories.map((category) => (
                        <Link
                            href={`/category/${category.slug}`}
                            key={category.slug}
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            prefetch={false}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Explore</h3>
                    {explore.map((expItem) => (
                        <Link
                            key={expItem.href}
                            href={expItem.href}
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            prefetch={false}
                        >
                            {expItem.label}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Newsletter</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Subscribe to our newsletter to get the latest updates
                        and exclusive offers.
                    </p>
                    <form className="flex space-x-2">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1"
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                </div>
            </div>
        </footer>
    );
}

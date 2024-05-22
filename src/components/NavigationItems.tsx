"use client";

import Image from "next/image";
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationItems({ categories }: { categories: string }) {
    const parsedCategories = JSON.parse(categories);

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        All categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="p-4 w-[220px]">
                            {parsedCategories.map(
                                (category: { name: string; icon: string }) => (
                                    <li key={category.name}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={`/category/${category.name}`}
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src={category.icon}
                                                        height={20}
                                                        width={20}
                                                        alt={category.name}
                                                    />
                                                    <p className="text-sm font-medium leading-none">
                                                        {category.name}
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                )
                            )}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/shop" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Shop
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

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
import useLanguage from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";

export function NavigationItems({ categories }: { categories: string }) {
    const pathname = usePathname();

    const parsedCategories = JSON.parse(categories);
    const { strings } = useLanguage();

    const activeLink =
        "text-violet-500 font-semibold hover:text-violet-500 focus:text-violet-500";

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        {strings.mainNav.allCategories}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="p-4 w-[220px]">
                            {parsedCategories.map(
                                (category: {
                                    slug: string;
                                    name: string;
                                    icon: string;
                                }) => (
                                    <li key={category.slug}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={`/category/${category.slug}`}
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
                    <Link
                        href={strings.mainNav.home.href}
                        legacyBehavior
                        passHref
                    >
                        <NavigationMenuLink
                            className={`${navigationMenuTriggerStyle()} ${
                                pathname === strings.mainNav.home.href &&
                                activeLink
                            }`}
                        >
                            {strings.mainNav.home.label}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        href={strings.mainNav.shop.href}
                        legacyBehavior
                        passHref
                    >
                        <NavigationMenuLink
                            className={`${navigationMenuTriggerStyle()} ${
                                pathname === strings.mainNav.shop.href &&
                                activeLink
                            }`}
                        >
                            {strings.mainNav.shop.label}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

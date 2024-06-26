import { CircleUserRound, Heart, MapPinned, ShoppingCart } from "lucide-react";

import {
    IAccountLinkItem,
    ICategory,
    ICity,
    IFeatureItem,
    IMonth,
    INavbarItem,
} from "@/types";

export const ACCOUNT_SIDEBAR_LINKS: IAccountLinkItem[] = [
    {
        icon: CircleUserRound,
        label: "Account",
        href: "/account",
    },
    {
        icon: ShoppingCart,
        label: "Orders",
        href: "/account/orders",
    },
    {
        icon: Heart,
        label: "Wishlist",
        href: "/account/wishlist",
    },
    {
        icon: MapPinned,
        label: "Address",
        href: "/account/address",
    },
];

export const FEATURE_LIST: IFeatureItem[] = [
    {
        icon: "/assets/images/icons/delivery-van.svg",
        title: "Free Shipping",
        description: "Order over $200",
    },
    {
        icon: "/assets/images/icons/money-back.svg",
        title: "Money Returns",
        description: "30 days money returns",
    },
    {
        icon: "/assets/images/icons/service-hours.svg",
        title: "24/7 Support",
        description: "Customer support",
    },
];

export const CATEGORY_LIST: ICategory[] = [
    {
        image: "/assets/images/category/category-1.jpg",
        title: "Bedroom",
    },
    {
        image: "/assets/images/category/category-2.jpg",
        title: "Mattress",
    },
    {
        image: "/assets/images/category/category-3.jpg",
        title: "Outdoor",
    },
    {
        image: "/assets/images/category/category-4.jpg",
        title: "Sofa",
    },
    {
        image: "/assets/images/category/category-5.jpg",
        title: "Living Room",
    },
    {
        image: "/assets/images/category/category-6.jpg",
        title: "Kitchen",
    },
];

/* export const PRODUCT_CARD_LIST: IProductCard[] = [
    {
        thumbnail: "/assets/images/products/product1.jpg",
        name: "Guyer Chair",
        price: 330,
        discount: 15,
    },
    {
        thumbnail: "/assets/images/products/product2.jpg",
        name: "Bed King Size",
        price: 275,
        discount: 20,
    },
    {
        thumbnail: "/assets/images/products/product3.jpg",
        name: "Couple Sofa",
        price: 850,
        discount: 15,
    },
    {
        thumbnail: "/assets/images/products/product4.jpg",
        name: "Mattress X",
        price: 670,
        discount: 20,
    },
];
 */
export enum City {
    "Barisal" = "Barisal",
    "Chittagong" = "Chittagong",
    "Dhaka" = "Dhaka",
    "Khulna" = "Khulna",
    "Mymensingh" = "Mymensingh",
    "Rajshahi" = "Rajshahi",
    "Rangpur" = "Rangpur",
    "Sylhet" = "Sylhet",
}

export const CITY_LIST: ICity[] = [
    {
        name: "Barisal",
        value: City.Barisal,
    },
    {
        name: "Chittagong",
        value: City.Chittagong,
    },
    {
        name: "Dhaka",
        value: City.Dhaka,
    },
    {
        name: "Khulna",
        value: City.Khulna,
    },
    {
        name: "Mymensingh",
        value: City.Mymensingh,
    },
    {
        name: "Rajshahi",
        value: City.Rajshahi,
    },
    {
        name: "Rangpur",
        value: City.Rangpur,
    },
    {
        name: "Sylhet",
        value: City.Sylhet,
    },
];

export enum Month {
    January = "January",
    February = "February",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December",
}

export const MONTHS: IMonth[] = [
    {
        name: "January",
        value: Month.January,
    },
    {
        name: "February",
        value: Month.February,
    },
    {
        name: "March",
        value: Month.March,
    },
    {
        name: "April",
        value: Month.April,
    },
    {
        name: "May",
        value: Month.May,
    },
    {
        name: "June",
        value: Month.June,
    },
    {
        name: "July",
        value: Month.July,
    },
    {
        name: "August",
        value: Month.August,
    },
    {
        name: "September",
        value: Month.September,
    },
    {
        name: "October",
        value: Month.October,
    },
    {
        name: "November",
        value: Month.November,
    },
    {
        name: "December",
        value: Month.December,
    },
];

export const NAVBAR_ITEMS: INavbarItem[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Shop",
        href: "/shop",
    },
];

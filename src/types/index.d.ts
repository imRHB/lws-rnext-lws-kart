import { LucideIcon } from "lucide-react";

import { City, Month } from "@/constants";

export interface IAddress {
    street: string;
    city: string;
    zip: number;
}

export interface IShippingAndBillingAddress {
    shippingAddress: IAddress;
    billingAddress: IAddress;
}

export interface IFeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface ICategory {
    image: string;
    title: string;
}

export interface IProductCard {
    _id: string;
    image: string;
    name: string;
    price: number;
    discount?: number;
}

export interface IAccountLinkItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

export interface ICity {
    name: keyof typeof City;
    value: City[keyof typeof City];
}

export interface IMonth {
    name: keyof typeof Month;
    value: Month[keyof typeof Month];
}

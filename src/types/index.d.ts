import { LucideIcon } from "lucide-react";

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

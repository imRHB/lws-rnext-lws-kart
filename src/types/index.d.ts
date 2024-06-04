import { LucideIcon } from "lucide-react";
import { Schema } from "mongoose";

import { City, Month } from "@/constants";

export interface IAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    zip: number;
    phone: string;
    email: string;
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
    _id: Schema.Types.ObjectId;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
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

export interface INavbarItem {
    label: string;
    href: string;
}

export interface ProductCardProps {
    productId: Schema.Types.ObjectId;
    title: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
}

export interface SearchParamsProps {
    searchParams: { [key: string]: string | undefined };
}

export interface InvoiceData {
    businessName: string;
    businessAddress: string;
    businessEmail: string;
    businessPhone: string;
    invoiceNumber: string;
    invoiceDate: string;
    customerName: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
    items: {
        _id: string;
        title: string;
        description: string;
        quantity: number;
        price: number;
    }[];
    subTotal: number;
    taxAmount: string;
    totalAmount: string;
    paymentMethods: string;
    dueDate: string;
}

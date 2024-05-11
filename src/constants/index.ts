import { ICategory, IFeatureItem, IProductCard } from "@/types";

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

export const PRODUCT_CARD_LIST: IProductCard[] = [
    {
        _id: "1",
        image: "/assets/images/products/product1.jpg",
        name: "Guyer Chair",
        price: 55.9,
        discount: 0,
    },
    {
        _id: "1",
        image: "/assets/images/products/product2.jpg",
        name: "Bed King Size",
        price: 55.9,
        discount: 0,
    },
    {
        _id: "1",
        image: "/assets/images/products/product3.jpg",
        name: "Couple Sofa",
        price: 55.9,
        discount: 0,
    },
    {
        _id: "1",
        image: "/assets/images/products/product4.jpg",
        name: "Mattress X",
        price: 55.9,
        discount: 0,
    },
];

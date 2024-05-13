import Image from "next/image";
import Link from "next/link";

import { PRODUCT_CARD_LIST } from "@/constants";
import { IProductCard } from "@/types";

export default function WishlistPage() {
    return (
        <div className="container gap-6 pt-4 pb-16">
            <div className="mx-auto space-y-4 max-w-6xl">
                {PRODUCT_CARD_LIST.map((product) => (
                    <WishlistItemCard key={product.name} product={product} />
                ))}
            </div>
        </div>
    );
}

function WishlistItemCard({ product }: { product: IProductCard }) {
    return (
        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
                <Image
                    src={product.thumbnail}
                    height={200}
                    width={200}
                    alt="product 6"
                    className="w-full"
                />
            </div>
            <div className="w-1/3">
                <h2 className="text-gray-800 text-xl font-medium uppercase">
                    {product.name}
                </h2>
                <p className="text-gray-500 text-sm">
                    Availability:{" "}
                    <span className="text-red-600">Out of Stock</span>
                </p>
            </div>
            <div className="text-primary text-lg font-semibold">
                ${product.price}
            </div>
            <Link
                href="/"
                className="cursor-not-allowed px-6 py-2 text-center text-sm text-white bg-red-400 border border-red-400 rounded transition uppercase font-roboto font-medium"
            >
                add to cart
            </Link>

            <div className="text-gray-600 cursor-pointer hover:text-primary">
                <i className="fa-solid fa-trash"></i>
            </div>
        </div>
    );
}

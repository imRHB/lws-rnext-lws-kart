import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

interface Props {
    productId: string;
    name: string;
    brand: string;
    category: string;
    sku: string;
    price: number;
    discount: number;
    stock: number;
}

enum ProductAvailability {
    "IN_STOCK" = "In Stock",
    "OUT_OF_STOCK" = "Out of Stock",
}

export default async function ProductDetails({
    productId,
    name,
    brand,
    category,
    sku,
    price,
    discount,
    stock,
}: Props) {
    return (
        <div>
            <h2 className="text-3xl font-medium uppercase mb-2">{name}</h2>
            <div className="flex items-center mb-4">
                <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                        <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-star"></i>
                    </span>
                </div>
                <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
            </div>
            <div className="space-y-2">
                <p className="text-gray-800 font-semibold space-x-2">
                    <span>Availability: </span>
                    <span className="text-green-600">
                        {stock > 0
                            ? ProductAvailability.IN_STOCK
                            : ProductAvailability.OUT_OF_STOCK}
                    </span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">Brand: </span>
                    <span className="text-gray-600">{brand}</span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">
                        Category:{" "}
                    </span>
                    <span className="text-gray-600">{category}</span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">SKU: </span>
                    <span className="text-gray-600">{sku}</span>
                </p>
            </div>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                <p className="text-xl text-primary font-semibold">
                    ${(price - (discount * price) / 100).toFixed(2)}
                </p>
                <p className="text-base text-gray-400 line-through">${price}</p>
            </div>

            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                <AddToCart productId={JSON.parse(productId)} />
                <AddToWishlist productId={JSON.parse(productId)} />
            </div>

            <div className="flex gap-3 mt-4">
                <a
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </div>
        </div>
    );
}

import { PRODUCT_CARD_LIST } from "@/constants";
import ProductCard from "./product/ProductCard";

export default function TrendingProducts() {
    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                top new arrival
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {PRODUCT_CARD_LIST.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}
            </div>
        </div>
    );
}

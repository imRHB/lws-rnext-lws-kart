import ProductCard from "@/components/product/ProductCard";
import { PRODUCT_CARD_LIST } from "@/constants";

export default function RelatedProducts() {
    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                Related products
            </h2>
            <div className="grid grid-cols-4 gap-6">
                {PRODUCT_CARD_LIST.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}
            </div>
        </div>
    );
}

import { getTrendingProducts } from "@/lib/actions/product.action";
import ProductCard from "./product/ProductCard";

export default async function TrendingProducts() {
    const products = await getTrendingProducts({
        fields: "_id name price discount thumbnail",
        limit: 4,
    });

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                Trending Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={String(product._id)}
                        productId={String(product._id)}
                        name={product.name}
                        price={product.price}
                        discount={product.discount}
                        thumbnail={product.thumbnail}
                    />
                ))}
            </div>
        </div>
    );
}

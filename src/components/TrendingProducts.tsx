import { getTrendingProducts } from "@/lib/actions/product.action";
import TrendingProductsHeading from "./metrics/TrendingProductsHeading";
import ProductCard from "./product/ProductCard";

export default async function TrendingProducts() {
    const products = await getTrendingProducts({
        fields: "_id name price discount thumbnail",
        limit: 4,
    });

    return (
        <div className="container pb-16">
            <TrendingProductsHeading />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={String(product._id)}
                        productId={String(product._id)}
                        name={product.name}
                        price={product.price}
                        discount={product.discount}
                        thumbnail={product.thumbnail}
                        stock={product.stock}
                    />
                ))}
            </div>
        </div>
    );
}

import { getTrendingProducts } from "@/lib/actions/product.action";
import TrendingProductsHeading from "./metrics/TrendingProductsHeading";
import ProductCard from "./product/ProductCard";

export default async function TrendingProducts() {
    const products = await getTrendingProducts({
        fields: "title price discountPercentage thumbnail",
        limit: 8,
    });

    return (
        <div className="container pb-16">
            <TrendingProductsHeading />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={String(product._id)}
                        productId={String(product._id)}
                        title={product.title}
                        price={product.price}
                        discountPercentage={product.discountPercentage}
                        thumbnail={product.thumbnail}
                        stock={product.stock}
                        size={product.sizes?.[0] ?? null}
                        color={product.colors?.[0] ?? null}
                    />
                ))}
            </div>
        </div>
    );
}

import RelatedProductsHeading from "@/components/metrics/RelatedProductsHeading";
import ProductCard from "@/components/product/ProductCard";
import { getRelatedProducts } from "@/lib/actions/product.action";

export default async function RelatedProducts({
    productId,
}: {
    productId: string;
}) {
    const products = await getRelatedProducts({ productId });

    return (
        <div className="container pb-16">
            <RelatedProductsHeading />
            <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.title}
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

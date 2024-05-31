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
                        key={product.name}
                        productId={String(product._id)}
                        name={product.name}
                        price={product.price}
                        discount={product.discount}
                        thumbnail={product.thumbnail}
                        stock={product.stock}
                        size={product.size?.[0]}
                        color={product.color?.[0]}
                    />
                ))}
            </div>
        </div>
    );
}

import Image from "next/image";

export default function ProductImageGallery() {
    return (
        <div>
            <Image
                src="/assets/images/products/product1.jpg"
                height={500}
                width={800}
                className="w-full"
                alt="product"
            />
            <div className="grid grid-cols-5 gap-4 mt-4">
                <Image
                    src="/assets/images/products/product2.jpg"
                    height={200}
                    width={200}
                    className="w-full cursor-pointer border border-primary"
                    alt="product2"
                />
                <Image
                    src="/assets/images/products/product3.jpg"
                    height={200}
                    width={200}
                    className="w-full cursor-pointer border"
                    alt="product2"
                />
                <Image
                    src="/assets/images/products/product4.jpg"
                    height={200}
                    width={200}
                    className="w-full cursor-pointer border"
                    alt="product2"
                />
                <Image
                    src="/assets/images/products/product5.jpg"
                    height={200}
                    width={200}
                    className="w-full cursor-pointer border"
                    alt="product2"
                />
                <Image
                    src="/assets/images/products/product6.jpg"
                    height={200}
                    width={200}
                    className="w-full cursor-pointer border"
                    alt="product2"
                />
            </div>
        </div>
    );
}

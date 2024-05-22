import Link from "next/link";
import { Button } from "./ui/button";

export default function Banner() {
    return (
        <div
            className="bg-cover bg-no-repeat bg-center py-36"
            style={{ backgroundImage: `url('/assets/images/banner-bg.jpg')` }}
        >
            <div className="container">
                <h1 className="text-6xl text-gray-800 font-bold mb-4 capitalize">
                    best collection for <br /> home decoration
                </h1>
                <p className="max-w-2xl text-zinc-700">
                    A home decoration shop sells items designed to enhance the
                    aesthetic and functional aspects of a home, including
                    furniture, lighting, wall art, decorative accessories,
                    textiles, and sometimes kitchenware and small home
                    improvement items.
                </p>
                <div className="mt-12">
                    <Link href="/shop">
                        <Button size="lg">Shop Now</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

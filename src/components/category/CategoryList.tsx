import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/lib/actions/category.action";
import CategoryHeading from "../metrics/CategoryHeading";

export default async function CategoryList() {
    const categories = await getCategories();

    return (
        <div className="container py-16">
            <CategoryHeading />
            <div className="grid grid-cols-3 gap-8">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.slug}
                        slug={category.slug}
                        name={category.name}
                        thumbnail={category.thumbnail}
                    />
                ))}
            </div>
        </div>
    );
}

function CategoryCard({
    slug,
    name,
    thumbnail,
}: {
    slug: string;
    name: string;
    thumbnail: string;
}) {
    return (
        <div className="relative rounded-lg overflow-hidden group">
            <Image
                src={thumbnail}
                height={300}
                width={300}
                className="w-full aspect-video object-cover rounded-lg group-hover:scale-110 group-hover:blur-[2px] transition-all"
                alt={name}
            />
            <Link
                href={`/category/${slug}`}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-white font-semibold tracking-wider transition-all"
            >
                {name}
            </Link>
        </div>
    );
}

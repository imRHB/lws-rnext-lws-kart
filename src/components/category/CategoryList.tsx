import Image from "next/image";
import Link from "next/link";

import { CATEGORY_LIST } from "@/constants";
import { ICategory } from "@/types";

export default function CategoryList() {
    return (
        <div className="container py-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                shop by category
            </h2>
            <div className="grid grid-cols-3 gap-3">
                {CATEGORY_LIST.map((category) => (
                    <CategoryCard key={category.title} category={category} />
                ))}
            </div>
        </div>
    );
}

function CategoryCard({ category }: { category: ICategory }) {
    return (
        <div className="relative rounded-sm overflow-hidden group">
            <Image
                src={category.image}
                height={300}
                width={300}
                className="w-full h-auto"
                alt={category.title}
            />
            <Link
                href="/"
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
            >
                {category.title}
            </Link>
        </div>
    );
}

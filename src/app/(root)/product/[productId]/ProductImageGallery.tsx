"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
    thumbnail: string;
    images: string[];
}

export default function ProductImageGallery({ thumbnail, images }: Props) {
    const [show, setShow] = useState(thumbnail);

    return (
        <div>
            <Image
                src={show}
                height={500}
                width={800}
                className="w-full rounded bg-cover"
                alt="product"
            />
            <div className="grid grid-cols-5 gap-4 mt-4">
                {images?.map((item) => (
                    <Image
                        key={item}
                        src={item}
                        height={200}
                        width={300}
                        className="w-full cursor-pointer border border-primary bg-cover"
                        alt="product2"
                        onClick={() => setShow(item)}
                    />
                ))}
            </div>
        </div>
    );
}

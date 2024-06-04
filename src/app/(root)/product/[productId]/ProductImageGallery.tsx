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
                className="w-full max-w-96 mx-auto rounded-lg bg-zinc-100 bg-cover"
                alt="product"
            />
            <div className="w-full flex gap-2 my-4 overflow-x-auto">
                {[thumbnail, ...images]?.map((item) => (
                    <Image
                        key={item}
                        src={item}
                        height={200}
                        width={300}
                        className={`my-2 mx-1 size-32 bg-zinc-100 aspect-square object-cover cursor-pointer rounded-lg ${
                            item === show &&
                            "ring-2 ring-violet-500 ring-offset-2"
                        }`}
                        alt="product2"
                        onClick={() => setShow(item)}
                    />
                ))}
            </div>
        </div>
    );
}

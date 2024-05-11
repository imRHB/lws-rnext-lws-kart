import Image from "next/image";
import Link from "next/link";

export default function Advertise() {
    return (
        <div className="container pb-16">
            <Link href="/">
                <Image
                    src="/assets/images/offer.jpg"
                    height={500}
                    width={1500}
                    className="w-full"
                    alt="ads"
                />
            </Link>
        </div>
    );
}

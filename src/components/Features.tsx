import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { IFeatureItem } from "@/types";
import FeatureList from "./metrics/FeatureList";

export default function Features() {
    return (
        <div className="container py-16">
            <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                <FeatureList />
            </div>
        </div>
    );
}

export function FeatureCard({ feature }: { feature: IFeatureItem }) {
    return (
        <Card>
            <CardContent className="flex items-center gap-8 p-8">
                <Image
                    src={feature.icon}
                    height={48}
                    width={48}
                    className="w-12 h-12 object-contain"
                    alt={feature.title}
                />
                <div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

import ProductDetailsHeading from "@/components/metrics/ProductDetailsHeading";
import { Separator } from "@/components/ui/separator";

interface Props {
    description: string;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    weight: number;
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
}

export default function ProductDescription({
    description,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
}: Props) {
    return (
        <div className="container py-4 space-y-4">
            <ProductDetailsHeading />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="max-w-xl space-y-2">
                    <p className="text-gray-600">{description}</p>
                    <p className="text-gray-600">
                        <strong>Dimensions:</strong>
                        <br />
                        {`${dimensions.width} x ${dimensions.height} x
                    ${dimensions.depth} cm`}
                    </p>
                    <p className="text-gray-600">
                        <strong>Weight:</strong>
                        <br />
                        {weight * 100} gm (approx.)
                    </p>
                </div>
                <div className="max-w-xl space-y-2">
                    <p className="text-gray-600">
                        <strong>Warranty information:</strong>
                        <br />
                        {warrantyInformation}
                    </p>
                    <p className="text-gray-600">
                        <strong>Shipping information:</strong>
                        <br />
                        {shippingInformation}
                    </p>
                    <p className="text-gray-600">
                        <strong>Return policy:</strong>
                        <br />
                        {returnPolicy}
                    </p>
                </div>
            </div>
            <Separator />
        </div>
    );
}

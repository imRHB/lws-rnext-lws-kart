export default function ProductDescription({
    features,
}: {
    features: string[];
}) {
    return (
        <div className="container pb-16">
            <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
                Product details
            </h3>
            <div className="w-3/5 pt-6">
                <ul className="text-gray-600">
                    {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

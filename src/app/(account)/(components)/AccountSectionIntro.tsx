import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountSectionIntro({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
    );
}

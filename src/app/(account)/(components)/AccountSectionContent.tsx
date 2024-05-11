import React from "react";

import { CardContent } from "@/components/ui/card";

export default function AccountSectionContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CardContent>{children}</CardContent>;
}

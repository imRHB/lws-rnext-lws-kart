import React from "react";

export default function AccountSectionContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
        >
            {children}
        </div>
    );
}

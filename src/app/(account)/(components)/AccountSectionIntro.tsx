export default function AccountSectionIntro({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="flex flex-col">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
            {description && <p className="text-slate-600">{description}</p>}
        </div>
    );
}

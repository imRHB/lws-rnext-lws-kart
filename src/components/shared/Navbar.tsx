import { getCategories } from "@/lib/actions/category.action";
import { NavigationItems } from "../NavigationItems";
import AuthStatus from "./AuthStatus";

export default async function Navbar() {
    const categories = await getCategories();
    const selectedCategoryItems = categories.map((category: any) => {
        return {
            slug: category.slug,
            name: category.name,
            icon: category.icon,
        };
    });

    return (
        <nav className="bg-white sticky top-[72px] z-40">
            <div className="container flex items-center justify-between h-[72px]">
                <NavigationItems
                    categories={JSON.stringify(selectedCategoryItems)}
                />
                <AuthStatus />
            </div>
        </nav>
    );
}

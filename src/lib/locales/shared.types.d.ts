interface Product {
    productDetails: string;
    inStock: string;
    outOfStock: string;
    notFound: {
        title: string;
        description: string;
    };
}

interface Cart {
    buttonText: string;
    addText: string;
    removeText: string;
    empty: {
        title: string;
        description: string;
    };
}

interface Wishlist {
    buttonText: string;
    addText: string;
    removeText: string;
    empty: {
        title: string;
        description: string;
    };
}

interface NavLink {
    icon?: string;
    label: string;
    href: string;
}

interface MainNav {
    allCategories: string;
    home: NavLink;
    shop: NavLink;
    wishlist: NavLink;
    cart: NavLink;
}

interface AccountNav {
    account: NavLink;
    orders: NavLink;
    wishlist: NavLink;
    address: NavLink;
}

interface Auth {
    signIn: NavLink;
    signUp: NavLink;
    signOut: NavLink;
}

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface SectionTitle {
    title: string;
    description?: string;
}

interface SectionTitles {
    shopByCategory: SectionTitle;
    topNewArrival: SectionTitle;
    trendingProducts: SectionTitle;
    relatedProducts: SectionTitle;
    account: SectionTitle;
    orders: SectionTitle;
    wishlist: SectionTitle;
    address: SectionTitle;
}

interface Search {
    placeholder: string;
}

interface LocalizationStrings {
    product: Product;
    cart: Cart;
    wishlist: Wishlist;
    mainNav: MainNav;
    accountNav: AccountNav;
    auth: Auth;
    features: Feature[];
    sectionTitle: SectionTitles;
    search: Search;
}

// LocalizationStrings

import Advertise from "@/components/Advertise";
import Banner from "@/components/Banner";
import CategoryList from "@/components/category/CategoryList";
import Features from "@/components/Features";
import TopNewArrival from "@/components/TopNewArrival";
import TrendingProducts from "@/components/TrendingProducts";

export default async function HomePage() {
    return (
        <main>
            <Banner />
            <Features />
            <CategoryList />
            <TopNewArrival />
            <Advertise />
            <TrendingProducts />
        </main>
    );
}

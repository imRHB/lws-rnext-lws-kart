import ProductCard from "@/components/product/ProductCard";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PRODUCT_CARD_LIST } from "@/constants";

export default function ShopPage() {
    return (
        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
            <div className="col-span-1 overflow-hidden hidden md:block">
                <Card>
                    <div>
                        <CardHeader>
                            <CardTitle>Categories</CardTitle>
                            <CardDescription>
                                Filter items by category
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Category 1
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Category 2
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Category 3
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Category 4
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Category 5
                                </label>
                            </div>
                        </CardContent>
                    </div>

                    <Separator />

                    <div>
                        <CardHeader>
                            <CardTitle>Price</CardTitle>
                            <CardDescription>
                                Filter items by price
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    {/* <Label htmlFor="firstName">First Name</Label> */}
                                    <Input
                                        id="min"
                                        type="number"
                                        placeholder="min"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    {/* <Label htmlFor="lastName">Last Name</Label> */}
                                    <Input
                                        id="max"
                                        type="number"
                                        placeholder="max"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </div>

                    <Separator />

                    <div>
                        <CardHeader>
                            <CardTitle>Size</CardTitle>
                            <CardDescription>
                                Filter items by size
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ToggleGroup
                                type="single"
                                defaultValue=""
                                variant="outline"
                            >
                                <ToggleGroupItem value="s">S</ToggleGroupItem>
                                <ToggleGroupItem value="m">M</ToggleGroupItem>
                                <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <div className="col-span-3">
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                    {PRODUCT_CARD_LIST.map((product) => (
                        <ProductCard key={product.name} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

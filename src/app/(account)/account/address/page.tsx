import { Info } from "lucide-react";
import React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CITY_LIST } from "@/constants";
import AccountSectionIntro from "../../(components)/AccountSectionIntro";

export default function AccountAddressPage() {
    return (
        <React.Fragment>
            <AccountSectionIntro
                title="Address"
                description="Update your address information"
            />

            <div className="grid xl:grid-cols-2 gap-8">
                <form className="grid w-full items-start gap-6">
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                            Shipping Address
                        </legend>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Jane"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="street">Street Address</Label>
                                <Input
                                    id="street"
                                    type="text"
                                    placeholder="Dhanmondi-32"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="City">City</Label>
                                <Select defaultValue="">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CITY_LIST.map((city) => (
                                            <SelectItem
                                                key={city.value}
                                                value={city.value}
                                            >
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="zip">ZIP</Label>
                                <Input
                                    id="zip"
                                    type="number"
                                    placeholder="1215"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="number"
                                    placeholder="+880 1234 567890"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <Alert className="w-full sm:w-fit">
                                <Info className="h-4 w-4" />
                                <AlertDescription>
                                    Delivery available only inside{" "}
                                    <strong>Bangladesh</strong>
                                </AlertDescription>
                            </Alert>

                            <Button className="w-full sm:w-fit">Save</Button>
                        </div>
                    </fieldset>
                </form>

                <form className="grid w-full items-start gap-6">
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                            Billing Address
                        </legend>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Jane"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="street">Street Address</Label>
                                <Input
                                    id="street"
                                    type="text"
                                    placeholder="Dhanmondi-32"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="City">City</Label>
                                <Select defaultValue="">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CITY_LIST.map((city) => (
                                            <SelectItem
                                                key={city.value}
                                                value={city.value}
                                            >
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="zip">ZIP</Label>
                                <Input
                                    id="zip"
                                    type="number"
                                    placeholder="1215"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="number"
                                    placeholder="+880 1234 567890"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <Alert className="w-full sm:w-fit">
                                <Info className="h-4 w-4" />
                                <AlertDescription>
                                    Delivery available only inside{" "}
                                    <strong>Bangladesh</strong>
                                </AlertDescription>
                            </Alert>

                            <Button className="w-full sm:w-fit">Save</Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </React.Fragment>
    );
}

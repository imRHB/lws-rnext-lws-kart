import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CITY_LIST, MONTHS } from "@/constants";
import { getYears } from "@/lib";

export default function CheckoutForm() {
    const years = getYears();

    return (
        <div className="col-span-8">
            <Card>
                <CardHeader>
                    <CardTitle>Checkout Form</CardTitle>
                    <CardDescription>
                        Enter your shipping address to complete your order.
                    </CardDescription>
                </CardHeader>

                <Separator />

                <CardContent className="mt-4 space-y-4">
                    <form className="grid w-full items-start gap-6">
                        <fieldset className="grid gap-6 rounded-lg border p-4">
                            <legend className="-ml-1 px-1 text-sm font-medium">
                                Shipping Address
                            </legend>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
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
                                    <Label htmlFor="street">
                                        Street Address
                                    </Label>
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

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="jane@mail.com"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="">Availability</Label>
                                    <Input
                                        id=""
                                        type=""
                                        placeholder="Delivery available only inside Bangladesh"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="grid gap-6 rounded-lg border p-4">
                            <legend className="-ml-1 px-1 text-sm font-medium">
                                Delivery Method
                            </legend>

                            <RadioGroup defaultValue="">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="standard" id="r1" />
                                    <Label htmlFor="r1">Standard</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="express" id="r2" />
                                    <Label htmlFor="r2">Express</Label>
                                </div>
                            </RadioGroup>
                        </fieldset>

                        <fieldset className="grid gap-6 rounded-lg border p-4">
                            <legend className="-ml-1 px-1 text-sm font-medium">
                                Payment Method
                            </legend>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="card">Card Number</Label>
                                    <Input
                                        id="card"
                                        type="text"
                                        placeholder="5105 1051 0510 5100"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="expMonth">Expires</Label>
                                    <Select defaultValue="">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {MONTHS.map((month) => (
                                                <SelectItem
                                                    key={month.value}
                                                    value={month.value}
                                                >
                                                    {month.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="expYear">Year</Label>
                                    <Select defaultValue="">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem
                                                    key={year}
                                                    value={year.toString()}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input
                                        id="cvc"
                                        type="number"
                                        placeholder="CVC"
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

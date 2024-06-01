import cron from "node-cron";

import User from "@/models/user.model";
import { connectToDatabase } from "../mongoose";

export async function clearCartItems() {
    await connectToDatabase();

    const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        const users = await User.find({
            "cart.updatedAt": { $lt: expirationTime },
        });

        for (const user of users) {
            user.cart = user.cart.filter(
                (item: any) => item.updatedAt >= expirationTime
            );
            await user.save();
        }

        console.log(`Cleared outdated cart items for ${users.length} users.`);
    } catch (error) {
        console.error("Error clearing outdated cart items:", error);
    }
}

cron.schedule("*/5 * * * *", clearCartItems);

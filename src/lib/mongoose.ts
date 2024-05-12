import mongoose from "mongoose";

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URI)
        return console.log("MONGODB URI IS NOT FOUND!");

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "lws-kart",
        });

        console.log("Connected to database!");
    } catch (error) {
        console.error(error);
    }
};

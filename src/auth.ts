import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import clientPromise from "./lib/db";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: MongoDBAdapter(clientPromise, { databaseName: "lws-kart" }),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});

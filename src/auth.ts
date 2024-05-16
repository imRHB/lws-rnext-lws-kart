import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "./lib/db";
import User from "./models/user.model";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise, { databaseName: "lws-kart" }),
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials, request) {
                if (credentials === null) return null;

                try {
                    const user = await User.findOne({
                        email: credentials.email,
                    });

                    if (user) {
                        const isMatched = bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatched) {
                            return user;
                        } else {
                            console.log("user mismatch");
                        }
                    } else {
                        throw new Error("credentials not valid!");
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error("User not found!");
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    /* callbacks: {
        async session({ session, user }) {
            const name = user.name;
            const email = user.email;
            const image = user.image;

            await connectToDatabase();

            let existingUser = await User.findOne({ email });
            if (!existingUser) {
                existingUser = await User.create({ name, email, image });
                await existingUser.save();
            }

            session.user = existingUser;

            return session;
        },
    }, */
    session: {
        strategy: "jwt",
    },
});

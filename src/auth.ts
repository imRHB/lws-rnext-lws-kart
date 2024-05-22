import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "./lib/db";
import User from "./models/user.model";

export const authConfig = {
    adapter: MongoDBAdapter(clientPromise, { databaseName: "lws-kart" }),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (credentials === null) return null;

                try {
                    const user = await User.findOne({
                        email: credentials.email,
                    });

                    if (user) {
                        const isMatched = await bcrypt.compare(
                            credentials.password as string,
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
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;

            if (pathname === "/account") return !!auth;

            return true;
        },
    }, */
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

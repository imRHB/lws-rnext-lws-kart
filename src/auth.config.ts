import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "./lib/mongoose";
import User from "./models/user.model";

export default {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (credentials === null) return null;

                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                try {
                    await connectToDatabase();

                    const user = await User.findOne({
                        email,
                    });

                    if (!user) throw new Error("Invalid credentials");

                    const isMatched = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isMatched) throw new Error("Invalid credentials");

                    return user;
                } catch (error) {
                    throw new Error(
                        error instanceof Error
                            ? error.message
                            : "An unknown error occurred"
                    );
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email ?? "";
                session.user.name = token.name ?? "";
            }

            return session;
        },
    },
} satisfies NextAuthConfig;

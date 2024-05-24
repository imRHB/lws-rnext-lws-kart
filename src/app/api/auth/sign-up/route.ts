import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user.model";

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, password } = await request.json();

        await connectToDatabase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new NextResponse("User already exists", {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = {
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
        };

        await User.create(newUser);

        return new NextResponse("User created successfully", {
            status: 201,
        });
    } catch (error) {
        console.error("Error parsing request body:", error);
        throw error;
    }
}

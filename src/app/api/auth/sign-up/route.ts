import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user.model";

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, password } = await request.json();

        await connectToDatabase();

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = {
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
        };

        try {
            await User.create(newUser);

            return new NextResponse("User created successfully", {
                status: 201,
            });
        } catch (error) {
            console.error("ERROR:", error);

            return new NextResponse("error", {
                status: 500,
            });
        }
    } catch (error) {
        console.error("Error parsing request body:", error);
        throw error;
    }
}

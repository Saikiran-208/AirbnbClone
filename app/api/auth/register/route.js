export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export async function POST(request) {
    const body = await request.json();
    const { name, email, password } = body;
    const hashedPassword = await hash(password,12);
    if (!name || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });
        
        return NextResponse.json(user, { status: 201 });
    }
    catch (error) {
        console.error(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
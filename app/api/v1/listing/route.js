import { auth } from "@/utils/auth";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const session = await auth();
        console.log(session,"Session")

        if(!session || !session.user){
            return NextResponse.json({message:"not Authorized"}, {status:403})
        }

        const {
            category,
            title,
            description,
            roomCount,
            guestCount,
            childCount,
            location,
            price,
            imageSrc,
        } = body;

        if (!location || typeof location.value === "undefined") {
            return NextResponse.json({ message: "Location is required and must have a value property" }, { status: 400 });
        }

        if (price === undefined || price === null || isNaN(Number(price))) {
            return NextResponse.json({ message: "Price is required and must be a valid number" }, { status: 400 });
        }
        // Validate required fields
        if (!title || !description || !category || roomCount == null || guestCount==null || childCount==null || !imageSrc) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const newListing = await prisma.listing.create({
            data: {
                title,
                description,
                roomCount,
                guestCount,
                childCount,
                category,
                locationValue: location.value,
                price: parseInt(price, 10),
                imageSrc,
                userId: session?.user.id,
            }
        })

        return NextResponse.json({ message: "Create", listing: newListing }, { status: 201 });
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message || "Unknown error" }, { status: 500 });
    }
}
'use server'

import { prisma } from "@/utils/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUser() {
    try {
        const clerkUser = await currentUser();

        if (!clerkUser || !clerkUser.emailAddresses || clerkUser.emailAddresses.length === 0) {
            return null;
        }

        const email = clerkUser.emailAddresses[0].emailAddress;

        // 1. Try to find existing Prisma user
        let mongoUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        // 2. Check for ID mismatch (Legacy ObjectId vs Clerk ID)
        if (mongoUser && mongoUser.id !== clerkUser.id) {
            // Delete the old user record so we can recreate it with the correct ID
            await prisma.user.delete({
                where: { email: email }
            });
            mongoUser = null;
        }

        // 3. If not found (or deleted), create new Prisma user (Sync)
        if (!mongoUser) {
            mongoUser = await prisma.user.create({
                data: {
                    id: clerkUser.id,
                    email: email,
                    name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || "User",
                    image: clerkUser.imageUrl,
                    favourites: []
                }
            })
        }

        // 3. Update image if changed (optional but nice)
        // if(mongoUser.image !== clerkUser.imageUrl) {
        //      await prisma.user.update({ where: { id: mongoUser.id }, data: { image: clerkUser.imageUrl } });
        // }

        return mongoUser;

    } catch (error) {
        console.error("Error in getUser sync:", error.message)
        return null
    }
}

'use server'

import { prisma } from "@/utils/prisma"

export async function getReservationsById(listingId) {
    
    try {
        const reservations = await prisma.reservation.findMany({
            where: { listingId },
            include: {
                listing: true,
            }
        })
        return reservations;
    } catch (error) {

    }
}
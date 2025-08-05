'use server'

import { prisma } from "@/utils/prisma";
import { getUser } from "./getUser"

export async function getFavouriteListings() {
    const user = await getUser();

    if (!user) return { ok: false, message: "Not auth", status: 403 }

    try {
        const favouritesListings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(user.favourites) || []]
                }
            }
        })
        return { ok: true, data: favouritesListings, status: 200 }
    } catch (error) {
         console.error(error.message)
        return { ok: false, message: "Could not find", status: 500 }

    }
}

export async function setFavourite(id) {
    const user = await getUser();


    if (!user) return { ok: false, message: "Not auth", status: 403 }

    if (!id || typeof id !== 'string') {
        return { ok: false, message: "Id mismatch", status: 404 }
    }

    let favourites = [...(user.favourites) || []];

    favourites.push(id);
    

    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                favourites
            }

        })
        return { ok: true, message: "updated", status: 200 }
    } catch (error) {
        console.error(error.message)
        return { ok: false, message: "Could not set", status: 500 }
    }

}
export async function deleteFavourite(id) {
    const user = await getUser();

    if (!user) return { ok: false, message: "Not auth", status: 403 }

    if (!id || typeof id !== 'string') {
        return { ok: false, message: "Id mismatch", status: 404 }
    }

    let favourites = [...(user.favourites) || []];

    favourites = favourites.filter((each) => each !== id)

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                favourites
            }
        })
        return { ok: true, message: "deleted", status: 200 }
    } catch (error) {

    }
}


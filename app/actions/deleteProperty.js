'use server'

import { getUser } from "@/app/actions/getUser"
import { prisma } from "@/utils/prisma";

export async function deleteProperty(id) {
  const user = await getUser();
  if (!user) return { ok: false, message: "Not Authorized", status: 403 }
  try {
    // 1. Delete all reservations for the listing
    await prisma.reservation.deleteMany({
      where: {
        listingId: id,
      },
    })

    // 2. Then delete the listing
    await prisma.listing.delete({
      where: {
        id,
      },
    })

    // const res = await prisma.listing.deleteMany({
    //     where:{
    //         id: id,
    //         userId: session.user.id
    //     }
    // })
    // if(!res) return {ok:false, message:"Could not find property to delete", status:404}
    return {
      ok: true,
      message: "Listing and related reservations deleted",
      status: 200,
    }
  } catch (error) {
    return {
      ok: false,
      message: error.message,
      status: 500,
    }
  }
}
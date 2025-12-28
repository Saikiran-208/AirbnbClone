'use client'

import { deleteFavourite, setFavourite } from "@/app/actions/favourties";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";


export default function useFavourite({ listingId, user }) {
    const router = useRouter();

    const isFavourite = useMemo(() => {
        const list = user?.favourites || [];
        return list.includes(listingId)
    }, [listingId, user])
    const toggleFavourite = useCallback(async (e) => {
        e.stopPropagation();
        if (!user) {
            return router.push("/sign-in")
        }
        try {
            if (isFavourite) {
                const res = await deleteFavourite(listingId)
                console.log('Delete Fav Res:', res);
                if (res?.ok) {
                    router.refresh();
                }
            } else {
                const res = await setFavourite(listingId);
                console.log('Set Fav Res:', res);
                if (res?.ok) {
                    router.refresh();
                }
            }
        } catch (error) {
            console.error("Fav Error:", error?.message || error)
        }

    }, [listingId, user])
    return {
        isFavourite,
        toggleFavourite
    }
}
'use client'

import { deleteFavourite, setFavourite } from "@/app/actions/favourties";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";


export default function useFavourite({ listingId, user }) {
    const router = useRouter();

    const isFavourite = useMemo(()=>{
        const list = user?.favourites || [];
        return list.includes(listingId)
    },[listingId, user])
    const toggleFavourite = useCallback(async () => {
            if (!user) {
                return router.push("/sign-in")
            }
            try {
                if (isFavourite) {

                    const res = await deleteFavourite(listingId)
                    if(res.ok){
                        router.refresh();
                    }

                }else{
                    const res = await setFavourite(listingId);
                    if(res.ok){
                        router.push("/favourites");
                    }
                }
            } catch (error) {
                console.error(error.message)
            }
        
    }, [listingId, user])
    return {
        isFavourite,
        toggleFavourite
    }
}
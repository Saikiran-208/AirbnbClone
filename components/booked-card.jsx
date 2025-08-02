'use client'

import React from 'react'
import ListingsCard from './listings-card'
import { deleteReservation } from '@/app/actions/reservation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const BookedCard = ({resv}) => {
const router = useRouter();
    // console.log(resv,"resv")

    const cancelReservation =async (e)=>{
        e.preventDefault();
        const res = await deleteReservation(resv.id)
        if(res.ok){
            toast("Deleted")
            router.refresh();
        }
    }

  return (
   
        <ListingsCard 
        reservationsData={resv}
        listing={resv.listing}
        showSecondaryBtn = {true}
        secondaryBtnLabel={"Cancel Booking"}
        onAction={cancelReservation}
        />
    
  )
}

export default BookedCard

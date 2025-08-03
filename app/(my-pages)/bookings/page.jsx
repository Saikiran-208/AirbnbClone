
import { getUser } from '@/app/actions/getUser';
import { getReservations } from '@/app/actions/reservation';
import BookedCard from '@/components/booked-card';
import EmptyPage from '@/components/emptyPage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function Bookings() {
    const user = await getUser();
    if(!user) notFound();
    const {data:reservations} = await getReservations(); 

    if(reservations.length == 0){
      return <EmptyPage title={"No Booking found"} linkText={"Book your property today"} />
      
    }

  return (
    <div className='p-4 md:p-8'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'> 
      {reservations.map((each, index) =>
        <BookedCard key={each.id} resv={each}/>
      )}

      </div>
    </div>
  )
}

export default Bookings

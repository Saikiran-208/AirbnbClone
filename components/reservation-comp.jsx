"use client"
import { useState,useEffect, useMemo } from 'react'
import CalendarInput from './calendar'
import { Button } from './ui/button'
import { differenceInCalendarDays, eachDayOfInterval} from 'date-fns'
import formatMoney from '@/utils/formatMoney'
import { setReservation } from '@/app/actions/reservation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const ReservationComponent = ({pricePerDay, listingId, reservations}) => {
    const [dateRange, setDateRange] = useState(
        {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })
    
    const [totalPrice, setTotalPrice] = useState(pricePerDay)
    const router = useRouter();

    const disabledDates = useMemo(() => {
      let dates = [];

      reservations.forEach(reservation => {
        const range = eachDayOfInterval({
          start: new Date(reservation.startDate),
          end: new Date(reservation.endDate)
        })
        dates = [...dates, ...range]
       
      })
      return dates;
    }, [reservations])
    

    
    useEffect(() => {
      if(dateRange.startDate && dateRange.endDate){
        const countDays = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate
        )
        if(pricePerDay && countDays){
            setTotalPrice(countDays * pricePerDay)
        }else{
            setTotalPrice(pricePerDay)
        }
      }
    }, [pricePerDay,dateRange])
    

    const handleReservation = async ()=>{
      try {
       const res =  await setReservation({listingId, startDate: dateRange.startDate, endDate: dateRange.endDate, price:totalPrice})
       if(res.ok){
        toast(
          "Your property is booked"
        )
        router.push('/bookings')
       }
      } catch (error) {
        toast({
          title:"Uj oh",
          description:"error occured",
          variant:'destructive'
        })
      }
    }

  return (
    <div className='flex flex-col gap-2 items-center pt-4'>
      <CalendarInput className="w-full" value={dateRange} onChange={value =>setDateRange(value.selection)} disabledDates={disabledDates} />
         <Button className="text-lg w-full" onClick={handleReservation} >Book for ₹{formatMoney(totalPrice)}</Button>
    </div>
  )
}

export default ReservationComponent

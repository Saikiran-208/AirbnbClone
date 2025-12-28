'use client'
import { X } from 'lucide-react'
import React, { useCallback, useMemo } from 'react'
import { useState } from 'react'
import { Button } from './ui/button'
import CountrySelect from './country-select'
import CalendarInput from './calendar'
import Counter from './counter-input'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'



const STEPS = {
  LOCATION: 0,
  DATE: 1,
  DETAILS: 2

}

function SearchModal({ isOpen, setIsOpen, stepAt }) {
  const [step, setStep] = useState(stepAt || STEPS.LOCATION)
  const [location, setLocation] = useState()
  const [guestCount, setGuestCount] = useState(2)
  const [roomCount, setRoomCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [dateRange, setDateRange] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    })

  const router = useRouter();
  const searchParams = useSearchParams();



  const sourceToReturn = {
    [STEPS.LOCATION]: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Where to?</h2>
          <p className="text-gray-500">Pick your destination</p>
        </div>
        <CountrySelect
          value={location}
          onChange={value => setLocation(value)}
        />
      </div>
    ),
    [STEPS.DATE]: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">When's your trip?</h2>
          <p className="text-gray-500">Select dates</p>
        </div>
        <div className="w-full flex justify-center">
          <CalendarInput
            value={dateRange}
            onChange={value => setDateRange(value.selection)}
          />
        </div>
      </div>
    ),
    [STEPS.DETAILS]: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Who's coming?</h2>
          <p className="text-gray-500">Add guests and rooms</p>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='font-bold'>Guests</div>
            <div className='text-gray-500 text-sm'>Ages 13 or above</div>
          </div>
          <Counter
            value={guestCount}
            onChange={setGuestCount}
          />
        </div>
        <hr />
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='font-bold'>Children</div>
            <div className='text-gray-500 text-sm'>Ages 2-12</div>
          </div>
          <Counter
            value={childCount}
            onChange={setChildCount}
          />
        </div>
        <hr />
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='font-bold'>Rooms</div>
            <div className='text-gray-500 text-sm'>How many rooms?</div>
          </div>
          <Counter
            value={roomCount}
            onChange={setRoomCount}
          />
        </div>
      </div>
    )
  }

  const onBack = () => {
    if (step != 0) {
      setStep(previousStep => previousStep - 1)
    }
  }
  const onNext = useCallback(() => {
    if (step == Object.keys(STEPS).length - 1) {

      const trackOfQueryParams = {
        ...(location?.value && { locationValue: location.value }),
        ...(guestCount && { guestCount: guestCount }),
        ...(roomCount && { roomCount: roomCount }),
        ...(childCount && { childCount: childCount }),
        ...(dateRange.startDate && dateRange.endDate && { startDate: dateRange.startDate, endDate: dateRange.endDate })
      }
      if (Object.keys(trackOfQueryParams).length == 0) return;
      const queryString = Object.keys(trackOfQueryParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(trackOfQueryParams[key])}`).join("&")

      const params = new URLSearchParams(searchParams.toString())
      const tempCat = params.get('cat')
      const url = `/?${queryString}&cat=${tempCat}`
      router.push(url);
      setIsOpen(false);
      return;

    }
    setStep(previousStep => previousStep + 1)
  }, [step, location, roomCount, childCount, guestCount, dateRange]
  )

  const labelLastStep = step == Object.keys(STEPS).length - 1 ? "Search" : "Next";
  return (
    <>
      {isOpen && <div className='fixed top-0 left-0 w-full h-screen z-[100]'>
        <div className='w-full relative h-screen bg-black/40 backdrop-blur-md'>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full md:w-3/5 min-h-[300px] p-5 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-300'>
            {sourceToReturn[step]}
            <X onClick={() => setIsOpen(false)} className='float-right absolute top-4 right-4 cursor-pointer' />
            <div className='w-full flex justify-between pt-5'>
              <Button
                disabled={step == 0}
                className={step == 0 && 'bg-gray-500'}
                onClick={onBack}>
                Back
              </Button>
              <Button
                className={step == Object.keys(STEPS).length - 1 && 'bg-rose-500  hover:bg-rose-400'}
                onClick={onNext}>
                {labelLastStep}
              </Button>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default SearchModal

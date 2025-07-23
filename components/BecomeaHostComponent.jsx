"use client"

import React, { useState } from 'react'
import { categories } from '@/static/config';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import useCountries from '@/hooks/useCountries';
import CountrySelect from './country-select';
import Counter from './counter-input';

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
}

function BecomeaHostComponent() {

  const [step, setStep] = useState(STEPS.IMAGES);

  const setCustomValue = (title, value) => {
    setValue(title, value)
  }

  const { getByValue } = useCountries();
  // console.log(getByValue('IN'));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      category: '',
      roomCount: 1,
      childCount: 0,
      guestCount: 2,
    }
  })

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const childCount = watch("childCount");
  const guestCount = watch("guestCount");

  // console.log(location)
  // console.log(category);

  let sourceAtStep = (
    <div>
      <h1>Which of these categories does define your property</h1>
      <p>Pick a category</p>
      <div className="grid grid-cols-2  md:grid-cols-4 gap-3">
        {categories.map(each => {
          return <div onClick={() => setCustomValue('category', each.label)} className={cn('bg-gray-100 flex flex-col p-5 rounded-lg border-2 border-gray-300/20 text-semibold',
            category === each.label ? "bg-rose-500/80 text-white" : "bg-gray-100"
          )}>
            <each.icon />
            {each.label}
          </div>
        })}
      </div>
    </div>
  )
  if (step === STEPS.LOCATION) {
    sourceAtStep = (
      <div>
        <h1>Where is your property located?</h1>
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        {/* CountrySelect component can be used here */}
      </div>
    );
  }
  else if (step === STEPS.INFO) {
    sourceAtStep = (
      <div>
        <h1>Provide some information about your property</h1>
        <div className='flex justify-between'>
          <span>
            <h3>How many rooms do you want? </h3>
            <p>Choose a room count</p>
          </span>

          <Counter
            value={roomCount}
            onChange={(value) => setCustomValue('roomCount', value)}
          />
        </div>
        <div className="w-full h-[0.4px] bg-gray-800 my-10"></div>
        <div className='flex justify-between'>
          <span>
            <h3>How many children do you have? </h3>
            <p>Choose the children count</p>
          </span>

          <Counter
            value={childCount}
            onChange={(value) => setCustomValue('childCount', value)}
          />
        </div>
        <div className="w-full h-[0.4px] bg-gray-800 my-10"></div>

        <div className='flex justify-between'>
          <span>
            <h3>How many adults are planning to join? </h3>
            <p>Choose a guest count</p>
          </span>

          <Counter
            value={guestCount}
            onChange={(value) => setCustomValue('guestCount', value)}
          />
        </div>


        {/* Additional form fields for info can be added here */}
      </div>
    );
  }
  else if (step === STEPS.IMAGES) {
    sourceAtStep = (
      <div>
        <h1>Upload images of your property</h1>
        {/* Image upload component can be added here */}
      </div>
    );
  }
  else if (step === STEPS.DESCRIPTION) {
    sourceAtStep = (
      <div>
        <h1>Write a description for your property</h1>
        {/* Description input field can be added here */}
      </div>
    );
  }
  else if (step === STEPS.PRICE) {
    sourceAtStep = (
      <div>
        <h1>Set a price for your property</h1>
        {/* Price input field can be added here */}
      </div>
    );
  }

  return (
    <div>
      {sourceAtStep}
    </div>
  )
}

export default BecomeaHostComponent

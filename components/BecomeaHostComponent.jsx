"use client"

import React, { useMemo, useState } from 'react'
import { categories } from '@/static/config';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import useCountries from '@/hooks/useCountries';
import CountrySelect from './country-select';
import Counter from './counter-input';
import ImageUploadComponent from './image-upload';
import { Input } from './ui/input';
import { ArrowLeft, ArrowRight, } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
}

export default function BecomeaHostComponent() {

  const [step, setStep] = useState(STEPS.CATEGORY);
  const router = useRouter();

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
      location: '',
      roomCount: 1,
      childCount: 0,
      guestCount: 2,
      imageSrc: '',
      title: "",
      description: "",
      price: null,
    }
  })

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const childCount = watch("childCount");
  const guestCount = watch("guestCount");
  const imageSrc = watch("imageSrc")

  const isStepValid = useMemo(() => {
    switch (step) {
      case STEPS.CATEGORY:
        return !!category;
      case STEPS.LOCATION:
        return !!location;
      case STEPS.INFO:
        return guestCount > 0 && roomCount > 0;
      case STEPS.IMAGES:
        return !!imageSrc;
      case STEPS.DESCRIPTION:
        return watch('title') && watch('description');
      case STEPS.PRICE:
        return watch('price') && parseFloat(watch('price')) > 0;
      default:
        return true;
    }
  }, [step, category, location, roomCount, childCount, guestCount, imageSrc, watch()])

  const onBack = () => {
    setStep(step => Math.max(step - 1, 0))
  }

  const onNext = (data) => {
    // console.log("Data being Submitted",data);
    if(step !==  STEPS.PRICE){
      setStep(step => step + 1)
    }else{
      axios.post('/api/v1/listing/', data)
      .then(()=>{
        toast(
          
          'Property Listed'
        );
        router.push(`/`)
      }
          
            
          )
    }
  }

  const nextLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return <span className='flex flex-row gap-2 items-center text-white text-semibold text-md'>List <ArrowRight size="20" className='text-white' /></span>
    } else {
      return <ArrowRight size="20" className='text-white' />
    }
  })

  let sourceAtStep = (
    <div className='flex flex-col gap-3'>
      <h1 className='text-lg md:text-xl font-semibold text-gray-600' >Which of these categories does define your property</h1 >
      <p className='text-gray-500'>Pick a category</p>
      <div className="grid grid-cols-2  md:grid-cols-4 gap-3">
        {categories.map(each => {
          return <div key={each.label} onClick={() => setCustomValue('category', each.label)} className={cn('bg-gray-100 flex flex-col p-5 rounded-lg border-2 border-gray-300/20 text-semibold',
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
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg md:text-xl font-semibold text-gray-600' >Where is your property located?</h1 >
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
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg md:text-xl font-semibold text-gray-600' >Provide some information about your property</h1  >
        <div className='flex justify-between'>
          <span>
            <h3 className='text-lg font-semibold text-gray-500'>How many rooms do you want? </h3>
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
            <h3 className='text-lg font-semibold text-gray-500'>How many children do you have? </h3>
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
            <h3 className='text-lg font-semibold text-gray-500'>How many adults are planning to join? </h3>
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
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg md:text-xl font-semibold text-gray-600' >Upload images of your property</h1 >
        {imageSrc && <Image src={imageSrc} width={500} height={350} alt="property image" />}
        <ImageUploadComponent
          value={imageSrc}
          returnUrl={url => setCustomValue('imageSrc', url)}
        />
        {/* Image upload component can be added here */}
      </div>
    );
  }
  else if (step === STEPS.DESCRIPTION) {
    sourceAtStep = (
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg md:text-xl font-semibold text-gray-600' >Write a description for your property</h1>
        <Input
          placeholder="title about your property"
          {...register('title')}
        />
        <Textarea
          placeholder="What is the Story behind your property?"
          {...register('description')}
        />
        {/* Description input field can be added here */}
      </div>
    );
  }
  else if (step === STEPS.PRICE) {
    sourceAtStep = (
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg md:text-xl font-semibold text-gray-600' >How much do you charge for your property per night?</h1 >
        <Input
        placeholder="e.g 1000"
          {...register('price')}
        />
        {/* Price input field can be added here */}
      </div>
    );
  }

  return <section className=' '>
    <div className="p-4 md:p-8">
      {sourceAtStep}
    </div>

    <div className='w-full flex flex-col fixed bottom-0 '>
      <div className='flex justify-between pb-4 px-8'>
        <button onClick={onBack} className='p-4 rounded-full bg-rose-500 cursor-pointer '>
          <ArrowLeft size="20" className='text-white' />
        </button>
        <button onClick={handleSubmit(onNext)} className='p-4 rounded-full bg-rose-500 cursor-pointer disabled:bg-gray-400' disabled={!isStepValid}>
          {nextLabel}
        </button>
      </div>
      <div
        className='w-full bg-rose-500 h-2'
        style={{ width: `${((step + 1) / Object.keys(STEPS).length) * 100}%`, maxWidth: '100%' }}
      ></div>
    </div>

  </section>
}


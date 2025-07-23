"use client"

import React from 'react'
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Icons } from './Icons';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';


function LoginForm({ origin = 'signIn' }) {

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const router  = useRouter();

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    setLoading(true);
    try {
      if (origin === 'signIn') {
        signIn('credentials', {
          ...data,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
           console.log('Login successful');
            router.refresh();
          } else if (callback?.error) {
           
            throw new Error(callback.error);
            
          }
         
        });
      }
      else{
        //call api to create a new user
        console.log("about to make api call",data);
        axios.post("/api/auth/register", data)
        .then(()=>{
          console.log("User created successfully");
         
        })
      }

    } catch (error) { 
      console.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='space-y-2 w-full sm:w-1/2 '>
        {origin == 'signUp' && <Input
          {...register('name')}
          type="text"
          placeholder="Your Name"
        />}
        <Input 
         {...register('email')}
        type="email"
          placeholder="Email"
        />
        <Input
         {...register('password')}
         type="password"
          placeholder="Password"
        />

        <Button onClick={ handleSubmit(onSubmit)} className="w-full"> {origin == 'signUp' ? 'signUp' : 'signIn'}</Button>
        <Button onClick={()=>{signIn("google")}} className="w-full" type="button"><Icons.google /> {origin == 'signUp' ? 'sign up with Google ' : 'sign in with Google'}</Button>
        {origin == 'signUp' ?
          <span> Already have an account?
            <Link href="/sign-in" className="text-blue-500 hover:underline"> sign in </Link></span>

          :
          <span> New to airbnb?
            <Link href="/sign-up" className="text-blue-500 hover:underline"> sign up </Link></span>

        }
      </div>
    </div>
  )
}

export default LoginForm

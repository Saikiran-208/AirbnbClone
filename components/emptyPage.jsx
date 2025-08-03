'use client'
import Link from 'next/link'
import React from 'react'

const EmptyPage = ({title,linkText, link = '/'}) => {
  return (
    <div>
      <section className='h-screen grid place-items-center'>
        <div className='text-center'>
        <h1 className='text-3xl font-semibold'>{title}</h1>
        <Link className='underline' href={link}>{linkText}</Link>
        </div> 
      </section>
    </div>
  )
}

export default EmptyPage

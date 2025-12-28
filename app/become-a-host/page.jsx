
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import BecomeaHostComponent from '@/components/BecomeaHostComponent';
import { getUser } from '@/app/actions/getUser';

async function BecomeAHost() {
    const user = await getUser();
    if (!user) {
        return (
            <section className="w-full h-screen grid place-items-center">
                <div className='space-y-2'>
                    <h1 className='text-xl md:text-2xl font-bold'> Not Authorized</h1>
                    <span>To add Your properties,<Link className='underline' href="/" >Sign in</Link></span>
                </div>

            </section>
        )
    }
    return (
        <>

            <BecomeaHostComponent />
        </>
    )
}

export default BecomeAHost

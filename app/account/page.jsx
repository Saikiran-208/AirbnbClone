
import { UserProfile } from '@clerk/nextjs'
import React from 'react'
import { getUser } from '../actions/getUser'
import { redirect } from 'next/navigation';

const Account = async () => {
    const user = await getUser();
    if (!user) redirect("/");

    return (
        <div className='flex justify-center py-10'>
            <UserProfile routing="hash" />
        </div>
    )
}

export default Account

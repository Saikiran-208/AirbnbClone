import NotFound from '@/app/not-found';
import EmptyPage from '@/components/emptyPage';
import PropertyBox from '@/components/property-box';
import { getUser } from '@/app/actions/getUser';
import { prisma } from '@/utils/prisma';
import React from 'react'

const Properties = async () => {
    const user = await getUser();
    if (!user) return NotFound();

    const propertiesList = await prisma.listing.findMany({
        where: { userId: user.id }
    })

    if (propertiesList.length === 0) {
        return <section>
            <EmptyPage title="No properties added so far " linkText={"Add your today"} link="/become-a-host" />
        </section>
    }

    return (
        <div className='p-4 md:p-8 space-y-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-semibold'>Your Properties</h1>
                <a href="/become-a-host" className='bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-rose-600 transition'>
                    Add Property
                </a>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                {
                    propertiesList.map((each) => (
                        <PropertyBox key={each.id} each={each} />
                    ))
                }
            </div>
        </div>
    )
}

export default Properties

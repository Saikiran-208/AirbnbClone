import NotFound from '@/app/not-found';
import EmptyPage from '@/components/emptyPage';
import PropertyBox from '@/components/property-box';
import { auth } from '@/utils/auth'
import { prisma } from '@/utils/prisma';
import React from 'react'

const Properties = async () => {
    const session = await auth();
    if (!session) NotFound();

    const propertiesList = await prisma.listing.findMany({
        where: { userId: session.user.id }
    })

    if (!propertiesList) {
        return <section>
            <EmptyPage title="No properties added so far " linkText={"Add your today"} link="/become-a-host" />
        </section>
    }

    return (
        <div className='p-4 md:p-8 space-y-5'>
            <h1 className='text-3xl font-semibold'>Your Properties</h1>
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

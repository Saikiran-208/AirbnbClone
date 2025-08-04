import { getFavouriteListings } from '@/app/actions/favourties';
import { getUser } from '@/app/actions/getUser';
import NotFound from '@/app/not-found';
import EmptyPage from '@/components/emptyPage';
import ListingsCard from '@/components/listings-card';
import React from 'react'

const Favourites = async () => {

  const user = await getUser();
  if (!user) NotFound();

  const { data: favourites } = await getFavouriteListings();

  if (!favourites) return <EmptyPage title="No favourites yet" linkText={"Add a listing to favourites"} />

  return (
    <div className='p-4 md:p-8 space-y-5'>
      <h1 className='text-3xl font-semibold'>Your Favourites</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {favourites.map(each =>
          <ListingsCard
            key={each.id}
            listing={each}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

export default Favourites

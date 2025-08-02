import { getFavouriteListings } from '@/app/actions/favourties';
import { getUser } from '@/app/actions/getUser';
import EmptyPage from '@/components/emptyPage';
import ListingsCard from '@/components/listings-card';
import React from 'react'

const Favourites = async () => {

    const user = await getUser();
    if(!user) notFound();

    const  {data: favourites} = await getFavouriteListings();

    if(favourites.length==0) return <EmptyPage title="No favourites yet" linkText={"Add a listing to favourites"} />

  return (
    <div className='p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-5'>
      {favourites.map(each => 
        <ListingsCard 
        listing={each}
        user={user}
        />
      )}
    </div>
  )
}

export default Favourites

// "use client"

import ListingsCard from "@/components/listings-card";
import { getListings } from "./actions/getListings";
import CategoryHandler from "@/components/category-handler";
import { Suspense } from "react";

import { getUser } from "./actions/getUser";


export const metadata = {
  title: "AirBnb Website"
}

export default async function Home({ searchParams }) {
  
  const user = await getUser();
  const rawParams = await searchParams
  const params = Object.fromEntries(Object.entries(rawParams));

  
  const listings = await getListings(params);
  if (listings.length == 0) {
    return <section className="">

    <Suspense fallback={null}>
        <CategoryHandler />
      </Suspense>
      <div className="w-full grid place-items-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">No Listings Found</h1>
            <p>Maybe Change your filters</p>
          </div>
        </div>
      
    </section>
  }
  return (
    
    
        <section className="">
       <Suspense fallback={null}>
        <CategoryHandler />
      </Suspense>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8 ">
        {listings.map(listing => {
          return <ListingsCard key={listing.id} user={user} listing={listing} />
        })}
      </div>

    </section> 
    
      )
  
}

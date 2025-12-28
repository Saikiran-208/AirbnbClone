// "use client"

import ListingsCard from "@/components/listings-card";
import { getListings } from "./actions/getListings";
import CategoryHandler from "@/components/category-handler";
import { Suspense } from "react";

import { getUser } from "./actions/getUser";
import EmptyPage from "@/components/emptyPage";
import HomeClient from "@/components/HomeClient";


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
      <EmptyPage showReset={true} />

    </section>
  }
  return (


    <section className="w-full">

      <Suspense fallback={null}>
        <CategoryHandler />
      </Suspense>
      <HomeClient listings={listings} user={user} />

    </section>

  )

}

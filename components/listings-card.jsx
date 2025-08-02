'use client'
import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import formatMoney from "@/utils/formatMoney";
import FavouriteBtn from "./favourite-btn";
import { useRouter } from "next/navigation";


export default function ListingsCard({user, reservationsData, listing,showSecondaryBtn = false,secondaryBtnLabel, onAction }) {
    const router =  useRouter();
    const { getByValue } = useCountries();
    const countryDetails = getByValue(listing.locationValue)
    return <div  className="p-3 rounded shadow border border-e-gray-200 relative">
        <div className=" w-full aspect-square rounded-lg">
        <Image className="object-cover w-full h-full rounded-lg" src={listing.imageSrc} width={400} height={400} alt="property listing"/>
        </div>
        <FavouriteBtn className="absolute top-6 right-6" listingId={listing.id} user={user}/>
        <p className="font-semibold text-lg md:text-2xl capitalize pt-2">{listing.title}</p>
        {reservationsData ?
        <p>Paid ₹{formatMoney(reservationsData.totalPrice)}</p>:
         <p className="text-lg flex gap-1 items-center"><IndianRupee size={16}/> {listing.price} per night</p>}
        <div className="text-gray-400">
            {countryDetails.label},&nbsp;
            {countryDetails.region}  
        </div>
        <Button onClick={()=>router.push(`/listings/${listing.id}`)} className="w-full mb-2">View Property</Button>
        {showSecondaryBtn && <Button className="w-full" onClick={onAction}>{secondaryBtnLabel}</Button>}
    </div>
}
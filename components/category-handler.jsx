'use client'
import { cn } from "@/lib/utils";
 import { categories } from "@/static/config"
import { useSearchParams, useRouter } from "next/navigation"



export default function CategoryHandler(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeCat = searchParams.get('cat');
    const params = new URLSearchParams(searchParams.toString())
    const setCategory = (cat)=>{
        params.set('cat',cat);
        router.push(`?${params.toString()}`)
    }

    

    return(
        <div className="w-full flex justify-evenly gap-3 bg-gray-100/40 py-2 px-8 border-b border-gray-200 overflow-x-auto">
            {categories.map(cat=>{
                return <div  onClick={()=> setCategory(cat.label)} key={cat.label}
                 className={cn(
                    "flex flex-col gap-1 items-center cursor-pointer hover:bg-gray-200 rounded-md p-4 hover:text-rose-500 transition-colors duration-200 delay-100",
                    activeCat == cat.label && "bg-gray-200 text-rose-500"
                    )}> 
                    <cat.icon />
                    {cat.label}
                </div>
            })}
        </div>
    )
}
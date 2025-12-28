'use client'
import { cn } from "@/lib/utils";
import { categories } from "@/static/config"
import { useSearchParams, useRouter } from "next/navigation"



export default function CategoryHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeCat = searchParams.get('cat');
    const params = new URLSearchParams(searchParams.toString())
    const setCategory = (cat) => {
        params.set('cat', cat);
        router.push(`?${params.toString()}`)
    }



    return (
        <div className="sticky top-[80px] z-30 bg-white w-full shadow-sm">
            <div className="w-full flex justify-between items-center gap-8 overflow-x-auto pt-4 pb-4 scrollbar-hide px-4 md:px-12 transition-all">
                {categories.map(cat => {
                    return <div onClick={() => setCategory(cat.label)} key={cat.label}
                        className={cn(
                            "flex flex-col gap-2 items-center cursor-pointer min-w-fit hover:text-black hover:border-b-2 hover:border-gray-200 transition-all border-b-2 border-transparent pb-2 text-gray-500 opacity-80 hover:opacity-100",
                            activeCat == cat.label && "text-black border-black font-semibold opacity-100"
                        )}>
                        <cat.icon size={26} />
                        <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
                    </div>
                })}
            </div>
        </div>
    )
}
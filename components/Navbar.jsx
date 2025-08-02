'use client'
import React, { useState } from 'react'
import { Icons } from './Icons'
import { CircleUserRound, Search } from 'lucide-react';
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenu } from './ui/dropdown-menu';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import SearchModal from './search-modal';
import Link from 'next/link';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalStateStep, setModalStateStep] = useState(-1)

    const openSearchModalAtState = (step) => {
        if (!isOpen) {
            setIsOpen(true)
            setModalStateStep(step)
        }
    }
    return (
        <div className='flex justify-between items-center py-2 px-5 md:px-16 border-b-1 border-gray-300 bg-zinc-100'>
            <Link href='/' className="logo flex gap-1 ">
                <Icons.logo className="w-6 text-rose-500" />
                <span className="text-rose-500 font-semibold text-lg ">airbnb</span>
            </Link>
            <div className='search_features flex items-center gap-2 bg-white px-2 py-[4px] border-2 border-gray-300 rounded-full '>
                <div className='hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer' onClick={() => openSearchModalAtState(0)}>Location</div>
                <div className='bg-gray-300 h-[70%] w-[0.9px]'></div>
                <div className='hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer' onClick={() => openSearchModalAtState(1)}>Date</div>
                <div className='bg-gray-300 h-[70%] w-[0.9px]'></div>
                <div className='hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer' onClick={() => openSearchModalAtState(2)}>Details</div>
                <div className='bg-rose-500 rounded-full p-2 text-white cursor-pointer hover:bg-rose-600 transition-colors duration-200 delay-100 ' onClick={() => openSearchModalAtState(0)} >
                    <Search />
                </div>


            </div>
            <div>
                <UserComponent />

            </div>
            <SearchModal
                key={modalStateStep}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                stepAt={modalStateStep}
            />
        </div>
    )
}

const UserComponent = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><CircleUserRound /></DropdownMenuTrigger>
            <DropdownMenuContent className='outline-none'>
                <DropdownMenuItem>
                  <Link href='/bookings' > My Bookings</Link> 
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href='/favourites' > My Favourite </Link> 
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href='/properties' > My Properties</Link> 
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Airbnb your home
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



export default Navbar

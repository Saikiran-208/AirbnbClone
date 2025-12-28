'use client'
import React, { Suspense, useState } from 'react'
import { Icons } from './Icons'
import { CircleUserRound, Search } from 'lucide-react';
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenu } from './ui/dropdown-menu';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import SearchModal from './search-modal';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useSession, SignInButton, SignOutButton } from '@clerk/nextjs';

const Navbar = () => {
    const { session } = useSession();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false)
    const [modalStateStep, setModalStateStep] = useState(-1)

    const openSearchModalAtState = (step) => {
        if (!isOpen) {
            setIsOpen(true)
            setModalStateStep(step)
        }
    }
    return (

        <div className='fixed w-full bg-white z-50 shadow-sm top-0'>
            <div className='flex flex-row justify-between items-center py-4 px-4 md:px-10 border-b border-gray-200 h-[80px]'>
                <Link href='/' className="logo flex gap-1 items-center">
                    <Icons.logo className="w-8 text-rose-500" />
                    <span className="text-rose-500 font-bold text-xl hidden lg:block">airbnb</span>
                </Link>

                <div className='flex-1 flex justify-center'>
                    {/* Simplified Search for Mobile */}
                    <div className='md:hidden flex items-center justify-between border border-gray-300 rounded-full py-2 px-4 shadow-sm w-full max-w-[300px] cursor-pointer hover:shadow-md transition-shadow' onClick={() => openSearchModalAtState(0)}>
                        <div className="font-semibold text-sm">Anywhere</div>
                        <div className='bg-rose-500 rounded-full p-2 text-white'>
                            <Search size={14} />
                        </div>
                    </div>

                    {/* Full Search for Desktop */}
                    <div className='hidden md:flex flex-row items-center justify-between border border-gray-300 rounded-full py-2 pl-6 pr-2 shadow-sm hover:shadow-md transition cursor-pointer gap-2'>
                        <div className='text-sm font-semibold px-4 border-r border-gray-300' onClick={() => openSearchModalAtState(0)}>Anywhere</div>
                        <div className='text-sm font-semibold px-4 border-r border-gray-300' onClick={() => openSearchModalAtState(1)}>Any Week</div>
                        <div className='text-sm font-normal text-gray-600 px-4' onClick={() => openSearchModalAtState(2)}>Add Guests</div>
                        <div className='bg-rose-500 rounded-full p-2 text-white' onClick={() => openSearchModalAtState(0)}>
                            <Search size={16} />
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-5 flex-shrink'>
                    {/* Clerk handles auth state automatically */}
                    {
                        !session ? (
                            <div className="flex items-center gap-4">
                                <Link href="/become-a-host" className="text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition-all">
                                    Become a host
                                </Link>

                                <SignInButton mode="modal">
                                    <Button>Login</Button>
                                </SignInButton>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/become-a-host" className="hidden md:block text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition-all">
                                    Become a host
                                </Link>
                                <UserComponent />
                            </div>
                        )
                    }

                </div>
            </div>
            <Suspense fallback={null}>
                <SearchModal
                    key={modalStateStep}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    stepAt={modalStateStep}
                />
            </Suspense>
        </div>

    )
}

const UserComponent = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                {/* Using the user avatar would be better, but circle user is good default */}
                <CircleUserRound className="w-8 h-8 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='outline-none w-56' align="end">
                <DropdownMenuItem asChild>
                    <Link href='/bookings' className="cursor-pointer font-semibold">Trips</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/favourites' className="cursor-pointer font-semibold">Wishlists</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/properties' className="cursor-pointer">Manage listings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href='/become-a-host' className="cursor-pointer">Become a host</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/account' className="cursor-pointer">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500 font-semibold" onSelect={(e) => e.preventDefault()}>
                    <SignOutButton>
                        <div className="w-full h-full">Log out</div>
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Navbar

'use client'
import React from 'react'
import { SignIn, SignedOut } from '@clerk/nextjs'

const FloatingLogin = () => {
    return (
        <SignedOut>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-md">
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                            Welcome to Airbnb
                        </h2>
                        <SignIn
                            routing="hash"
                            appearance={{
                                elements: {
                                    card: "shadow-none bg-transparent",
                                    rootBox: "w-full",
                                    headerTitle: "hidden",
                                    headerSubtitle: "hidden",
                                    socialButtonsBlockButton: "bg-white hover:bg-gray-50 border border-gray-300 text-gray-700",
                                    footer: "hidden"
                                }
                            }}
                            redirectUrl="/"
                        />
                    </div>
                </div>
            </div>
        </SignedOut>
    )
}

export default FloatingLogin

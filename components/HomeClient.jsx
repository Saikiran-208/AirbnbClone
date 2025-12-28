'use client';

import React, { useState } from 'react';
import ListingsCard from './listings-card';
import { Button } from './ui/button';
import { Map as MapIcon, List } from 'lucide-react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), { ssr: false });

const HomeClient = ({ listings, user }) => {
    const [isMapView, setIsMapView] = useState(false);

    const toggleView = () => setIsMapView(!isMapView);

    return (
        <div className="relative">
            {isMapView ? (
                <div className="h-[80vh] w-full mt-4 px-4 md:px-8">
                    {/* Dynamic import map to avoid SSR issues if needed, but standard import might work with 'use client' */}
                    <Map listings={listings} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                    {listings.map((listing) => {
                        return <ListingsCard key={listing.id} user={user} listing={listing} />;
                    })}
                </div>
            )}

            {/* Floating Toggle Button */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
                <Button
                    onClick={toggleView}
                    className="bg-gray-900 hover:bg-black text-white rounded-full px-6 py-4 shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
                >
                    {isMapView ? (
                        <>
                            Show List <List size={18} />
                        </>
                    ) : (
                        <>
                            Show Map <MapIcon size={18} />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default HomeClient;

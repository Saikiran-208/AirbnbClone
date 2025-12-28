'use client';

import React from 'react';
import ListingsCard from './listings-card';

const HomeClient = ({ listings, user }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
            {listings.map((listing) => {
                return <ListingsCard key={listing.id} user={user} listing={listing} />;
            })}
        </div>
    );
};

export default HomeClient;

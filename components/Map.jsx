'use client';

import React from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useCountries from '@/hooks/useCountries';
import Link from 'next/link';
import Image from 'next/image';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = ({ listings, center: customCenter }) => {
    const { getByValue } = useCountries();

    // Default center (e.g., somewhere central or generic)
    const defaultCenter = [51, -0.09];
    const center = customCenter || defaultCenter;

    // Memoize the markers to prevent them from jumping around (re-randomizing) on every render
    const markers = React.useMemo(() => {
        return listings.map((listing) => {
            const country = getByValue(listing.locationValue);

            // Generate a deterministic-ish offset based on listing ID if possible, or just stable random
            let latOffset = 0;
            let lngOffset = 0;

            if (listing.id && country?.latlng) {
                const idVal = listing.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const pseudoRandom = (idVal % 100) / 100; // 0.00 to 0.99
                const pseudoRandom2 = ((idVal * 2) % 100) / 100;

                // Spread them out by up to 2 degrees (approx 200km) to see them distinct in the country
                latOffset = (pseudoRandom - 0.5) * 2;
                lngOffset = (pseudoRandom2 - 0.5) * 2;
            }

            const latlng = country?.latlng ? [
                country.latlng[0] + latOffset,
                country.latlng[1] + lngOffset
            ] : null;

            if (!latlng) return null;

            return (
                <Marker position={latlng} key={listing.id}>
                    <Popup className="rounded-xl overflow-hidden p-0">
                        {/* Styles for Popup content need to be global or inline usually, styling here for basic layout */}
                        <Link href={`/listings/${listing.id}`} className="flex flex-col min-w-[200px] overflow-hidden group">
                            <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
                                <Image
                                    src={listing.imageSrc}
                                    alt={listing.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-3 bg-white">
                                <div className="font-bold text-base truncate">{listing.title}</div>
                                <div className="text-gray-500 text-sm">{country?.region}, {country?.label}</div>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="font-bold">₹{listing.price}</span> night
                                </div>
                            </div>
                        </Link>
                    </Popup>
                </Marker>
            )
        })
    }, [listings, getByValue]);

    return (
        <MapContainer
            center={center}
            zoom={4}
            minZoom={3} // Prevent zooming out to see multiple worlds
            maxBounds={[[-85, -180], [85, 180]]} // constrain to normal lat/long
            maxBoundsViscosity={1.0} // solid bounce when hitting edge
            scrollWheelZoom={true} // Enable scroll zoom for better "interesting" feel
            className="h-[80vh] rounded-xl shadow-lg relative z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // Used CARTO for a "prettier" look.
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                noWrap={true} // Prevent tiles from repeating horizontally
            />
            {markers}
        </MapContainer>
    );
};

export default Map;

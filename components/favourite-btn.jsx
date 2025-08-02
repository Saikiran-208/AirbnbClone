'use client'
import useFavourite from '@/hooks/use-favourite'
import { cn } from '@/lib/utils'

import React from 'react'

const FavouriteBtn = ({ listingId, user, className, props }) => {

    const { isFavourite, toggleFavourite } = useFavourite({ listingId: listingId, user: user })
    const color = isFavourite ? 'gold' : 'black';

    return (
        <div onClick={toggleFavourite} className={cn('classname by my own', className)}>
            <svg

                width="25px"
                height="25px"
                viewBox="0 0 100 100"
                id="bookmark"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
                style={{
                    color: color
                }}
            >
                <path
                  d="M 98,43 74,66 79,99 49,84 19,99 25,66 1,42 34,37 49,7 64,37 z"
                  fill="currentColor"
                   />
            </svg>
        </div>
    )
}

export default FavouriteBtn

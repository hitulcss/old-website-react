import React from 'react'

const CardLoader = () => {
    return (
        <div sx={{ width: '250px', height: '300px' }}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />

        </div>
    )
}

export default CardLoader
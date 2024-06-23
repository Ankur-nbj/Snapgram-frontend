import {Skeleton} from '@mui/material'
import React from 'react'

const MessageSkeleton = () => {
  return (
   <>
    <Skeleton animation="wave" variant="circular" width={40} height={40} />
   <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', mr: '10rem' }} />
   <Skeleton animation="wave"variant="text" sx={{ fontSize: '1rem', mr: '15rem'}} />
   <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', mr: '20rem' }} />
    <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ml:"90%"}} />
   <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', ml: '10rem' }} />
   <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', ml: '15rem' }} />
   <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', ml: '20rem' }} />
   </>
  )
}

export default MessageSkeleton
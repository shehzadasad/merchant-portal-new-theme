import React from 'react'
import { Box, Typography } from '@mui/material'
import Steps from '../Dashboard/Steps/Steps'
import { useMediaQuery } from '@mui/material'

const ReviewOnBoardingApplication = () => {
  const islg = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <>
      <Box
        display='flex'
        justifyContent={'center'}
        flexDirection='column'
        alignItems={'center'}
      >
        {' '}
        <Steps OnBoarding={true} ReviewApplication={true} setUpPayment={true} />
        <Box
          bgcolor={'#fff'}
          display='flex'
          justifyContent={'center'}
          flexDirection='column'
          alignItems='center'
          padding={'50px'}
          width={islg ? '920px' : '400px'}
        >
          <img
            src='assets/images/onBoarding/applicationreview.svg'
            alt='review'
          />
          <Typography fontSize={'24px'} paddingBottom='15px'>
            Application In Review
          </Typography>
          <Typography textAlign={'center'}>
            Thank you for submitting the required information. Our team will
            review your application. You will recieve the response within 3-5
            business days.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default ReviewOnBoardingApplication

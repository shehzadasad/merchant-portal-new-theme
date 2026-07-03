import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import greenTick from 'assets/icon/greenTick.svg'
import { useNavigate } from 'react-router-dom'
const OnBoardingApplicationSubmission = () => {
  const navigate = useNavigate()
  const islg = useMediaQuery((theme) => theme.breakpoints.up('md'))
  return (
    <Box
      display='flex'
      justifyContent={'center'}
      flexDirection='column'
      alignItems={'center'}
    >
      {' '}
      <Box
        bgcolor={'#fff'}
        display='flex'
        justifyContent={'center'}
        flexDirection='column'
        alignItems='center'
        padding={'50px'}
        width={islg ? '650px' : '400px'}
        height={'450px'}
      >
        <Box
          width={islg ? '500px' : '400px'}
          display='flex'
          justifyContent={'center'}
          flexDirection='column'
          alignItems='center'
        >
          <img
            src={greenTick}
            style={{ width: '70px', marginBottom: '20px' }}
            alt='green tick'
          />
          <Typography fontSize={'24px'} paddingBottom='15px'>
            Application Submitted Successfully
          </Typography>
          <Typography textAlign={'center'}>
            Thank you for submitting the required information. Our team will
            review your application. You will recieve the response within 3-5
            business days.
          </Typography>
        </Box>
        {/* <Button
          style={{
            background: '#e93a7d',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '800',
            textAlign: 'center',
            width: '230px',
            border: 'none',
            height: '42px',
            cursor: 'pointer',
            marginRight: 17,
            marginTop: 20,
          }}
          onClick={() => {
            navigate('/onBoarding')
          }}
        >
          Explore Merchant Portal
        </Button> */}
      </Box>
    </Box>
  )
}

export default OnBoardingApplicationSubmission

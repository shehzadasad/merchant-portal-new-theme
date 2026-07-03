import React, { useEffect } from 'react'
import Steps from '../Dashboard/Steps/Steps'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
const OnBoarding = () => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const merchantStates = useSelector((state) => state.users.merchantStates)
  const navigate = useNavigate()
  useEffect(() => {
    if (merchantStates && merchantStates.onboardingApplicationApproved) {
      navigate('/setup-payment-method')
    } else if (merchantStates && merchantStates.onboardingApplicationInReview) {
      navigate('/onboarding-application-in-review')
    }
  }, [merchantStates])
  return (
    <Box>
      <Typography sx={{ pb: '21px' }}>
        Welcome Please complete all the below steps and go LIVE
      </Typography>
      <Steps OnBoarding={true} ReviewApplication={true} setUpPayment={true} />
      <Box
        display={'flex'}
        flexDirection='column'
        justifyContent='center'
        alignItems={'center'}
      >
        <Box
          sx={{
            padding: '50px',

            /* BG light/Sidebar bg */
            width: isSm ? '700px' : '300px',
            background: '#FFFFFF',
            borderRadius: '10px',
          }}
        >
          <Typography fontSize={'24px'}>
            Merchant Onboarding Application!
          </Typography>
          <Typography sx={{ pb: '20px' }}>
            We're glad that you want to become a part of QisstPay 1-click
            checkout. Before starting the onboarding application, please make
            sure you have the following documents with you:
          </Typography>
          <ul>
            <li style={{ lineHeight: '2rem' }}>Signed Merchant Agreement</li>
            <li style={{ lineHeight: '2rem' }}>
              Latest Business NTN Certificate
            </li>
            <li style={{ lineHeight: '2rem' }}>
              Bank Account Maintainence Certificate
            </li>
            <li style={{ lineHeight: '2rem' }}>CNIC of all Directors </li>
            <li style={{ lineHeight: '2rem' }}>
              Business Logo, Featured Image
            </li>
          </ul>
          <Button
            style={{
              background: '#e93a7d',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: '200px',
              border: 'none',
              height: '36px',
              cursor: 'pointer',
              marginRight: 17,
              marginTop: 20,
            }}
            onClick={() => {
              navigate('/onboarding-application')
            }}
            disabled={
              merchantStates?.onboardingApplicationInReview ? true : false
            }
          >
            Start Application
          </Button>
          {merchantStates?.onboardingApplicationInReview ? (
            <Typography color={'red'} pt='10px' pl='2px'>
              Application already submitted
            </Typography>
          ) : (
            ''
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default OnBoarding

import React from 'react'
import { Typography, Box } from '@mui/material'
import 'react-circular-progressbar/dist/styles.css'
import { useMediaQuery } from '@mui/material'
import Steps from '../Dashboard/Steps/Steps'
const GoLive = () => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  return (
    <Box display='flex' flexDirection='column' alignItems={'center'}>
      {' '}
      <Steps OnBoarding={true} ReviewApplication={true} setUpPayment={true} />
      <Box
        bgcolor={'#fff'}
        display='flex'
        flexDirection='column'
        padding={'50px'}
        width={isMd ? '750px' : '350px'}
      >
        <Typography fontSize={'24px'} paddingBottom='15px'>
          Go Live
        </Typography>
        <Typography sx={{ marginBottom: '20px' }}>
          Please contact QisstPay team to setup pricing for your requested
          services and go fully live with 1-Click Checkout including integration
          on your webstore.
        </Typography>
        <Typography>
          You will receive a confirmation email as soon as your pricing has been
          setup and integration is complete.
        </Typography>
        <Typography sx={{ marginBottom: '20px' }}>Thank you !</Typography>
      </Box>
    </Box>
  )
}

export default GoLive

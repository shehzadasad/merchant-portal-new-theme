import React, { useEffect } from 'react'
import Steps from '../Dashboard/Steps/Steps'
import { Box, Typography, Button } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
const SetUpPayment = () => {
  const islg = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const navigate = useNavigate()
  const merchantStates = useSelector((state) => state.users.merchantStates)
  useEffect(() => {
    if (merchantStates && merchantStates.paymentMethods) {
      navigate('/go-live')
    }
  }, [merchantStates])
  return (
    <Box display='flex' flexDirection='column' alignItems={'center'}>
      <Steps OnBoarding={true} ReviewApplication={true} setUpPayment={true} />
      <Box
        bgcolor={'#fff'}
        display='flex'
        flexDirection='column'
        padding={'50px'}
        width={islg ? '920px' : '350px'}
      >
        <Typography fontSize={'24px'} paddingBottom='15px'>
          Setup Payment Methods
        </Typography>
        <Typography sx={{ marginBottom: '20px' }}>
          We’re glad that you want to become a part of QisstPay 1-click
          checkout. Before going live with 1-Click, please setup your payment
          option/s for customers by following the below steps:
        </Typography>
        <List>
          <ListItem>1: Create a stack</ListItem>
          <ListItem>2: Create a view</ListItem>
          <ListItem>3: Add a payment method (enter live credentials)</ListItem>
          <ListItem>4: Drag & drop payment method in the view created</ListItem>
        </List>

        <Button
          style={{
            background: '#e93a7d',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '800',
            width: '180px',

            padding: '10px 20px',
            marginTop: 20,
            '&:hover, &:focus': {
              background: '#e93a7d',
            },
          }}
          onClick={() => {
            navigate('/payment')
          }}
        >
          Continue
        </Button>
      </Box>{' '}
    </Box>
  )
}

export default SetUpPayment

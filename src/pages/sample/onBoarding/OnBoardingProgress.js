import React, { useEffect, useState } from 'react'
import Steps from '../Dashboard/Steps/Steps'
import { Box, Typography, Button } from '@mui/material'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import axios from 'axios'
const OnBoardingProgress = ({ setFormPart }) => {
  const isSmUp = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const userDetail = useSelector((state) => state.users.userDetail)

  const [percentage, setPercentage] = useState(null)
  useEffect(() => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/banner/percentage/${userDetail?.merchantId}`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      // data: dataObj,
    }

    axios(config)
      .then(function (response) {
        setPercentage(response.data.body)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [userDetail])
  return (
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
        width={isSmUp ? '920px' : '335px'}
      >
        <Typography fontSize={'24px'}>
          Merchant Onboarding Application!
        </Typography>
        <Typography>
          Kindly complete the application to start selling with 1-click checkout
        </Typography>
        <Box
          display={isSmUp ? 'flex' : 'grid'}
          justifyContent='space-evenly'
          width={'80%'}
          marginTop='30px'
        >
          <Box
            display='flex'
            flexDirection={'column'}
            alignItems='center'
            width='120px'
            textAlign={'center'}
          >
            <Box sx={{ width: '80%' }}>
              <CircularProgressbar
                value={percentage?.merchantBusinessInformation}
                percentage={percentage?.merchantBusinessInformation}
                text={`${Math.round(percentage?.merchantBusinessInformation)}%`}
                styles={buildStyles({
                  rotation: 0.5 + (1 - percentage / 100) / 2,
                  textColor: '#e93a7d',
                  pathColor: '#e93a7d',
                })}
              />
            </Box>
            <Typography marginTop={'10px'}>Business Information</Typography>
          </Box>
          <Box
            width='120px'
            display='flex'
            flexDirection={'column'}
            alignItems='center'
            textAlign={'center'}
          >
            <Box sx width='80%'>
              <CircularProgressbar
                value={percentage?.merchantContactInformation}
                percentage={percentage?.merchantContactInformation}
                text={`${Math.round(percentage?.merchantContactInformation)}%`}
                styles={buildStyles({
                  textColor: '#e93a7d',
                  pathColor: '#e93a7d',
                })}
              />
            </Box>
            <Typography marginTop={'10px'}>Contact Information</Typography>
          </Box>
          <Box
            width='120px'
            display='flex'
            flexDirection={'column'}
            alignItems='center'
            textAlign={'center'}
          >
            <Box width='80%'>
              <CircularProgressbar
                value={percentage?.merchantBankInformation}
                percentage={percentage?.merchantBankInformation}
                text={`${Math.round(percentage?.merchantBankInformation)}%`}
                styles={buildStyles({
                  textColor: '#e93a7d',
                  pathColor: '#e93a7d',
                })}
              />
            </Box>
            <Typography marginTop={'10px'}> Banking Information</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection={'column'}
            alignItems='center'
            width='120px'
            textAlign={'center'}
          >
            <Box width='80%'>
              <CircularProgressbar
                percentage={percentage?.merchantDocumentsUpload}
                text={`${Math.round(percentage?.merchantDocumentsUpload)}%`}
                value={percentage?.merchantDocumentsUpload}
                styles={buildStyles({
                  rotation: 0.5 + (1 - percentage / 100) / 2,
                  textColor: '#e93a7d',
                  pathColor: '#e93a7d',
                  strokeDasharray: `${
                    percentage?.merchantDocumentsUpload
                  }px ${289}px`,
                  background: {
                    fill: '#3e98c7',
                  },
                })}
              />
            </Box>
            <Typography marginTop={'10px'}>Upload Documents</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection={'column'}
            alignItems='center'
            width='120px'
            textAlign={'center'}
          >
            <Box width='80%'>
              {' '}
              <CircularProgressbar
                percentage={percentage?.total}
                value={percentage?.total}
                text={`${Math.round(percentage?.total)}%`}
                styles={buildStyles({
                  textColor: '#e93a7d',
                  pathColor: '#e93a7d',
                  strokeDasharray: `${percentage?.merchantDocumentsUpload}px ${percentage?.merchantDocumentsUpload}px`,
                })}
              />
            </Box>
            <Typography marginTop={'10px'}>Review Application</Typography>
          </Box>
        </Box>
        <Button
          sx={{
            background: '#e93a7d',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '800',
            padding: '10px 20px',
            marginTop: '50px',
          }}
          onClick={() => {
            if (percentage.merchantBusinessInformation === 100) {
              setFormPart('Contact')
            } else if (percentage.merchantContactInformation === 100) {
              setFormPart('CertificateUpload')
            } else if (percentage.merchantDocumentsUpload === 100) {
              setFormPart('CertificateUpload')
            } else {
              setFormPart('BussinessInformation')
            }
          }}
        >
          Complete Application
        </Button>
      </Box>
    </Box>
  )
}

export default OnBoardingProgress

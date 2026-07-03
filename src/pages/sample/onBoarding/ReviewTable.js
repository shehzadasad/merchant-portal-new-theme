import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
} from '@mui/material'

import { getOnBoardingDetails } from 'redux/actions/OnBoardingAction'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'
import { ThreeDots } from 'react-loader-spinner'

const ReviewTable = ({ setReviewPage, setFormPart }) => {
  const [onBoardingData, setOnBoardingData] = useState([])
  const [confirmation, setConfirmation] = React.useState(true)
  const [bankName, setBankName] = useState('')
  const [success, setSuccess] = useState(null)
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const isSm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  useEffect(() => {
    dispatch(getOnBoardingDetails(userDetail?.merchantId, setOnBoardingData))
    if (onBoardingData) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/merchants/country/${onBoardingData?.merchantBusinessInformation?.countryId}/banks`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            let res = response.data.banks
            res
              .filter(
                (item) =>
                  item.id === onBoardingData?.merchantBankInformation?.bankId
              )
              .map((bank, index) => {
                return setBankName(bank.name)
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [userDetail, onBoardingData?.merchantBusinessInformation?.countryId])

  const handleConfirmation = (event) => {
    setConfirmation(event.target.checked)
  }
  const submitForm = () => {
    if (confirmation) {
      setSuccess(false)

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/merchant-onboarding`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: onBoardingData,
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            toast.success('Submission Successful!!!')
            setSuccess(true)
            setFormPart('submission-succesful')
            const dataState = {
              merchantId: onBoardingData?.merchantId,
              updatedState: 'ONBOARDING_APPLICATION_IN_REVIEW',
            }

            const config = {
              method: 'put',
              url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/update/state`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              data: dataState,
            }

            axios(config)
              .then(function (response) {
                if (response.status === 200) {
                  console.log(response)
                }
              })
              .catch(function (error) {})
          }
        })
        .catch(function (error) {
          console.log(error)
          toast.error(error?.response?.data?.errors?.[0].errorMessage)
          setSuccess(true)
        })
    }
  }
  return (
    <Box
      display='flex'
      justifyContent={'center'}
      flexDirection='column'
      alignItems={'center'}
    >
      {' '}
      <Box width='700px'>
        <TableContainer
          component={Paper}
          style={{ marginTop: 38, borderRadius: 10 }}
        >
          <Box padding='20px'>
            <Typography fontSize={'18px'} fontWeight='bold'>
              Review Information
            </Typography>
          </Box>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Information
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              onClick={() => {
                setFormPart('BussinessInformation')
              }}
            >
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                color='red'
                className='modalText'
              >
                Edit
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Legal Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Registered Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantBusinessInformation
                    ?.businessRegisteredName
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Type
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessType}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Date of Incorporation
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantBusinessInformation
                    ?.dateOfIncorporation
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Parent Company
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.parentCompany}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Industry
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessIndustry}
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Director Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Director Designation
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Director CNIC
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessName}
              </Typography>
            </Grid>
          </Grid> */}
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Merchant Partners
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {onBoardingData?.merchantBusinessInformation?.merchantPartnersDTOList.map(
                (item) => {
                  return (
                    <>
                      <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                          Director Name:
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                          {item?.name}
                        </Typography>
                      </Box>

                      <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                          Director Designation:
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                          {item?.designation}
                        </Typography>
                      </Box>

                      <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                          Director CNIC:
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                          '{item?.cnic}'
                        </Typography>
                      </Box>
                    </>
                  )
                }
              )}
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                NTN #
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.ntn}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                STRN #
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.strn}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Address
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessAddress}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Email
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessEmail}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Phone Number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.businessPhone}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Website URL
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantBusinessInformation
                    ?.businessWebsiteURL
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Do you have any physical stores?
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.hasPhysicalStore
                  ? 'Yes'
                  : 'No'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Social Media Accounts URL
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12}>
              <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                        Instagram
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                        {onBoardingData?.merchantBusinessInformation?.instaAccURL}
                        </Typography>
                      </Box>  
              
              </Grid>
              <Grid item xs={12}>
              <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                        Linkedin
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                        {onBoardingData?.merchantBusinessInformation?.linkedInAccURL}
                        </Typography>
                      </Box> 
             
              </Grid>
              <Grid item xs={12}>
              <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                        Facebook:
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                        {onBoardingData?.merchantBusinessInformation?.fbAccURL}
                        </Typography>
                      </Box> 
             
              </Grid>
            </Grid>
          </Grid>{' '}
          {/* ///// */}
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                payment Methods Offered
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {onBoardingData?.merchantBusinessInformation?.paymentMethodsOffered.map(
                (item) => {
                  return (
                    <>
                      <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                          Payment Method:
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                          {item.paymentMethod}
                        </Typography>
                      </Box>

                      <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                        Bussiness Volume Per Payment Method:
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                        {item.businessVolumePerPaymentMethod}
                        </Typography>
                      </Box>
                     
                    </>
                  )
                }
              )}
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Checkout Type
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.checkoutType}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Merchant Platform
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation?.platform}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                No of physical outlets
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantBusinessInformation
                    ?.numberOfPhysicalOutlets
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                International Shipping
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBusinessInformation
                  ?.hasInternationalShipping
                  ? 'Yes'
                  : 'No'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Delivery Services Used
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {onBoardingData?.merchantBusinessInformation?.deliveryServicesUsed.map(
                (item) => {
                  return (
                    <>

<Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                        Delivery Service: 
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                        {item?.deliveryService}
                        </Typography>
                      </Box>


                   <Box display={'flex'}>
                        <Typography color={'GrayText'} marginRight={'10px'}>
                        Purpose:
                        </Typography>
                        <Typography variant='p' component='p' fontSize={14}>
                        {item?.purpose}
                        </Typography>
                      </Box>  
                 
                    </>
                  )
                }
              )}
            </Grid>
          </Grid>
          {/*  */}
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Contact Information
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              onClick={() => {
                setFormPart('Contact')
              }}
            >
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                color='red'
                className='modalText'
              >
                Edit
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Authorized Signatory Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantContactInformation
                    ?.authorizedSignatoryName
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Signatory Email
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantContactInformation?.signatoryEmail}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Signatory Phone Number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantContactInformation?.signatoryPhone}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Signatory DOB
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantContactInformation?.signatoryDoB}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Signatory Gender
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantContactInformation?.signatoryGender}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Support Point of Contact
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantContactInformation?.supportName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Support Phone Number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantContactInformation?.supportPhone}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Bank Information
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              onClick={() => {
                setFormPart('Contact')
              }}
            >
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                color='red'
                className='modalText'
              >
                Edit
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                IBAN#
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBankInformation?.iban}
              </Typography>
            </Grid>
          </Grid>{' '}
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Account Title
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBankInformation?.accTitle}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Bank Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {bankName && bankName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Branch
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantBankInformation?.bankBranch}
              </Typography>
            </Grid>
          </Grid>{' '}
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Document
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              onClick={() => {
                setFormPart('CertificateUpload')
              }}
            >
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                color='red'
                className='modalText'
              >
                Edit
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Signed Merchant Agreement
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantDocumentsUpload
                    ?.merchantAgreementCertificateURL
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                CNIC Copy of the Signatory (Front & Back)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Front
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantDocumentsUpload?.cnicFrontURL}
              </Typography>
              Back
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Account Maintenance Certificate
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantDocumentsUpload
                    ?.bankAccMaintenanceCertificateURL
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business NTN Certificate
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantDocumentsUpload?.ntnCertificateURL}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Business Logo
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantDocumentsUpload?.businessLogoURL}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Featured Image
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {onBoardingData?.merchantDocumentsUpload?.featuredImageURL}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={6}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Proof of Business AddressURL
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='p' component='p' fontSize={14}>
                {
                  onBoardingData?.merchantDocumentsUpload
                    ?.proofOfBusinessAddressURL
                }
              </Typography>
            </Grid>
          </Grid>
        </TableContainer>
        <FormControlLabel
          style={{ marginTop: '40px' }}
          control={
            <Checkbox
              name='confirmation'
              onChange={handleConfirmation}
              checked={confirmation}
              sx={{
                '&.Mui-checked': {
                  color: '#E71583',
                },
              }}
            />
          }
          label='I confirm that all information filled and submitted in the Merchant Profile Form
        & submitted to QisstPay BNPL Pvt Ltd is complete and stands corrected to the
        best of my knowledge and allow QisstPay BNPL Pvt Ltd to verify (scrutinize &
        conduct due diligence) against the above provided information as part of
        QisstPay BNPL Pvt Ltd.  KYC (Know-Your-Customer) Protocol for on-boarding
        us as their Merchant for Internet Payment Gateway (IPG).'
        />
        <Box
          display='flex'
          justifyContent={'space-between'}
          width={isSm ? '700px' : '300px'}
        >
          <Button
            variant='outlined'
            style={{
              // background: '#',
              borderRadius: '8px',
              color: '#e93a7d',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: '150px',
              border: '1px solid #e93a7d',
              height: '40px',
              cursor: 'pointer',
              marginRight: 17,
              marginTop: 20,
            }}
            onClick={() => {
              setFormPart('CertificateUpload')
            }}
          >
            Back
          </Button>
          <Box>
            <Button
              variant='outlined'
              style={{
                // background: '#',
                borderRadius: '8px',
                color: '#e93a7d',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '150px',
                border: '1px solid #e93a7d',
                height: '40px',
                cursor: 'pointer',
                marginRight: 17,
                marginTop: 20,
              }}
              onClick={() => {
                setFormPart('onBoarding-progress')
              }}
            >
              Save & Close
            </Button>
            <Button
              variant='outlined'
              style={{
                // background: '#',
                borderRadius: '8px',
                color: '#e93a7d',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '160px',
                border: '1px solid #e93a7d',
                height: '40px',
                cursor: 'pointer',
                marginRight: 17,
                marginTop: 20,
              }}
              onClick={submitForm}
            >
              {success === false ? (
                <ThreeDots
                  height='30'
                  width='30'
                  radius='9'
                  color='white'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  wrapperClassName=''
                  visible={true}
                />
              ) : (
                'Save & Continue'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ReviewTable

import {
  Typography,
  Box,
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  addOnBoardingBussinessInfo,
  getCountries,
  getStateByCountyID,
  getCitiesByStateID,
  getOnBoardingDetails,
  getBanksByCountryId,
} from 'redux/actions/OnBoardingAction'
import { AppLoader } from '@crema'
import { v4 as uuidv4 } from 'uuid'
import AddDirectorModal from './AddDirectorModal'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import AddPaymentModal from './AddPaymentModal'
import AddDeliveryServiceModal from './AddDeliveryServiceModal'
import InputAdornment from '@mui/material/InputAdornment'
const BussinessInformationForm = ({ setFormPart }) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()
  const [onBoardingData, setOnBoardingData] = useState([])
  const [success, setSuccess] = useState(null)
  const [openDirector, setOpenDirector] = useState(false)
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false)
  const [openDeliveryServices, setOpenDeliveryServices] = useState(false)
  const [directorList, setDirectorList] = useState([])
  const [deliveryServiceList, setDeliveryServiceList] = useState([])
  const [paymentMethodList, setPaymentMethodList] = useState([])
  const [getCountry, setGetCoutryData] = useState([])
  const [stateData, setStatesData] = useState(null)
  const [cityData, setCityData] = useState(null)
  const [countryID, setCountryID] = useState('')
  const [stateID, setStateID] = useState('')
  const [cityID, setCityID] = useState('')
  const [bankData, setBankData] = useState([])
  const [bussinessPhoneNum, setBussinessPhoneNum] = useState('')
  const [currentCountry, setCurrentContry] = useState('')

  useEffect(() => {
    dispatch(getOnBoardingDetails(userDetail?.merchantId, setOnBoardingData))
    dispatch(getCountries(userDetail?.merchantId, setGetCoutryData))
    setCountryID(onBoardingData?.merchantBusinessInformation?.countryId)
    setCityID(onBoardingData?.merchantBusinessInformation?.cityId)
    setStateID(onBoardingData?.merchantBusinessInformation?.stateId)
    setBussinessPhoneNum(
      onBoardingData?.merchantBusinessInformation?.businessPhone
    )
  }, [
    userDetail,
    onBoardingData?.merchantBusinessInformation?.countryId,
    onBoardingData?.merchantBusinessInformation?.stateId,
  ])

  useEffect(() => {
    onBoardingData?.merchantBusinessInformation?.deliveryServicesUsed.map(
      (data) => {
        setDeliveryServiceList([
          {
            deliveryService: data?.deliveryService,
            purpose: data?.purpose,
          },
        ])
      }
    )
  }, [onBoardingData?.merchantBusinessInformation?.deliveryServicesUsed])

  useEffect(() => {
    onBoardingData?.merchantBusinessInformation?.paymentMethodsOffered.map(
      (data) => {
        setPaymentMethodList([
          {
            paymentMethod: data.paymentMethod,
            businessVolumePerPaymentMethod: data.businessVolumePerPaymentMethod,
          },
        ])
      }
    )
  }, [onBoardingData?.merchantBusinessInformation?.paymentMethodsOffered])

  useEffect(() => {
    axios
      .get(`https://geolocation-db.com/json/`)
      .then((response) => {
        setCurrentContry(response?.data?.country_code?.toLowerCase())
      })
      .catch((error) => {
        console.log(error)
      })
  }, [currentCountry])

  const handleCountryChange = (e) => {
    setCountryID(e.target.value)
    if (e.target.value) {
      dispatch(getStateByCountyID(e.target.value, setStatesData))
      dispatch(getBanksByCountryId(e.target.value, setBankData))
    }
    setCityData([])
    setCityID([])
  }
  const handleState = (e) => {
    setStateID(e.target.value)
    if (e.target.value) {
      dispatch(getCitiesByStateID(e.target.value, setCityData))
    }
  }
  const handleCity = (e) => {
    setCityID(e.target.value)
  }
  useEffect(() => {
    if (onBoardingData?.merchantBusinessInformation?.countryId) {
      dispatch(
        getStateByCountyID(
          onBoardingData?.merchantBusinessInformation?.countryId,
          setStatesData
        )
      )
    }
    if (onBoardingData?.merchantBusinessInformation?.stateId) {
      dispatch(
        getCitiesByStateID(
          onBoardingData?.merchantBusinessInformation?.stateId,
          setCityData
        )
      )
    }
  }, [
    onBoardingData?.merchantBusinessInformation?.countryId,
    onBoardingData?.merchantBusinessInformation?.stateId,
  ])

  const bussinessInformationSchema = Yup.object().shape({
    businessName: Yup.string(),
    cnic: Yup.number().min(13, 'Must be exactly 13 digits'),
    businessEmail: Yup.string().email('invali email'),
    signatoryEmail: Yup.string().email('invali email'),
    supportEmail: Yup.string().email('invali email'),
    zipCode: Yup.string().min(3, 'too short').max(10, 'too long'),
  })
  const addDeliveryService = (val) => {
    setDeliveryServiceList([
      ...deliveryServiceList,
      {
        deliveryService: val.deliveryService,
        purpose: val.purpose,
      },
    ])
  }
  const addDirector = (val) => {
    setDirectorList([
      ...directorList,
      {
        name: val.name,
        designation: val.designation,
        cnic: val.cnic,
      },
    ])
  }

  const handleDeletePayment = (ind) => {
    let newArr = [...paymentMethodList]
    newArr.splice(ind, 1)
    setPaymentMethodList(newArr)
  }
  const handleDeleteDelivery = (ind) => {
    let newArr = [...deliveryServiceList]
    newArr.splice(ind, 1)
    setDeliveryServiceList(newArr)
  }

  const addPayment = (val) => {
    setPaymentMethodList([
      ...paymentMethodList,
      {
        paymentMethod: val.paymentMethod,
        businessVolumePerPaymentMethod: val.businessVolumePerPaymentMethod,
      },
    ])
  }
  const handleAddDirector = () => {
    setOpenDirector(true)
  }
  const handleAddPayment = () => {
    setOpenPaymentMethod(true)
  }
  const handleAddDeliveryService = () => {
    setOpenDeliveryServices(true)
  }
  const handleCloseModal = () => {
    setOpenDirector(false)
    setOpenPaymentMethod(false)
    setOpenDeliveryServices(false)
  }
  const str2bool = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true
      if (value.toLowerCase() === 'false') return false
    }
    return value
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      businessName: onBoardingData?.merchantBusinessInformation?.businessName,
      businessRegisteredName:
        onBoardingData?.merchantBusinessInformation?.businessRegisteredName,
      parentCompany: onBoardingData?.merchantBusinessInformation?.parentCompany,
      ntn: onBoardingData?.merchantBusinessInformation?.ntn,
      strn: onBoardingData?.merchantBusinessInformation?.strn,
      businessAddress:
        onBoardingData?.merchantBusinessInformation?.businessAddress,
      businessType: onBoardingData?.merchantBusinessInformation?.businessType,
      dateOfIncorporation:
        onBoardingData?.merchantBusinessInformation?.dateOfIncorporation,
      businessIndustry:
        onBoardingData?.merchantBusinessInformation?.businessIndustry || [],
      stateId: onBoardingData?.merchantBusinessInformation?.stateId,
      zipCode: onBoardingData?.merchantBusinessInformation?.zipCode || '',
      countryId: onBoardingData?.merchantBusinessInformation?.countryId,
      businessEmail:
        onBoardingData?.merchantBusinessInformation?.businessEmail || '',
      businessPhone: onBoardingData?.merchantBusinessInformation?.businessPhone,
      businessWebsiteURL:
        onBoardingData?.merchantBusinessInformation?.businessWebsiteURL,
      businessVolume:
        onBoardingData?.merchantBusinessInformation?.businessVolume,
      cnic: onBoardingData?.merchantBusinessInformation?.cnic,
      cityId: onBoardingData?.merchantBusinessInformation?.cityId,
      fbAccURL: onBoardingData?.merchantBusinessInformation?.fbAccURL,
      instaAccURL: onBoardingData?.merchantBusinessInformation?.instaAccURL,
      linkedInAccURL:
        onBoardingData?.merchantBusinessInformation?.linkedInAccURL,

      name: '',
      hasPhysicalStore:
        onBoardingData?.merchantBusinessInformation?.hasPhysicalStore?.toString(),
      designation: '',
      paymentMethod: onBoardingData?.merchantBusinessInformation?.paymentMethod,
      numberOfPhysicalOutlets:
        onBoardingData?.merchantBusinessInformation?.numberOfPhysicalOutlets,
      deliveryService:
        onBoardingData?.merchantBusinessInformation?.deliveryService,
      hasInternationalShipping:
        onBoardingData?.merchantBusinessInformation?.hasInternationalShipping?.toString(),
      checkoutType: onBoardingData?.merchantBusinessInformation?.checkoutType,
      platform: onBoardingData?.merchantBusinessInformation?.platform,
      businessVolumePerPaymentMethod:
        onBoardingData?.merchantBusinessInformation
          ?.businessVolumePerPaymentMethod,
    },

    validationSchema: bussinessInformationSchema,
    onSubmit: (values) => {
      var hasPhysicalStore1 = str2bool(values.hasPhysicalStore)
      var hasInternationalShipping1 = str2bool(values.hasInternationalShipping)

      const data = {
        id: onBoardingData?.id,
        merchantId: userDetail.merchantId,
        merchantBusinessInformation: {
          businessName: values.businessName,
          businessRegisteredName: values.businessRegisteredName,
          businessIndustry: values.businessIndustry,
          businessType: values.businessType,
          parentCompany: values.parentCompany,
          dateOfIncorporation: values.dateOfIncorporation,
          ntn: values.ntn,
          strn: values.strn,
          businessAddress: values.businessAddress,
          countryId: countryID,
          stateId: stateID,
          cityId: cityID,
          zipCode: values.zipCode || '',
          businessEmail: values.businessEmail || '',
          businessPhone: bussinessPhoneNum,
          businessWebsiteURL: values.businessWebsiteURL,
          businessVolume: parseFloat(values.businessVolume),
          merchantPartnersDTOList: directorList,
          hasPhysicalStore: hasPhysicalStore1,
          fbAccURL: values.fbAccURL,
          platform: values.platform,
          instaAccURL: values.instaAccURL,
          linkedInAccURL: values.linkedInAccURL,
          paymentMethodsOffered: paymentMethodList,
          numberOfPhysicalOutlets: parseFloat(values.numberOfPhysicalOutlets),
          deliveryServicesUsed: deliveryServiceList,

          hasInternationalShipping: hasInternationalShipping1,
          checkoutType: values.checkoutType,
        },
      }

      setSuccess(false)
      dispatch(addOnBoardingBussinessInfo(data, setSuccess))
      setFormPart('Contact')
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display='flex' alignItems={'center'} flexDirection='column'>
        <Typography fontSize={'24px'} paddingBottom='6px' marginLeft={'12px'}>
          Merchant Onboarding Application
        </Typography>
        <Typography
          width={isSm ? '700px' : '300px'}
          sx={{ paddingBottom: '20px' }}
        >
          Please make sure, all information is correct and updated. You can’t
          edit it later. Only QisstPay can update it on request from merchant.
        </Typography>
        <Box display='flex' alignItems={'center'} flexDirection='column'>
          <Box
            bgcolor={'#fff'}
            width={isSm ? '700px' : '300px'}
            padding={'30px'}
          >
            <Typography fontSize={'18px'}>Business Information</Typography>
            <Typography paddingBottom={'30px'}>
              Explain why are we asking about this information in 1 or 2 lines
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Checkout Type
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='checkoutType'
                    label='Checkout Type'
                    value={formik.values.checkoutType || ''}
                    onChange={formik.handleChange}
                    name='checkoutType'
                    error={
                      formik.touched.checkoutType &&
                      Boolean(formik.errors.checkoutType)
                    }
                    helperText={
                      formik.touched.checkoutType && formik.errors.checkoutType
                    }
                  >
                    <MenuItem value={'QISSTPAY'}> QISSTPAY</MenuItem>
                    <MenuItem value={'4GIVES'}>4GIVES</MenuItem>
                    <MenuItem value={'UNZE'}>UNZE</MenuItem>
                    <MenuItem value={'Financing(B2B)'}>
                      Financing (B2B)
                    </MenuItem>
                    <MenuItem value={'Lending'}> Lending</MenuItem>
                    <MenuItem value={'Headless'}>Headless</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Merchant Platform
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='platform'
                    label='Merchant Platform'
                    value={formik.values.platform || ''}
                    onChange={formik.handleChange}
                    name='platform'
                    error={
                      formik.touched.platform && Boolean(formik.errors.platform)
                    }
                    helperText={
                      formik.touched.platform && formik.errors.platform
                    }
                  >
                    <MenuItem value={'Shopify'}> Shopify</MenuItem>
                    <MenuItem value={'WooCommerce'}>WooCommerce</MenuItem>
                    <MenuItem value={'BigCommerce'}>BigCommerce</MenuItem>
                    <MenuItem value={'Magento'}>Magento</MenuItem>
                    <MenuItem value={' Other'}> Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} pb={'20px'}>
                <TextField
                  fullWidth
                  id='businessName'
                  name='businessName'
                  label='Business Name'
                  variant='outlined'
                  placeholder='Business Name'
                  value={formik.values.businessName || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessName &&
                    Boolean(formik.errors.businessName)
                  }
                  helperText={
                    formik.touched.businessName && formik.errors.businessName
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} pb={'20px'}>
                <TextField
                  fullWidth
                  id='businessRegisteredName'
                  name='businessRegisteredName'
                  label='Business Registered Name'
                  value={formik.values.businessRegisteredName || ''}
                  variant='outlined'
                  placeholder='Business Registered Name '
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessRegisteredName &&
                    Boolean(formik.errors.businessRegisteredName)
                  }
                  helperText={
                    formik.touched.businessRegisteredName &&
                    formik.errors.businessRegisteredName
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Business Type
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='businessType'
                    label='Business Type'
                    value={formik.values.businessType || ''}
                    onChange={formik.handleChange}
                    name='businessType'
                    error={
                      formik.touched.businessType &&
                      Boolean(formik.errors.businessType)
                    }
                    helperText={
                      formik.touched.businessType && formik.errors.businessType
                    }
                  >
                    <MenuItem value={'soleProprietor'}>
                      {' '}
                      Sole Proprietor - Only One
                    </MenuItem>
                    <MenuItem value={'partenerships'}>
                      Partnership - From 2 to maximum up to 20 partner
                    </MenuItem>
                    <MenuItem value={'notForProfit'}>
                      Not For Profit Company NPO - Minimum three members Limited
                    </MenuItem>
                    <MenuItem value={'liabilityCompany'}>
                      {' '}
                      Liability Company (Private Limited and Public Limited)
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} pb={'20px'}>
                {/* <TextField
                  id='dateOfIncorporation'
                  label='Date of Incorporation'
                  type='date'
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='dateOfIncorporation'
                  value={formik.values.dateOfIncorporation || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dateOfIncorporation &&
                    Boolean(formik.errors.dateOfIncorporation)
                  }
                  helperText={
                    formik.touched.dateOfIncorporation &&
                    formik.errors.dateOfIncorporation
                  }
                  placeholder='2017-05-24'
                /> */}
                <TextField
                  id='dateOfIncorporation'
                  label='Date of Incorporation'
                  type='date'
                  // defaultValue="2017-05-24"
                  fullWidth
                  value={formik.values.dateOfIncorporation || ''}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id='parentCompany'
                  name='parentCompany'
                  label='Parent Company'
                  value={formik.values.parentCompany || ''}
                  variant='outlined'
                  placeholder='Parent Company'
                  onChange={formik.handleChange}
                  error={
                    formik.touched.parentCompany &&
                    Boolean(formik.errors.parentCompany)
                  }
                  helperText={
                    formik.touched.parentCompany && formik.errors.parentCompany
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Business Industry
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='businessIndustry'
                    label='Business Industry'
                    value={formik.values.businessIndustry || []}
                    onChange={formik.handleChange}
                    name='businessIndustry'
                    multiple
                    error={
                      formik.touched.businessIndustry &&
                      Boolean(formik.errors.businessIndustry)
                    }
                    helperText={
                      formik.touched.businessIndustry &&
                      formik.errors.businessIndustry
                    }
                  >
                    <MenuItem value={'women'}> Women</MenuItem>
                    <MenuItem value={'men'}>Men</MenuItem>
                    <MenuItem value={'electronics'}>Electronics</MenuItem>
                    <MenuItem value={'beauty'}>Beauty</MenuItem>
                    <MenuItem value={'home'}>Home</MenuItem>
                    <MenuItem value={'kids'}>Kids</MenuItem>
                    <MenuItem value={'services'}>Services</MenuItem>
                    <MenuItem value={'travel'}>Travel</MenuItem>
                    <MenuItem value={'pets'}>pets</MenuItem>
                    <MenuItem value={'games'}>games</MenuItem>
                    <MenuItem value={'stationary'}>stationary</MenuItem>
                    <MenuItem value={'education'}>education</MenuItem>
                    <MenuItem value={'automotive'}>automotive</MenuItem>
                    <MenuItem value={'health&Fitness'}>
                      {' '}
                      health & Fitness
                    </MenuItem>
                    <MenuItem value={'food'}>food</MenuItem>
                    <MenuItem value={'sports&Outdoors'}>
                      sports & Outdoors
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  color={'#E72E80'}
                  className='modalText'
                  onClick={handleAddPayment}
                >
                  Add another payment method
                </Typography>
              </Grid>
              {/* <Grid item xs={12} md={12}>
                   {onBoardingData?.merchantBusinessInformation?.paymentMethodsOffered?.map((data, index) => {
                      return (
                        <>
                          <Typography>
                 Payment method
                </Typography>
                <Box display='flex'>
                <Typography style={{marginRight:'14px', marginTop:'15px'}} >
                 {index+1})
                </Typography>
                <Box  display='flex' alignItems={'center'}>
                  <Box>
                   <TextField
                  fullWidth
                  id='paymentMethod'
                  name='paymentMethod'
                  label='Payment Methods '
                  variant='outlined'
                  placeholder='payment methods '
                  value={ data?.paymentMethod}
                 disabled
                  error={
                    formik.touched.paymentMethod &&
                    Boolean(formik.errors.paymentMethod)
                  }
                  helperText={
                    formik.touched.paymentMethod &&
                    formik.errors.paymentMethod
                  }
                  style={{marginTop:'15px'}}
               
                />  
                 <TextField
                  fullWidth
                  id='businessVolumePerPaymentMethod'
                  name='businessVolumePerPaymentMethod'
                  label='Business Volume Per payment method'
                  variant='outlined'
                  placeholder='Business VolumePer PaymentMethod'
                  value={ data?.businessVolumePerPaymentMethod}
                 disabled
                  error={
                    formik.touched.businessVolumePerPaymentMethod &&
                    Boolean(formik.errors.businessVolumePerPaymentMethod)
                  }
                  helperText={
                    formik.touched.businessVolumePerPaymentMethod &&
                    formik.errors.businessVolumePerPaymentMethod
                  }
                  style={{marginTop:'15px'}}
                />
                </Box>
            <IconButton>
            <DeleteIcon sx={{ cursor: 'pointer' }} />
            </IconButton>
                 
                    
                </Box>
                </Box>
                        </>
                      )
                    })}
            </Grid> */}
              <Grid item xs={12} md={12}>
                {paymentMethodList?.map((item, index) => {
                  return (
                    <>
                      <Box display='flex' justitfyContent='center'>
                        <Typography
                          style={{ marginRight: '14px', marginTop: '15px' }}
                        >
                          {index + 1})
                        </Typography>
                        <Box display='flex' alignItems={'center'}>
                          <Box>
                            <TextField
                              fullWidth
                              id='paymentMethod'
                              name='paymentMethod'
                              label='Payment Methods '
                              variant='outlined'
                              placeholder='payment methods '
                              value={item?.paymentMethod}
                              disabled
                              error={
                                formik.touched.paymentMethod &&
                                Boolean(formik.errors.paymentMethod)
                              }
                              helperText={
                                formik.touched.paymentMethod &&
                                formik.errors.paymentMethod
                              }
                              style={{ marginTop: '15px' }}
                            />
                            <TextField
                              fullWidth
                              id='businessVolumePerPaymentMethod'
                              name='businessVolumePerPaymentMethod'
                              label='Business Volume Per payment method'
                              variant='outlined'
                              placeholder='Business VolumePer PaymentMethod'
                              value={item?.businessVolumePerPaymentMethod}
                              disabled
                              error={
                                formik.touched.businessVolumePerPaymentMethod &&
                                Boolean(
                                  formik.errors.businessVolumePerPaymentMethod
                                )
                              }
                              helperText={
                                formik.touched.businessVolumePerPaymentMethod &&
                                formik.errors.businessVolumePerPaymentMethod
                              }
                              style={{ marginTop: '15px' }}
                            />
                          </Box>

                          <DeleteIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleDeletePayment(index)}
                          />
                        </Box>
                      </Box>
                    </>
                  )
                })}
              </Grid>
              {openPaymentMethod && (
                <AddPaymentModal
                  open={openPaymentMethod}
                  handleCls={handleCloseModal}
                  addPayment={addPayment}
                />
              )}
              <Grid item xs={12} md={12}>
                <Typography
                  color={'#E72E80'}
                  className='modalText'
                  onClick={handleAddDeliveryService}
                >
                  Add another delivery services
                </Typography>
              </Grid>
              {/* {onBoardingData?.merchantBusinessInformation?.deliveryServicesUsed?.map((data, index) => {
            return (<>
             <Grid item xs={12} md={12}>
              <Typography>Delivery Services</Typography>
              <Box display='flex'>
              <Typography style={{marginRight:'14px', marginTop:'15px'}} >
                 {index+1})
                </Typography>
<Box>
                <TextField
                  fullWidth
                  id='deliveryService'
                  name='deliveryService'
                  label='Delivery Services '
                  variant='outlined'
                  placeholder='Delivery Services '
                  value={data.deliveryService || ''}
                disabled
                  error={
                    formik.touched.deliveryService &&
                    Boolean(formik.errors.deliveryService)
                  }
                  helperText={
                    formik.touched.deliveryService &&
                    formik.errors.deliveryService
                  }
                  style={{marginTop:'20px'}}
                />
                 <TextField
                  fullWidth
                  id='purpose'
                  name='purpose'
                  label='Purpose of each service'
                  variant='outlined'
                  placeholder='Purpose of each service'
                  value={data.purpose || ''}
             disabled
                  error={
                    formik.touched.purpose &&
                    Boolean(formik.errors.purpose)
                  }
                  helperText={
                    formik.touched.purpose &&
                    formik.errors.purpose
                  }
                  style={{marginTop:'20px'}}
                />
                </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
               
              </Grid>
              </>)
              })} */}
              {deliveryServiceList?.map((data, index) => {
                return (
                  <>
                    <Grid item xs={12} md={12}>
                      <Box display='flex'>
                        <Typography
                          style={{ marginRight: '14px', marginTop: '15px' }}
                        >
                          {index + 1})
                        </Typography>
                        <Box display='flex' alignItems={'center'}>
                          <Box>
                            <TextField
                              fullWidth
                              id='deliveryService'
                              name='deliveryService'
                              label='Delivery Services '
                              variant='outlined'
                              placeholder='Delivery Services '
                              value={data?.deliveryService || ''}
                              disabled
                              error={
                                formik.touched.deliveryService &&
                                Boolean(formik.errors.deliveryService)
                              }
                              helperText={
                                formik.touched.deliveryService &&
                                formik.errors.deliveryService
                              }
                              style={{ marginTop: '15px' }}
                            />

                            <TextField
                              fullWidth
                              id='purpose'
                              name='purpose'
                              label='Purpose of each service'
                              variant='outlined'
                              placeholder='Purpose of each service'
                              value={data?.purpose || ''}
                              disabled
                              error={
                                formik.touched.purpose &&
                                Boolean(formik.errors.purpose)
                              }
                              helperText={
                                formik.touched.purpose && formik.errors.purpose
                              }
                              style={{ marginTop: '15px' }}
                            />
                          </Box>

                          <DeleteIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteDelivery(index)}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </>
                )
              })}
              {openDeliveryServices && (
                <AddDeliveryServiceModal
                  open={openDeliveryServices}
                  handleCls={handleCloseModal}
                  addDeliveryService={addDeliveryService}
                />
              )}
              <Grid item xs={12} md={12}>
                Do you have International shipping?
              </Grid>
              <Grid item xs={12} md={12}>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='hasInternationalShipping'
                  value={formik.values.hasInternationalShipping || ''}
                  checked={formik.values.hasInternationalShipping}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.hasInternationalShipping &&
                    Boolean(formik.errors.hasInternationalShipping)
                  }
                >
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: '#E71583',
                          },
                        }}
                      />
                    }
                    label='No '
                  />
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: '#E71583',
                          },
                        }}
                      />
                    }
                    label='Yes'
                  />
                </RadioGroup>
              </Grid>
              <Grid item md={12} marginTop={'12px'}>
                <Typography>
                  How many directors are in your business?
                </Typography>
              </Grid>
              {directorList?.map((item) => {
                return (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id='name'
                        name='name'
                        label='Director Name'
                        variant='outlined'
                        value={item?.name || ''}
                        placeholder='Director Name'
                        disabled
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id='designation'
                        name='designation'
                        label='designation'
                        variant='outlined'
                        placeholder='designation'
                        value={item?.designation || ''}
                        disabled
                        error={
                          formik.touched.designation &&
                          Boolean(formik.errors.designation)
                        }
                        helperText={
                          formik.touched.designation &&
                          formik.errors.designation
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        id='cnic'
                        name='cnic'
                        label='CNIC'
                        variant='outlined'
                        placeholder='CNIC'
                        value={item?.cnic || ''}
                        disabled
                        error={
                          formik.touched.cnic && Boolean(formik.errors.cnic)
                        }
                        helperText={formik.touched.cnic && formik.errors.cnic}
                      />
                    </Grid>
                  </>
                )
              })}
              <Grid item md={4}></Grid>
              <Grid item md={5}></Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  color={'#E72E80'}
                  className='modalText'
                  onClick={handleAddDirector}
                >
                  Add another director
                </Typography>
              </Grid>
              {openDirector && (
                <AddDirectorModal
                  handleCls={handleCloseModal}
                  open={openDirector}
                  addDirector={addDirector}
                />
              )}
              {onBoardingData?.merchantBusinessInformation?.merchantPartnersDTOList?.map(
                (item) => {
                  return (
                    <>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          id='name'
                          name='name'
                          label='Director Name'
                          variant='outlined'
                          value={item?.name || ''}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          id='cnic'
                          name='cnic'
                          label='CNIC'
                          variant='outlined'
                          value={item?.cnic || ''}
                          disabled
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          fullWidth
                          id='designation'
                          name='designation'
                          label='Designation'
                          variant='outlined'
                          value={item?.designation || ''}
                          disabled
                        />
                      </Grid>
                    </>
                  )
                }
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id='ntn'
                  name='ntn'
                  label='NTN #'
                  variant='outlined'
                  placeholder='NTN'
                  value={formik.values.ntn || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.ntn && Boolean(formik.errors.ntn)}
                  helperText={formik.touched.ntn && formik.errors.ntn}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id='strn'
                  name='strn'
                  label='STRN #'
                  variant='outlined'
                  placeholder='STRN'
                  value={formik.values.strn || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.strn && Boolean(formik.errors.strn)}
                  helperText={formik.touched.strn && formik.errors.strn}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  id='businessAddress'
                  name='businessAddress'
                  label='Business Address'
                  variant='outlined'
                  placeholder='Business Address'
                  value={formik.values.businessAddress || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessAddress &&
                    Boolean(formik.errors.businessAddress)
                  }
                  helperText={
                    formik.touched.businessAddress &&
                    formik.errors.businessAddress
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Country</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='countryId'
                    label='Country'
                    value={countryID || ''}
                    onChange={handleCountryChange}
                    name='countryId'
                    error={
                      formik.touched?.countryId &&
                      Boolean(formik.errors?.countryId)
                    }
                    helperText={
                      formik.touched?.countryId && formik.errors?.countryId
                    }
                  >
                    {getCountry?.map((country) => {
                      return (
                        <MenuItem
                          value={country?.countryId}
                          key={country?.countryId}
                        >
                          {country?.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>State</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='stateId'
                    label='State'
                    value={stateID || ''}
                    onChange={handleState}
                    name='stateId'
                    error={
                      formik.touched.stateId && Boolean(formik.errors.stateId)
                    }
                    helperText={formik.touched.stateId && formik.errors.stateId}
                    disabled={!stateData}
                  >
                    {stateData?.map((state) => {
                      return (
                        <MenuItem value={state?.stateId} key={state?.stateId}>
                          {state?.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>City</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='cityId'
                    label='City'
                    value={cityID || ''}
                    onChange={handleCity}
                    name='cityId'
                    error={
                      formik.touched.cityId && Boolean(formik.errors.cityId)
                    }
                    helperText={formik.touched.cityId && formik.errors.cityId}
                    disabled={!cityData}
                  >
                    {cityData?.map((city) => {
                      return (
                        <MenuItem value={city?.id} key={city?.id}>
                          {city?.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>{' '}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id='zipCode'
                  name='zipCode'
                  label='Zip Code'
                  variant='outlined'
                  placeholder='zipCode'
                  value={formik.values.zipCode || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.zipCode && Boolean(formik.errors.zipCode)
                  }
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id='businessEmail'
                  name='businessEmail'
                  label='Business Email'
                  variant='outlined'
                  placeholder='Business Email'
                  value={formik.values.businessEmail || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessEmail &&
                    Boolean(formik.errors.businessEmail)
                  }
                  helperText={
                    formik.touched.businessEmail && formik.errors.businessEmail
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} paddingLeft='26px'>
                <PhoneInput
                  country={currentCountry ? currentCountry : 'pk'}
                  value={formik.values.businessPhone || ''}
                  label='Business Phone'
                  name='businessPhone'
                  id='businessPhone'
                  placeholder='Bussiness Phone'
                  onChange={(e) => setBussinessPhoneNum(e)}
                  inputStyle={{ height: '52px' }}
                  error={
                    formik.touched.businessPhone &&
                    Boolean(formik.errors.businessPhone)
                  }
                  helperText={
                    formik.touched.businessPhone && formik.errors.businessPhone
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id='businessWebsiteURL'
                  name='businessWebsiteURL'
                  label='Business Website URL'
                  variant='outlined'
                  placeholder='business Website URL'
                  value={formik.values.businessWebsiteURL || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessWebsiteURL &&
                    Boolean(formik.errors.businessWebsiteURL)
                  }
                  helperText={
                    formik.touched.businessWebsiteURL &&
                    formik.errors.businessWebsiteURL
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id='businessVolume'
                  name='businessVolume'
                  label='Business Volume / month'
                  variant='outlined'
                  placeholder='Business Volume'
                  value={formik.values.businessVolume || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessVolume &&
                    Boolean(formik.errors.businessVolume)
                  }
                  helperText={
                    formik.touched.businessVolume &&
                    formik.errors.businessVolume
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                Do you have any physical stores?
              </Grid>
              <Grid item xs={12} md={12}>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='hasPhysicalStore'
                  value={formik.values.hasPhysicalStore || ''}
                  checked={formik.values.hasPhysicalStore}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.hasPhysicalStore &&
                    Boolean(formik.errors.hasPhysicalStore)
                  }
                >
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: '#E71583',
                          },
                        }}
                      />
                    }
                    label='No '
                  />
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        sx={{
                          '&.Mui-checked': {
                            color: '#E71583',
                          },
                        }}
                      />
                    }
                    label='Yes'
                  />
                </RadioGroup>
              </Grid>
              {formik.values.hasPhysicalStore === 'true' ? (
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    id='numberOfPhysicalOutlets'
                    name='numberOfPhysicalOutlets'
                    label='Number of physical outlets'
                    variant='outlined'
                    placeholder='Number of physical outlets'
                    value={formik.values.numberOfPhysicalOutlets || ''}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.numberOfPhysicalOutlets &&
                      Boolean(formik.errors.numberOfPhysicalOutlets)
                    }
                    helperText={
                      formik.touched.numberOfPhysicalOutlets &&
                      formik.errors.numberOfPhysicalOutlets
                    }
                  />
                </Grid>
              ) : (
                ''
              )}
              <Grid item md={12}>
                Social Media Accounts URL
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id='fbAccURL'
                  name='fbAccURL'
                  label='Facebook'
                  variant='outlined'
                  placeholder='Facebook'
                  value={formik.values.fbAccURL || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fbAccURL && Boolean(formik.errors.fbAccURL)
                  }
                  helperText={formik.touched.fbAccURL && formik.errors.fbAccURL}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id='instaAccURL'
                  name='instaAccURL'
                  label='Instagram'
                  variant='outlined'
                  placeholder='Instagram'
                  value={formik.values.instaAccURL || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.instaAccURL &&
                    Boolean(formik.errors.instaAccURL)
                  }
                  helperText={
                    formik.touched.instaAccURL && formik.errors.instaAccURL
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id='linkedInAccURL'
                  name='linkedInAccURL'
                  label='Linkedin'
                  variant='outlined'
                  placeholder='Linkedin'
                  value={formik.values.linkedInAccURL || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.linkedInAccURL &&
                    Boolean(formik.errors.linkedInAccURL)
                  }
                  helperText={
                    formik.touched.linkedInAccURL &&
                    formik.errors.linkedInAccURL
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            display='flex'
            justifyContent={'flex-end'}
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
                padding: '10px',
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
                padding: '10px',
              }}
              type='submit'
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
    </form>
  )
}

export default BussinessInformationForm

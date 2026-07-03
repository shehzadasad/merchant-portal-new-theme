import {
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import axios from 'axios'
import { useMediaQuery } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addOnBoardingContactInfo,
  getOnBoardingDetails,
  getBanksByCountryId,
  addOnBoardingBankInfo,
} from 'redux/actions/OnBoardingAction'
import { AppLoader } from '@crema'
import { toast } from 'react-toastify'
import PhoneInput from 'react-phone-input-2'
const ContactInformationFrom = ({ setFormPart }) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const userDetail = useSelector((state) => state.users.userDetail)
  const [onBoardingData, setOnBoardingData] = useState([])
  const [bankData, setBankData] = useState([])
  const [signatoryPhoneNum, setSignatoryPhoneNum] = useState('')
  const [supportPhoneNum, setSupportPhoneNum] = useState('')
  const [currentCountry, setCurrentContry] = useState('')
  const dispatch = useDispatch()

  const [success, setSuccess] = useState(null)
  useEffect(() => {
    dispatch(getOnBoardingDetails(userDetail?.merchantId, setOnBoardingData))
    setSignatoryPhoneNum(
      onBoardingData?.merchantContactInformation?.signatoryPhone
    )
    setSupportPhoneNum(onBoardingData?.merchantContactInformation?.supportPhone)
    if (onBoardingData?.merchantBusinessInformation?.countryId) {
      dispatch(
        getBanksByCountryId(
          onBoardingData?.merchantBusinessInformation?.countryId,
          setBankData
        )
      )
    }
  }, [userDetail, onBoardingData?.merchantBusinessInformation?.countryId])
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
  const contactInformationSchema = Yup.object().shape({
    signatoryEmail: Yup.string().email('invali email'),
    supportEmail: Yup.string().email('invali email'),
    iban: Yup.string()
      .min(25, 'Must be exactly 25 digits')
      .max(25, 'Must be exactly 25 digits'),
    // supportPhone: Yup.string()
    //   .required()
    //   .matches(/^[0-9]+$/, 'Must be only digits')
    //   .min(11, 'Must be exactly 11 digits')
    //   .max(11, 'Must be exactly 11 digits'),
  })
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      authorizedSignatoryName:
        onBoardingData?.merchantContactInformation?.authorizedSignatoryName,
      signatoryEmail:
        onBoardingData?.merchantContactInformation?.signatoryEmail || '',
      signatoryPhone:
        onBoardingData?.merchantContactInformation?.signatoryPhone,
      signatoryDoB: onBoardingData?.merchantContactInformation?.signatoryDoB,
      supportPhone: onBoardingData?.merchantContactInformation?.supportPhone,
      supportEmail:
        onBoardingData?.merchantContactInformation?.supportEmail || '',
      supportName:
        onBoardingData?.merchantContactInformation?.supportName || '',
      signatoryGender:
        onBoardingData?.merchantContactInformation?.signatoryGender,
      iban: onBoardingData?.merchantBankInformation?.iban,
      accTitle: onBoardingData?.merchantBankInformation?.accTitle,
      bankId: onBoardingData?.merchantBankInformation?.bankId,
      bankBranch: onBoardingData?.merchantBankInformation?.bankBranch,
    },
    validationSchema: contactInformationSchema,

    onSubmit: (values) => {
      const data = {
        id: onBoardingData?.id,
        merchantId: userDetail.merchantId,

        merchantContactInformation: {
          authorizedSignatoryName: values.authorizedSignatoryName,
          signatoryEmail: values.signatoryEmail,
          signatoryPhone: signatoryPhoneNum,
          signatoryGender: values.signatoryGender,
          signatoryDoB: values.signatoryDoB,
          supportName: values.supportName,
          supportEmail: values.supportEmail,
          supportPhone: supportPhoneNum,
        },
      }

      setSuccess(false)
      dispatch(addOnBoardingContactInfo(data, setSuccess))

      const bankdataObj = {
        id: onBoardingData?.id,
        merchantId: userDetail?.merchantId,
        merchantBusinessInformation: null,
        merchantContactInformation: null,
        merchantBankInformation: {
          iban: values.iban,
          accTitle: values.accTitle,
          bankId: values.bankId,
          bankBranch: values.bankBranch,
        },
      }

      if (values.bankId) {
        dispatch(addOnBoardingBankInfo(bankdataObj, setSuccess))
      } else {
        toast.warning('Bank name is required to update banking info')
      }
      setFormPart('CertificateUpload')
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display='flex' alignItems={'center'} flexDirection='column'>
        <Typography fontSize={'24px'} paddingBottom='6px' marginLeft={'12px'}>
          Merchant Onboarding Application
        </Typography>
        <Typography width={isSm ? '700px' : '300px'}>
          Please make sure, all information is correct and updated. You can’t
          edit it later. Only QisstPay can update it on request from merchant.
        </Typography>
        <Box
          display='flex'
          alignItems={'center'}
          flexDirection='column'
          marginTop={'30px'}
        >
          <Box
            bgcolor={'#fff'}
            width={isSm ? '700px' : '300px'}
            padding={'30px'}
          >
            <Typography fontSize={'18px'}>Contact Information</Typography>
            <Typography marginBottom={'25px'}>
              Explain why are we asking about this information in 1 or 2 lines
            </Typography>

            <Grid container spacing={4}>
              <Grid item md={12} pb={'20px'}>
                <TextField
                  fullWidth
                  id='authorizedSignatoryName'
                  name='authorizedSignatoryName'
                  label='Authorized Signatory Name'
                  variant='outlined'
                  placeholder='Authorized Signatory Name'
                  value={formik.values.authorizedSignatoryName || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.authorizedSignatoryName &&
                    Boolean(formik.errors.authorizedSignatoryName)
                  }
                  helperText={
                    formik.touched.authorizedSignatoryName &&
                    formik.errors.authorizedSignatoryName
                  }
                />
              </Grid>
              <Grid item md={6} pb={'20px'}>
                <TextField
                  fullWidth
                  id='signatoryEmail'
                  name='signatoryEmail'
                  label='Signatory Email'
                  value={formik.values.signatoryEmail || ''}
                  variant='outlined'
                  placeholder='Signatory Email'
                  onChange={formik.handleChange}
                  error={
                    formik.touched.signatoryEmail &&
                    Boolean(formik.errors.signatoryEmail)
                  }
                  helperText={
                    formik.touched.signatoryEmail &&
                    formik.errors.signatoryEmail
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                pb={'20px'}
                style={{ paddingLeft: '26px' }}
              >
                <PhoneInput
                  country={currentCountry}
                  value={formik.values.signatoryPhone || ''}
                  label='Signatory Phone'
                  name='signatoryPhone'
                  placeholder='Signatory Phone'
                  onChange={(e) => setSignatoryPhoneNum(e)}
                  inputStyle={{ height: '52px' }}
                  error={
                    formik.touched.signatoryPhone &&
                    Boolean(formik.errors.signatoryPhone)
                  }
                  helperText={
                    formik.touched.signatoryPhone &&
                    formik.errors.signatoryPhone
                  }
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id='signatoryDoB'
                  label='Signatory DOB'
                  type='date'
                  // defaultValue='2017-05-24'
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name='signatoryDoB'
                  value={formik.values.signatoryDoB || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.signatoryDoB &&
                    Boolean(formik.errors.signatoryDoB)
                  }
                  helperText={
                    formik.touched.signatoryDoB && formik.errors.signatoryDoB
                  }
                  placeholder='2017-05-24'
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Signatory Gender
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='signatoryGender'
                    label='Signatory Gender'
                    value={formik.values.signatoryGender || ''}
                    onChange={formik.handleChange}
                    name='signatoryGender'
                    error={
                      formik.touched.signatoryGender &&
                      Boolean(formik.errors.signatoryGender)
                    }
                    helperText={
                      formik.touched.signatoryGender &&
                      formik.errors.signatoryGender
                    }
                  >
                    <MenuItem value={'Female'}>Female</MenuItem>
                    <MenuItem value={'Male'}>Male</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <TextField
                  fullWidth
                  id='supportName'
                  name='supportName'
                  label='Support Point of Contact'
                  variant='outlined'
                  placeholder='Support Point of Contact'
                  value={formik.values.supportName || ''}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.supportName &&
                    Boolean(formik.errors.supportName)
                  }
                  helperText={
                    formik.touched.supportName && formik.errors.supportName
                  }
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  fullWidth
                  id='supportEmail'
                  name='supportEmail'
                  label='Support Email'
                  variant='outlined'
                  value={formik.values.supportEmail || ''}
                  placeholder='Support Email'
                  onChange={formik.handleChange}
                  error={
                    formik.touched.supportEmail &&
                    Boolean(formik.errors.supportEmail)
                  }
                  helperText={
                    formik.touched.supportEmail && formik.errors.supportEmail
                  }
                />
              </Grid>

              <Grid item md={6} style={{ paddingLeft: '26px' }}>
                <PhoneInput
                  country={currentCountry}
                  value={formik.values.supportPhone || ''}
                  label='Support Phone'
                  name='supportPhone'
                  placeholder='Support Phone'
                  onChange={(e) => setSupportPhoneNum(e)}
                  inputStyle={{ height: '52px' }}
                  error={
                    formik.touched.supportPhone &&
                    Boolean(formik.errors.supportPhone)
                  }
                  helperText={
                    formik.touched.supportPhone && formik.errors.supportPhone
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            display='flex'
            alignItems={'center'}
            flexDirection='column'
            marginTop={'30px'}
          >
            <Box
              bgcolor={'#fff'}
              width={isSm ? '700px' : '300px'}
              padding={'30px'}
            >
              <Typography fontSize={'18px'}>Bank Information</Typography>
              <Typography marginBottom={'25px'}>
                We will send you payouts to below bank account.
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={12} pb={'20px'}>
                  <TextField
                    fullWidth
                    id='iban'
                    name='iban'
                    label='IBAN#'
                    variant='outlined'
                    placeholder='IBAN#'
                    value={formik.values.iban || ''}
                    onChange={formik.handleChange}
                    error={formik.touched.iban && Boolean(formik.errors.iban)}
                    helperText={formik.touched.iban && formik.errors.iban}
                  />
                </Grid>
                <Grid item md={12} pb={'20px'}>
                  <TextField
                    fullWidth
                    id='accTitle'
                    name='accTitle'
                    label='Account Title'
                    value={formik.values.accTitle || ''}
                    variant='outlined'
                    placeholder='account title'
                    onChange={formik.handleChange}
                    error={
                      formik.touched.accTitle && Boolean(formik.errors.accTitle)
                    }
                    helperText={
                      formik.touched.accTitle && formik.errors.accTitle
                    }
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Bank Name
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='bankId'
                      label='Bank Name'
                      value={formik.values.bankId || ''}
                      onChange={formik.handleChange}
                      name='bankId'
                      error={
                        formik.touched.bankId && Boolean(formik.errors.bankId)
                      }
                      helperText={formik.touched.bankId && formik.errors.bankId}
                    >
                      {bankData?.map((bank) => {
                        return (
                          <MenuItem value={bank?.id} key={bank?.id}>
                            {bank?.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <TextField
                    fullWidth
                    id='bankBranch'
                    name='bankBranch'
                    label='Branch'
                    variant='outlined'
                    placeholder='Branch'
                    onChange={formik.handleChange}
                    value={formik.values.bankBranch || ''}
                    error={
                      formik.touched.bankBranch &&
                      Boolean(formik.errors.bankBranch)
                    }
                    helperText={
                      formik.touched.bankBranch && formik.errors.bankBranch
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent={'space-between'}
            width={isSm ? '700px' : '300px'}
          >
            <Box>
              <Button
                variant='outlined'
                style={{
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
                  setFormPart('BussinessInformation')
                }}
              >
                Back
              </Button>
            </Box>
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
                type='submit'
              >
                {success === false ? <AppLoader /> : 'Save & Continue'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  )
}

export default ContactInformationFrom

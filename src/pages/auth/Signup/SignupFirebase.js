import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import AppTextField from '../../../@crema/core/AppFormComponents/AppTextField'
import IntlMessages from '../../../@crema/utility/IntlMessages'
import { useAuthMethod } from '../../../@crema/utility/AuthHooks'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AppInfoView from '../../../@crema/core/AppInfoView'
import { Fonts } from '../../../shared/constants/AppEnums'
import { Link } from 'react-router-dom'
import { AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { userSignUp, lenderSignUp } from 'redux/reducers/Users'
import { pink } from '@mui/material/colors'
import IntlTelInput from 'react-intl-tel-input'
import { toast } from 'react-toastify'

const validationSchema = yup.object({
  name: yup.string(),
  email: yup.string(),
  password: yup.string(),
})

const SignupFirebase = ({ role }) => {
  const { createUserWithEmailAndPassword, signInWithPopup } = useAuthMethod()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
  const [number, setIntlNumber] = useState('')
  const [countryCode, setCountryCode] = useState('092')

  const dispatch = useDispatch()

  const validateCred = () => {
    // const regex =
    //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    // if (!email || regex.test(email) === false) {
    //   toast.error('Invalid Email')
    //   return false
    // } else {
    // }
  }
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {}}
        >
          {({ isSubmitting }) => (
            <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
              <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                <AppTextField
                  label={<IntlMessages id='common.name' />}
                  name='name'
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                <AppTextField
                  label={<IntlMessages id='common.email' />}
                  name='email'
                  variant='outlined'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                <IntlTelInput
                  type='number'
                  containerClassName='intl-tel-input'
                  inputClassName='MuiOutlinedInput-input MuiInputBase-input css-1rpt010-MuiInputBase-input-MuiOutlinedInput-input intl-tel-input-field'
                  fieldId='outlined-basic'
                  id='outlined-basic'
                  name='phone'
                  defaultValue={phoneNumber}
                  placeholder='Phone Number'
                  required='required'
                  format={true}
                  style={{
                    color: 'black',
                  }}
                  sx={{
                    width: '100%',
                    color: 'black',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                      color: 'black',
                    },
                  }}
                  defaultCountry={countryCode}
                  preferredCountries={['pk', 'us']}
                  value={phoneNumber ?? '+92 1234567'}
                  formatOnInit={true}
                  onSelectFlag={() => {
                    setIntlNumber('')
                  }}
                  onPhoneNumberChange={(
                    isValid,
                    value,
                    intlNumber,
                    fullNumber
                  ) => {
                    setIsPhoneNumberValid(isValid)
                    setIntlNumber(fullNumber.replace(' ', '').replace(' ', ''))
                    setPhoneNumber(value)
                  }}
                  onPhoneNumberBlur={(isValid) => {
                    setIsPhoneNumberValid(isValid)
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    sx={{
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                      paddingLeft: 0,
                    }}
                  />
                  <Box
                    component='span'
                    sx={{
                      mr: 2,
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.iAgreeTo' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    cursor: 'pointer',
                  }}
                >
                  {/* <IntlMessages id='common.termConditions' /> */}
                  <a
                    target='_blank'
                    style={{ color: '#0a8fdc' }}
                    href='https://qisstpay.com/pk/terms-and-conditions'
                  >
                    Terms & Conditions
                  </a>
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    width: '100%',
                    height: '40px ',
                    backgroundColor: '#ED2079 ',
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '8px 16px 8px',
                    marginTop: '20px',
                  }}
                  type='submit'
                  onClick={() => {
                    if (name.length < 1) {
                      toast.error('Name required')
                      return
                    }
                    const regex =
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    if (!email || regex.test(email) === false) {
                      toast.error('Invalid Email')
                      return false
                    } else {
                      console.log('')
                    }
                    // if (phoneNumber.length < 1) {
                    //   toast.error('Phone number required')
                    //   return
                    // }
                    if (phoneNumber.length == 12 || phoneNumber.length == 10) {
                    } else if (phoneNumber.length < 11) {
                      toast.error('Please correct your phone number')
                    } else if (
                      phoneNumber.length == 11 ||
                      phoneNumber.length > 10
                    ) {
                      toast.error('Please correct your phone number')
                    } else if (phoneNumber.length > 12) {
                      toast.error('Please correct your phone number')
                    }

                    if (isPhoneNumberValid === false) {
                      // toast.error('Invalid Phone Number')
                      return
                    }
                    if (role === 'lender') {
                      dispatch(
                        lenderSignUp({
                          name: name,
                          email: email,
                          phoneNumber: number,
                        })
                      )
                    } else
                      dispatch(
                        userSignUp({
                          name: name,
                          email: email,
                          phoneNumber: number,
                        })
                      )
                  }}
                >
                  <IntlMessages id='common.signup' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
          mb: { xs: 5, md: 7 },
        }}
      >
        <span style={{ marginRight: 4 }}>
          <IntlMessages id='common.alreadyHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          {role === 'lenders' ? (
            <Link to='/signin-lender'>
              <IntlMessages id='common.signIn' />
            </Link>
          ) : (
            <Link to='/signIn'>
              <IntlMessages id='common.signIn' />
            </Link>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: (theme) => theme.palette.background.default,
          mx: { xs: -5, lg: -10 },
          mb: { xs: -6, lg: -11 },
          mt: 'auto',
          py: 2,
          px: { xs: 5, lg: 10 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ p: 2, '& svg': { fontSize: 18 } }}
            onClick={() => signInWithPopup('google')}
          >
            <AiOutlineGoogle />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
            }}
            onClick={() => signInWithPopup('facebook')}
          >
            <FaFacebookF />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
            }}
            onClick={() => signInWithPopup('github')}
          >
            <BsGithub />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
            }}
            onClick={() => signInWithPopup('twitter')}
          >
            <AiOutlineTwitter />
          </IconButton>
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  )
}

export default SignupFirebase

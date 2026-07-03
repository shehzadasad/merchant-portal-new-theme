import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
// import { Oval } from 'react-loader-spinner'
import { LineWave, ThreeDots } from 'react-loader-spinner'

import AppInfoView from '@crema/core/AppInfoView'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import IntlMessages from '@crema/utility/IntlMessages'
import { useIntl } from 'react-intl'
import AppTextField from '@crema/core/AppFormComponents/AppTextField'
import { useAuthMethod } from '@crema/utility/AuthHooks'
import { Fonts } from '../../../shared/constants/AppEnums'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserDetail,
  userLogin,
  fetchMerchantStates,
} from 'redux/reducers/Users'
import { pink } from '@mui/material/colors'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { truncate } from 'lodash'
import { createNonNullExpression } from 'typescript'

const validationSchema = yup.object({
  email: '',
  password: '',
})

const SigninJwtAuth = ({ role }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const userDetail = useSelector((state) => state.users.userDetail)
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [merchantStates, setMerchantStates] = useState(null)
  const navigate = useNavigate()
  const { signInUser } = useAuthMethod()
  const onGoToForgetPassword = () => {
    navigate('/forget-password', { tab: 'jwtAuth' })
  }

  const { messages } = useIntl()

  function changeBackground(e) {
    e.target.style.background = '#ED2079'
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  function handleLogin() {
    setIsLoading(true)
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      toast.error('Invalid Email')
      setIsLoading(false)
      return false
    }
    if (!password) {
      toast.error('Password Required')
      setIsLoading(false)
      return false
    } else {
    }
    dispatch(
      userLogin({
        email: email,
        password: password,
        merchantId: localStorage.getItem('M-Id'),
        setIsLoading,
      })
    )
  }
  useEffect(() => {
    if (isLoggedIn === true) {
      toast.success('You are now logged in')
      dispatch(fetchUserDetail())
      dispatch(
        fetchMerchantStates(localStorage.getItem('M-Id'), setMerchantStates)
      )
    }
  }, [isLoggedIn])

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: email,
            password: password,
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true)
            signInUser({
              email: email,
              password: password,
            })
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
              <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                <AppTextField
                  placeholder={messages['common.email']}
                  name='email'
                  label={<IntlMessages id='common.email' />}
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
              <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                <FormControl sx={{ width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    placeholder={messages['common.password']}
                    id='outlined-adornment-password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
              </Box>

              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    color='primary'
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
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.rememberMe' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'right',
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id='common.forgetPassword' />
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  // disabled={isSubmitting}
                  disabled={isLoading}
                  sx={{
                    width: '100%',
                    height: '40px ',
                    backgroundColor: '#ED2079',
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '8px 16px 8px',
                    marginTop: '50px',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                  }}
                >
                  {isLoading === false ? (
                    <IntlMessages id='common.login' />
                  ) : (
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
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
        }}
      >
        <span style={{ marginRight: 4 }}>
          {role !== 'lender' && <IntlMessages id='common.dontHaveAccount' />}
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
          {role === 'lender' ? (
            <Link to='/signup-lender'>
              {/* <IntlMessages id='common.signup' /> */}
            </Link>
          ) : (
            <Link to='/signup'>
              <IntlMessages id='common.signup' />
            </Link>
          )}
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  )
}

export default SigninJwtAuth

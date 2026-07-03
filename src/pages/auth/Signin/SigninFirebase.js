import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { ThemeProvider } from '@mui/material/styles'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin } from 'redux/reducers/Users'
import * as yup from 'yup'
import AppTextField from '../../../@crema/core/AppFormComponents/AppTextField'
import AppInfoView from '../../../@crema/core/AppInfoView'
import { useAuthMethod } from '../../../@crema/utility/AuthHooks'
import IntlMessages from '../../../@crema/utility/IntlMessages'
import { Fonts } from '../../../shared/constants/AppEnums'

const SigninFirebase = () => {
  const [values, setValues] = React.useState({
    amount: '',
    email: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(<IntlMessages id='validation.emailFormat' />)
      .required(<IntlMessages id='validation.emailRequired' />),
    password: yup
      .string()
      .required(<IntlMessages id='validation.passwordRequired' />),
  })
  const { signInWithEmailAndPassword, signInWithPopup } = useAuthMethod()
  const navigate = useNavigate()

  const onGoToForgetPassword = () => {
    navigate('/forget-password', { tab: 'firebase' })
  }

  const { messages } = useIntl()
  function changeBackground(e) {
    e.target.style.background = '#ED2079'
  }

  return (
    <ThemeProvider>
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

              dispatch(
                userLogin({
                  email: email,
                  password: password,
                })
              )
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
                    sx={{
                      width: '320px',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <FormControl sx={{ width: '320px' }} variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      placeholder={messages['common.password']}
                      id='outlined-adornment-password'
                      type={values.showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
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
                      color='secondary'
                      sx={{ ml: -3 }}
                      onClick={changeBackground}
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
                      fontWeight: Fonts.MEDIUM,
                      cursor: 'pointer',
                      display: 'block',
                      textAlign: 'right',
                      color: '#ED2079 ',
                      marginTop: '-30px',
                      marginRight: '76px',
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
                    disabled={isSubmitting}
                    onClick={() => {
                      dispatch(
                        userLogin({
                          email: email,
                          password: password,
                        })
                      )
                    }}
                    sx={{
                      width: '320px ',
                      height: '40px ',
                      backgroundColor: '#ED2079 ',
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: 'capitalize',
                      padding: '8px 16px 8px',
                      marginTop: '50px',
                    }}
                    onMouseOver={changeBackground}
                  >
                    <IntlMessages id='common.login' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
        <AppInfoView />
      </Box>
    </ThemeProvider>
  )
}

export default SigninFirebase

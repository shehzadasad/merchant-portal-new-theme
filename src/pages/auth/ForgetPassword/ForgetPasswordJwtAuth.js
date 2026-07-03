import AppTextField from '@crema/core/AppFormComponents/AppTextField'
import AppInfoView from '@crema/core/AppInfoView'
import IntlMessages from '@crema/utility/IntlMessages'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { createTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from 'redux/reducers/Users'
import * as yup from 'yup'
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo'
import { Fonts } from '../../../shared/constants/AppEnums'
import AuthWrapper from '../AuthWrapper'
import { toast } from 'react-toastify'

const outerTheme = createTheme({
  palette: {
    primary: { main: '#ED2079' },
    secondary: { main: '#ED2079' },
  },
})

const validationSchema = yup.object({
  email: yup.string(),
})

const ForgetPasswordJwtAuth = () => {
  const { messages } = useIntl()
  const [email, setEmail] = useState('')

  function changeBackground(e) {
    e.target.style.background = '#ED2079'
  }

  const dispatch = useDispatch()
  const forgotPasswordHelper = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      toast.error('Invalid Email')
      return false
    } else {
      console.log('')
    }
    dispatch(forgotPassword(email))
  }

  return (
    <AuthWrapper>
      <Box sx={{ width: '100%', justifyContent: 'center' }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppLogo />
          </Box>
          <Typography
            variant='h2'
            component='h2'
            sx={{
              mb: 1.5,
              color: (theme) => theme.palette.text.primary,
              fontWeight: 500,
              fontSize: { xs: 14, xl: 16 },

              lineHeight: '24px',
            }}
          >
            Forgot Password? Don't worry we are <br></br> here to help you.
            Please enter your <br></br> registered email address
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting, resetForm }) => {}}
            >
              {({ isSubmitting }) => (
                <Form style={{ textAlign: 'left', width: '350px' }}>
                  <Box sx={{ mb: { xs: 5, lg: 8 } }}>
                    <AppTextField
                      placeholder='Email'
                      name='email'
                      label={<IntlMessages id='common.emailAddress' />}
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          fontSize: 14,
                        },
                      }}
                      variant='outlined'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>

                  <div>
                    <Button
                      // style={{ backgroundColor: 'aqua' }}
                      variant='contained'
                      color='primary'
                      // disabled={isSubmitting}
                      sx={{
                        marginBottom: '20px',
                        fontWeight: Fonts.REGULAR,
                        textTransform: 'capitalize',
                        fontSize: 16,
                        height: '40px',
                        width: '100% ',
                        backgroundColor: '#ED2079 ',
                        padding: '8px 16px 8px',
                        marginTop: '20px',
                        marginBottom: '20px',
                      }}
                      onMouseOver={changeBackground}
                      type='submit'
                      onClick={forgotPasswordHelper}
                    >
                      <IntlMessages id='common.sendNewPassword' />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>

          <AppInfoView />
        </Box>

        <Typography
          style={{ paddingBottom: '25px', paddingTop: '20px' }}
          sx={{
            pt: 3,
            fontSize: 15,
            color: 'grey.500',
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id='common.alreadyHavePassword' />
          </span>
          <Box
            component='span'
            sx={{
              fontWeight: Fonts.MEDIUM,
              '& a': {
                color: '#ED2079',

                textDecoration: 'none',
              },
            }}
          >
            <Link to='/signin'>
              <IntlMessages id='common.signIn' />
            </Link>
          </Box>
        </Typography>
      </Box>
    </AuthWrapper>
  )
}

export default ForgetPasswordJwtAuth

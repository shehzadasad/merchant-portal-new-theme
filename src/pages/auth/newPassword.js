import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import AppTextField from '../../@crema/core/AppFormComponents/AppTextField'
import AppInfoView from '../../@crema/core/AppInfoView'
import AppLogo from '../../@crema/core/AppLayout/components/AppLogo'
import IntlMessages from '../../@crema/utility/IntlMessages'
import Check from '../../assets/icon/check.svg'
import Close from '../../assets/icon/close.svg'
import { Fonts } from '../../shared/constants/AppEnums'
import AuthWrapper from './AuthWrapper'

import Checkbox from '@mui/material/Checkbox'
import { pink } from '@mui/material/colors'
import { fetchUserDetail, resetPassword } from 'redux/reducers/Users'
import { Password } from '@mui/icons-material'
import { Card } from '@mui/material'
const validationSchema = yup.object({
  NewPassword: yup.string(),

  confirmPassword: yup.string(),
})

const NewPassword = () => {
  const dispatch = useDispatch()

  const [pin, setPin] = useState('')

  const [errcharacterlimit, seterrcharacterlimit] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [NewPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errspecialchar, seterrspecialchar] = useState(false)
  const [errnumeric, seterrnumeric] = useState(false)
  const [erruppercase, seterruppercase] = useState(false)
  const [showError, setshowError] = useState(false)
  const userDetail = useSelector((state) => state.users.userDetail)

  const routeChange = () => {
    // navigate('/confirm-signup')
  }

  const resetPasswordHelper = () => {
    if (userDetail) {
      const data = {
        currentPassword: currentPassword,
        NewPassword: NewPassword,
        byUserId: userDetail.id,
        byLoginId: userDetail.email,
      }
      dispatch(resetPassword(data))
    }
  }

  const fetchUserDetailHelper = useMemo(() => {
    dispatch(fetchUserDetail())
  }, [])

  const handleOnChangeCurrentPassword = (event) => {
    setCurrentPassword(event.target.value)
  }

  const handleOnChangeNewPassword = (event) => {
    const password = event.target.value
    const cond3 = '(?=.*[0-9])'
    const cond2 = '(?=.*[A-Z])'
    const cond1 = '(?=.*[!@#$%^&*])(?=.{8,})'
    setNewPassword(event.target.value)

    if (event.target.value.length > 7) {
      seterrcharacterlimit(true)
    } else {
      seterrcharacterlimit(false)
    }

    if (password.match(cond3)) {
      seterrnumeric(true)
    } else {
      seterrnumeric(false)
    }

    if (password.match(cond2)) {
      seterruppercase(true)
    } else {
      seterruppercase(false)
    }
    if (password.match(cond1)) {
      seterrspecialchar(true)
    } else {
      seterrspecialchar(false)
    }
  }

  const handleOnChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AppLogo />
      <br />
      <br />
      <Card
        sx={{
          maxWidth: window.innerWidth < 700 ? '90vw' : '900px',
          minHeight: { xs: 320, sm: 450 },
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            padding: { xs: 5, lg: 10 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#FFF',
            color: (theme) => theme.palette.common.white,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                mb: 5,
                display: 'flex',
                alignItems: 'center',
              }}
            ></Box>
            <Typography
              variant='h2'
              component='h2'
              sx={{
                mb: 1.5,
                color: (theme) => theme.palette.text.primary,
                fontWeight: Fonts.SEMI_BOLD,
                fontSize: { xs: 14, xl: 16 },
                textAlign: 'center',
              }}
            >
              <IntlMessages id='common.resetPassword' />
            </Typography>

            <Formik
              validateOnChange={true}
              initialValues={{
                oldPassword: '',
                NewPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setErrors, resetForm, setSubmitting }) => {
                if (NewPassword !== confirmPassword) {
                  setErrors({
                    confirmPassword: (
                      <IntlMessages id='validation.passwordMisMatch' />
                    ),
                  })
                } else {
                  setSubmitting(true)
                  //   resetPasswordHelper()
                  resetForm()
                  setSubmitting(false)
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form noValidate autoComplete='off'>
                  <Box
                    sx={{
                      mb: 6,
                      fontSize: { xs: 16, sm: 18 },
                    }}
                  >
                    <Typography>
                      <IntlMessages id='common.verificationMessage' />
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mb: { xs: 4, lg: 6 },
                    }}
                  >
                    <AppTextField
                      value={NewPassword}
                      name='NewPassword'
                      onFocus={(e) => setshowError(true)}
                      onChange={handleOnChangeNewPassword}
                      label={'Password'}
                      sx={{
                        width: '320px',
                      }}
                      variant='outlined'
                      type='password'
                    />
                  </Box>
                  {showError && (
                    <Box style={{ paddingBottom: '24px' }}>
                      <Box>
                        {errcharacterlimit ? (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Check} />
                            <p style={{ color: '#6B7280' }}>
                              <IntlMessages id='common.8character' />
                            </p>
                          </div>
                        ) : (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Close} />
                            <p style={{ color: 'red' }}>
                              <IntlMessages id='common.8character' />
                            </p>
                          </div>
                        )}
                      </Box>

                      <Box>
                        {errspecialchar ? (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Check} />
                            <p style={{ color: '#6B7280' }}>
                              <IntlMessages id='common.specailcharacter' />
                            </p>
                          </div>
                        ) : (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Close} />
                            <p style={{ color: 'red' }}>
                              <IntlMessages id='common.specailcharacter' />
                            </p>
                          </div>
                        )}
                      </Box>

                      <Box>
                        {errnumeric ? (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Check} />

                            <p style={{ color: '#6B7280' }}>
                              <IntlMessages id='common.numeric' />
                            </p>
                          </div>
                        ) : (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Close} />
                            <p style={{ color: 'red' }}>
                              <IntlMessages id='common.numeric' />
                            </p>
                          </div>
                        )}
                      </Box>

                      <Box>
                        {erruppercase ? (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Check} />
                            <p style={{ color: '#6B7280' }}>
                              <IntlMessages id='common.uppercase' />
                            </p>
                          </div>
                        ) : (
                          <div style={{ display: 'flex' }}>
                            <img style={{ marginRight: '5px' }} src={Close} />
                            <p style={{ color: 'red' }}>
                              <IntlMessages id='common.uppercase' />
                            </p>
                          </div>
                        )}
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{
                      mb: { xs: 4, lg: 6 },
                    }}
                  >
                    <AppTextField
                      value={confirmPassword}
                      onChange={handleOnChangeConfirmPassword}
                      name='confirmPassword'
                      label={'Confirm Password'}
                      sx={{
                        width: '320px',
                      }}
                      variant='outlined'
                      type='password'
                    />
                  </Box>

                  <Button
                    variant='contained'
                    disabled={isSubmitting}
                    color='primary'
                    type='submit'
                    onClick={routeChange}
                    sx={{
                      fontWeight: Fonts.REGULAR,
                      textTransform: 'capitalize',
                      fontSize: 16,
                      minWidth: 320,
                      height: '40px',
                      marginTop: '20px',
                      backgroundColor: '#ED2079',
                    }}
                  >
                    <IntlMessages id='common.setpassword' />
                  </Button>
                </Form>
              )}
            </Formik>
            <AppInfoView />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default NewPassword

NewPassword.propTypes = {
  location: PropTypes.object,
}

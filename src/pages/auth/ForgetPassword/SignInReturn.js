import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchError } from '../../../redux/actions'
import { useIntl } from 'react-intl'
import { Fonts } from '../../../shared/constants/AppEnums'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IntlMessages from '../../../@crema/utility/IntlMessages'
import Button from '@mui/material/Button'
import AppInfoView from '../../../@crema/core/AppInfoView'
import { useAuthMethod } from '../../../@crema/utility/AuthHooks'
import ReactCodeInput from 'react-code-input'
import AuthWrapper from '../AuthWrapper'
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo'

const ConfirmSignupAwsCognito = (props) => {
  const { confirmCognitoUserSignup } = useAuthMethod()

  const navigate = useNavigate()

  const onGoToSignin = () => {
    navigate('/signin')
  }

  return (
    <AuthWrapper>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            marginTop: '-190px',
          }}
        >
          <AppLogo />
        </Box>
        <Typography
          variant='h2'
          component='h2'
          sx={{
            mb: 1.5,
            marginLeft: '9px',

            color: (theme) => theme.palette.text.primary,
            fontSize: { xs: 14, xl: 16 },
          }}
        >
          Email send kindly check your email <br></br> at <b>test@test.com </b>
        </Typography>

        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            cursor: 'pointer',
            display: 'block',
            textAlign: 'right',
            color: '#ED2079 ',
            marginTop: '40px',
            marginRight: '200px',
          }}
          onClick={onGoToSignin}
        >
          Back to Sign in
        </Box>
        <AppInfoView />
      </Box>
    </AuthWrapper>
  )
}

export default ConfirmSignupAwsCognito

ConfirmSignupAwsCognito.propTypes = {
  location: PropTypes.object,
}

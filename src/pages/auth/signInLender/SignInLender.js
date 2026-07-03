import { setAuthToken } from '@crema/services/auth/jwt-auth'
import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchUserDetail } from 'redux/reducers/Users'
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo'
import AuthWrapper from '../AuthWrapper'
import SigninJwtAuth from '../Signin/SigninJwtAuth'

const SigninLender = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (window.location.search) {
      localStorage.clear()
      const accessToken = window.location.search.split('&')[0].split('=')[1]
      const userId = window.location.search.split('&')[1].split('=')[1]

      localStorage.setItem('token', accessToken)
      localStorage.setItem('userId', userId)
      dispatch(fetchUserDetail())

      toast.success('Successfully logged in')
      setAuthToken(accessToken)
      window.location.href = '/dashboard'
    }
  }, [])

  return (
    <AuthWrapper welcomeText='QisstPay!' role='lenders'>
      <Box sx={{ width: '100%' }}>
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
        </Box>
        <SigninJwtAuth role='lender' />
      </Box>
    </AuthWrapper>
  )
}

export default SigninLender

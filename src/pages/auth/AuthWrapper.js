import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { Fonts } from '../../shared/constants/AppEnums'

const AuthWrapper = ({ children, welcomeText, role }) => {
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
      <Card
        sx={{
          maxWidth: window.innerWidth < 700 ? '90vw' : '900px',
          minHeight: { xs: 320, sm: 450 },

          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: { md: 500, xs: 380 },
            padding: { xs: 5, lg: 10 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#FFF',
            color: (theme) => theme.palette.common.white,
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            width: '440px ',
            paddingTop: '150px ',
            paddingLeft: '50px',
            display: { xs: 'none', sm: 'flex' },
            alignItems: { sm: 'center' },
            flexDirection: { sm: 'column' },
            backgroundColor: '#ED2079',
            color: (theme) => theme.palette.common.white,
            fontSize: 14,
            fontFamily: 'Poppins',
          }}
        >
          <Box
            sx={{
              maxWidth: 320,
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 30,
                mb: 4,
              }}
            >
              Welcome to <br></br> {welcomeText}
            </Typography>

            <Typography>
              {role === 'lenders'
                ? 'One place for lenders to view loan disbursements, collections and much more!'
                : ' One place for merchants to view insights, manage orders, configure checkout and much more.'}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default AuthWrapper

AuthWrapper.propTypes = {
  children: PropTypes.node,
}

import React from 'react'
import { AppSuspense } from '../../index'
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from '../../../pages'
import AppFooter from '../AppLayout/components/AppFooter'
import AppErrorBoundary from '../AppErrorBoundary'
import useRouter from '../../utility/RouteGenerator'
import { useAuthUser } from '../../utility/AuthHooks'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Navigate, Route, Routes } from 'react-router-dom'
import { initialUrl } from '../../../shared/constants/AppConst'

const AppContentView = ({ sxStyle }) => {
  const { user, isAuthenticated } = useAuthUser()
  return (
    <Box className='app-content-view'>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          p: { xs: 5, md: 7.5, xl: 12.5 },
          ...sxStyle,
        }}
        className='app-content'
      >
        <AppSuspense>
          <AppErrorBoundary>
            {useRouter({
              isAuthenticated: isAuthenticated,
              userRole: user?.role,
              unAuthorizedStructure,
              authorizedStructure,
              anonymousStructure,
            })}
            <Routes>
              <Route path='/' element={<Navigate to={initialUrl} />} />
            </Routes>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </Box>
  )
}

export default AppContentView

AppContentView.propTypes = {
  sxStyle: PropTypes.object,
}

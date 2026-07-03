import AppBadge from '@crema/core/AppBadge'
import AppNavLink from '@crema/core/AppNavLink'
import { useAuthMethod } from '@crema/utility/AuthHooks'
import { Icon, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import { isJwtExpired } from 'jwt-check-expiration'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { fetchUserDetail } from 'redux/reducers/Users'
import IntlMessages from '../../../../../utility/IntlMessages'
import VerticalNavItem from './VerticalNavItem'
import { fetchMerchantStates } from 'redux/reducers/Users'
import lock from 'assets/img/lock.svg'
const VerticalItem = ({ level, item }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)

  const [envmerchantId, setEnvmerchanatId] = useState('')
  const { logout } = useAuthMethod()

  const navigate = useNavigate()

  const [isSelectedItem, setIsSelectedItem] = useState()

  useEffect(() => {
    if (process.env.REACT_APP_API_URL === 'https://stage.apis.qisstpay.com/') {
      setEnvmerchanatId(1117)
    } else {
      setEnvmerchanatId(1974)
    }
  }, [envmerchantId])
  useEffect(() => {
    if (
      window.location.pathname.includes(
        item.title.toLowerCase().replace(' ', '')
      ) === true ||
      (item.title === 'onBoarding' &&
        (window.location.pathname === '/setup-payment-method' ||
          window.location.pathname === '/go-live')) ||
      (item.title === 'sites' && window.location.pathname === '/site') ||
      (item.title === 'My QP Malls' &&
        window.location.pathname === '/my-qp-malls') ||
      (item.title === 'Link Builder' &&
        window.location.pathname === '/link-builder') ||
      (item.title === 'Recommendation Engine' &&
        window.location.pathname === '/recommendation') ||
      (item.title === 'Abandoned Cart' &&
        window.location.pathname === '/abandoned-cart')
    ) {
      dispatch(fetchUserDetail())
      setIsSelectedItem(true)
      return
    } else {
      setIsSelectedItem(false)
      return
    }
  }, [location])

  return (
    <VerticalNavItem
      level={level}
      button
      component={
        userDetail.merchantId > envmerchantId
          ? localStorage.getItem('merchantstatesOnboarding') === 'true'
            ? AppNavLink
            : ''
          : AppNavLink
      }
      to={
        userDetail.merchantId > envmerchantId
          ? localStorage.getItem('merchantstatesOnboarding') === 'true'
            ? item.url
            : ''
          : item.url
      }
      activeClassName={
        userDetail.merchantId > envmerchantId
          ? localStorage.getItem('merchantstatesOnboarding') === 'true'
            ? 'current'
            : ''
          : 'current'
      }
      exact={item.exact}
    >
      {item.icon && (
        <Box component='span'>
          <Icon
            sx={{
              fontSize: 18,
              display: 'block',
              mr: 4,
            }}
            className={clsx('nav-item-icon', 'material-icons-outlined')}
            color='action'
          >
            {isSelectedItem === true ? item.selectedIcon : item.icon}
          </Icon>
        </Box>
      )}
      <ListItemText
        className='nav-item-content'
        primary={<IntlMessages id={item.messageId} />}
        classes={{ primary: 'nav-item-text' }}
      />

      {item.messageId !== 'sidebar.sample.onBoarding' &&
      userDetail.merchantId > envmerchantId &&
      localStorage.getItem('merchantstatesOnboarding') === 'false' ? (
        <img src={lock} alt='lock' />
      ) : (
        ''
      )}

      {item.count && (
        <Box sx={{ mr: 3.5 }} className='menu-badge'>
          <AppBadge count={item.count} color={item.color} />
        </Box>
      )}
    </VerticalNavItem>
  )
}

VerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    permittedRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    exact: PropTypes.bool,
    messageId: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    url: PropTypes.string,
    color: PropTypes.string,
  }),
  level: PropTypes.number,
}

VerticalItem.defaultProps = {}

export default React.memo(VerticalItem)

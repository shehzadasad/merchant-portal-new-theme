import { useAuthMethod, useAuthUser } from '@crema/utility/AuthHooks'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import orange from '@mui/material/colors/orange'
import Hidden from '@mui/material/Hidden'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchUserDetail, logoutViaAPI } from 'redux/reducers/Users'
import { toggleNavCollapsed } from '../../../../../redux/actions'
import { Fonts } from '../../../../../shared/constants/AppEnums'
import AppTooltip from '../../../AppTooltip'

const AppHeader = ({ color }) => {
  const { logout } = useAuthMethod()
  const dispatch = useDispatch()

  const { user } = useAuthUser()
  const userDetail = useSelector((state) => state.users.userDetail)
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorElNew, setAnchorElNew] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickNew = (event) => {
    setAnchorElNew(event.currentTarget)
  }

  const handleCloseNew = () => {
    setAnchorElNew(null)
  }

  const getUserAvatar = () => {
    if (userDetail.name) {
      return userDetail.name.charAt(0).toUpperCase()
    }
    if (userDetail.email) {
      return userDetail.email.charAt(0).toUpperCase()
    }
  }

  useEffect(() => {
    dispatch(fetchUserDetail())
  }, [])

  const logoutUser = () => {
    logout()
    dispatch(logoutViaAPI())
    return navigate('/signin')
  }

  return (
    <AppBar
      position='relative'
      color='inherit'
      sx={{
        boxShadow: 'none',
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        backgroundColor: 'background.paper',
        width: {
          xs: '100%',
        },
      }}
      className='app-bar'
    >
      <Toolbar
        sx={{
          boxSizing: 'border-box',
          minHeight: { xs: 56, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <Hidden lgUp>
          <IconButton
            sx={{ color: 'text.secondary' }}
            edge='start'
            className='menu-btn'
            color='inherit'
            aria-label='open drawer'
            onClick={() => dispatch(toggleNavCollapsed())}
            size='large'
          >
            <MenuIcon
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </IconButton>
        </Hidden>
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        {/* <AppLngSwitcher iconOnly={true} tooltipPosition='bottom' /> */}

        <Box sx={{ ml: 4 }}>
          <Hidden smDown>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginLeft: -2,
                marginRight: -2,
              }}
            >
              <Box>
                <Box
                  onClick={handleClickNew}
                  sx={{
                    py: 3,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  className='user-info-view'
                >
                  <Box sx={{ py: 0.5 }}>
                    {user.photoURL ? (
                      <Avatar
                        sx={{
                          height: 40,
                          width: 40,
                          fontSize: 24,
                          backgroundColor: orange[500],
                        }}
                        src={user.photoURL}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          height: 40,
                          width: 40,
                          fontSize: 24,
                          backgroundColor: '#6B7280',
                        }}
                      >
                        {getUserAvatar()}
                      </Avatar>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xs: 'calc(100% - 62px)',
                        xl: 'calc(100% - 72px)',
                      },
                      ml: 4,
                      color: color,
                    }}
                    className='user-info'
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        sx={{
                          mb: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: 16,
                          fontWeight: Fonts.MEDIUM,
                          color: 'inherit',
                          minWidth: 70,
                        }}
                        component='span'
                      >
                        {userDetail.name ? userDetail.name : 'Admin User '}
                      </Box>
                      <Box
                        sx={{
                          ml: 3,
                          color: 'inherit',
                          display: 'flex',
                        }}
                      >
                        <ExpandMoreIcon />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mt: -0.5,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'inherit',
                      }}
                    >
                      Super Admin
                    </Box>
                  </Box>
                </Box>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorElNew}
                  keepMounted
                  open={Boolean(anchorElNew)}
                  onClose={handleCloseNew}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose()
                      navigate('/settings')
                    }}
                  >
                    My account
                  </MenuItem>
                  <MenuItem onClick={logoutUser}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Hidden>

          <Hidden smUp>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginLeft: -2,
                marginRight: -2,
              }}
            >
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <AppTooltip title='More'>
                  <IconButton
                    sx={{
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      color: (theme) => theme.palette.text.secondary,
                      backgroundColor: (theme) =>
                        theme.palette.background.default,
                      border: 1,
                      borderColor: 'transparent',
                      '&:hover, &:focus': {
                        color: (theme) => theme.palette.text.primary,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.background.default, 0.9),
                        borderColor: (theme) =>
                          alpha(theme.palette.text.secondary, 0.25),
                      },
                    }}
                    onClick={handleClick}
                    size='large'
                  >
                    <MoreVertIcon />
                  </IconButton>
                </AppTooltip>
              </Box>
            </Box>
          </Hidden>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Box
                onClick={handleClickNew}
                sx={{
                  py: 3,
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                className='user-info-view'
              >
                <Box sx={{ py: 0.5 }}>
                  {user.photoURL ? (
                    <Avatar
                      sx={{
                        height: 40,
                        width: 40,
                        fontSize: 24,
                        backgroundColor: orange[500],
                      }}
                      src={user.photoURL}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        height: 40,
                        width: 40,
                        fontSize: 24,
                        backgroundColor: orange[500],
                      }}
                    >
                      {getUserAvatar()}
                    </Avatar>
                  )}
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: 'calc(100% - 62px)',
                      xl: 'calc(100% - 72px)',
                    },
                    ml: 4,
                    color: '#6B7280',
                  }}
                  className='user-info'
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        mb: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: 16,
                        fontWeight: Fonts.MEDIUM,
                        color: 'inherit',
                        minWidth: 70,
                      }}
                      component='span'
                    >
                      {userDetail.name ? userDetail.name : 'Admin User '}
                    </Box>
                    <Box
                      sx={{
                        ml: 3,
                        color: 'inherit',
                        display: 'flex',
                      }}
                    >
                      <ExpandMoreIcon />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: -0.5,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: 'inherit',
                    }}
                  >
                    Super Admin
                  </Box>
                </Box>
              </Box>
              <Menu
                id='simple-menu'
                anchorEl={anchorElNew}
                keepMounted
                open={Boolean(anchorElNew)}
                onClose={handleCloseNew}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose()
                    navigate('/settings')
                  }}
                >
                  My account
                </MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader

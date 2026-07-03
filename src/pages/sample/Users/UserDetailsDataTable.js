import { Grid, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserDetail,
  getUsersList,
  setUserDetail,
} from 'redux/reducers/Users'

const UserDetailsDataTable = ({ data }) => {
  const [userRoles, setUserRoles] = useState()
  const [persistedData, setPersistedData] = useState([])

  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(10)
  const [isFirst, setIsFirst] = useState(true)
  const users = useSelector((state) => state.users.users)
  const pageData = useSelector((state) => state.users.pageData)
  const userDetail = useSelector((state) => state.users.userDetail)

  const getUsersListAPI = (userDetail) => {
    if (userDetail) {
      if (userDetail.merchantId) {
        if (currentPage) {
          dispatch(
            getUsersList(userDetail.merchantId, parseInt(currentPage) - 1)
          )
        }
      }
    }
  }

  const fetchUserDetailHelper = () => {
    dispatch(fetchUserDetail())
  }

  useEffect(() => {
    fetchUserDetailHelper()
  }, [])

  useEffect(() => {
    getUsersListAPI(userDetail)
  }, [userDetail])

  useEffect(() => {
    if (pageData) {
      setCurrentPage(pageData.currentPage ? pageData.currentPage + 1 : 1)
      setIsFirst(pageData.first ?? true)
      setTotalPages(pageData.totalPages ?? 1)
    }
  }, [pageData])

  useEffect(() => {
    if (users) {
      if (data && data.id) {
        const tempUserData = users.filter((user) => user.id === data.id)

        setPersistedData(tempUserData[0])
      } else if (localStorage.getItem('userDetailsData')) {
        const userDetail = JSON.parse(localStorage.getItem('userDetailsData'))

        const tempUserData = users.filter((user) => user.id === userDetail.id)

        setPersistedData(tempUserData[0])
      }
    }
  }, [users])

  useEffect(() => {
    if (userDetail) {
      if (userDetail.merchantId) {
        if (currentPage) {
          localStorage.removeItem('userDetailsData')
          dispatch(
            getUsersList(userDetail.merchantId, parseInt(currentPage) - 1)
          )
        }
      }
    }
  }, [currentPage])

  const processRoles = (roles) => {
    const tempArray = []

    roles.map((role) => {
      tempArray.push(role.name)
    })

    setUserRoles(tempArray)
  }

  useEffect(() => {
    if (data && data.roles) {
      localStorage.setItem('userDetailsData', JSON.stringify(data))
      processRoles(data.roles)
    } else {
      if (localStorage.getItem('userDetailsData')) {
        setPersistedData(JSON.parse(localStorage.getItem('userDetailsData')))
      }
    }
  }, [data])

  useEffect(() => {
    if (persistedData && persistedData.roles) {
      if (persistedData.roles.length > 0) {
        if (typeof persistedData.roles[0] === 'object') {
          processRoles(persistedData.roles)
        } else {
          setUserRoles(persistedData.roles)
        }
      }
    }
  }, [persistedData])

  if (data) {
    return (
      <TableContainer
        component={Paper}
        style={{ marginTop: 38, borderRadius: 10 }}
      >
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Name
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.name ?? 'Salman Ali'}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Email
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.email ?? 'email@email.com'}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Phone Number
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.phoneNumber ?? '123456'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 5, borderBottomWidth: 1 }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Role
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {userRoles && userRoles.join(' , ')}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
    )
  } else if (persistedData) {
    return (
      <TableContainer
        component={Paper}
        style={{ marginTop: 38, borderRadius: 10 }}
      >
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Name
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {persistedData.name ?? 'Salman Ali'}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Email
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {persistedData.email ?? 'email@email.com'}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Phone Number
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {persistedData.phoneNumber ?? '123456'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 5, borderBottomWidth: 1 }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Role
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {userRoles && userRoles.join(' , ')}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
    )
  } else {
    return (
      <Typography variant='p' component='p'>
        Loading...
      </Typography>
    )
  }
}

UserDetailsDataTable.propTypes = {
  data: PropTypes.object,
}

export default UserDetailsDataTable

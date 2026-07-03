import { Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './CustomUsersCSS.css'
import DeleteUserModel from './DeleteUserModel'
import EditUserModel from './EditUserModel'
import UserDetailsDataTable from './UserDetailsDataTable'
import { getUsersList } from 'redux/reducers/Users'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const UserDetails = () => {
  const { id } = useParams()
  document.title = 'User Details | QisstPay - Merchants'
  const users = useSelector((state) => state.users.users)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [userDetails, setUserDetails] = useState({})

  const dispatch = useDispatch()

  const getUsersListAPI = () => {
    dispatch(getUsersList())
  }

  const getCurrentUserData = () => {
    const tempArray = users.filter((user) => user.id == id)
    if (Array.isArray(tempArray)) {
      if (tempArray[0] !== {}) {
        if (tempArray[0]) {
          if (Array.isArray(tempArray[0].roles)) {
            tempArray[0].roles.map((role) => {
              if (role.name === 'Super Admin') {
                setIsSuperAdmin(true)
              }
            })
          }
        }
      }
    }

    setUserDetails(tempArray[0])
  }

  useEffect(() => {
    getUsersListAPI()
  }, [])

  useEffect(() => {
    getCurrentUserData()
  }, [])

  return (
    <>
      <Grid container style={{ marginBottom: '12px' }}>
        <Grid>
          <Link to='/users'>
            <ArrowBack />
          </Link>
        </Grid>
        <Typography variant='h2' component='h3' marginLeft={3}>
          User Details
        </Typography>
      </Grid>
      <UserDetailsDataTable data={userDetails} />
      <Grid container style={{ marginTop: 58 }} xs={12}>
        {isSuperAdmin === false ? (
          <Grid item xs={6} md={2} lg={2}>
            <DeleteUserModel userId={id} />
          </Grid>
        ) : (
          ''
        )}
        <Grid item xs={6} md={2} lg={2}>
          <EditUserModel data={userDetails} />
        </Grid>
      </Grid>
    </>
  )
}

export default UserDetails

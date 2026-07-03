import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { convertToCSV, filterUsers, getUsersList } from 'redux/reducers/Users'
import SharedButton from 'shared/components/SharedButton'
import SharedSearchBox from 'shared/components/SharedSearchBox'
import AddUserModel from './AddUserModel'
import './CustomUsersCSS.css'

const UsersTopRow = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const usersCount = useSelector((state) => state.users.users.length)
  const userDetail = useSelector((state) => state.users.userDetail)
  const [searchText, setSearchText] = useState('')

  const getUsersListAPI = () => {
    dispatch(getUsersList())
  }

  useEffect(() => {
    getUsersListAPI()
  }, [])

  const handleCSVExport = () => {
    const tempUsers = []
    users.map((user) => {
      const temp = user.roles.map((role) => {
        return role.name
      })

      const userObject = {
        id: user.id,
        name: user.name,
        phone: user.phoneNumber,
        roles: temp.join(' , '),
      }

      tempUsers.push(userObject)
    })

    dispatch(convertToCSV(tempUsers))
  }

  useEffect(() => {
    if (searchText !== '') {
      const data = {
        search: searchText,
      }
      dispatch(filterUsers(data, userDetail.merchantId))
    }
  }, [searchText])

  return (
    <Grid
      container
      alignItems='center'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {/* xs={12} sm={12} md={10} */}
      {/* lg={window.innerWidth < 1320 ? 12 : 6} */}
      <Grid item>
        <Typography
          variant='h1'
          component='h2'
          // sx={(theme) => ({
          //   [theme.breakpoints.down('md')]: {
          //     marginBottom: 3,
          //   },
          // })}
        >
          Users
        </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          // xs={12}
          // md={10}
          // lg={6}
          style={{ display: 'flex', flexDirection: 'row' }}
          // alignItems='center'
          // paddingTop={window.innerWidth < 1100 ? 5 : 0}
        >
          <Grid item style={{ marginRight: 10 }}>
            {/* xs={6} md={3} lg={4} */}

            <AddUserModel />
          </Grid>
          <Grid
            item
            // xs={6}
            // md={3}
            // lg={4}
            // sx={(theme) => ({
            //   [theme.breakpoints.down('md')]: {
            //     marginRight: 0,
            //   },
            // })}
          >
            {usersCount > 0 ? (
              <SharedButton
                text='Export CSV'
                style={{
                  background: '#e93a7d',
                  borderRadius: 50,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  border: 'none',
                  height: 40,
                  cursor: 'pointer',
                  marginRight: 10,
                }}
                onClick={handleCSVExport}
              />
            ) : (
              <SharedButton
                text='Export CSV'
                style={{
                  background: '#979797',
                  borderRadius: 50,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  border: 'none',
                  height: 40,
                  // cursor: 'pointer',
                }}
              />
            )}
          </Grid>
          <Grid
            item
            // xs={12}
            // md={3}
            // lg={4}
            // sx={(theme) => ({
            //   [theme.breakpoints.down('md')]: {
            //     marginTop: 5,
            //   },
            // })}
            style={{
              marginRight: 10,
            }}
          >
            <SharedSearchBox
              width={window.innerWidth > 600 ? 290 : '100%'}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UsersTopRow

import { Checkbox, Container, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { pink } from '@mui/material/colors'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  fetchRoles,
  updateUser,
  updateUserPasswordVerify,
} from 'redux/reducers/Users'
import SharedButton from 'shared/components/SharedButton'
import SharedPasswordInput from 'shared/components/SharedPasswordInput'
import './CustomUsersCSS.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth < 600 ? '90vw' : 500,
  height: 670,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
}

const EditUserModel = (props) => {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const passwordVerifyUserSuccess = useSelector(
    (state) => state.users.updateUserPasswordVerifyStatus
  )
  const [selectedRoles, setSelectedRoles] = useState([])

  const roles = useSelector((state) => state.users.roles)
  const dispatch = useDispatch()

  const updateUserHelper = () => {
    if (props.data && props.data.id) {
      const data = {
        userId: props.data.id,
        email: props.data.email.trim(),
        phoneNumber: props.data.phoneNumber.trim(),
        roles: selectedRoles,
      }

      dispatch(updateUser(data))
    } else if (localStorage.getItem('userDetailsData')) {
      const userDetailsData = JSON.parse(
        localStorage.getItem('userDetailsData')
      )

      const data = {
        userId: userDetailsData.id,
        email: userDetailsData.email.trim(),
        phoneNumber: userDetailsData.phoneNumber.trim(),
        roles: selectedRoles,
      }

      const updatedData = {
        name: userDetailsData.name,
        id: userDetailsData.id,
        email: userDetailsData.email,
        phoneNumber: userDetailsData.phoneNumber,
        roles: selectedRoles,
      }

      localStorage.setItem('userDetailsData', JSON.stringify(updatedData))

      dispatch(updateUser(data))
    }
  }

  const verifyPasswordHelper = () => {
    if (password.length <= 0) {
      toast.error('Enter password first')
      return
    }

    const userDetail = jwt_decode(localStorage.getItem('token'))
    dispatch(
      updateUserPasswordVerify({
        email: userDetail.sub,
        password: password,
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtcy11c2VyLWF1dGhlbnRpY2F0aW9uIiwic3ViIjoic2FqZWVsLmFobWVkQHFpc3N0cGF5LmNvbSIsImp0aSI6IjMiLCJhdWQiOiJXRUIiLCJpYXQiOjE2NTI3NzY1MzIsImV4cCI6MTY1MjgwNjUzMiwidXNlcl9pZCI6Ijg0ODA3IiwidXNlcl9yb2xlIjpbIlN1cGVyIEFkbWluIl0sInVzZXJfYWRkcmVzcyI6IjE3Mi4xNy4wLjEiLCJ1c2VyX2FnZW50IjoiMTgyNyJ9.3TaTUP8nECQkUFUeMEH99v1R5yF03XbvU1XNgTaSJqiJH4SCmxeflHJyiN1T-Z_WnjE2dmvEnN7ubUbxnxBhXA',
      })
    )
  }

  useEffect(() => {
    if (
      props &&
      props.data &&
      props.data.roles &&
      props.data.roles.length > 0
    ) {
      const tempArray = []
      props.data.roles.map((role) => {
        tempArray.push(role.name)
      })
      setSelectedRoles(tempArray)
    } else {
      if (localStorage.getItem('userDetailsData')) {
        const userDetailsData = JSON.parse(
          localStorage.getItem('userDetailsData')
        )

        const tempArray = []

        userDetailsData.roles.map((role) => {
          if (typeof role === 'object') {
            tempArray.push(role.name)
          } else {
            tempArray.push(role)
          }
        })

        setSelectedRoles(tempArray)
      }
    }
  }, [props])

  useEffect(() => {
    if (passwordVerifyUserSuccess === 'USER_SUCCESSFULLY_UPDATED') {
      updateUserHelper()
    } else if (passwordVerifyUserSuccess === 'USER_UPDATE_ERROR') {
      alert('Password not valid')
    }
  }, [passwordVerifyUserSuccess])

  useEffect(() => {
    dispatch(fetchRoles())
  }, [])

  function removeItemAll(arr, value) {
    var i = 0
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1)
      } else {
        ++i
      }
    }

    return arr
  }

  return (
    <div>
      <SharedButton
        text='Edit Role'
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
          marginLeft: 10,
        }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid container alignItems={'center'}>
            <Grid item xs={11} md={11} lg={11}>
              <Typography
                id='modal-modal-title'
                variant='p'
                component='p'
                fontSize={20}
                fontWeight={'bold'}
              >
                Edit Role
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                id='modal-modal-title'
                variant='p'
                component='p'
                fontSize={16}
                style={{ cursor: 'pointer' }}
                onClick={handleClose}
              >
                X
              </Typography>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 4 }} color={'#6B7280'}>
            SELECT ROLE(S)
          </Typography>
          <Container
            sx={{ mt: 3 }}
            style={{
              padding: 0,
              width: '98%',
              maxHeight: '60%',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {roles.map((role) => (
              <Grid
                container
                alignItems={'center'}
                borderBottom={'1px solid #cacdd4'}
                style={{ paddingTop: 5, paddingBottom: 5 }}
                key={role.id}
              >
                <Grid item xs={1} md={1} lg={1}>
                  <Checkbox
                    aria-label='CheckBox Demo'
                    checked={
                      selectedRoles.indexOf(role.name) === -1 ? false : true
                    }
                    onChange={async () => {
                      if (selectedRoles.indexOf(role.name) != -1) {
                        const array = selectedRoles
                        const tempArray = await Promise.all(
                          removeItemAll(array, role.name)
                        )
                        setSelectedRoles(await tempArray)
                      } else {
                        setSelectedRoles([...selectedRoles, role.name])
                      }
                    }}
                    sx={{
                      color: pink[800],
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                      paddingLeft: 0,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant='p'
                    component='p'
                    fontSize={14}
                    fontWeight={500}
                  >
                    {role.name}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Container>
          <Container style={{ marginTop: 20, marginLeft: -5 }}>
            <Typography
              id='modal-modal-title'
              variant='p'
              component='p'
              fontSize={16}
              color={'#111827'}
              style={{ marginBottom: 12 }}
            >
              Please enter your password and press update role.
            </Typography>
            <SharedPasswordInput
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
          </Container>
          <Container sx={{ mt: 5 }}>
            <Grid
              container
              style={{
                justifyContent: 'flex-end',
                marginLeft: -7,
              }}
            >
              <Grid item xs={6}>
                <SharedButton
                  text='Cancel'
                  style={{
                    background: 'white',
                    border: '1px solid #e93a7d',
                    borderRadius: 10,
                    color: '#e93a7d',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 150,
                    height: 40,
                    cursor: 'pointer',
                    marginRight: 10,
                  }}
                  onClick={handleClose}
                />
              </Grid>
              <Grid item>
                <SharedButton
                  text='Update Role'
                  style={{
                    background: '#e93a7d',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 150,
                    border: 'none',
                    height: 40,
                    cursor: 'pointer',
                  }}
                  onClick={verifyPasswordHelper}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </div>
  )
}

export default EditUserModel

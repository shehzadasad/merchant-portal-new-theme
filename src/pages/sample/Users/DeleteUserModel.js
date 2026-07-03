import { Container, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, deleteUserPasswordVerify } from 'redux/reducers/Users'
import SharedButton from 'shared/components/SharedButton'
import SharedPasswordInput from 'shared/components/SharedPasswordInput'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'
import './CustomUsersCSS.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth < 600 ? '90vw' : 500,
  height: 260,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
}

const DeleteUserModel = (props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const passwordVerifyUserSuccess = useSelector(
    (state) => state.users.deleteUserPasswordVerifyStatus
  )

  const deleteUserHelper = () => {
    const userDetail = jwt_decode(localStorage.getItem('token'))
    if (props.userId === userDetail.user_id) {
      alert('Cannot delete Merchant Admin')
      return
    } else {
      dispatch(deleteUser(props.userId))
    }
  }

  const verifyPasswordHelper = () => {
    // if (password.length <= 0) {
    //   toast.error('Enter password first')
    //   return
    // }
    if (passwordVerifyUserSuccess === 'USER_SUCCESSFULLY_DELETED') {
      // eslint-disable-next-line
      deleteUserHelper()
      // eslint-disable-next-line
    } else if (passwordVerifyUserSuccess === 'USER_DELETE_ERROR') {
      toast.error('Password not valid')
    }

    const userDetail = jwt_decode(localStorage.getItem('token'))
    dispatch(
      deleteUserPasswordVerify({
        email: userDetail.sub,
        password: password,
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtcy11c2VyLWF1dGhlbnRpY2F0aW9uIiwic3ViIjoic2FqZWVsLmFobWVkQHFpc3N0cGF5LmNvbSIsImp0aSI6IjMiLCJhdWQiOiJXRUIiLCJpYXQiOjE2NTI3NzY1MzIsImV4cCI6MTY1MjgwNjUzMiwidXNlcl9pZCI6Ijg0ODA3IiwidXNlcl9yb2xlIjpbIlN1cGVyIEFkbWluIl0sInVzZXJfYWRkcmVzcyI6IjE3Mi4xNy4wLjEiLCJ1c2VyX2FnZW50IjoiMTgyNyJ9.3TaTUP8nECQkUFUeMEH99v1R5yF03XbvU1XNgTaSJqiJH4SCmxeflHJyiN1T-Z_WnjE2dmvEnN7ubUbxnxBhXA',
      })
    )
  }

  useEffect(() => {
    // if (passwordVerifyUserSuccess === 'USER_SUCCESSFULLY_DELETED') {
    //   // eslint-disable-next-line
    //   deleteUserHelper()
    //   // eslint-disable-next-line
    // } else if (passwordVerifyUserSuccess === 'USER_DELETE_ERROR') {
    //   toast.error('Password not valid')
    // }
    // eslint-disable-next-line
    // verifyPasswordHelper()
  }, [passwordVerifyUserSuccess])

  return (
    <div>
      <SharedButton
        text='Delete User'
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
                Delete User
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
          <Container style={{ marginTop: 20, marginLeft: -5 }}>
            <Typography
              id='modal-modal-title'
              variant='p'
              component='p'
              fontSize={16}
              color={'#111827'}
              style={{ marginBottom: 12 }}
            >
              Please enter your password to delete this user.
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
              xs={12}
            >
              <Grid>
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
                    width: 110,
                    height: 40,
                    cursor: 'pointer',
                    marginRight: 10,
                  }}
                  onClick={handleClose}
                />
              </Grid>
              <Grid>
                <SharedButton
                  text='Delete'
                  style={{
                    background: '#e93a7d',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 110,
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

DeleteUserModel.propTypes = {
  userId: PropTypes.number,
}

export default DeleteUserModel

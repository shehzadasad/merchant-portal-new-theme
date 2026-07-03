import { Container, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  addUser,
  addUserPasswordVerify,
  setAddUserPasswordVerifySuccess,
} from 'redux/reducers/Users'
import SharedButton from 'shared/components/SharedButton'
import SharedFormInput from 'shared/components/SharedFormInput'
import SharedPasswordInput from 'shared/components/SharedPasswordInput'
import SharedSelectRoles from 'shared/components/SharedSelectRoles'
import './CustomUsersCSS.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth < 600 ? '90vw' : 500,
  height: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
}

const AddUserModel = (props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const passwordVerifyUserSuccess = useSelector(
    (state) => state.users.addUserPasswordVerifyStatus
  )
  const userDetail = useSelector((state) => state.users.userDetail)
  const [number, setIntlNumber] = useState('')
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
  const [countryCode, setCountryCode] = useState('01')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [roles, setRoles] = useState([])

  const addUserHelper = () => {
    if (userDetail) {
      if (userDetail.merchantId) {
        if (isPhoneNumberValid === false) {
          toast.error('Phone Number Invalid')
          return
        }
        const data = {
          name: name.trim(),
          phoneNumber: phone,
          email: email.trim(),
          merchantId: userDetail.merchantId,
          roles: roles,
        }
        dispatch(addUser(data))
      }
    }
  }
  const verifyPasswordHelper = () => {
    if (roles.length <= 0) {
      toast.error('Please select the role')
      return
    }
    if (name.length <= 0) {
      toast.error('Please enter your name')
      return
    }
    if (password.length <= 0) {
      toast.error('Enter password first')
      return
    }
    if (phone.length == 12 || phone.length == 10) {
      console.log('Good')
    } else if (phone.length < 11) {
      toast.error('Please correct your phone number')
    } else if (phone.length == 11 || phone.length > 10) {
      toast.error('Please correct your phone number')
    } else if (phone.length > 12) {
      toast.error('Please correct your phone number')
    }

    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      toast.error('Invalid Email')
      return false
    } else {
      console.log('')
    }
    if (userDetail) {
      if (userDetail.email) {
        dispatch(
          addUserPasswordVerify({
            email: userDetail.email,
            password: password,
          })
        )
      }
    }
  }

  useEffect(() => {
    if (passwordVerifyUserSuccess === 'USER_SUCCESSFULLY_ADDED') {
      addUserHelper()
      dispatch(setAddUserPasswordVerifySuccess(null))
    } else if (passwordVerifyUserSuccess === 'USER_ADD_ERROR') {
      toast.error('Error')
      dispatch(setAddUserPasswordVerifySuccess(null))
    }
  }, [passwordVerifyUserSuccess])

  return (
    <div className='adduser-modal'>
      <SharedButton
        text='Add User'
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
                Add User
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
          <Container sx={{ mt: 10 }} style={{ padding: 0 }}>
            <SharedFormInput
              type='text'
              label='Name'
              placeholder='Sajeel Ahmad'
              value={name}
              onInputChange={setName}
              style={{
                marginBottom: 10,
              }}
            />

            <SharedFormInput
              type='email'
              label='Email'
              placeholder='umair_123@email.com'
              value={email}
              onInputChange={setEmail}
              style={{
                marginBottom: 10,
              }}
            />

            <IntlTelInput
              containerClassName='intl-tel-input'
              inputClassName='MuiOutlinedInput-input MuiInputBase-input css-1rpt010-MuiInputBase-input-MuiOutlinedInput-input intl-tel-input-field'
              fieldId='outlined-basic'
              id='outlined-basic'
              name='phone'
              autoFocus={true}
              defaultValue={phone}
              autoPlaceholder
              required='required'
              format={true}
              defaultCountry='us'
              preferredCountries={['pk', 'us']}
              value={phone}
              onSelectFlag={(e) => {
                setIntlNumber('')
              }}
              onPhoneNumberChange={(isValid, value, intlNumber) => {
                setIsPhoneNumberValid(isValid)
                setIntlNumber(intlNumber)
                setPhone(value)
              }}
              onPhoneNumberBlur={(isValid) => {
                setIsPhoneNumberValid(isValid)
              }}
            />

            <SharedSelectRoles onChange={(e) => setRoles(e)} />
          </Container>
          <Container style={{ marginTop: 30, marginLeft: -5 }}>
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
          <Container sx={{ marginTop: 10, marginLeft: -2 }}>
            <Grid container style={{ justifyContent: 'flex-end' }} xs={12}>
              <Grid item xs={6} lg={6} md={6}>
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
                  text='Add User'
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

export default AddUserModel

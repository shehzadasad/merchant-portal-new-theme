import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Grid, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import greenTick from 'assets/icon/green-tick-square.png'
import redTick from 'assets/icon/red-square.png'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { changePassword } from 'redux/reducers/Users'

const textFieldStyle = {
  width: '95%',
  height: '58px',
  borderRadius: '8px',
  marginLeft: '10px',
  marginTop: '25px',
}

const buttonStyle = {
  width: '137px',
  height: '36px',
  borderRadius: '8px',
  marginLeft: '10px',
  marginTop: '50px',
  backgroundColor: '#ED2079',
  color: '#fff',
}

const Password = () => {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  })

  const [existingPassword, setExistingPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [passwordLengthError, setPasswordLengthError] = useState({
    error: false,
    variant: 'LENGTH',
    text: 'Password should be at least 8 characters long',
  })
  const [specialCharError, setPasswordSpecialCharError] = useState({
    error: false,
    variant: 'SPECIAL_CHAR',
    text: 'Password should have at least one special character',
  })
  const [uppercaseError, setPasswordUpperCaseError] = useState({
    error: false,
    variant: 'UPPERCASE',
    text: 'Password should have at least one uppercase character',
  })
  const [numericError, setPasswordNumericError] = useState({
    error: false,
    variant: 'NUMERIC',
    text: 'Password should have at least one numeric digit',
  })
  const [isPasswordMatch, setIsPasswordMatch] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    })
  }

  const changePasswordHelper = () => {
    if (newPassword.length < 1) {
      toast.error('Enter password')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (passwordLengthError.error === true) {
      toast.error('Password should be at least 8 characters long')
      return
    }

    if (uppercaseError.error === true) {
      toast.error('Password should have at least one uppercase character')
      return
    }

    if (specialCharError.error === true) {
      toast.error('Password should have at least one special character')
      return
    }

    if (numericError.error === true) {
      toast.error('Password should have at least one numeric digit')
      return
    }

    const email = jwt_decode(localStorage.getItem('token')).sub
    const userID = jwt_decode(localStorage.getItem('token')).user_id

    if (newPassword === confirmPassword) {
      const data = {
        currentPassword: existingPassword,
        newPassword: newPassword,
        byUserId: userID,
        byLoginId: email,
      }

      dispatch(changePassword(data))
    } else {
      alert('Passwords do not match')
    }
  }

  useEffect(() => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (specialChars.test(newPassword)) {
      setPasswordSpecialCharError({
        error: false,
        variant: 'LENGTH',
        text: 'Password should be at least one special character',
      })
    } else {
      setPasswordSpecialCharError({
        error: true,
        variant: 'LENGTH',
        text: 'Password should be at least one special character',
      })
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g
    if (newPassword.match(upperCaseLetters)) {
      setPasswordUpperCaseError({
        error: false,
        variant: 'UPPERCASE',
        text: 'Password should have at least one uppercase character',
      })
    } else {
      setPasswordUpperCaseError({
        error: true,
        variant: 'UPPERCASE',
        text: 'Password should have at least one uppercase character',
      })
    }

    // Validate numbers
    const numbers = /[0-9]/g
    if (newPassword.match(numbers)) {
      setPasswordNumericError({
        error: false,
        variant: 'NUMERIC',
        text: 'Password should have at least one numeric digit',
      })
    } else {
      setPasswordNumericError({
        error: true,
        variant: 'NUMERIC',
        text: 'Password should have at least one numeric digit',
      })
    }

    // Validate length
    if (newPassword.length >= 8) {
      setPasswordLengthError({
        error: false,
        variant: 'LENGTH',
        text: 'Password should be at least 8 characters long',
      })
    } else {
      setPasswordLengthError({
        error: true,
        variant: 'LENGTH',
        text: 'Password should be at least 8 characters long',
      })
    }
  }, [newPassword])

  useEffect(() => {
    if (confirmPassword.length > 0 && confirmPassword === newPassword) {
      setIsPasswordMatch(true)
    } else {
      setIsPasswordMatch(false)
    }
  }, [confirmPassword, newPassword])

  return (
    <Card
      sx={{
        height: newPassword.length > 0 ? 540 : 420,
        marginTop: '25px',
      }}
    >
      <CardContent>
        <p style={{ fontWeight: '500', fontSize: '16px' }}>Password</p>
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant='outlined'
          style={textFieldStyle}
        >
          <InputLabel htmlFor='outlined-adornment-password'>
            Current Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={existingPassword}
            onChange={(e) => setExistingPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Current Password'
          />
        </FormControl>
        <ToastContainer />
        <FormControl
          sx={{
            m: 1,
            width: '25ch',
            marginBottom: newPassword.length > 0 ? 25 : 0,
          }}
          variant='outlined'
          style={textFieldStyle}
        >
          <TextField
            id='input-with-icon-textfield'
            label='New Password'
            type={values.showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {newPassword.length > 0 ? (
            <Stack spacing={2} style={{ marginTop: 10 }}>
              <Grid container alignItems={'center'}>
                <Grid item>
                  <img
                    src={
                      passwordLengthError.error === true ? redTick : greenTick
                    }
                    style={{
                      width: 17,
                      marginRight: 5,
                    }}
                    alt='background'
                  />
                </Grid>
                <Grid item>
                  <Typography variant={'p'} component={'p'} fontSize={12}>
                    {passwordLengthError.text}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems={'center'}>
                <Grid item>
                  <img
                    src={specialCharError.error === true ? redTick : greenTick}
                    style={{
                      width: 17,
                      marginRight: 5,
                    }}
                    alt='background'
                  />
                </Grid>
                <Grid item>
                  <Typography variant={'p'} component={'p'} fontSize={12}>
                    {specialCharError.text}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems={'center'}>
                <Grid item>
                  <img
                    src={uppercaseError.error === true ? redTick : greenTick}
                    style={{
                      width: 17,
                      marginRight: 5,
                    }}
                    alt='background'
                  />
                </Grid>
                <Grid item>
                  <Typography variant={'p'} component={'p'} fontSize={12}>
                    {uppercaseError.text}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems={'center'}>
                <Grid item>
                  <img
                    src={numericError.error === true ? redTick : greenTick}
                    style={{
                      width: 17,
                      marginRight: 5,
                    }}
                    alt='background'
                  />
                </Grid>
                <Grid item>
                  <Typography variant={'p'} component={'p'} fontSize={12}>
                    {numericError.text}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          ) : (
            ''
          )}
        </FormControl>
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant='outlined'
          style={textFieldStyle}
        >
          <InputLabel htmlFor='outlined-adornment-password'>
            Confirm New Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label='Confirm New Password'
          />
          {confirmPassword.length > 0 ? (
            <Grid container alignItems={'center'} marginTop={2}>
              <Grid item>
                <img
                  src={isPasswordMatch === false ? redTick : greenTick}
                  style={{
                    width: 17,
                    marginRight: 5,
                  }}
                  alt='background'
                />
              </Grid>
              <Grid item>
                <Typography variant={'p'} component={'p'} fontSize={12}>
                  {isPasswordMatch === true
                    ? 'Passwords match'
                    : 'Passwords does not match'}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            ''
          )}
        </FormControl>
        <Button style={buttonStyle} onClick={changePasswordHelper}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}
export default Password

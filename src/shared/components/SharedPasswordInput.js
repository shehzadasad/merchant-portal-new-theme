import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useState } from 'react'

const SharedPasswordInput = (props) => {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl
        sx={{ width: '100%' }}
        style={{ marginLeft: -1.5 }}
        variant='outlined'
      >
        <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          type={values.showPassword ? 'text' : 'password'}
          value={props.value}
          onChange={props.handleChange}
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
          label='Password'
        />
      </FormControl>
    </Box>
  )
}

export default SharedPasswordInput

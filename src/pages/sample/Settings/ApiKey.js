import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import React from 'react'

const textfeilds = {
  width: '95%',
  height: '58px',
  borderRadius: '8px',
  marginLeft: '10px',
  marginTop: '25px',
}

function ApiKey() {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

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
    <Card
      sx={{
        height: '180px',
      }}
    >
      <CardContent>
        <p style={{ fontWeight: '500', fontSize: '16px' }}>API key</p>
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant='outlined'
          style={textfeilds}
        >
          <InputLabel htmlFor='outlined-adornment-password'>API key</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            placeholder='******'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
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
            label='API Key'
          />
        </FormControl>
      </CardContent>
    </Card>
  )
}
export default ApiKey

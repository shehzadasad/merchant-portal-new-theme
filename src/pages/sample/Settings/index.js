import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import './CustomCSS.css'
import Password from './Password.js'
import PaymentMethod from './PaymentMethod.js'
import Profile from './Profile.js'
import Settings from './Settings.js'
import Timer from './Timer.js'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Settingmain = () => {
  document.title = 'Settings | QisstPay - Merchants'
  return (
    <>
      <p
        style={{
          fontWeight: '500',
          fontSize: '16px',
          marginBottom: '39px',
          fontFamily: 'Poppins',
        }}
      >
        Settings
      </p>
      <Grid
        container
        spacing={3}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100% !important',
        }}
      >
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Settings />
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <div id='profile'>
            <Profile />
          </div>
          <div id='payment'>
            <PaymentMethod />
          </div>
          <div id='password'>
            <Password />
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <div id='5minttimer'>
            <Timer />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Settingmain

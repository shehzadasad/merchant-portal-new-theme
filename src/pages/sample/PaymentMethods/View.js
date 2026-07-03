import { Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import * as React from 'react'
import oneclicklogo from '../../../assets/icon/oneclicklogo.svg'
const mystyle = {
  width: '50px',
  fontSize: '12px',
  fontWeight: 'bold',
  textAlign: 'center',
  float: 'left',
}
const placeorderbutton = {
  background: '#b7bcc2',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '15px',
  fontWeight: '700',
  marginTop: '15px',
  outline: 'none',
  padding: '10px',
  textAlign: 'center',
  width: '80%',
  marginBottom: '10px',
  marginLeft: '22px',
}
function View() {
  return (
    <Card sx={{ minWidth: 275, height: 500 }}>
      <CardContent>
        <Grid>
          <Grid
            item
            xs={4}
            style={{
              fontSize: '1rem',
              marginBottom: 30,
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 'bolder',
              letterSpacing: '0.00938em',
            }}
            gutterBottom
          >
            View 1
          </Grid>

          <Grid item xs={4}>
            <input style={mystyle} value='0'></input>

            <span style={{ float: 'right' }}>%</span>
          </Grid>
        </Grid>

        <Card
          style={{
            width: 250,
            height: 420,
            backgroundColor: '#f8f9fa',
            marginLeft: '20px',
          }}
        >
          <CardContent>
            <div
              style={{
                fontSize: '1rem',
                marginBottom: 30,
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 'bolder',
                letterSpacing: '0.00938em',
              }}
              gutterBottom
            >
              <img
                style={{ marginLeft: '40px' }}
                src={oneclicklogo}
                alt='One Click Logo'
              />
            </div>
            <div style={{ marginBottom: '200px', color: '#4e5b68' }}>
              Select Payment Method
            </div>

            <div>
              <span style={{ color: '#4e5b68' }}> Order Summary </span>
              <span style={{ float: 'right', color: '#4e5b68' }}>$ 0.00</span>
            </div>
            <div>
              <span style={{ color: '#4e5b68' }}> Shipping </span>
              <span style={{ float: 'right', color: '#4e5b68' }}>$ 0.00</span>
            </div>

            <div>
              <span style={{ color: '#4e5b68' }}> Tax </span>
              <span style={{ float: 'right', color: '#4e5b68' }}>$ 0.00</span>
            </div>
            <div style={{ width: '100%' }}>
              <button style={placeorderbutton}>Place Orders </button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default View

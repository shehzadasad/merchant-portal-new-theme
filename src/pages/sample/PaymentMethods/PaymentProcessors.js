import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import * as React from 'react'
// import add_circle_outline from '../../../assets/icon/add_circle_outline.svg'
import AllPaymentMethods from './AllPaymentMethods.js'
import AllPaymentProcessors from './AllPaymentProcessors.js'

function PaymentProcessors() {
  return (
    <Card sx={{ minWidth: 275, height: 223 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs>
            <span> Payment Methods</span>
            <AllPaymentMethods />

            <AllPaymentMethods />
          </Grid>

          <Grid item xs>
            <span>Payment Processors</span>
            <AllPaymentProcessors />
            <AllPaymentProcessors />
          </Grid>

          <Grid item xs={6}>
            {/* <Button
              src={add_circle_outline}
              sx={{
                color: '#E93A7D',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                letterSpacing: '0.00938em',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                float: 'right',
              }}
              size='small'
            >
              Add Payment Methods
            </Button> */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PaymentProcessors

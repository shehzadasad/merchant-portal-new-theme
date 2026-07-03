import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
// import add_circle_outline from '../../../assets/icon/add_circle_outline.svg'

function CheckoutViews() {
  return (
    <Card sx={{ minWidth: 275, height: 223 }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: '1rem',
            marginBottom: 30,
            textAlign: 'center',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 'bolder',
            letterSpacing: '0.00938em',
          }}
          color='text.secondary'
          gutterBottom
        >
          Checkout Views
        </Typography>
      </CardContent>
      <div style={{ width: '100%', textAlign: 'center' }}>
        {/* <Button
          src={add_circle_outline}
          sx={{
            width: '50%',
            color: '#E93A7D',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            letterSpacing: '0.00938em',
            fontWeight: 'bold',
            fontSize: '0.875rem',
          }}
          size='small'
        >
          Create Checkout{' '}
        </Button> */}
      </div>
    </Card>
  )
}

export default CheckoutViews

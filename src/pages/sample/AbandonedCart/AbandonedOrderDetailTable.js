import React from 'react'
import { Grid, TableContainer, Typography, Paper } from '@mui/material'
const AbandonedOrderDetailTable = ({ AbandonedCartData }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: 38, borderRadius: 10 }}
    >
      <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
        <Grid item xs={2} md={6}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Checkout #
          </Typography>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData.sessionID}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          padding: 5,
          borderBottomWidth: 1,
          borderBottom: '1px solid #c9cdd4',
        }}
      >
        <Grid item xs={2} md={6}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Order Date
          </Typography>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData.date}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          padding: 5,
          borderBottomWidth: 1,
          borderBottom: '1px solid #c9cdd4',
        }}
      >
        <Grid item xs={2} md={6}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Customer Name
          </Typography>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.orderDetails?.firstName}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          padding: 5,
          borderBottomWidth: 1,
          borderBottom: '1px solid #c9cdd4',
        }}
      >
        <Grid item xs={2} md={6}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Customer Email
          </Typography>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.email}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
        <Grid item xs={2} md={6}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Customer Mobile Number
          </Typography>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.orderDetails.phoneNumber}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
        <Grid item xs={2} md={6}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Abandoned Step
          </Typography>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.abandonedStep}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
        <Grid item xs={2} md={6}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Store
          </Typography>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.store?.name ?? '-'}
          </Typography>
        </Grid>
      </Grid>
    </TableContainer>
  )
}

export default AbandonedOrderDetailTable

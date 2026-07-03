import React from 'react'
import { Grid, TableContainer, Typography, Paper } from '@mui/material'
const AbandonedBillingDetail = ({ AbandonedCartData }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: 38, borderRadius: 10 }}
    >
      <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
        <Grid item xs={2} md={2} lg={2}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Address
          </Typography>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.address_1}
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
        <Grid item xs={2} md={2} lg={2}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Address 2
          </Typography>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.address_2}
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
        <Grid item xs={2} md={2} lg={2}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            City
          </Typography>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.city}
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
        <Grid item xs={2} md={2} lg={2}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            State
          </Typography>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.state}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ padding: 5, borderBottomWidth: 1 }}>
        <Grid item xs={2} md={2} lg={2}>
          <Typography
            variant='p'
            component='p'
            fontSize={14}
            fontWeight={'bold'}
          >
            Country
          </Typography>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontSize={14}>
            {AbandonedCartData?.country}
          </Typography>
        </Grid>
      </Grid>
    </TableContainer>
  )
}

export default AbandonedBillingDetail

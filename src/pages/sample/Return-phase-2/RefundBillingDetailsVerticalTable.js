import { Grid, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'

const RefundBillingDetail = ({ billingDetail, shippingDetails }) => {
  if (billingDetail || shippingDetails) {
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
              {billingDetail?.billing_address1 ||
                shippingDetails?.shipping_address1}
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
              Address2
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {billingDetail?.billing_address2 ||
                shippingDetails?.shipping_address2}
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
              {billingDetail?.billing_city || shippingDetails?.shipping_city}
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
              {billingDetail?.billing_state || shippingDetails?.shipping_state}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
    )
  } else {
    return (
      <Typography variant='p' component='p'>
        Loading...
      </Typography>
    )
  }
}

export default RefundBillingDetail

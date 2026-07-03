import { Grid, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'

const RefundDetailsVerticalTable = ({ returnOrderDetails }) => {
  if (returnOrderDetails) {
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
              Order Number
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.order_id}
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
              Customer
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.customer_name}
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
              Payment Method
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.payment_method}
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
              Order Fee
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.fee}
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
              Merchant order id
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.merchant_order_id}
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
              Amount
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails.amount}
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
              Shipping amount
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.shipping_amount}
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
              Status
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              sx={{
                color:
                  returnOrderDetails?.statuse === 'APPROVED'
                    ? '#379200'
                    : returnOrderDetails?.status === 'REJECTED'
                    ? 'red'
                    : returnOrderDetails?.status === 'PENDING'
                    ? '#0A8FDC'
                    : '#FF6A16',
                backgroundColor:
                  returnOrderDetails?.status === 'APPROVED'
                    ? '#EBF4E6'
                    : returnOrderDetails?.status === 'REJECTED'
                    ? '#F5EBEB'
                    : returnOrderDetails?.status === 'PENDING'
                    ? '#CEE9F8'
                    : '#F8E0CE',
                padding: '3px 10px',
                borderRadius: '15px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                height: '24px',
              }}
            >
              {returnOrderDetails?.status}
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
              Order Date
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.date}
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
              Store
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.store}
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
              Return Type
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {returnOrderDetails?.return_type}
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

export default RefundDetailsVerticalTable

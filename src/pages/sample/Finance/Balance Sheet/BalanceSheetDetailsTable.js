import { Grid, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import * as React from 'react'

const BalanceSheetDetailsTable = ({ data }) => {
  if (data) {
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
              Date
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.createdAt ?? '2020/03/04'}
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
              Order
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.orderId ?? '123'}
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
              Debit
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.debit ?? '123456'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Credit
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.credit ?? 'null'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Balance
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data ? (data.balance ? data.balance.toFixed(2) : 230) : 230}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Description
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.description ?? 'description'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Merchant Order Reference
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.merchantOrderId ?? 'QP123'}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
    )
  } else {
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
              Name
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              Salman Ali
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
              Email
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              email@email.com
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
              Phone Number
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              123456
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
              Role
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              Super Admin
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
    )
  }
}

BalanceSheetDetailsTable.propTypes = {
  data: PropTypes.object,
}

export default BalanceSheetDetailsTable

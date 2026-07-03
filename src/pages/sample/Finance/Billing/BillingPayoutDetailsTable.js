import Paper from '@mui/material/Paper'
import { TableContainer, Grid, Typography, Box } from '@mui/material'
import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const BillingPayoutDetailsDataTable = ({ data }) => {
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
              ID
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.id ?? '123'}
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
              Created At
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {moment(data.createdAt).format('LL') ?? '09-02-2022 13:45:50'}
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
              {data.amount ?? '15,059.84'}
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
              Status
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Grid item xs={8} md={8} lg={8}>
              <Box
                sx={{
                  color: '#11C15B',
                  backgroundColor: '#CFF3DE',
                  padding: '3px 10px',
                  borderRadius: '15px',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {data.status ?? 'COMPLETED'}
              </Box>
            </Grid>
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
              ID
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              123456
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
              Created At
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              09-02-2022 13:45:50
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
              15,059.84
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
              Status
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Box
              sx={{
                color: '#11C15B',
                backgroundColor: '#CFF3DE',
                padding: '3px 10px',
                borderRadius: '15px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              Completed
            </Box>
          </Grid>
        </Grid>
      </TableContainer>
    )
  }
}

BillingPayoutDetailsDataTable.propTypes = {
  data: PropTypes.object,
}

export default BillingPayoutDetailsDataTable

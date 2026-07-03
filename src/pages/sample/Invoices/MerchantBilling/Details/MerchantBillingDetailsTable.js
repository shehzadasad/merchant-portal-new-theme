import { Box, Grid, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { useState } from 'react'

const MerchantBillingDetailsTable = () => {
  const [details, setDetails] = useState({
    id: 4,
    createdAt: '2022-08-15T10:56:40.000+00:00',
    amount: 3900,
    status: 'PENDING',
  })
  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: 38, borderRadius: 10 }}
    >
      <Grid
        container
        sx={{
          padding: 5,
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
            Invoice ID
          </Typography>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontSize={14}>
            {details.id}
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
            Created On
          </Typography>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontSize={14}>
            {details.createdAt}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          padding: 5,
          borderBottomWidth: 1,
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
          <Box
            sx={{
              padding: '3px 10px',
              borderRadius: '15px',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              minWidth: '130px',
              textAlign: 'center',
              color:
                details.status == 'COMPLETED'
                  ? '#11C15B'
                  : details.status === 'REFUNDED'
                  ? '#FF6A16'
                  : details.status === 'PENDING'
                  ? '#0A8FDC'
                  : '#FF6A16',
              backgroundColor:
                details.status == 'COMPLETED'
                  ? '#CFF3DE'
                  : details.status === 'REFUNDED'
                  ? '#F8E0CE'
                  : details.status === 'PENDING'
                  ? '#CEE9F8'
                  : '#F8E0CE',
            }}
          >
            <Typography variant={'p'} component={'p'}>
              {details.status}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </TableContainer>
  )
}

MerchantBillingDetailsTable.propTypes = {
  data: PropTypes.object,
}

export default MerchantBillingDetailsTable

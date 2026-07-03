import { Grid, TableContainer, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'

const CustomerDetailsVerticalTable = ({ data }) => {
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
              Name
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {data.name ?? 'Salman Ali'}
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
              {data.email ?? 'email@email.com'}
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

CustomerDetailsVerticalTable.propTypes = {
  data: PropTypes.object,
}

export default CustomerDetailsVerticalTable

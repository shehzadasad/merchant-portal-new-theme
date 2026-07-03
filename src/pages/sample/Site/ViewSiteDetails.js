import { ArrowBack } from '@mui/icons-material'
import {
  Alert,
  Grid,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

const ViewSiteDetails = () => {
  document.title = 'View Site | QisstPay - Merchants'

  return (
    <Stack spacing={2}>
      <Alert
        severity='error'
        style={{
          width: '100%',
          marginBottom: 20,
        }}
      >
        This feature is underdevelopment
      </Alert>
      <Grid container>
        <Grid>
          <Link to='/site'>
            <ArrowBack />
          </Link>
        </Grid>
        <Typography variant='h2' component='h3' marginLeft={3}>
          View Site
        </Typography>
      </Grid>
      <TableContainer
        component={Paper}
        style={{ marginTop: 38, borderRadius: 10 }}
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Grid
          container
          sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          alignItems={'center'}
        >
          <Grid item xs={6} md={6} lg={6} alignItems={'center'}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Site
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant='p' component='p' fontSize={14}>
              {localStorage.getItem('siteDetails')}
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
          alignItems={'center'}
        >
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant='p' component='p' fontSize={14}>
              Access Token
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              {localStorage.getItem('siteAccessToken')}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
    </Stack>
  )
}

export default ViewSiteDetails

import { Grid, Typography } from '@mui/material'

const MerchantBillingOrdersTitleRow = () => {
  return (
    <Grid
      container
      alignItems='center'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Grid item>
        <Typography variant='h1' component='h2'>
          Orders
        </Typography>
      </Grid>
    </Grid>
  )
}
export default MerchantBillingOrdersTitleRow

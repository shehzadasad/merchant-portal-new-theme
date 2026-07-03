import { Grid, Typography } from '@mui/material'
import SharedSearchBox from 'shared/components/SharedSearchBox'

const MerchantBillingTopRow = () => {
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
        <Typography
          variant='p'
          component='p'
          style={{
            fontWeight: 500,
            fontSize: '20px',
          }}
        >
          Merchant Billing
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid
            item
            style={{
              marginRight: 10,
            }}
          >
            {/* <SharedSearchBox width={window.innerWidth > 600 ? 290 : '100%'} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default MerchantBillingTopRow

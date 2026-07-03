import { Grid } from '@mui/material'
import React, { Suspense } from 'react'

const BillingTable = React.lazy(() => import('./BillingTable'))
const BillingTopRow = React.lazy(() => import('./BillingTopRow'))

const BillingPayout = () => {
  document.title = 'Billing Payout | QisstPay - Merchants'
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BillingTopRow />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <BillingTable />
      </Suspense>
    </Grid>
  )
}

export default BillingPayout

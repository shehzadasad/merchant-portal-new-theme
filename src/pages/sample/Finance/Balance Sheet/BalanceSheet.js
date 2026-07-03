import { Grid } from '@mui/material'
import React, { Suspense } from 'react'

const BalanceSheetTable = React.lazy(() => import('./BalanceSheetTable'))
const BalanceSheetTopRow = React.lazy(() => import('./BalanceSheetTopRow'))

const BalanceSheet = () => {
  document.title = 'Balance Sheet | QisstPay - Merchants'
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BalanceSheetTopRow />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <BalanceSheetTable />
      </Suspense>
    </Grid>
  )
}

export default BalanceSheet

import { Grid } from '@mui/material'
import React, { Suspense } from 'react'

const SiteTable = React.lazy(() => import('./SiteTable'))
const SiteTitleRow = React.lazy(() => import('./SiteTitleRow'))

const Site = () => {
  document.title = 'Site | QisstPay - Merchants'

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <SiteTitleRow />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SiteTable />
        </Suspense>
      </Grid>
    </>
  )
}

export default Site

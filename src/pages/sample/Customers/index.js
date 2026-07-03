import { Grid } from '@mui/material'
import React from 'react'
import CustomersTitleRow from './CustomersTitleRow.js'
import CustomerTable from './CustomerTable.js'

const Customers = () => {
  document.title = 'Customers | QisstPay - Merchants'

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <CustomersTitleRow />
      <CustomerTable />
    </Grid>
  )
}

export default Customers

import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import OrdersTitleRow from './OrdersTitleRow.js'
import OrdersTopRow from './OrdersTopRow.js'
import OrderTable from './OrderTable.js'
import React from 'react'
const Orders = () => {
  document.title = 'Orders | QisstPay - Merchants'
  const [searchValue, setSearchValue] = React.useState('')
  const userDetail = useSelector((state) => state.users.userDetail)

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <OrdersTitleRow setSearchValue={setSearchValue} />
      <OrdersTopRow userDetail={userDetail} />
      <OrderTable userDetail={userDetail} searchValue={searchValue} />
    </Grid>
  )
}

export default Orders

import { Container, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCustomerDetails } from 'redux/actions/CustomerAction'
import CustomerDetailsBillingInfoVerticalTable from './CustomerDetailsBillingInfoVerticalTable'
import CustomerDetailsVerticalTable from './CustomerDetailsVerticalTable'
import CustomerOrdersTable from './CustomerOrdersTable'
import CustomerOrdersTopRow from './CustomerOrdersTopRow'

const CustomerDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  document.title = 'Customer Details | QisstPay - Merchants'
  //userCred
  const userDetail = useSelector((state) => state.users.userDetail)
  const currentPage = useSelector((state) => state.customer.currentPage)
  const customerDetails = useSelector((state) => state.customer.customerInfo)

  const getCustomerListAPI = () => {
    dispatch(fetchCustomerDetails(currentPage, userDetail.id, id))
  }

  useEffect(() => {
    getCustomerListAPI()
  }, [])

  return (
    <Container>
      <CustomerOrdersTopRow
        merchant_customer_orders={customerDetails.merchant_customer_orders}
      />
      <CustomerOrdersTable data={customerDetails.merchant_customer_orders} />
      <Grid container marginTop={10}>
        <Grid item xs={12} md={5.7} lg={5.7} marginRight={5}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
            Customer Details
          </Typography>
          <CustomerDetailsVerticalTable
            data={customerDetails.merchant_customer_info}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
            Billing Info
          </Typography>
          <CustomerDetailsBillingInfoVerticalTable
            data={customerDetails.merchant_customer_info}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default CustomerDetails

import { Stack } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MerchantBillingDetailsTable from './MerchantBillingDetailsTable'
import MerchantBillingDetailsTopRow from './MerchantBillingDetailsTableTopRow'
import MerchantBillingOrdersTable from './MerchantBillingOrdersTable'
import MerchantBillingOrdersTitleRow from './MerchantBillingOrdersTitleRow'

const MerchantBillingDetails = () => {
  const { id } = useParams()
  const [orders, setOrders] = useState([])

  const getOrdersByBilling = async () => {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/billing/getOrdersByBilling/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (response) {
        setOrders(response.data.body.content)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getOrdersByBilling()
  }, [])

  return (
    <Stack spacing={5}>
      <MerchantBillingDetailsTopRow />
      <MerchantBillingDetailsTable />
      <br />
      <br />
      <MerchantBillingOrdersTitleRow />
      <MerchantBillingOrdersTable data={orders} />
    </Stack>
  )
}

export default MerchantBillingDetails

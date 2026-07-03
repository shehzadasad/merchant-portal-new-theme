import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchPayoutOrders, fetchPayouts } from 'redux/actions/BillingAction'
import SharedTable from 'shared/components/SharedTable'
import BillingOrdersTopRow from './BillingOrdersTopRow'
import BillingPayoutDetailsDataTable from './BillingPayoutDetailsTable'

const columns = [
  // {
  //   id: 'order_id',
  //   label: 'ORDER\u00a0ID',
  //   minWidth: 80,
  // },
  {
    id: 'order_number',
    label: 'ORDER\u00a0NUMBER',
    minWidth: 80,
  },
  {
    id: 'date',
    label: 'ORDER\u00a0DATE	',
    minWidth: 170,
    align: 'center',
    format: 'date',
  },
  {
    id: 'customer_email',
    label: 'CUSTOMER',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'payment_method',
    label: 'PAYMENT\u00a0METHOD	',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'fee',
    label: 'ORDER\u00a0FEE',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'merchant_order_id',
    label: 'MERCHANT\u00a0ORDER\u00a0ID',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'amount',
    label: 'ORDER AMOUNT',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'status',
    label: 'STATUS',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'store',
    label: 'STORE',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'view-details',
    minWidth: 100,
    align: 'center',
    format: 'img',
  },
]

const BillingPayoutDetails = () => {
  document.title = 'Billing Payout Details | QisstPay - Merchants'

  const dispatch = useDispatch()
  const userToken = localStorage.getItem('token')
  const payouts = useSelector((state) => state.billing.payouts)
  const data = useSelector((state) => state.billing.payoutOrders)
  const pageData = useSelector((state) => state.billing.payoutsPageData)
  const userDetail = useSelector((state) => state.users.userDetail)
  const [payoutDetail, setPayoutDetail] = useState({})
  const { id } = useParams()

  const fetchPayoutOrdersHelper = () => {
    dispatch(fetchPayoutOrders(id))
  }

  useEffect(() => {
    fetchPayoutOrdersHelper()
  }, [])

  useEffect(() => {
    if (userToken !== null && userToken.length > 0) {
      dispatch(fetchPayouts(userToken, pageData.number, userDetail.merchantId))
    }
  }, [userDetail])

  useEffect(() => {
    const tempPayoutDetail = payouts.filter((payout) => payout.id == id)

    setPayoutDetail(tempPayoutDetail[0])
  }, [payouts])
  return (
    <Stack spacing={5}>
      <BillingPayoutDetailsDataTable data={payoutDetail} />
      <BillingOrdersTopRow />
      <SharedTable
        rows={data}
        columns={columns}
        selectRole={true}
        title={'Orders'}
        detailsURL={'/orders/details'}
      />
    </Stack>
  )
}

export default BillingPayoutDetails

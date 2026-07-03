import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrdersAmount,
  fetchOrdersCount,
  fetchOrdersPendingAmount,
} from 'redux/actions/OrderAction'
import OrderGraph from './OrderGraph'

const OrdersTopRow = ({ userDetail }) => {
  const dispatch = useDispatch()

  const ordersCount = useSelector((state) => state.orders.ordersCount)
  const ordersAmount = useSelector((state) => state.orders.ordersAmount)

  const ordersPendingAmount = useSelector(
    (state) => state.orders.ordersPendingAmount
  )

  const getOrdersCount = () => {
    if (userDetail && userDetail.id) {
      dispatch(fetchOrdersCount(userDetail.id))
    }
  }

  const getOrdersAmount = () => {
    if (userDetail && userDetail.id) {
      dispatch(fetchOrdersAmount(userDetail.id))
    }
  }

  const getOrdersPendingAmount = () => {
    if (userDetail && userDetail.id) {
      dispatch(fetchOrdersPendingAmount(userDetail.id))
    }
  }

  useEffect(() => {
    if (userDetail) {
      getOrdersCount()
      getOrdersAmount()
      getOrdersPendingAmount()
    }
  }, [userDetail.id])

  return (
    <Grid container md={12} lg={12} marginTop={6}>
      <Grid item xs={12} md={4} lg={4}>
        <OrderGraph
          data={{
            id: 1,
            type: 'Order count by month',
            value: ordersCount.total_order_count ?? 0,
            growth: 2.5,
            icon: '/assets/images/dashboard/icon_revenue.png',
            strokeColor: '#11C15B',
            graphData: ordersCount.order_timeline,
          }}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <OrderGraph
          data={{
            id: 2,
            type: 'Order sale by month',
            value: `${
              userDetail?.iso2 === 'PK'
                ? 'Rs'
                : userDetail?.iso2 === 'PH'
                ? '₱'
                : '$ '
            } ${ordersAmount.orders_total_local_amount ?? 0}`,

            growth: -3.7,
            icon: '/assets/images/dashboard/icon_visits.png',
            strokeColor: '#11C15B',
            graphData: ordersAmount.local_amount_timeline,
          }}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <OrderGraph
          data={{
            id: 3,
            type: 'Orders Pending Amount',
            value: `${
              userDetail?.iso2 === 'PK'
                ? 'Rs'
                : userDetail?.iso2 === 'PH'
                ? '₱'
                : '$ '
            }  ${ordersPendingAmount?.pending_payouts_amount?.toFixed(2) ?? 0}`,

            growth: null,
            icon: '/assets/images/dashboard/icon_visits.png',
            strokeColor: '#F49820',
            graphData: [],
          }}
        />
      </Grid>
    </Grid>
  )
}

export default OrdersTopRow

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, filterOrders } from 'redux/actions/OrderAction'
import OrderSharedTable from './OrderSharedTable'

const columns = [
  // {
  //   id: 'order_id',
  //   label: 'ORDER\u00a0ID',
  //   minWidth: 80,
  // },
  {
    id: 'order_number',
    label: 'ORDER\u00a0NUMBER',
    minWidth: 20,
  },
  {
    id: 'date',
    label: 'ORDER\u00a0DATE	',
    minWidth: 200,
    align: 'center',
    format: 'date',
  },
  {
    id: 'customer_email',
    label: 'Customer Email',
    minWidth: 100,
  },
  {
    id: 'customer_name',
    label: 'Customer Name',
    minWidth: 120,
  },
  {
    id: 'customer_phone_number',
    label: 'CUSTOMER PHONE NUMBER',
    minWidth: 280,
    align: 'center',
  },
  {
    id: 'payment_method',
    label: 'PAYMENT\u00a0METHOD	',
    minWidth: 40,
    align: 'center',
  },
  {
    id: 'ep_account_no',
    label: 'ACCOUNT\u00a0NUMBER	',
    minWidth: 40,
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
    minWidth: 40,
    align: 'center',
  },
  {
    id: 'amount',
    label: 'ORDER AMOUNT',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'amount',
    label: 'PAID ORDER AMOUNT',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'merchant_installments',
    label: 'Payout Installments',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'status',
    label: 'ORDER\u00a0STATUS	',
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

export default function OrderTable({ userDetail, searchValue }) {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders.orders)
  console.log(orders, 'hos f')
  const filterOrder = orders?.filter((f) => f.status !== 'PROCESSING')

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = useSelector((state) => state.orders.totalPages)
  const totalOrders = useSelector((state) => state.orders.totalOrders)
  console.log('TOTAL ORders', totalOrders)
  console.log('TOTAL Pages', totalPages)

  const fetchOrdersHelper = () => {
    if (userDetail) {
      if (userDetail.id) {
        dispatch(fetchOrders(userDetail.id, searchValue, currentPage))
      }
    }
  }

  useEffect(() => {
    fetchOrdersHelper()
  }, [userDetail.id, currentPage])

  const handleFilter = (date) => {
    if (userDetail && userDetail.id) {
      let data = {
        startDate: '',
        endDate: '',
      }

      if (date === 'Today') {
        data = {
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
        }
      } else if (date === 'Yesterday') {
        data = {
          startDate: new Date(new Date().setDate(new Date().getDate() - 1))
            .toISOString()
            .split('T')[0],
          endDate: new Date(new Date().setDate(new Date().getDate() - 1))
            .toISOString()
            .split('T')[0],
        }
      } else if (date === 'Last 7 Days') {
        data = {
          startDate: new Date(new Date().setDate(new Date().getDate() - 7))
            .toISOString()
            .split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
        }
      } else if (date === 'Last 30 Days') {
        data = {
          startDate: new Date(new Date().setDate(new Date().getDate() - 30))
            .toISOString()
            .split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
        }
      }
      dispatch(filterOrders(data, userDetail.id))
    }
  }
  return (
    <OrderSharedTable
      rows={filterOrder}
      columns={columns}
      selectRole={false}
      selectDate={(value) => handleFilter(value)}
      title={'Orders'}
      detailsURL={'/orders/details'}
      totalPages={totalPages}
      totalOrders={totalOrders}
      pageLimit={10}
      currentPage={currentPage}
      setCurrentPage={(e) => setCurrentPage(e)}
      fetchOrdersHelper={fetchOrdersHelper}
    />
  )
}

import { Stack } from '@mui/material'
import CustomerOrdersSharedTable from './CustomerOrdersSharedTable'

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
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fee',
    label: 'ORDER\u00a0FEE',
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
    id: 'store',
    label: 'STORE',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'view-details',
    minWidth: 100,
    align: 'center',
    format: 'img',
  },
]
const CustomerOrdersTable = ({ data }) => {
  document.title = 'Customer Details | QisstPay - Merchants'

  return (
    <Stack spacing={8}>
      <CustomerOrdersSharedTable
        rows={data ?? []}
        columns={columns}
        selectRole={true}
        title={'Orders'}
        detailsURL={'/customers/order/details'}
      />
    </Stack>
  )
}

export default CustomerOrdersTable

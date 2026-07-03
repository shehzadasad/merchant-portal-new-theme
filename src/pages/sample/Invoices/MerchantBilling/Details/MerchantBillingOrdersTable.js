import MerchantBillingOrdersSharedTable from './MerchantBillingOrdersSharedTable'

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
    label: 'CUSTOMER',
    minWidth: 100,
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
    id: 'store',
    label: 'STORE',
    minWidth: 80,
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

export default function MerchantBillingOrdersTable({ data }) {
  return (
    <MerchantBillingOrdersSharedTable
      rows={data}
      columns={columns}
      title={'Orders'}
      detailsURL={'/merchantbilling/orders/details'}
    />
  )
}

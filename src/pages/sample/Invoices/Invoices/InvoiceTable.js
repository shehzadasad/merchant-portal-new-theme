import React from 'react'
import InvoiceSharedTable from './InvoiceSharedTable'

const columns = [
  {
    id: 'date',
    label: 'DATE	',
    minWidth: 10,
    align: 'center',
    format: 'date',
  },
  {
    id: 'invoice_id',
    label: 'Invoice\u00a0ID',
    minWidth: 20,
  },
  {
    id: 'order_number',
    label: 'Order\u00a0Number',
    minWidth: 20,
  },
  // {
  //   id: 'order_id',
  //   label: 'Order\u00a0ID',
  //   minWidth: 20,
  // },

  {
    id: 'customer',
    label: 'Customer Name',
    minWidth: 100,
  },
  {
    id: 'amount',
    label: 'AMOUNT',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'status',
    label: 'ORDER\u00a0STATUS	',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'view_link',
    label: 'Preview Invoice',
    minWidth: 80,
    align: 'center',
  },
]

const InvoiceTable = (props) => {
  return (
    <>
      <InvoiceSharedTable
        rows={props.invoices}
        columns={columns}
        title={'Invoices'}
        totalPages={props.totalPages}
        totalInvoices={props.totalInvoices}
        pageLimit={10}
        currentPage={props.currentPage}
        setCurrentPage={(e) => props.setCurrentPage(e)}
        detailsURL={'/orders/details'}
      />
    </>
  )
}

export default InvoiceTable

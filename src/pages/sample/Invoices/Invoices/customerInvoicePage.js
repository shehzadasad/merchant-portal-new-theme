import React, { useState, useEffect } from 'react'
// import CustomerInvoices from './Customer-invoices';
import CreateInvoice from './Create-invoice'
import InvoiceTitleRow from './InvoiceTitleRow'
import { Grid } from '@mui/material'
import InvoiceTable from './InvoiceTable'

import styles from './CustomerInvoices.module.css'

export default function CustomerInvoicePage(props) {
  const [invoiceList, setInvoiceList] = useState(true)
  const [createInvoice, setCreateInvoice] = useState(false)

  const [token, setToken] = useState('')

  function parse_query_string(query) {
    var vars = query.split('&')
    var query_string = {}
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      var key = decodeURIComponent(pair.shift())
      var value = decodeURIComponent(pair.join('='))
      // If first entry with this name
      if (typeof query_string[key] === 'undefined') {
        query_string[key] = value
        // If second entry with this name
      } else if (typeof query_string[key] === 'string') {
        var arr = [query_string[key], value]
        query_string[key] = arr
        // If third or later entry with this name
      } else {
        query_string[key].push(value)
      }
    }
    return query_string
  }

  // useEffect(() => {
  //     let urlParsed = parse_query_string(window.location.search.substring(1));
  //     let tempToken = urlParsed.token;

  //     setToken(tempToken);
  //     localStorage.setItem('token', tempToken);
  // }, [])

  function OnCreateInvoice() {
    setInvoiceList(false)
    setCreateInvoice(true)
  }

  function OffCreateInvoice() {
    setInvoiceList(true)
    setCreateInvoice(false)
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {/* {invoiceList && (
        <InvoiceTitleRow OnCreateInvoice={OnCreateInvoice} token={token} />
      )} */}
      {createInvoice && (
        <CreateInvoice OffCreateInvoice={OffCreateInvoice} token={token} />
      )}

      {/* <OrdersTopRow userDetail={userDetail} />
      <OrderTable userDetail={userDetail} /> */}
    </Grid>
  )
}

import React, { useState, useEffect } from 'react'
import InvoiceTitleRow from './InvoiceTitleRow'
import { Grid } from '@mui/material'
import InvoiceTable from './InvoiceTable'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import CustomerInvoicePage from './customerInvoicePage'
import CreateInvoice from './Create-invoice'

const Invoices = () => {
  const [searchParams, setSearchParams] = useState('')
  const userDetail = useSelector((state) => state.users.userDetail)

  const [currentPage, setCurrentPage] = useState(1)
  const [invoices, setInvoices] = useState([])
  const [totalInvoices, settotalInvoices] = useState(0)
  const [totalPages, settotalPages] = useState(0)

  const fetchData = () => {
    let postData = {
      token: userDetail.id,
    }
    axios
      .post(
        `${process.env.REACT_APP_INVOICE_API}/invoice/all?page=${currentPage}&limit=10&search=${searchParams}`,
        postData
      )
      .then((response) => {
        setInvoices(response.data.data.data)
        settotalInvoices(response.data.data.total)
        settotalPages(response.data.data.total_pages)
      })
  }

  useEffect(() => {
    fetchData()
  }, [userDetail, currentPage])

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      fetchData()
    }
  }

  const [invoiceList, setInvoiceList] = useState(true)
  const [createInvoice, setCreateInvoice] = useState(false)
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
      {createInvoice && <CreateInvoice OffCreateInvoice={OffCreateInvoice} />}
      {invoiceList && (
        <>
          <InvoiceTitleRow
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            handleKeypress={handleKeypress}
            OnCreateInvoice={OnCreateInvoice}
          />
          <CustomerInvoicePage />
          <InvoiceTable
            invoices={invoices}
            totalPages={totalPages}
            totalInvoices={totalInvoices}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Grid>
  )
}

export default Invoices

import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMerchantBillings } from 'redux/actions/MerchantBillingAction'
import MerchantBillingTable from './MerchantBillingTable'
import MerchantBillingTopRow from './MerchantBillingTopRow'

const columns = [
  {
    id: 'id',
    label: 'Billing ID',
    minWidth: 80,
    align: 'left',
  },
  {
    id: 'createdAt',
    label: 'Due Date',
    minWidth: 40,
    align: 'left',
    format: 'date',
  },
  {
    id: 'amount',
    label: 'Total Amount',
    minWidth: 40,
    align: 'center',
  },
  {
    id: 'balance',
    label: 'Total Balance',
    minWidth: 40,
    align: 'center',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'viewdetails',
    label: '',
    minWidth: 100,
    align: 'center',
    format: 'img',
  },
]

const MerchantBilling = () => {
  document.title = 'Merchant Billing | QisstPay - Merchants'
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [isFirst, setIsFirst] = useState(true)
  const merchantBillings = useSelector(
    (state) => state.merchantBillings.merchantBillings
  )
  const pageData = useSelector(
    (state) => state.merchantBillings.merchantBillingsPageData
  )

  const dispatch = useDispatch()

  const fetchMerchantBillingsAPI = () => {
    dispatch(fetchMerchantBillings(parseInt(0), 402))
  }

  useEffect(() => {
    fetchMerchantBillingsAPI()
  }, [])

  useEffect(() => {
    if (pageData) {
      setCurrentPage(pageData.currentPage ? pageData.currentPage + 1 : 1)
      setIsFirst(pageData.first ?? true)
      setTotalPages(pageData.totalPages ?? 1)
    }
  }, [pageData])

  return (
    <Container>
      <MerchantBillingTopRow />
      <MerchantBillingTable
        rows={merchantBillings}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={isFirst}
        setCurrentPage={(e) => setCurrentPage(e)}
        setTotalPages={(e) => setTotalPages(e)}
        setIsFirst={(e) => setIsFirst(e)}
      />
    </Container>
  )
}

export default MerchantBilling

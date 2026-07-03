import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayouts } from 'redux/actions/BillingAction'
import BillingSharedTable from './BillingSharedTable'

const columns = [
  { id: 'id', label: 'ID', minWidth: 80 },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 40,
    align: 'left',
    format: 'date',
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 40,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 40,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'view-details',
    minWidth: 100,
    align: 'center',
    format: 'img',
  },
]

export default function BillingTable() {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('token')
  const payouts = useSelector((state) => state.billing.payouts)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [isFirst, setIsFirst] = useState(true)
  const pageData = useSelector((state) => state.billing.payoutsPageData)
  const userDetail = useSelector((state) => state.users.userDetail)

  useEffect(() => {
    if (pageData) {
      setCurrentPage(pageData.currentPage ? pageData.currentPage + 1 : 1)
      setIsFirst(pageData.first ?? true)
      setTotalPages(pageData.totalPages ?? 1)
    }
  }, [pageData])

  useEffect(() => {
    if (userToken !== null && userToken.length > 0) {
      if (currentPage) {
        dispatch(
          fetchPayouts(
            userToken,
            parseInt(currentPage) - 1,
            userDetail.merchantId
          )
        )
      }
    }
  }, [userDetail.merchantId, currentPage])

  return (
    <BillingSharedTable
      rows={payouts}
      columns={columns}
      selectRole={true}
      title={'Billing'}
      billingURL={'/billingpayout/details'}
      currentPage={currentPage}
      totalPages={totalPages}
      isFirst={isFirst}
      setCurrentPage={(e) => setCurrentPage(e)}
      setTotalPages={(e) => setTotalPages(e)}
      setIsFirst={(e) => setIsFirst(e)}
    />
  )
}

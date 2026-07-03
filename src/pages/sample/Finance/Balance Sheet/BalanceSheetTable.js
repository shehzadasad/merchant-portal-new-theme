import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBalanceSheetList } from 'redux/actions/BillingAction'
import SheetSharedTable from 'shared/components/SheetSharedTable'

const columns = [
  {
    id: 'orderId',
    label: 'Order ID',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 200,
    align: 'left',
    format: 'date',
  },
  {
    id: 'merchantOrderId',
    label: 'Merchant\nOrder\nReference',
    minWidth: 200,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'debit',
    label: 'Debit',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'credit',
    label: 'Credit',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'balance',
    label: 'Balance',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 90,
    align: 'left',
  },
  {
    id: 'view-details',
    minWidth: 70,
    align: 'left',
    format: 'img',
  },
]

const BalanceSheetTable = () => {
  const dispatch = useDispatch()
  const balanceSheet = useSelector((state) => state.billing.balanceSheet)
  const [currentPage, setCurrentPage] = useState(1)
  const pageData = useSelector((state) => state.billing.sheetPageData)
  const userDetail = useSelector((state) => state.users.userDetail)
  // const [PageBtnCheck, setPageBtnCheck] = useState(false)

  // const fetchBalanceSheetAPI = () => {
  //   if (currentPage) {
  //     dispatch(
  //       fetchBalanceSheetList(parseInt(currentPage) - 1, userDetail.merchantId)
  //     )
  //   }
  // }

  const fetchBalanceSheetAPI = () => {
    if (userDetail) {
      if (userDetail.merchantId) {
        dispatch(fetchBalanceSheetList(currentPage - 1, userDetail.merchantId))
      }
    }
  }

  useEffect(() => {
    fetchBalanceSheetAPI()
  }, [userDetail.merchantId, currentPage])

  return (
    <SheetSharedTable
      rows={balanceSheet}
      columns={columns}
      selectRole={false}
      title={'Double Entry Ledger'}
      sheetsURL={'/balancesheet/details'}
      currentPage={currentPage}
      totalPages={pageData.totalPages}
      setCurrentPage={(e) => setCurrentPage(e)}
      totalElements={pageData.totalElements}
      pageLimit={10}
      // PageBtnCheck={PageBtnCheck}
      // setPageBtnCheck={setPageBtnCheck}
    />
  )
}

export default BalanceSheetTable

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Container, Grid, Typography } from '@mui/material'

import {
  fetchBalanceSheetList,
  fetchSheetOrders,
} from 'redux/actions/BillingAction'
import SharedTable from 'shared/components/SharedTable'
import BalanceSheetDetailsTable from './BalanceSheetDetailsTable'
import SheetsOrdersTopRow from './SheetsOrdersTopRow'
const { Stack } = require('@mui/material')

const columns = [
  // {
  //   id: 'order_id',
  //   label: 'ORDER\u00a0ID',
  //   minWidth: 80,
  // },
  { id: 'order_number', label: 'ORDER\u00a0NUMBER', minWidth: 80 },
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
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'merchant_order_id',
    label: 'MERCHANT\u00a0ORDER\u00a0ID',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'amount',
    label: 'ORDER AMOUNT',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'store',
    label: 'STORE',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'merchantreferenceid',
    label: 'Merchant Reference ID',
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
const BalanceSheetDetails = () => {
  document.title = 'Balance Sheet Details | QisstPay - Merchants'

  const { id } = useParams()
  const dispatch = useDispatch()
  const sheets = useSelector((state) => state.billing.balanceSheet)
  const sheetOrders = useSelector((state) => state.billing.sheetOrders)

  const userDetail = useSelector((state) => state.users.userDetail)
  const pageData = useSelector((state) => state.billing.sheetPageData)

  const [data, setData] = useState({})

  const fetchSheetOrdersHelper = () => {
    dispatch(fetchSheetOrders(id))
  }

  const fetchBalanceSheetListHelper = () => {
    dispatch(fetchBalanceSheetList(pageData.number, userDetail.merchantId))
  }

  useEffect(() => {
    fetchSheetOrdersHelper()
  }, [])

  useEffect(() => {
    fetchBalanceSheetListHelper()
  }, [])

  useEffect(() => {
    const tempSheets = sheets.filter((sheet) => sheet.id == id)

    setData(tempSheets[0])
  }, [sheets])

  return (
    <Stack spacing={8}>
      <Grid container style={{ marginBottom: '12px' }}>
        <Grid>
          <Link to='/balancesheet'>
            <ArrowBack />
          </Link>
        </Grid>
        <Typography variant='h2' component='h3' marginLeft={3}>
          Balance Sheet Details
        </Typography>
      </Grid>
      <BalanceSheetDetailsTable data={data} />
      <SheetsOrdersTopRow />
      <SharedTable
        rows={sheetOrders}
        columns={columns}
        selectRole={true}
        title={'Orders'}
        detailsURL={'/balancesheet/order/details'}
      />
    </Stack>
  )
}

export default BalanceSheetDetails

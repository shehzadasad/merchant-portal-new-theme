import { AppScrollbar } from '@crema'
import AppSelect from '@crema/core/AppSelect'
import { setAuthToken } from '@crema/services/auth/jwt-auth'
import { Box, Grid } from '@mui/material'
import comingsoon from 'assets/img/comingsoon.svg'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import BarChart from './BarChart'
import PieChart from './PieChart'
import DonutChart from './DonutChart'
import { fetchUserDetail } from 'redux/reducers/Users'
import DashboardAppCard from './Statistics/DashboardAppCard'
import StatisticsCards from './Statistics/StatisticsCards'
import CustomerItem from './TopCustomers/CustomerItem'
import Worldmap from './Worldmap'
import {
  getOrdersByCities,
  getTopCustomers,
  getOrdersSuccessful,
  getAverageOrderBySource,
  getTransactions,
  getTopProducts,
  getRevenueAndOrderCount,
  getUserDevices,
} from 'redux/actions/DashboardAction'
import LineChart from './LineChart/LineChart'
var encodeUrl = require('encodeurl')

const Dashboard = () => {
  document.title = 'Dashboard | QisstPay - Merchants'
  const [name, setName] = useState('')
  const [graphs, setGraphs] = useState(false)
  const [topCustomers, setTopCustomers] = useState([])
  const [orderSuccessfull, setOrderSuccessfull] = useState()
  const [averageOrderByValue, setAverageOrderByValue] = useState([])
  const [ordersByCities, setOrdersByCities] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [revenueData, setRevenueData] = useState([])
  const [noOfOrdersData, setNoOfOrdersDataData] = useState([])
  const userDetail = useSelector((state) => state.users.userDetail)
  const [filterStatisticDate, setFilterStatisticDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterTransactionDate, setFilterTransactionDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterOrderDate, setFilterOrderDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterRevenueDate, setFilterRevenueDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterNoOfOrdersDate, setFilterNoOfOrdersDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterAverageOrderDate, setFilterAverageOrderDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterTopProductDate, setFilterTopProductDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterTopCustomerDate, setFilterTopCustomerDate] = useState({
    date: 'all',
    name: '',
  })
  const [filterOrdersByCityDate, setFilterOrdersByCityDate] = useState({
    date: 'all',
    name: '',
  })
  const [StatisticsFilter, setStatisticsFilter] = useState('')
  const [ordersByCityFilter, setOrdersByCitiesFilter] = useState('')
  const [topCustomerFilter, setTopCustomerFilter] = useState('')
  const [averageOrderFilter, setAverageOrderFilter] = useState('')
  const [topProductsFilter, setTopProductsFilter] = useState('')
  const [revenueFilter, setRevenueFilter] = useState('')
  const [noOfOrdersFilter, setNoOfOrdersFilter] = useState('')
  const [ordersSuccessfullFilter, setOrdersSuccessfullFilter] = useState('')
  const [transactionFilter, setTransactionFilter] = useState('')
  const dispatch = useDispatch()

  const topCustomersColumns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 200,
      align: 'center',
    },
    {
      id: 'orderCount',
      label: 'Orders',
      minWidth: 20,
    },

    {
      id: 'aov',
      label: 'Average order value',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'customerUserId',
      label: 'ID',
      minWidth: 80,
      align: 'center',
    },
  ]
  const topProductsColumns = [
    {
      id: 'no',
      label: 'No.',
      minWidth: 20,
    },
    {
      id: 'title',
      label: 'Item',
      width: 30,
    },
    {
      id: 'volume',
      label: 'Volume',
      minWidth: 15,
    },
    {
      id: 'price',
      label: 'Price',
      width: 60,
    },
  ]
  const { messages } = useIntl()

  useEffect(() => {
    if (userDetail) {
      setName(userDetail.name)
    }
  }, [userDetail])

  useEffect(() => {
    if (window.location.search) {
      const accessToken = window.location.search.split('&')[0].split('=')[1]
      const userId = window.location.search.split('&')[1].split('=')[1]

      localStorage.setItem('token', accessToken)
      localStorage.setItem('userId', userId)

      dispatch(fetchUserDetail())

      toast.success('Successfully logged in')
      setAuthToken(accessToken)
      window.location.href = '/dashboard'
    }
  }, [])

  useEffect(() => {
    dispatch(
      getTopCustomers(
        userDetail?.merchantId,
        setTopCustomers,
        topCustomerFilter
      )
    )
    dispatch(
      getOrdersSuccessful(
        userDetail?.merchantId,
        setOrderSuccessfull,
        ordersSuccessfullFilter
      )
    )
    dispatch(
      getAverageOrderBySource(
        userDetail?.merchantId,
        setAverageOrderByValue,
        averageOrderFilter
      )
    )
    dispatch(
      getOrdersByCities(
        userDetail?.merchantId,
        setOrdersByCities,
        ordersByCityFilter
      )
    )
    dispatch(
      getTransactions(
        userDetail?.merchantId,
        setTransactionData,
        transactionFilter
      )
    )
    dispatch(
      getTopProducts(userDetail?.merchantId, setTopProducts, topProductsFilter)
    )
    dispatch(
      getRevenueAndOrderCount(
        userDetail?.merchantId,
        setRevenueData,
        revenueFilter
      )
    )
    dispatch(
      getRevenueAndOrderCount(
        userDetail?.merchantId,
        setNoOfOrdersDataData,
        noOfOrdersFilter
      )
    )
    // dispatch(getUserDevices(userDetail?.merchantId,setDeviceData ))
  }, [userDetail])

  useEffect(() => {
    dispatch(
      getOrdersByCities(
        userDetail?.merchantId,
        setOrdersByCities,
        ordersByCityFilter
      )
    )
  }, [ordersByCityFilter])

  useEffect(() => {
    dispatch(
      getTopCustomers(
        userDetail?.merchantId,
        setTopCustomers,
        topCustomerFilter
      )
    )
  }, [topCustomerFilter])

  useEffect(() => {
    dispatch(
      getAverageOrderBySource(
        userDetail?.merchantId,
        setAverageOrderByValue,
        averageOrderFilter
      )
    )
  }, [averageOrderFilter])
  useEffect(() => {
    dispatch(
      getTopProducts(userDetail?.merchantId, setTopProducts, topProductsFilter)
    )
  }, [topProductsFilter])
  useEffect(() => {
    dispatch(
      getRevenueAndOrderCount(
        userDetail?.merchantId,
        setRevenueData,
        revenueFilter
      )
    )
  }, [revenueFilter])
  useEffect(() => {
    dispatch(
      getRevenueAndOrderCount(
        userDetail?.merchantId,
        setNoOfOrdersDataData,
        noOfOrdersFilter
      )
    )
  }, [noOfOrdersFilter])
  useEffect(() => {
    dispatch(
      getOrdersSuccessful(
        userDetail?.merchantId,
        setOrderSuccessfull,
        ordersSuccessfullFilter
      )
    )
  }, [ordersSuccessfullFilter])
  useEffect(() => {
    dispatch(
      getTransactions(
        userDetail?.merchantId,
        setTransactionData,
        transactionFilter
      )
    )
  }, [transactionFilter])

  const handleFilter = (filterDate) => {
    let data = {
      fromDateStr: '',
      toDateStr: '',
    }

    if (filterDate.date === 'today') {
      data = {
        fromDateStr: new Date().toISOString().split('T')[0],
        toDateStr: new Date().toISOString().split('T')[0],
      }
    } else if (filterDate.date === 'yesterday') {
      data = {
        fromDateStr: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
        toDateStr: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
      }
    } else if (filterDate.date === 'week') {
      data = {
        fromDateStr: new Date(new Date().setDate(new Date().getDate() - 7))
          .toISOString()
          .split('T')[0],
        toDateStr: new Date().toISOString().split('T')[0],
      }
    } else if (filterDate.date === 'month') {
      data = {
        fromDateStr: new Date(new Date().setDate(new Date().getDate() - 30))
          .toISOString()
          .split('T')[0],
        toDateStr: new Date().toISOString().split('T')[0],
      }
    } else {
      data = {}
    }

    let dataObj = JSON.stringify(data)
    var obj = encodeUrl(dataObj)

    if (filterDate.name === 'Statistics') {
      setStatisticsFilter(obj)
    }

    if (filterDate.name === 'Orders by city') {
      setOrdersByCitiesFilter(obj)
    }
    if (filterDate.name === 'Top Customers') {
      setTopCustomerFilter(obj)
    }
    if (filterDate.name === 'Average Order Value') {
      setAverageOrderFilter(obj)
    }
    if (filterDate.name === 'Top Selling Products') {
      setTopProductsFilter(obj)
    }
    if (filterDate.name === 'Revenue') {
      setRevenueFilter(obj)
    }
    if (filterDate.name === 'Number of Orders') {
      setNoOfOrdersFilter(obj)
    }
    if (filterDate.name === 'Orders') {
      setOrdersSuccessfullFilter(obj)
    }
    if (filterDate.name === 'Transaction') {
      setTransactionFilter(obj)
    }
  }
  useEffect(() => {
    if (filterStatisticDate) {
      handleFilter(filterStatisticDate)
    }
    if (filterOrderDate) {
      handleFilter(filterOrderDate)
    }
    if (filterTransactionDate) {
      handleFilter(filterTransactionDate)
    }

    if (filterRevenueDate) {
      handleFilter(filterRevenueDate)
    }
    if (filterNoOfOrdersDate) {
      handleFilter(filterNoOfOrdersDate)
    }
    if (filterAverageOrderDate) {
      handleFilter(filterAverageOrderDate)
    }
    if (filterTopProductDate) {
      handleFilter(filterTopProductDate)
    }
    if (filterTopCustomerDate) {
      handleFilter(filterTopCustomerDate)
    }
    if (filterOrdersByCityDate) {
      handleFilter(filterOrdersByCityDate)
    }
  }, [
    filterStatisticDate,
    filterOrderDate,
    filterTransactionDate,
    filterRevenueDate,
    filterNoOfOrdersDate,
    filterAverageOrderDate,
    filterTopProductDate,
    filterTopCustomerDate,
    filterOrdersByCityDate,
  ])

  return (
    <>
      <h1>Welcome {name}</h1>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DashboardAppCard
            sxStyle={{
              mb: { xs: 5, md: 8 },
              minHeight: 310,
            }}
            isInfo={false}
            title={messages['dashboard.statistics']}
            setFilterDate={setFilterStatisticDate}
            filterDate={filterStatisticDate}
            action={
              <AppSelect menus={['This Week']} defaultValue='This Week' />
            }
          >
            <StatisticsCards StatisticsFilter={StatisticsFilter} />
          </DashboardAppCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardAppCard
            isInfo={false}
            title={'Orders'}
            setFilterDate={setFilterOrderDate}
            filterDate={filterOrderDate}
            action={
              <AppSelect menus={['This Week']} defaultValue='This Week' />
            }
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box>
                <DonutChart
                  data={orderSuccessfull}
                  labels={['Accepted', 'Not-accepted']}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              ></Box>
            </Box>
          </DashboardAppCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardAppCard
            isInfo={false}
            title={'Transaction'}
            setFilterDate={setFilterTransactionDate}
            filterDate={filterTransactionDate}
            action={
              <AppSelect menus={['This Week']} defaultValue='This Week' />
            }
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box>
                <DonutChart
                  data={transactionData}
                  title={'transactions'}
                  labels={['Guest ', '1-Click', ' Stack Payment']}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              ></Box>
            </Box>
          </DashboardAppCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardAppCard
            sxStyle={{
              mb: { xs: 5, md: 8 },
              minHeight: 230,
            }}
            isInfo={false}
            title={messages['dashboard.revenue']}
            setFilterDate={setFilterRevenueDate}
            filterDate={filterRevenueDate}
            action={
              <AppSelect
                menus={['This Week', 'Last Week', 'This Month']}
                defaultValue='This Week'
              />
            }
          >
            <LineChart title='revenue' revenueData={revenueData} />
            {/* <BarChart revenueData={revenueData}  title='revenue'/> */}
          </DashboardAppCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardAppCard
            sxStyle={{
              mb: { xs: 5, md: 8 },
              minHeight: 230,
            }}
            isInfo={false}
            title={'Number of Orders'}
            setFilterDate={setFilterNoOfOrdersDate}
            filterDate={filterNoOfOrdersDate}
            action={
              <AppSelect
                menus={['This Week', 'Last Week', 'This Month']}
                defaultValue='This Week'
              />
            }
          >
            {/* <LineChart title='orders' noOfOrdersData={noOfOrdersData} /> */}
            <BarChart title='orders' noOfOrdersData={noOfOrdersData} />
          </DashboardAppCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardAppCard
            sxStyle={{
              mb: { xs: 5, md: 8 },
              minHeight: 230,
            }}
            title={'Average Order Value'}
            isInfo={false}
            setFilterDate={setFilterAverageOrderDate}
            filterDate={filterAverageOrderDate}
            action={
              <AppSelect
                menus={['This Week', 'Last Week', 'This Month']}
                defaultValue='This Week'
              />
            }
          >
            <BarChart
              title='averageOrders'
              averageOrder={averageOrderByValue}
            />
          </DashboardAppCard>
        </Grid>
        {/* <Grid item xs={12} md={6}>
              <DashboardAppCard
                sxStyle={{
                  mb: { xs: 5, md: 8 },
                  minHeight: 230,
                }}
                isInfo={false}
                title={'Comming Soon'}
                action={
                  <AppSelect
                    menus={['This Week', 'Last Week', 'This Month']}
                    defaultValue='This Week'
                  />
                }
              >
                <BarChart title='conversionRate' />
              </DashboardAppCard>
            </Grid> */}
        <Grid item xs={12} md={6}>
          <DashboardAppCard
            sxStyle={{
              mb: { xs: 5, md: 8 },
              minHeight: 230,
            }}
            title={'Orders by City'}
            isInfo={false}
            setFilterDate={setFilterOrdersByCityDate}
            filterDate={filterOrdersByCityDate}
            action={
              <AppSelect
                menus={['This Week', 'Last Week', 'This Month']}
                defaultValue='This Week'
              />
            }
          >
            <Grid container display={'flex'}>
              {/* <Grid item xs={5}>
                    <Worldmap />
                  </Grid> */}
              <Grid item xs={6}>
                <BarChart title='mapcities' ordersByCities={ordersByCities} />
              </Grid>
            </Grid>
          </DashboardAppCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardAppCard
            isInfo={false}
            title={'Top Selling Products'}
            contentStyle={{ px: 0 }}
            setFilterDate={setFilterTopProductDate}
            filterDate={filterTopProductDate}
            action={
              <AppSelect
                menus={['This Week', 'Last Week', 'This Month']}
                defaultValue='This Week'
              />
            }
          >
            {/* <AppScrollbar sx={{ maxHeight: 280 }}> */}
            <CustomerItem
              columns={topProductsColumns}
              tableData={topProducts}
            />
            {/* </AppScrollbar> */}
          </DashboardAppCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardAppCard
            isInfo={false}
            title={'Top Customers'}
            contentStyle={{ px: 0 }}
            setFilterDate={setFilterTopCustomerDate}
            filterDate={filterTopCustomerDate}
            action={
              <AppSelect
                menus={['This Week', 'Last Week', 'This Month']}
                defaultValue='This Week'
              />
            }
          >
            {/* <AppScrollbar sx={{ maxHeight: 280 }}> */}
            <CustomerItem
              columns={topCustomersColumns}
              tableData={topCustomers}
            />
            {/* </AppScrollbar> */}
          </DashboardAppCard>
        </Grid>
        {/* <Grid item xs={12} md={4} mt={'30px'}>
              <DashboardAppCard
                sxStyle={{
                  mb: { xs: 5, md: 8 },
                  height: '420px',
                }}
                isInfo={false}
                title={'QP-customer Reach by device'}
                // action={
                //   <AppSelect
                //     menus={['This Week', 'Last Week', 'This Month']}
                //     defaultValue='This Week'
                //   />
                // }
              >
                <PieChart data={deviceData}/>
              </DashboardAppCard>
            </Grid> */}
      </Grid>
    </>
  )
}

export default Dashboard

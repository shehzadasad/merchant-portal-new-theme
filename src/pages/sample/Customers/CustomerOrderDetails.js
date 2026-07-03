import { ArrowBack } from '@mui/icons-material'
import {
  Container,
  Grid,
  Paper,
  TableContainer,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderDetails } from 'redux/actions/OrderAction.js'
import CustomerOrderDetailsTable from './CustomerOrderDetailsTable'

const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'name',
    label: 'Product',
    minWidth: 250,
    align: 'center',
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'unit_price',
    label: 'Unit Price',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'amount',
    label: 'Unit Price',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'brand',
    label: 'Brand',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sku',
    label: 'SKU',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'view-details',
    label: ' ',
    minWidth: 30,
    align: 'center',
    format: 'img',
  },
]

const CustomerOrderDetails = () => {
  document.title = 'Customer Order Details | QisstPay - Merchants'
  const { id } = useParams()

  const dispatch = useDispatch()

  const [orderDetail, setOrderDetail] = useState({})
  const [orderBillingDetail, setOrderBillingDetail] = useState({})
  const [orderShippingDetail, setOrderShippingDetail] = useState({})
  const [orderItemDetail, setOrderItemDetail] = useState([])
  const orderDetails = useSelector((state) => state.orders.orderDetails)

  const fetchOrderDetailsHelper = (id) => {
    dispatch(fetchOrderDetails(id))
  }

  const divideData = ({
    order_details,
    billing_details,
    shipping_details,
    order_items_details,
  }) => {
    setOrderDetail(order_details)
    setOrderBillingDetail(billing_details)
    setOrderShippingDetail(shipping_details)
    setOrderItemDetail(order_items_details)
  }

  useEffect(() => {
    if (id) {
      fetchOrderDetailsHelper(id)
    }
  }, [id])

  useEffect(() => {
    if (orderDetails) {
      divideData(orderDetails)
    }
  }, [orderDetails])

  return (
    <Container>
      <Grid container>
        <Link to={'/customers'}>
          <ArrowBack />
        </Link>
        <Typography variant='h2' component='h3' marginLeft={3}>
          Details
        </Typography>
      </Grid>
      <CustomerOrderDetailsTable
        rows={Array.isArray(orderItemDetail) ? orderItemDetail : []}
        columns={Array.isArray(columns) ? columns : []}
        timeRange={false}
        title={'Order Items'}
      />
      <Typography variant='h2' component='h3' marginTop={8}>
        Order Details
      </Typography>
      <TableContainer
        component={Paper}
        style={{ marginTop: 38, borderRadius: 10 }}
      >
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Order Number
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderDetail && orderDetail.order_id}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Customer
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderDetail && orderDetail.customer_email}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Payment Method
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderDetail && orderDetail.payment_method}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Order Fee
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderDetail && orderDetail.fee}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Merchant Order Id
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderDetail && orderDetail.merchant_order_id}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Amount
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderDetail && orderDetail.amount}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Order Status
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              <Box
                sx={{
                  color: '#11C15B',
                  backgroundColor: '#CFF3DE',
                  padding: '4px 30px',
                  borderRadius: '15px',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {orderDetail && orderDetail.status}
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
        >
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Store
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderDetail && orderDetail.store}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
      <Grid
        container
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Grid item style={{ width: '40vw', flex: '1 0 30%' }}>
          <Typography variant='h2' component='h3' marginTop={8}>
            Billing Details
          </Typography>
          <TableContainer
            component={Paper}
            style={{ marginTop: 38, borderRadius: 10 }}
          >
            <Grid
              container
              sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Address
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderBillingDetail && orderBillingDetail.billing_address1}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Address 2
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderBillingDetail && orderBillingDetail.billing_address2}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  City
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderBillingDetail && orderBillingDetail.billing_city}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ padding: 5, borderBottomWidth: 1 }}>
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  State
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderBillingDetail && orderBillingDetail.billing_state}
                </Typography>
              </Grid>
            </Grid>
          </TableContainer>
        </Grid>
        <Grid item style={{ width: '40vw', flex: '1 0 30%', marginLeft: 10 }}>
          <Typography variant='h2' component='h3' marginTop={8}>
            Shipping Details
          </Typography>
          <TableContainer
            component={Paper}
            style={{ marginTop: 38, borderRadius: 10 }}
          >
            <Grid
              container
              sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Address
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderShippingDetail && orderShippingDetail.shipping_address1}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Address 2
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderShippingDetail && orderShippingDetail.shipping_address2}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  City
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderShippingDetail && orderShippingDetail.shipping_city}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ padding: 5, borderBottomWidth: 1 }}>
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  State
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  {orderShippingDetail && orderShippingDetail.shipping_state}
                </Typography>
              </Grid>
            </Grid>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CustomerOrderDetails

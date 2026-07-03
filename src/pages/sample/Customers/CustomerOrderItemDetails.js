import { ArrowBack } from '@mui/icons-material'
import {
  Container,
  Grid,
  Paper,
  TableContainer,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderDetails } from 'redux/actions/OrderAction'

const CustomerOrderItemDetails = () => {
  document.title = 'Customer Order Item Details | QisstPay - Merchants'
  const { id, itemId } = useParams()
  const dispatch = useDispatch()
  const [orderItemDetail, setOrderItemDetail] = useState({})
  const orderDetails = useSelector((state) => state.orders.orderDetails)

  const fetchOrderDetailsHelper = (id) => {
    dispatch(fetchOrderDetails(id))
  }

  const divideData = ({ order_items_details }) => {
    if (order_items_details) {
      const orderItemDetailObject = order_items_details.filter(
        (item) => item.id == itemId
      )
      setOrderItemDetail(orderItemDetailObject[0])
    }
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
        <Link to={`/customers/order/details/${id}`}>
          <ArrowBack />
        </Link>
        <Typography variant='h2' component='h3' marginLeft={3}>
          Order Item Details
        </Typography>
      </Grid>
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
              ID
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderItemDetail && orderItemDetail.id}
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
              Product
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderItemDetail && orderItemDetail.name}
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
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderItemDetail && orderItemDetail.quantity}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
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
              Unit Price
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderItemDetail && orderItemDetail.unit_price}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}>
          <Grid item xs={2} md={2} lg={2}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Brand
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderItemDetail && orderItemDetail.brand}
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
              SKU
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant='p' component='p' fontSize={14}>
              {orderItemDetail && orderItemDetail.sku}
            </Typography>
          </Grid>
        </Grid>
      </TableContainer>
    </Container>
  )
}

export default CustomerOrderItemDetails

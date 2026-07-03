import { Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getReturnOrderDetail } from 'redux/actions/ReturnAction'
import ReturnsOrderDetailsTable from './ReturnsOrderDetailsTable'
import { ArrowBack } from '@mui/icons-material'
import RefundOrderDetailsVerticalTable from './RefundOrderDetailsVerticalTable'
import RefundBillingDetailsVerticalTable from './RefundBillingDetailsVerticalTable'
const ReturnOrderDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [returnOrderDetails, setReturnOrderDetails] = useState([])
  const [refundItems, setRefundItems] = useState([])
  const [billingDetail, setBillingDetail] = useState([])
  const [shippingDetails, setShippingDetails] = useState([])
  document.title = 'Customer Details | QisstPay - Merchants'
  //userCred
  const userDetail = useSelector((state) => state.users.userDetail)
  const currentPage = useSelector((state) => state.customer.currentPage)

  const getReturnOrderListAPI = () => {
    dispatch(
      getReturnOrderDetail(
        id,
        setRefundItems,
        setReturnOrderDetails,
        setBillingDetail,
        setShippingDetails,
        currentPage,
        userDetail.id
      )
    )
  }

  useEffect(() => {
    getReturnOrderListAPI()
  }, [])

  return (
    <Container>
      <Grid
        container
        alignItems='center'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Grid item>
          <Grid container>
            <Grid>
              <Link to='/returns-phase-2'>
                <ArrowBack />
              </Link>
            </Grid>
            <Typography variant='h2' component='h3' marginLeft={3}>
              Details
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <ReturnsOrderDetailsTable refundItems={refundItems} />
      <Grid container marginTop={10} spacing={5}>
        <Grid item xs={12} md={12} marginRight={5}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
            Order Details
          </Typography>
          <RefundOrderDetailsVerticalTable
            returnOrderDetails={returnOrderDetails}
          />
        </Grid>
        <Grid item xs={12} md={5.7} style={{ marginTop: '50px' }}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
            Billing Details
          </Typography>
          <RefundBillingDetailsVerticalTable billingDetail={billingDetail} />
        </Grid>
        <Grid item xs={12} md={5.7} style={{ marginTop: '50px' }}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
            Shipping Details
          </Typography>
          <RefundBillingDetailsVerticalTable
            shippingDetails={shippingDetails}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ReturnOrderDetails

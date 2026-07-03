import React, { useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import AbandonedBillingDetail from './AbandonedBillingDetail'
import AbandonedOrderDetailTable from './AbandonedOrderDetailTable'
import AbandonedOrderTable from './AbandonedOrderTable'
import AbandonedShippingDetail from './AbandonedShippingDetail'
import RecoveryCart from './RecoveryCart'
import { ArrowBack } from '@mui/icons-material'
import { encode, decode } from 'js-base64'

const CustomerDetails = () => {
  let { id } = useParams()
  const [Loader, setLoader] = useState(true)
  const userDetail = useSelector((state) => state.users.userDetail)
  const [AbandonedCartData, setAbandonedCartData] = useState(false)

  const fetchAbandonedCart = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(
      process.env.REACT_APP_API_URL +
        `ms-merchant-portal/cart/merchants/${userDetail.merchantId}/abandoned`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setAbandonedCartData(result)
          setLoader(false)
        }
      })
      .catch((error) => console.log('error', error))
  }

  useEffect(() => {
    if (userDetail.merchantId && isNaN(parseInt(decode(id))) === false) {
      fetchAbandonedCart()
    }
  }, [userDetail.merchantId])

  return Loader === true ? (
    'Loading...'
  ) : (
    <Container>
      {AbandonedCartData.filter(
        (fl) => JSON.parse(fl.data).sessionID === decode(id)
      ).map((item) => {
        const items = JSON.parse(item.data)

        return (
          <>
            <Grid container style={{ marginBottom: '12px' }}>
              <Grid>
                <Link className='backArrow' to='/abandoned-cart'>
                  <ArrowBack />
                </Link>
              </Grid>
              <Typography variant='h2' component='h3' marginLeft={3}>
                Details
              </Typography>
            </Grid>
            <RecoveryCart link={item.checkoutUrl} />
            <Grid item xs={12} md={5.7} lg={5.7} marginRight={5}>
              <Typography
                variant='p'
                component='p'
                fontWeight={500}
                fontSize={18}
              >
                Order Items
              </Typography>
            </Grid>
            <AbandonedOrderTable
              rows={items.orderItems}
              totalAmount={items.totalAmount}
            />
            <Grid
              item
              xs={12}
              md={5.7}
              lg={5.7}
              marginRight={5}
              marginTop={'30px'}
            >
              <Typography
                variant='p'
                component='p'
                fontWeight={500}
                fontSize={18}
              >
                Order Details
              </Typography>
            </Grid>

            <AbandonedOrderDetailTable AbandonedCartData={items} />
            <Grid container marginTop={10}>
              <Grid item xs={12} md={5.7} lg={5.7} marginRight={5}>
                <Typography
                  variant='p'
                  component='p'
                  fontWeight={500}
                  fontSize={18}
                >
                  Shipping Details
                </Typography>
                <AbandonedShippingDetail
                  AbandonedCartData={items.shippingDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontWeight={500}
                  fontSize={18}
                >
                  Billing Info
                </Typography>
                <AbandonedBillingDetail
                  AbandonedCartData={items.billingDetails}
                />
              </Grid>
            </Grid>
          </>
        )
      })}
    </Container>
  )
}

export default CustomerDetails

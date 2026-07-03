import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CheckoutViews from './CheckoutViews.js'
import PaymentProcessors from './PaymentProcessors.js'
import View from './View.js'

const PaymentMethods = () => {
  const [posts, setPosts] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (posts.length > 0) {
      setIsDataLoaded(true)
    }
  }, [posts])

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch('https://reqres.in/api/products/3', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setPosts(result)
      })
      .catch((error) => console.log('error', error))
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <CheckoutViews />
        </Grid>
        <Grid item xs={9}>
          <PaymentProcessors />
        </Grid>
        <Grid item xs={3}>
          <View />
        </Grid>
      </Grid>
    </>
  )
}

export default PaymentMethods

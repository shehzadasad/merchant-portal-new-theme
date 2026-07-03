import axios from 'axios'
import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayouts } from 'redux/actions/BillingAction'
import SharedButton from 'shared/components/SharedButton'
import { useParams } from 'react-router-dom'
const BillingTopRow = () => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('token')
  const { id } = useParams()
  const payouts = useSelector((state) => state.billing.payouts)
  const pageData = useSelector((state) => state.billing.payoutsPageData)
  const userDetail = useSelector((state) => state.users.userDetail)

  const getPayoutListAPI = () => {
    if (userToken !== null && userToken.length > 0) {
      dispatch(fetchPayouts(userToken, pageData.number, userDetail.merchantId))
    }
  }
  useEffect(() => {
    getPayoutListAPI()
  }, [userToken])

  const handleCSVExport = () => {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/finance/PayoutOrdersCsv/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (response) {
        var blob = new Blob([response.data], {
          type: 'text/csv;charset=utf-8;',
        })

        var url = URL.createObjectURL(blob)

        var pom = document.createElement('a')
        pom.href = url
        pom.setAttribute('download', 'orders.csv')
        pom.click()

        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Grid
      container
      alignItems='center'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Grid item>
        <Typography
          variant='h1'
          component='h2'
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              marginBottom: 3,
            },
          })}
        >
          Billing Payout
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
        alignItems='center'
      >
        <Grid item xs={6} md={4} lg={4}>
          {pageData.totalElements > 0 ? (
            <SharedButton
              text='Export CSV'
              style={{
                background: '#e93a7d',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: 150,
                border: 'none',
                height: 40,
                cursor: 'pointer',
              }}
              onClick={handleCSVExport}
            />
          ) : (
            <SharedButton
              text='Export CSV'
              style={{
                background: '#979797',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: 150,
                border: 'none',
                height: 40,
                // cursor: 'pointer',
              }}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BillingTopRow

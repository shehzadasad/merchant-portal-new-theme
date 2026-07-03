import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayouts } from 'redux/actions/BillingAction'
import { convertOrdersToCSV } from 'redux/actions/OrderAction'
import SharedButton from 'shared/components/SharedButton'
import SharedSearchBox from 'shared/components/SharedSearchBox'

const BillingOrdersTopRow = () => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('token')
  const userDetail = useSelector((state) => state.users.userDetail)
  const payouts = useSelector((state) => state.billing.payouts)
  const pageData = useSelector((state) => state.billing.payoutsPageData)

  useEffect(() => {
    if (userToken !== null && userToken.length > 0) {
      dispatch(fetchPayouts(userToken, pageData.number, userDetail.merchantId))
    }
  }, [userDetail])

  const handleCSVExport = () => {
    dispatch(convertOrdersToCSV(payouts))
  }

  return (
    <Grid container alignItems='center'>
      <Grid item xs={12} sm={5} md={5} lg={window.innerWidth > 1200 ? 7 : 5}>
        <Typography
          variant='h1'
          component='h2'
          sx={(theme) => ({
            [theme.breakpoints.down('lg')]: {
              marginBottom: 5,
            },
          })}
        >
          Orders
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid
            item
            xs={6}
            sm={5}
            md={4}
            lg={4}
            sx={(theme) => ({
              [theme.breakpoints.down('md')]: {
                marginRight: 0,
              },
              [theme.breakpoints.up('md')]: {
                marginRight: 7,
                marginBottom: 10,
              },
            })}
          >
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
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={6}
            lg={6}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                marginTop: 5,
              },
            })}
          >
            <SharedSearchBox width={window.innerWidth > 600 ? 290 : '100%'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default BillingOrdersTopRow

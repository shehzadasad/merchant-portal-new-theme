import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  convertSheetToCSV,
  fetchBalanceSheetList,
} from 'redux/actions/BillingAction'
import SharedButton from 'shared/components/SharedButton'
import SharedSearchBox from 'shared/components/SharedSearchBox'
const BalanceSheetTopRow = () => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('token')
  const sheets = useSelector((state) => state.billing.balanceSheet)
  const userDetail = useSelector((state) => state.users.userDetail)
  const pageData = useSelector((state) => state.billing.sheetPageData)

  const getSheetsListHelper = () => {
    dispatch(fetchBalanceSheetList(pageData.number, userDetail.merchantId))
  }

  useEffect(() => {
    getSheetsListHelper()
  }, [userToken])

  const handleCSVExport = () => {
    dispatch(convertSheetToCSV(userDetail.merchantId))
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
          Balance Sheet
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
        <Grid
          item
          xs={6}
          md={4}
          lg={4}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              marginRight: 0,
            },
          })}
        >
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

export default BalanceSheetTopRow

import { ArrowBack } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { convertOrdersToCSV } from 'redux/actions/OrderAction'
import SharedButton from 'shared/components/SharedButton'

const CustomerOrdersTopRow = ({ merchant_customer_orders }) => {
  const dispatch = useDispatch()

  const handleCSVExport = () => {
    dispatch(convertOrdersToCSV(merchant_customer_orders))
  }
  if (merchant_customer_orders) {
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
          <Grid container>
            <Grid>
              <Link to='/customers'>
                <ArrowBack />
              </Link>
            </Grid>
            <Typography variant='h2' component='h3' marginLeft={3}>
              Details
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item>
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
          </Grid>
        </Grid>
      </Grid>
    )
  } else {
    return <h1>loading...</h1>
  }
}
export default CustomerOrdersTopRow

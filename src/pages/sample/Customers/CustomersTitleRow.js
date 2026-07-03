import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  convertCustomersToCSV,
  searchCustomers,
  fetchCustomers,
} from 'redux/actions/CustomerAction'
import SharedButton from 'shared/components/SharedButton'
import SharedSearchBox from 'shared/components/SharedSearchBox'

const CustomersTitleRow = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const customers = useSelector((state) => state.customer.customers)
  const currentPage = useSelector((state) => state.customer.currentPage)
  const userDetail = useSelector((state) => state.users.userDetail)

  const totalCustomers = useSelector(
    (state) => state.customer.customers?.length
  )

  const handleCSVExport = () => {
    dispatch(convertCustomersToCSV(customers))
  }

  useEffect(() => {
    dispatch(searchCustomers(currentPage, userDetail.id, searchText))
  }, [searchText])
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
        <Typography variant='h1' component='h2'>
          Customers
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item>
            {totalCustomers > 0 ? (
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
                  marginRight: 10,
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
          <Grid
            item
            style={{
              marginRight: 10,
            }}
          >
            <SharedSearchBox
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchText(e.target.value)
                }
              }}
              setSearchText={setSearchText}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default CustomersTitleRow

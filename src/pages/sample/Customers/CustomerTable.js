import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCustomers } from 'redux/actions/CustomerAction'

const columns = [
  { id: 'user_id', label: 'ID', minWidth: 40 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 180,
    align: 'center',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'phone_number',
    label: 'Phone Number',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'address',
    label: 'Address Line 1',
    minWidth: 200,
    align: 'center',
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'view-details',
    label: ' ',
    minWidth: 50,
    align: 'center',
    format: 'img',
  },
]

export default function CustomerTable(props) {
  const activePageStyle = {
    color: 'white',
    padding: 3,
    borderRadius: 50,
    minWidth: 40,
    maxWidth: 40,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#ED2079',
    marginRight: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  const inActivePageStyle = {
    color: 'black',
    padding: 3,
    borderRadius: 50,
    minWidth: 40,
    maxWidth: 40,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#ECECEC',
    marginRight: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rows = useSelector((state) => state.customer.customers)
  const totalPages = useSelector((state) => state.customer.totalPages)
  const userDetail = useSelector((state) => state.users.userDetail)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentPage) {
      setLoading(true)
      dispatch(fetchCustomers(currentPage, userDetail.id, setLoading))
    }
  }, [userDetail.id, currentPage])

  return (
    <>
      <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
        <Grid
          container
          style={{ padding: 12, paddingLeft: 15, paddingRight: 0 }}
          alignItems='center'
        >
          <Grid item xs={8} md={8} lg={8}>
            <Typography
              variant='p'
              component='p'
              fontWeight={500}
              fontSize={18}
            >
              Customers
            </Typography>
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns?.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows)
                ? rows?.map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns?.map((column) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'orderid' ||
                              (column.id === 'user_id' &&
                                column.id !== 'orderstatus') ? (
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/customers/details/${row.user_id}`
                                    )
                                  }
                                >
                                  {value}
                                </Typography>
                              ) : column.format &&
                                typeof value === 'number' &&
                                column.id !== 'orderstatus' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {column.format(value)}
                                </Typography>
                              ) : (
                                column.id !== 'orderstatus' && (
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                )
                              )}
                              {column.id === 'orderstatus' ? (
                                <Box
                                  sx={{
                                    color: '#d2f1e0',
                                    backgroundColor: '#d2f1e0' + '44',
                                    padding: '3px 10px',
                                    borderRadius: '15px',
                                    display: 'inline-block',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  Delivered
                                </Box>
                              ) : (
                                ''
                              )}
                              {column.id === 'view-details' ? (
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/customers/details/${row.user_id}`
                                    )
                                  }
                                />
                              ) : (
                                ''
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {rows?.length > 0 ? (
        <Grid
          container
          style={{ paddingTop: 20, paddingBottom: 10 }}
          alignItems={'center'}
        >
          <Grid item marginRight={7}>
            <ArrowBackIos
              fontSize='small'
              style={{
                color: currentPage === 1 ? '#6B7280' : '#111827',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                if (currentPage === 1) {
                  return
                }
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1)
                }
              }}
            />
          </Grid>
          <Grid
            item
            style={{ maxWidth: 300, overflow: 'scroll', borderRadius: 20 }}
            className='page-container'
          >
            <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
              {[...Array(totalPages)].map((value, i) => (
                <Box
                  key={i}
                  style={
                    currentPage === i + 1 ? activePageStyle : inActivePageStyle
                  }
                  onClick={() => {
                    setCurrentPage(i + 1)
                  }}
                >
                  {i + 1}
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid item marginLeft={9}>
            <ArrowForwardIos
              fontSize='small'
              style={{
                color: currentPage === totalPages ? '#6B7280' : '#111827',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                if (currentPage === totalPages) {
                  return
                }

                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1)
                }
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
        >
          <Typography sx={{ textAlign: 'center' }}>No data found</Typography>
        </Box>
      )}
    </>
  )
}

CustomerTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
}

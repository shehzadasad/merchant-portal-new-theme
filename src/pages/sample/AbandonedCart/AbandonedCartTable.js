import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import SharedPagination from 'shared/components/SharedPagination/SharedPagination'
import SharedMultiSelect from 'shared/components/SharedMultiSelect'
import { Link } from 'react-router-dom'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import { encode } from 'js-base64'
import { LinkOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
const AbandonedCartTable = ({ rows, columns }) => {
  const userDetail = useSelector((state) => state.users.userDetail)
  return (
    <>
      <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
        <Grid
          container
          style={{
            padding: 12,
            paddingLeft: 15,
            paddingRight: 0,
            paddingTop: 25,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid item>
            <Typography
              variant='p'
              component='p'
              fontWeight={500}
              fontSize={18}
              onClick={() => {
                console.log(rows)
              }}
            >
              Orders
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              width: 200,
              marginRight: 10,
            }}
          >
            <SharedMultiSelect
              names={['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days']}
              label={'Filter By Date'}
              onChange={(e) => console.log(e)}
              multiple={false}
              //   onSelect={props.selectDate}
              //   crossBtn={true}
              //   fetchOrdersHelper={props.fetchOrdersHelper}
            />
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
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
              {rows.map((row, index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const rowData = JSON.parse(row.data)
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'checkout_id' ? (
                            <Typography
                              variant={'p'}
                              component={'p'}
                              color='#ED2079'
                            >
                              {rowData?.sessionID ?? '-'}
                            </Typography>
                          ) : column.id === 'customer_email' ? (
                            <Typography variant={'p'} component={'p'}>
                              {rowData?.email ? (
                                <a
                                  href={`mailto:${rowData.email}`}
                                  style={{
                                    color: '#ea3b7d',
                                  }}
                                >
                                  {rowData.email}
                                </a>
                              ) : (
                                '-'
                              )}
                            </Typography>
                          ) : column.id === 'recovery-status' ? (
                            <Typography variant={'p'} component={'p'}>
                              {rowData?.recoveryStatus ? (
                                <a
                                  // href={`${rowData.email}`}
                                  style={{
                                    color: '#ea3b7d',
                                  }}
                                >
                                  {rowData.recoveryStatus}
                                </a>
                              ) : (
                                '-'
                              )}
                            </Typography>
                          ) : column.id === 'order-id' ? (
                            <Typography variant={'p'} component={'p'}>
                              {row?.orderId ? (
                                <a
                                  // href={`${rowData.email}`}
                                  style={{
                                    color: '#ea3b7d',
                                  }}
                                >
                                  {row.orderId}
                                </a>
                              ) : (
                                '-'
                              )}
                            </Typography>
                          ) : column.id === 'phone_number' ? (
                            <Typography variant={'p'} component={'p'}>
                              {rowData?.orderDetails?.phoneNumber
                                ? rowData?.orderDetails?.phoneNumber
                                : '-'}
                            </Typography>
                          ) : column.id === 'createdAt' ? (
                            <Typography variant={'p'} component={'p'}>
                              {rowData.date
                                ? moment(rowData.date).format(
                                    'DD MMM YYYY hh:mm A'
                                  )
                                : '-'}
                            </Typography>
                          ) : column.id === 'abandoned-step' ? (
                            <Typography variant={'p'} component={'p'}>
                              {rowData.abandonedStep ?? ''}
                            </Typography>
                          ) : column.id === 'total-amount' ? (
                            <Typography variant={'p'} component={'p'}>
                              {userDetail?.iso2 === 'PK'
                                ? 'Rs'
                                : userDetail?.iso2 === 'PH'
                                ? '₱'
                                : '$ '}
                              {rowData.totalAmount
                                ? currencyFormatter.format(
                                    rowData.totalAmount,
                                    {
                                      code: localStorage.getItem('currency'),
                                    }
                                  )
                                : '-'}
                            </Typography>
                          ) : column.id === 'checkout-url' ? (
                            <Typography variant={'p'} component={'p'}>
                              <a href={row.checkoutUrl} target='_blank'>
                                <Box
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <LinkOutlined
                                    style={{
                                      marginRight: 10,
                                      color: '#ea3b7d',
                                    }}
                                  />
                                  <Typography
                                    style={{
                                      color: '#ea3b7d',
                                    }}
                                  >
                                    Open Link
                                  </Typography>
                                </Box>
                              </a>
                            </Typography>
                          ) : column.id === 'view-details' ? (
                            <Typography variant={'p'} component={'p'}>
                              <Link
                                to={`/abandoned-cart/details/${encode(
                                  rowData?.sessionID
                                )}`}
                              >
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                />
                              </Link>
                            </Typography>
                          ) : (
                            ''
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {rows.length > 0 ? (
        <Grid item className='page-container'>
          <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
            {/* <SharedPagination
            //   totalRecords={props.totalOrders}
            //   NumberOfRecordsPerPage={props.pageLimit}
            //   totalPages={props.totalPages}
            //   setRecord={props.setCurrentPage}
            //   record={props.currentPage}
            //   setCurrentPage={props.setCurrentPage}
            //   currentPage={props.currentPage}
            /> */}
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ padding: '30px 0' }}>Data does not exist</Typography>
      )}
    </>
  )
}

export default AbandonedCartTable

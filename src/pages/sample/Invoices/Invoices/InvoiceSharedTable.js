import React from 'react'
import Paper from '@mui/material/Paper'
import { Box, Grid, TableHead, Typography } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'
import SharedPagination from 'shared/components/SharedPagination/SharedPagination'
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const InvoiceSharedTable = (props) => {
  const userDetail = useSelector((state) => state.users.userDetail)

  const { rows, columns } = props

  return (
    <>
      <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10 px' }}>
        <Grid
          container
          style={{
            padding: '20px',
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
            >
              {props.title ? props.title : 'Invoices'}
            </Typography>
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
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'date' ? (
                            <Typography variant={'p'} component={'p'}>
                              {moment(value).format('DD-MMM-YYYY')}
                            </Typography>
                          ) : column.id === 'invoice_id' ? (
                            // <Link to={props.detailsURL + `/${row['order_id']}`}>
                            <Typography
                              variant={'p'}
                              component={'p'}
                              color='#ED2079'
                            >
                              {value}
                            </Typography>
                          ) : // </Link>
                          column.id === 'order_number' ? (
                            // <Link to={props.detailsURL + `/${row['order_id']}`}>
                            // <Typography
                            //   variant={'p'}
                            //   component={'p'}
                            //   color='#ED2079'
                            // >
                            //   {value === null ? 'N/A' : value}
                            // </Typography>
                            <>
                              {value === null ? (
                                <a
                                  style={{ color: '#ED2079', fontSize: '14px' }}
                                  // variant={'p'}
                                  // component={'p'}
                                  // color='#ED2079'
                                  // cursor='pointer'
                                >
                                  {'N/A'}
                                </a>
                              ) : (
                                <Link
                                  style={{ color: '#ED2079', fontSize: '14px' }}
                                  to={props.detailsURL + `/${row['order_id']}`}
                                >
                                  {value}
                                </Link>
                              )}
                            </>
                          ) : // </Link>
                          column.id === 'order_id' ? (
                            // <Link to={props.detailsURL + `/${row['order_id']}`}>

                            <>
                              {value === null ? (
                                <a
                                  style={{ color: '#ED2079', fontSize: '14px' }}
                                  // variant={'p'}
                                  // component={'p'}
                                  // color='#ED2079'
                                  // cursor='pointer'
                                >
                                  {'N/A'}
                                </a>
                              ) : (
                                <a
                                  style={{ color: '#ED2079', fontSize: '14px' }}
                                  href={`${row['order_detail_link']}`}
                                >
                                  {value}
                                </a>
                              )}
                            </>
                          ) : column.id === 'customer' ? (
                            // <Link to={props.detailsURL + `/${row['order_id']}`}>
                            <Typography variant={'p'} component={'p'}>
                              {value}
                            </Typography>
                          ) : // </Link>
                          column.id === 'amount' ? (
                            <Typography variant={'p'} component={'p'}>
                              {currencyFormatter.format(parseInt(value), {
                                code:
                                  userDetail?.iso2 === 'PK'
                                    ? 'PKR'
                                    : userDetail?.iso2 === 'PH'
                                    ? 'PHP'
                                    : 'USD',
                              })}
                            </Typography>
                          ) : column.id === 'status' ? (
                            <Box
                              sx={{
                                color:
                                  value.toLocaleUpperCase() === 'PAID'
                                    ? '#11C15B'
                                    : value.toLocaleUpperCase() === 'NOT PAID'
                                    ? '#FF1515'
                                    : value.toLocaleUpperCase() === 'PENDING'
                                    ? '#FF6A16'
                                    : '#FF6A16',
                                backgroundColor:
                                  value.toLocaleUpperCase() === 'PAID'
                                    ? '#CFF3DE'
                                    : value.toLocaleUpperCase() === 'NOT PAID'
                                    ? '#FFE8E8'
                                    : value.toLocaleUpperCase() === 'PENDING'
                                    ? '#F8E0CE'
                                    : '#F8E0CE',
                                padding: '3px 10px',
                                borderRadius: '15px',
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                width: '140px',
                                height: '24px',
                              }}
                            >
                              {value === 'Pending' ? 'Not Paid' : value}
                            </Box>
                          ) : // </Link>
                          column.id === 'view_link' ? (
                            <a href={`${row['view_link']}`} target='_blank'>
                              <img
                                src={ViewDetailsEyeIcon}
                                alt='View Details Eye Icon'
                                style={{
                                  cursor: 'pointer',
                                }}
                              />
                              {/* <Typography 
                                variant={'p'}
                                component={'p'}
                                color='#ED2079'
                              >
                                {value === null ? 'N/A' : value}
                              </Typography> */}
                            </a>
                          ) : (
                            // <Link to={value}>
                            // </Link>
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
            <SharedPagination
              totalRecords={props.totalOrders}
              NumberOfRecordsPerPage={props.pageLimit}
              totalPages={props.totalPages}
              setRecord={props.setCurrentPage}
              record={props.currentPage}
              setCurrentPage={props.setCurrentPage}
              currentPage={props.currentPage}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ padding: '30px 0' }}>Order does not exist</Typography>
      )}
    </>
  )
}

export default InvoiceSharedTable
InvoiceSharedTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  // onSelectedRoleChange: PropTypes.func,
  // onSelectedTimeRangeChange: PropTypes.func,
  // onDelete: PropTypes.func,
  // onEdit: PropTypes.func,
}

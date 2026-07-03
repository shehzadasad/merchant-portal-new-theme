import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from 'assets/icon/EditIcon.svg'
import TrashIcon from 'assets/icon/TrashIcon.svg'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterPayouts } from 'redux/actions/BillingAction'
import currencyFormatter from 'currency-formatter'
export default function BillingSharedTable(props) {
  const { rows, columns } = props
  const [page, setPage] = useState(0)
  const [selectedTimeRange, setSelectedTimeRange] = useState('')
  const [selectedStatus, setSelectedRole] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()

  const activePageStyle = {
    color: 'white',
    padding: 3,
    borderRadius: 50,
    width: 40,
    height: 40,
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
    width: 40,
    height: 40,
    backgroundColor: '#ECECEC',
    marginRight: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  const handleChangeStatus = (value) => {
    const data = {
      status: value,
    }
    dispatch(filterPayouts(data, userDetail.merchantId))
  }

  const handleChangeTime = (value) => {
    let fromDateStr, toDateStr

    if (value === 'today') {
      fromDateStr = moment().format('YYYY-MM-DD')
      toDateStr = moment().format('YYYY-MM-DD')
    } else if (value === 'yesterday') {
      fromDateStr = moment().subtract(1, 'days').format('YYYY-MM-DD')
      toDateStr = moment().subtract(1, 'days').format('YYYY-MM-DD')
    } else if (value === 'last7Days') {
      fromDateStr = moment().format('YYYY-MM-DD')
      toDateStr = moment().subtract(7, 'days').format('YYYY-MM-DD')
    } else if (value === 'thisWeek') {
      fromDateStr = moment().format('YYYY-MM-DD')
      toDateStr = moment().subtract(7, 'days').format('YYYY-MM-DD')
    }

    const data = {
      dateStr: toDateStr,
      fromDateStr: fromDateStr,
    }

    dispatch(filterPayouts(data, userDetail.merchantId))
  }

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
          <Grid item xs={7} sm={6} md={7} lg={8}>
            <Typography
              variant='p'
              component='p'
              fontWeight={500}
              fontSize={18}
            >
              {props.title ? props.title : 'Users'}
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
                    <Typography variant={'p'} component={'p'} fontWeight={500}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {(column.format !== 'date' &&
                              column.id === 'orderid') ||
                            column.id === 'order_id' ||
                            column.id === 'order_number' ||
                            (column.id === 'id' &&
                              column.id !== 'orderstatus') ? (
                              <Link
                                to={
                                  props.detailsURL &&
                                  props.detailsURL.length > 0
                                    ? props.detailsURL + `/${row['order_id']}`
                                    : props.URL !== undefined &&
                                      props.URL.length > 0
                                    ? props.URL
                                    : props.billingURL !== undefined &&
                                      props.billingURL.length > 0
                                    ? props.billingURL + `/${row['id']}`
                                    : props.sheetsURL !== undefined &&
                                      props.sheetsURL.length > 0
                                    ? props.sheetsURL + `/${row['id']}`
                                    : `/users/details/${row['id']}`
                                }
                              >
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                >
                                  {value} 
                                </Typography>
                              </Link>
                            ) : column.format &&
                              typeof value === 'number' &&
                              column.id !== 'orderstatus' ? (
                              <Typography variant={'p'} component={'p'}>
                           {currencyFormatter.format(value, {
                    code: userDetail?.iso2==='PK' ?'PKR': userDetail?.iso2=='PH'?'PHP': 'USD',
                  })}
                 
                              </Typography>
                            ) : column.format === 'date' ? (
                              <Typography variant={'p'} component={'p'}>
                                {moment(value).format('DD-MMM-YYYY kk:mm:ss')}
                              </Typography>
                            ) : (
                              column.id !== 'orderstatus' &&
                              column.id !== 'status' && (
                                <Typography variant={'p'} component={'p'}>
                           {value}
                                </Typography>
                              )
                            )}
                            {column.id === 'status' ? (
                              <Box
                                sx={{
                                  color:
                                    value == 'COMPLETED'
                                      ? '#11C15B'
                                      : value === 'REFUNDED'
                                      ? '#FF6A16'
                                      : '#FF6A16',
                                  backgroundColor:
                                    value == 'COMPLETED'
                                      ? '#CFF3DE'
                                      : value === 'REFUNDED'
                                      ? '#F8E0CE'
                                      : '#F8E0CE',
                                  padding: '3px 10px',
                                  borderRadius: '15px',
                                  display: 'inline-block',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {value}
                              </Box>
                            ) : (
                              ''
                            )}
                            {column.id === 'view-details' && (
                              <Link
                                to={
                                  props.detailsURL &&
                                  props.detailsURL.length > 0
                                    ? props.detailsURL + `/${row['order_id']}`
                                    : props.URL !== undefined &&
                                      props.URL.length > 0
                                    ? props.URL
                                    : props.billingURL !== undefined &&
                                      props.billingURL.length > 0
                                    ? props.billingURL + `/${row['id']}`
                                    : props.sheetsURL !== undefined &&
                                      props.sheetsURL.length > 0
                                    ? props.sheetsURL + `/${row['id']}`
                                    : `/users/details/${row['id']}`
                                }
                              >
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                />
                              </Link>
                            )}
                            {column.id === 'editdeleteicon' && (
                              <Grid container>
                                <Grid item>
                                  <img
                                    src={EditIcon}
                                    alt='Edit Pencil Icon'
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => props.onEdit(row)}
                                  />
                                </Grid>
                                <Grid item>
                                  <img
                                    src={TrashIcon}
                                    alt='Delete Trash Icon'
                                    style={{
                                      cursor: 'pointer',
                                      marginLeft: 15,
                                    }}
                                    onClick={() => props.onDelete(row['id'])}
                                  />
                                </Grid>
                              </Grid>
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
        <Grid
          container
          style={{ paddingTop: 20, paddingBottom: 10 }}
          alignItems={'center'}
        >
          <Grid item marginRight={7}>
            <ArrowBackIos
              fontSize='small'
              style={{
                color: props.isFirst ? '#6B7280' : '#111827',
                cursor: props.isFirst ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                if (props.isFirst) {
                  return
                }
                if (props.currentPage > 1) {
                  props.setCurrentPage(props.currentPage - 1)
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
              {[...Array(props.totalPages)].map((value, i) => (
                <Box
                  style={
                    props.currentPage === i + 1
                      ? activePageStyle
                      : inActivePageStyle
                  }
                  onClick={() => props.setCurrentPage(i + 1)}
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
                color:
                  props.currentPage === props.totalPages
                    ? '#6B7280'
                    : '#111827',
                cursor:
                  props.currentPage === props.totalPages
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onClick={() => {
                if (props.currentPage === props.totalPages) {
                  return
                }

                if (props.currentPage < props.totalPages) {
                  props.setCurrentPage(props.currentPage + 1)
                }
              }}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

BillingSharedTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  isFirst: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  setTotalPages: PropTypes.func,
  setIsFirst: PropTypes.func,
}

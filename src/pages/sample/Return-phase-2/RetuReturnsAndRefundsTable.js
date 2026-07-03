import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
  TableBody,
  Tabs,
  Tab,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SharedPagination from 'shared/components/SharedPagination/SharedPagination'
import SharedMultiSelect from 'shared/components/SharedMultiSelect'
import { useDispatch, useSelector } from 'react-redux'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import TitleRow from '../../../shared/components/TitleRow'
import currencyFormatter from 'currency-formatter'
import {
  getAllReturnsOrder,
  getAllReturnsOrderFilter,
} from 'redux/actions/ReturnAction'
import ApproveModal from './ApproveModal'
import moment from 'moment'
import RejectModal from './RejectModal'

var encodeUrl = require('encodeurl')
const ReturnsAndRefundsTable = () => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [getAllReturnOrder, setGetAllReturnOrder] = useState([])
  const [getAllReturnData, setGetAllReturnData] = useState([])
  const [openApprove, setOpenApprove] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [tabValue, setTabValue] = useState('all')
  const [orderIdD, setOrderIdD] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const columns = [
    { id: 'order_id', label: 'Order ID', minWidth: 30 },
    {
      id: 'request_date',
      label: 'Return Request Date',
      width: 100,
      align: 'center',
    },
    {
      id: 'customer_email',
      label: 'Customer',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'payment_method',
      label: 'Payment Method',
      minWidth: 60,
      align: 'center',
    },
    {
      id: 'amount',
      label: 'Order Amount',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'reject_reason',
      label: 'Reason',
      minWidth: 50,
      align: 'center',
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 160,
      align: 'center',
    },
    {
      id: 'details',
      label: ' ',
      minWidth: 55,
      align: 'center',
      format: 'img',
    },
  ]

  useEffect(() => {
    dispatch(
      getAllReturnsOrder(
        userDetail?.merchantId,
        setGetAllReturnOrder,
        setGetAllReturnData
      )
    )
  }, [userDetail])
  const handleApprove = (id) => {
    setOpenApprove(true)
    setOrderIdD(id)
  }
  const handleReject = (id) => {
    setOpenReject(true)
    setOrderIdD(id)
  }
  const handleClose = () => {
    setOpenApprove(false)
    setOpenReject(false)
  }
  const handleFilter = (date) => {
    let data = {
      startDate: '',
      endDate: '',
    }

    if (date === 'Today') {
      data = {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      }
    } else if (date === 'Yesterday') {
      data = {
        startDate: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
        endDate: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
      }
    } else if (date === 'Last 7 Days') {
      data = {
        startDate: new Date(new Date().setDate(new Date().getDate() - 7))
          .toISOString()
          .split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      }
    } else if (date === 'Last 30 Days') {
      data = {
        startDate: new Date(new Date().setDate(new Date().getDate() - 30))
          .toISOString()
          .split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      }
    }

    let dataObj = JSON.stringify(data)
    var obj = encodeUrl(dataObj)

    dispatch(
      getAllReturnsOrderFilter(
        userDetail?.merchantId,
        setGetAllReturnOrder,
        setGetAllReturnData,
        obj
      )
    )
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue)

    if (newValue === 'Approved') {
      getAllReturnOrder.filter((f) => {
        return console.log(f.status)
      })
    }
  }
  const handleRequestSuccess = (val) => {
    if (val) {
      dispatch(
        getAllReturnsOrder(
          userDetail?.merchantId,
          setGetAllReturnOrder,
          setGetAllReturnData
        )
      )
    }
  }
  return (
    <div>
      <Box fontSize={'20px'} fontWeight='500'>
        <TitleRow
          setGetAllReturnOrder={setGetAllReturnOrder}
          setGetAllReturnData={setGetAllReturnData}
          exportCSV={true}
          title={'Refunds and Returns'}
        />
      </Box>
      <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
        <Grid
          container
          style={{
            padding: 12,
            paddingLeft: 15,
            paddingRight: 0,
            paddingTop: 25,

            alignItems: 'center',
          }}
        >
          <TableRow
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Box sx={{ width: '100%' }}>
                <Box id='Integrations'>
                  <Tabs
                    value={tabValue}
                    textColor='secondary'
                    indicatorColor='secondary'
                    onChange={handleChange}
                    aria-label='secondary tabs example'
                  >
                    <Tab value='all' label='All' />
                    <Tab value='NewRequest' label='New Request' />
                    <Tab value='Approved' label='Approved Requests' />
                    <Tab value='Rejected' label='Rejected Requests' />
                  </Tabs>
                </Box>
              </Box>
            </Box>
            <Box
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
                onSelect={(value) => handleFilter(value)}
                crossBtn={true}
                // fetchOrdersHelper={props.fetchOrdersHelper}
              />
            </Box>
          </TableRow>
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
              {tabValue === 'all' &&
                getAllReturnOrder.map((row, index) => {
                  return (
                    <>
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'order_id' ? (
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                >
                                  {value}
                                </Typography>
                              ) : column.id === 'request_date' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {moment(value).format('DD/MM/YYYY')}
                                </Typography>
                              ) : column.id === 'customer_email' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              ) : column.id === 'status' ? (
                                <Box
                                  sx={{
                                    color:
                                      value == 'APPROVED'
                                        ? '#379200'
                                        : value === 'REJECTED'
                                        ? 'red'
                                        : value === 'PENDING'
                                        ? '#0A8FDC'
                                        : '#FF6A16',
                                    backgroundColor:
                                      value == 'APPROVED'
                                        ? '#EBF4E6'
                                        : value === 'REJECTED'
                                        ? '#F5EBEB'
                                        : value === 'PENDING'
                                        ? '#CEE9F8'
                                        : '#F8E0CE',
                                    padding: '3px 10px',
                                    borderRadius: '15px',
                                    display: 'inline-block',
                                    whiteSpace: 'nowrap',
                                    width: '140px',
                                    height: '24px',
                                  }}
                                >
                                  {value}
                                </Box>
                              ) : column.id === 'view-details' ? (
                                <Link>
                                  <img
                                    src={ViewDetailsEyeIcon}
                                    alt='View Details Eye Icon'
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                  />
                                </Link>
                              ) : column.id === 'action' ? (
                                <Box>
                                  {row.status === 'INITIATED' ? (
                                    <Box display='flex' width={'170px'}>
                                      <Typography
                                        variant={'p'}
                                        component={'p'}
                                        onClick={() =>
                                          handleApprove(row?.order_id)
                                        }
                                        display='flex'
                                      >
                                        <img
                                          src='assets/images/approveIcon.svg'
                                          alt='approve'
                                          style={{ marginRight: '5px' }}
                                        />
                                        Approve
                                      </Typography>
                                      <Typography
                                        marginLeft={'10px'}
                                        onClick={() =>
                                          handleReject(row?.order_id)
                                        }
                                        display='flex'
                                      >
                                        <img
                                          src='assets/images/RejectIcon.svg'
                                          alt='approve'
                                          style={{ marginRight: '5px' }}
                                        />
                                        Rejected
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <Box></Box>
                                  )}
                                </Box>
                              ) : column.format === 'img' ? (
                                <Box>
                                  <img
                                    src={ViewDetailsEyeIcon}
                                    alt='View Details Eye Icon'
                                    style={{
                                      cursor: 'pointer',

                                      width: '30px',
                                    }}
                                    onClick={() =>
                                      navigate(
                                        `/refund/order/details/${row.order_id}`
                                      )
                                    }
                                  />
                                </Box>
                              ) : column.id === 'amount' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {currencyFormatter.format(parseInt(value), {
                                    code:
                                      userDetail?.iso2 === 'PK'
                                        ? 'PKR'
                                        : userDetail?.iso2 == 'PH'
                                        ? 'PHP'
                                        : 'USD',
                                  })}
                                </Typography>
                              ) : (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                      {openApprove && (
                        <ApproveModal
                          handleCls={handleClose}
                          open={openApprove}
                          orderId={orderIdD}
                          ApproveSuccess={handleRequestSuccess}
                        />
                      )}
                      {openReject && (
                        <RejectModal
                          open={openReject}
                          handleCls={handleClose}
                          orderId={orderIdD}
                          RejectSuccess={handleRequestSuccess}
                        />
                      )}
                    </>
                  )
                })}
              {tabValue === 'Approved' &&
                getAllReturnOrder
                  .filter((item) => item.status === 'APPROVED')
                  .map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'order_id' ? (
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                >
                                  {value}
                                </Typography>
                              ) : column.id === 'request_date' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {moment(value).format('DD/MM/YYYY')}
                                </Typography>
                              ) : column.id === 'customer_email' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              ) : column.id === 'status' ? (
                                <Box
                                  sx={{
                                    color:
                                      value == 'APPROVED'
                                        ? '#379200'
                                        : value === 'REJECTED'
                                        ? 'red'
                                        : value === 'PENDING'
                                        ? '#0A8FDC'
                                        : '#FF6A16',
                                    backgroundColor:
                                      value == 'APPROVED'
                                        ? '#EBF4E6'
                                        : value === 'REJECTED'
                                        ? '#F5EBEB'
                                        : value === 'PENDING'
                                        ? '#CEE9F8'
                                        : '#F8E0CE',
                                    padding: '3px 10px',
                                    borderRadius: '15px',
                                    display: 'inline-block',
                                    whiteSpace: 'nowrap',
                                    width: '140px',
                                    height: '24px',
                                  }}
                                >
                                  {value}
                                </Box>
                              ) : column.id === 'view-details' ? (
                                <Link>
                                  <img
                                    src={ViewDetailsEyeIcon}
                                    alt='View Details Eye Icon'
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                  />
                                </Link>
                              ) : column.id === 'action' ? (
                                <Box>
                                  {row.status === 'INITIATED' ? (
                                    <Box display='flex' width={'170px'}>
                                      <Typography
                                        variant={'p'}
                                        component={'p'}
                                        // onClick={() => setOpenApprove(true)}
                                        display='flex'
                                      >
                                        <img
                                          src='assets/images/approveIcon.svg'
                                          alt='approve'
                                          style={{ marginRight: '5px' }}
                                        />
                                        Approve
                                      </Typography>
                                      <Typography
                                        marginLeft={'10px'}
                                        // onClick={() => setOpenReject(true)}
                                        display='flex'
                                      >
                                        <img
                                          src='assets/images/RejectIcon.svg'
                                          alt='approve'
                                          style={{ marginRight: '5px' }}
                                        />
                                        Rejected
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <Box></Box>
                                  )}
                                </Box>
                              ) : column.format === 'img' ? (
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',

                                    width: '30px',
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/refund/order/details/${row.order_id}`
                                    )
                                  }
                                />
                              ) : (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
              {tabValue === 'Rejected' &&
                getAllReturnOrder
                  .filter((item) => item.status === 'REJECTED')
                  .map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'order_id' ? (
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                >
                                  {value}
                                </Typography>
                              ) : column.id === 'request_date' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {moment(value).format('DD/MM/YYYY')}
                                </Typography>
                              ) : column.id === 'customer_email' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              ) : column.id === 'status' ? (
                                <Box
                                  sx={{
                                    color:
                                      value == 'APPROVED'
                                        ? '#379200'
                                        : value === 'REJECTED'
                                        ? 'red'
                                        : value === 'PENDING'
                                        ? '#0A8FDC'
                                        : '#FF6A16',
                                    backgroundColor:
                                      value == 'APPROVED'
                                        ? '#EBF4E6'
                                        : value === 'REJECTED'
                                        ? '#F5EBEB'
                                        : value === 'PENDING'
                                        ? '#CEE9F8'
                                        : '#F8E0CE',
                                    padding: '3px 10px',
                                    borderRadius: '15px',
                                    display: 'inline-block',
                                    whiteSpace: 'nowrap',
                                    width: '140px',
                                    height: '24px',
                                  }}
                                >
                                  {value}
                                </Box>
                              ) : column.id === 'view-details' ? (
                                <Link>
                                  <img
                                    src={ViewDetailsEyeIcon}
                                    alt='View Details Eye Icon'
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                  />
                                </Link>
                              ) : column.id === 'action' ? (
                                <Box>
                                  {row.status === 'INITIATED' ? (
                                    <Box display='flex' width={'170px'}>
                                      <Typography
                                        variant={'p'}
                                        component={'p'}
                                        // onClick={() => setOpenApprove(true)}
                                        display='flex'
                                      >
                                        <img
                                          src='assets/images/approveIcon.svg'
                                          alt='approve'
                                          style={{ marginRight: '5px' }}
                                        />
                                        Approve
                                      </Typography>
                                      <Typography
                                        marginLeft={'10px'}
                                        onClick={() => setOpenReject(true)}
                                        display='flex'
                                      >
                                        <img
                                          src='assets/images/RejectIcon.svg'
                                          alt='approve'
                                          style={{ marginRight: '5px' }}
                                        />
                                        Rejected
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <Box></Box>
                                  )}
                                </Box>
                              ) : column.format === 'img' ? (
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',

                                    width: '30px',
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/refund/order/details/${row.order_id}`
                                    )
                                  }
                                />
                              ) : (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
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
      {getAllReturnOrder.length > 0 ? (
        <Grid item className='page-container'>
          <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
            <SharedPagination
              totalRecords={getAllReturnData.totalElements}
              NumberOfRecordsPerPage={10}
              totalPages={getAllReturnData.totalPages}
              setRecord={setCurrentPage}
              record={currentPage}
              setCurrentPage={(e) => setCurrentPage(e)}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ padding: '30px 0' }}>
          Record does not exist
        </Typography>
      )}
    </div>
  )
}

export default ReturnsAndRefundsTable

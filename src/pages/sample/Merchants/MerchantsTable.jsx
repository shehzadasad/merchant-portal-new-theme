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
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SharedPagination from 'shared/components/SharedPagination/SharedPagination'
import SharedMultiSelect from 'shared/components/SharedMultiSelect'
import { useDispatch, useSelector } from 'react-redux'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import TitleRow from '../../../shared/components/TitleRow'
import ApproveModal from './ApproveModal'
import moment from 'moment'
import axios from 'axios'
import RejectModal from './RejectedModal'
import SellingModal from '../MyQPMall/SellingModal'

const MerchantsTable = () => {
  const userDetail = useSelector((state) => state.users.userDetail)
  const [anchorEl, setAnchorEl] = useState(null)

  const [openApprove, setOpenApprove] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [tabValue, setTabValue] = useState('PENDING')
  const [orderIdD, setOrderIdD] = useState('')
  const [title, setTitle] = useState('')
  const [sellingModal, setSellingModal] = useState(false)
  const [merchantData, setMerchantData] = useState([])
  const [filterDate, setFilterDate] = useState('ALL')
  const navigate = useNavigate()

  const open = Boolean(anchorEl)
  const columns = [
    {
      id: 'merchant_name',
      label: 'Merchant Name',
      minWidth: 70,
    },
    {
      id: 'merchant_category',
      label: 'Categories',
      width: 100,
    },
    {
      id: 'website_url',
      label: 'Merchant website URL',
      minWidth: 20,
      align: 'center',
    },
    {
      id: 'created_at',
      label: 'Requested on',
      minWidth: 60,
      align: 'center',
    },
    {
      id: 'kyb_score',
      label: 'KYB Score',
      minWidth: 30,
      align: 'center',
    },
    {
      id: 'number_of_products',
      label: 'No. of Products',
      minWidth: 30,
      align: 'center',
    },

    {
      id: 'action',
      label: 'Action',
      minWidth: 10,
      align: 'center',
    },

    {
      id: 'icon',
      label: '',
      minWidth: 160,
      align: 'center',
    },
  ]
  const columnsRejected = [
    {
      id: 'merchant_name',
      label: 'Merchant Name',
      minWidth: 160,
    },
    {
      id: 'categories',
      label: 'Categories',
      minWidth: 160,
      align: 'center',
    },
    {
      id: 'reason',
      label: 'Reason',
      minWidth: 160,
      align: 'center',
    },
    {
      id: 'updated_at',
      label: 'Rejection Date',
      minWidth: 160,
      align: 'center',
    },
  ]
  const columnsApproved = [
    {
      id: 'merchant_name',
      label: 'Merchant Name',
      minWidth: 160,
    },
    {
      id: 'categories',
      label: 'Categories',
      minWidth: 160,
      align: 'center',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 160,
      align: 'center',
    },
    {
      id: 'updated_at',
      label: 'Approve Date',
      minWidth: 160,
      align: 'center',
    },

    {
      id: 'icon',
      label: '',
      minWidth: 160,
      align: 'center',
    },
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenu = (title) => {
    setTitle(title)
    setSellingModal(true)
  }
  const handleApprove = (id) => {
    setOpenApprove(true)

    setOrderIdD(id)
  }
  const handleReject = (id) => {
    setOpenReject(true)
    setOrderIdD(id)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setOpenReject(false)
    setOpenApprove(false)
  }

  const handleFilter = (date) => {
    setFilterDate(date)
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const handleRequestSuccess = (val) => {
    if (val) {
    }
  }
  const handleCloseModal = (val) => {
    setSellingModal(false)
  }
  const GetAvailableMallsForSelling = () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/mall/requests?status=${tabValue}&offset=0&limit=10&filter_type=${filterDate}`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        setMerchantData(response.data.data.requests)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    GetAvailableMallsForSelling()
  }, [tabValue, filterDate])
  return (
    <Box>
      <Box fontSize={'20px'} fontWeight='500'>
        <TitleRow
          // setGetAllReturnData={setGetAllReturnData}
          title={'Merchant'}
          exportCSV={false}
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
                    <Tab value='PENDING' label='New Request' />

                    <Tab value='APPROVED' label='Approved Requests' />
                    <Tab value='REJECTED' label='Rejected Requests' />
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
                names={['TODAY', 'YESTERDAY', 'WEEK', 'MONTH']}
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
                {tabValue === 'REJECTED'
                  ? columnsRejected?.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))
                  : tabValue === 'APPROVED'
                  ? columnsApproved?.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))
                  : columns?.map((column, index) => (
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
              {tabValue === 'PENDING' &&
                merchantData?.map((row, index) => {
                  return (
                    <>
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns?.map((column) => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'merchant_name' ? (
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                >
                                  {value}
                                </Typography>
                              ) : column.id === 'merchant_category' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              ) : column.id === 'website_url' ? (
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  // className='modalText'
                                >
                                  <a
                                    href={value}
                                    underline='none'
                                    target='_blank'
                                    className='modalText'
                                  >
                                    {value}
                                  </a>
                                </Typography>
                              ) : column.id === 'created_at' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {moment(value).format('DD-MMM-YYYY kk:mm:ss')}
                                </Typography>
                              ) : column.id === 'kyb_score' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              ) : column.id === 'number_of_products' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              ) : column.id === 'action1' ? (
                                <Box
                                  sx={{
                                    color:
                                      '' === 'APPROVED'
                                        ? '#379200'
                                        : value === 'REJECTED'
                                        ? 'red'
                                        : value === 'PENDING'
                                        ? '#0A8FDC'
                                        : '#FF6A16',
                                    backgroundColor:
                                      'APPROVEd' == 'APPROVED'
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
                                  {value}Approved iqra
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
                                  {'INITIATED' === 'INITIATED' ? (
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
                                        Reject
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
                              ) : (
                                ''
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                      {openApprove && (
                        <ApproveModal
                          handleCls={handleClose}
                          open={openApprove}
                          requestId={row.id}
                          ApproveSuccess={handleRequestSuccess}
                        />
                      )}
                      {openReject && (
                        <RejectModal
                          open={openReject}
                          handleCls={handleClose}
                          requestId={row.id}
                          RejectSuccess={handleRequestSuccess}
                        />
                      )}
                    </>
                  )
                })}
              {tabValue === 'APPROVED' &&
                merchantData?.map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columnsApproved?.map((column) => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'merchant_name' ? (
                              <Typography
                                variant={'p'}
                                component={'p'}
                                color='#ED2079'
                              >
                                {value}
                              </Typography>
                            ) : column.id === ' updated_at' ? (
                              <Typography
                                variant={'p'}
                                component={'p'}
                                color='#ED2079'
                              >
                                {value}
                              </Typography>
                            ) : column.id === 'status' ? (
                              <Box
                                sx={{
                                  color:
                                    value === 'INACTIVE'
                                      ? '#0A8FDC'
                                      : value === 'ACTIVE'
                                      ? '#11C15B'
                                      : value === 'APPROVED'
                                      ? '#379200'
                                      : value === 'REJECTED'
                                      ? 'red'
                                      : value === 'PENDING'
                                      ? '#0A8FDC'
                                      : '#FF6A16',
                                  backgroundColor:
                                    value === 'INACTIVE'
                                      ? '#CEE9F8'
                                      : value === 'ACTIVE'
                                      ? '#CFF3DE'
                                      : value === 'APPROVED'
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
                            ) : column.id === 'categories' ? (
                              <Typography variant={'p'} component={'p'}>
                                {value.replace(/["\/\[\]]/g, '')}
                              </Typography>
                            ) : column.id === 'action' ? (
                              <Box>
                                {row.status === 'INITIATED' ? (
                                  <Box display='flex' width={'170px'}>
                                    <Typography
                                      variant={'p'}
                                      component={'p'}
                                      onClick={() => setOpenApprove(true)}
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
                                      Reject
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
                            ) : column.id === 'icon' ? (
                              <Box>
                                <IconButton
                                  aria-label='more'
                                  id='long-button'
                                  aria-controls={open ? 'long-menu' : undefined}
                                  aria-expanded={open ? 'true' : undefined}
                                  aria-haspopup='true'
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id='long-menu'
                                  MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                  }}
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  PaperProps={{
                                    style: {
                                      // maxHeight: ITEM_HEIGHT * 4.5,
                                      width: '20ch',
                                    },
                                  }}
                                >
                                  <MenuItem
                                    key={'pause'}
                                    selected={'option' !== 'pause'}
                                    onClick={() => handleMenu('Pause Selling')}
                                  >
                                    Pause
                                  </MenuItem>
                                  <MenuItem
                                    key={'cancel'}
                                    selected={'option' === 'cancel'}
                                    onClick={() => handleMenu('Cancel Selling')}
                                  >
                                    Remove
                                  </MenuItem>
                                </Menu>
                                <SellingModal
                                  handleCls={handleCloseModal}
                                  openSelling={sellingModal}
                                  title={title}
                                  id={row?.id}
                                />
                              </Box>
                            ) : column.id === 'decison' ? (
                              <Box>
                                <IconButton
                                  aria-label='more'
                                  id='long-button'
                                  aria-controls={open ? 'long-menu' : undefined}
                                  aria-expanded={open ? 'true' : undefined}
                                  aria-haspopup='true'
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id='long-menu'
                                  MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                  }}
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  PaperProps={{
                                    style: {
                                      // maxHeight: ITEM_HEIGHT * 4.5,
                                      width: '20ch',
                                    },
                                  }}
                                >
                                  <MenuItem
                                    key={'pause'}
                                    selected={'option' !== 'pause'}
                                    onClick={() => handleMenu('pause')}
                                  >
                                    Withdraw Request
                                  </MenuItem>
                                </Menu>
                              </Box>
                            ) : (
                              ''
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              {tabValue === 'REJECTED' &&
                merchantData?.map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columnsRejected?.map((column) => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'categories' ? (
                              <Typography variant={'p'} component={'p'}>
                                {value.replace(/["\/\[\]]/g, '')}
                              </Typography>
                            ) : column.id === 'updated_at' ? (
                              <Typography variant={'p'} component={'p'}>
                                {moment(value).format('DD/MM/YYYY')}
                              </Typography>
                            ) : column.id === 'reason' ? (
                              <Box>{value}</Box>
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
                            ) : column.id === 'merchant_name' ? (
                              <Box>
                                <Box>{value}</Box>
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
      {merchantData.length > 0 ? (
        <Grid item className='page-container'>
          <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
            <SharedPagination
              totalRecords={merchantData.total_requests}
              NumberOfRecordsPerPage={10}
              totalPages={merchantData.num_of_pages}
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
    </Box>
  )
}

export default MerchantsTable

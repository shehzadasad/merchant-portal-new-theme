import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import TableBody from '@mui/material/TableBody'
import Tabs from '@mui/material/Tabs'
import Menu from '@mui/material/Menu'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Link, useNavigate } from 'react-router-dom'
import SharedPagination from 'shared/components/SharedPagination/SharedPagination'
import SharedMultiSelect from 'shared/components/SharedMultiSelect'
import LinkOutlined from '@mui/icons-material/LinkOutlined'
import { useDispatch, useSelector } from 'react-redux'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import LinkTitleRow from './Components/LinkTitleRow'
import DeleteModal from './DelModal'
import { toast } from 'react-toastify'
import clipBoardIcon from 'assets/product/clipboardIcon.svg'
import moment from 'moment'

import { encode } from 'js-base64'
import { getAllPaymentLinks } from 'redux/actions/LinkBuilder'
const LinkBuilderTable = () => {
  const userDetail = useSelector((state) => state.users.userDetail)

  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [data, setData] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [tabValue, setTabValue] = useState('ALL')
  const [title, setTitle] = useState('')
  const [sellingModal, setSellingModal] = useState(false)
  const [filterDate, setFilterDate] = useState('')
  const [rowId, setRowId] = useState('')
  const [rowData, setRowData] = useState('')
  const [delSuccess, setDelSuccess] = useState(false)
  const [filterData, setFilteredData] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    dispatch(getAllPaymentLinks(userDetail?.id, setData, filterDate, setLoader))
  }, [userDetail, filterDate, delSuccess])

  const navigate = useNavigate()

  const open = Boolean(anchorEl)
  const columns = [
    { id: 'created_at', label: 'Creation Date', minWidth: 150, align: 'left' },
    {
      id: 'id',
      label: 'Link ID',
      minWidth: 60,
      align: 'left',
    },
    {
      id: 'name',
      label: 'Name',
      minWidth: 180,
      align: 'left',
    },
    {
      id: 'total_no_of_orders',
      label: 'No. Of Orders',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'details',
      label: 'Total Amount',
      minWidth: 150,
      align: 'left',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 150,
      align: 'center',
    },

    {
      id: 'url',
      label: '',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'view-details',
      minWidth: 60,
      align: 'center',
      format: 'img',
    },
    {
      id: 'icon',
      label: '',
      minWidth: 40,
      align: 'center',
    },
  ]

  const handleClick = (event, id, data) => {
    setAnchorEl(event.currentTarget)

    setRowId(id)
    setRowData(data)
  }
  const handleMenu = (title) => {
    if (title === 'delete') {
      setOpenDeleteModal(true)
    }
    setTitle(title)
    setSellingModal(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenReject(false)
    setOpenDeleteModal(false)
  }
  const handleCloseModal = (val) => {
    setSellingModal(false)
  }

  const handleFilter = (date) => {
    setFilterDate(date)
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue)

    const filteredData = data?.filter((item) => item.status === newValue)
    if (newValue === 'ALL') {
      setFilteredData(data)
    } else {
      setFilteredData(filteredData)
    }
  }

  useEffect(() => {
    setTabValue('ALL')
    setFilteredData(data)
  }, [data])

  const handleOpenDelete = (data) => {
    setOpenDeleteModal(true)
  }

  return (
    <React.Fragment>
      <Box>
        <Box fontSize={'20px'} fontWeight='500'>
          <LinkTitleRow
            getData={setData}
            title={'Link Builder'}
            exportCSV={false}
          />
        </Box>
        <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
          <Grid
            container
            sx={{
              padding: '12px 2px',
            }}
          >
            <TableRow
              sx={{
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
                      TabIndicatorProps={{
                        sx: {
                          backgroundColor: '#e72e80',
                        },
                      }}
                      onChange={handleChange}
                      aria-label='secondary tabs example'
                    >
                      <Tab value='ALL' label='All' />

                      <Tab value='ACTIVE' label='Active' />
                      <Tab value='DRAFT' label='Drafts' />

                      <Tab value='EXPIRED' label='Expired' />
                    </Tabs>
                  </Box>
                </Box>
              </Box>
              <Box
                item
                sx={{
                  width: 200,
                  marginRight: 10,
                }}
              >
                <SharedMultiSelect
                  names={['All', 'today', 'yesterday', 'week', 'month']}
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
                {tabValue === 'ALL' &&
                  filterData?.map((row, index) => {
                    return (
                      <>
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={index}
                        >
                          {columns?.map((column) => {
                            const value = row[column.id]

                            return (
                              <TableCell
                                scope='row'
                                key={column.id}
                                align={column.align}
                              >
                                {column.id === 'created_at' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {moment(value).format('LL')}
                                  </Typography>
                                ) : column.id === 'id' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    <span style={{ color: '#ED2079' }}>
                                      {value}
                                    </span>
                                  </Typography>
                                ) : column.id === 'name' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value.toUpperCase()}
                                  </Typography>
                                ) : column.id === 'total_no_of_orders' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                ) : column.id === 'details' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {userDetail?.iso2 === 'PK' &&
                                      Number(value?.amount).toLocaleString(
                                        'ur-PK',
                                        {
                                          style: 'currency',
                                          currency: 'PKR',
                                        }
                                      )}
                                    {userDetail?.iso2 === 'PH' &&
                                      Number(value?.amount).toLocaleString(
                                        'fil-PH',
                                        {
                                          style: 'currency',
                                          currency: 'PHP',
                                        }
                                      )}

                                    {userDetail?.iso2 !== 'PK' &&
                                    userDetail?.iso2 !== 'PH'
                                      ? Number(value?.amount).toLocaleString(
                                          'en-US',
                                          {
                                            style: 'currency',
                                            currency: 'USD',
                                          }
                                        )
                                      : ''}
                                  </Typography>
                                ) : column.id === 'status' ? (
                                  <Box
                                    sx={{
                                      color:
                                        value == 'ACTIVE'
                                          ? '#379200'
                                          : value === 'REJECTED'
                                          ? 'red'
                                          : value === 'EXPIRED'
                                          ? '#6B7280'
                                          : '#FF6A16',
                                      backgroundColor:
                                        value == 'ACTIVE'
                                          ? '#EBF4E6'
                                          : value === 'REJECTED'
                                          ? '#F5EBEB'
                                          : value === 'EXPIRED'
                                          ? '#CEE9F8'
                                          : '#F8E0CE',
                                      padding: '3px 10px',
                                      borderRadius: '15px',
                                      display: 'inline-block',
                                      whiteSpace: 'nowrap',
                                      width: '140px',
                                      height: '24px',
                                    }}
                                    variant={'p'}
                                    component={'p'}
                                  >
                                    {value}
                                  </Box>
                                ) : column.id === 'url' ? (
                                  <Box>
                                    {' '}
                                    {row.status === 'DRAFT' ||
                                    row.status === 'EXPIRED' ? (
                                      ''
                                    ) : (
                                      <Typography
                                        variant='p'
                                        component='p'
                                        fontSize={14}
                                      >
                                        <a href={value} target='_blank'>
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
                                    )}
                                  </Box>
                                ) : column.id === 'view-details' ? (
                                  <Link
                                    to={`/payment-link/details/${row?.id}/${userDetail?.id}`}
                                  >
                                    <Box
                                      component={'img'}
                                      src={ViewDetailsEyeIcon}
                                      alt='View Details Eye Icon'
                                    />
                                  </Link>
                                ) : column.id === 'icon' ? (
                                  <Box>
                                    <IconButton
                                      aria-label='more'
                                      id='long-button'
                                      aria-controls={
                                        open ? 'long-menu' : undefined
                                      }
                                      aria-expanded={open ? 'true' : undefined}
                                      aria-haspopup='true'
                                      onClick={(e) =>
                                        handleClick(e, row.id, row)
                                      }
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
                                          boxShadow: 'none',
                                          border: '2px solid #e8eefd',
                                        },
                                      }}
                                    >
                                      <MenuItem
                                        key={'edit'}
                                        // selected={'option' !== 'edit'}
                                        onClick={() =>
                                          navigate(
                                            `/edit-payment-link/${rowId}/${userDetail?.id}`
                                          )
                                        }
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        key={'delete'}
                                        // selected={'option' === 'delete'}
                                        onClick={handleOpenDelete}
                                      >
                                        Delete
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
                      </>
                    )
                  })}
                {openDeleteModal && (
                  <DeleteModal
                    handleCls={handleClose}
                    open={openDeleteModal}
                    dataR={rowData}
                    requestId={rowId}
                    setDelSuccess={setDelSuccess}
                  />
                )}
                {tabValue === 'ACTIVE' &&
                  filterData?.map((row, index) => {
                    return (
                      <>
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={index}
                        >
                          {columns?.map((column) => {
                            const value = row[column.id]

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === 'created_at' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {moment(value).format('LL')}
                                  </Typography>
                                ) : column.id === 'id' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    <span style={{ color: '#ED2079' }}>
                                      {value}
                                    </span>
                                  </Typography>
                                ) : column.id === 'name' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value.toUpperCase()}
                                  </Typography>
                                ) : column.id === 'total_no_of_orders' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                ) : column.id === 'details' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {userDetail?.iso2 === 'PK' &&
                                      Number(value?.amount).toLocaleString(
                                        'ur-PK',
                                        {
                                          style: 'currency',
                                          currency: 'PKR',
                                        }
                                      )}
                                    {userDetail?.iso2 === 'PH' &&
                                      Number(value?.amount).toLocaleString(
                                        'fil-PH',
                                        {
                                          style: 'currency',
                                          currency: 'PHP',
                                        }
                                      )}

                                    {userDetail?.iso2 !== 'PK' &&
                                    userDetail?.iso2 !== 'PH'
                                      ? Number(value?.amount).toLocaleString(
                                          'en-US',
                                          {
                                            style: 'currency',
                                            currency: 'USD',
                                          }
                                        )
                                      : ''}
                                  </Typography>
                                ) : column.id === 'status' ? (
                                  <Box
                                    sx={{
                                      color:
                                        value == 'ACTIVE'
                                          ? '#379200'
                                          : value === 'REJECTED'
                                          ? 'red'
                                          : value === 'EXPIRED'
                                          ? '#6B7280'
                                          : '#FF6A16',
                                      backgroundColor:
                                        value == 'ACTIVE'
                                          ? '#EBF4E6'
                                          : value === 'REJECTED'
                                          ? '#F5EBEB'
                                          : value === 'EXPIRED'
                                          ? '#CEE9F8'
                                          : '#F8E0CE',
                                      padding: '3px 10px',
                                      borderRadius: '15px',
                                      display: 'inline-block',
                                      whiteSpace: 'nowrap',
                                      width: '140px',
                                      height: '24px',
                                    }}
                                    variant={'p'}
                                    component={'p'}
                                  >
                                    {value}
                                  </Box>
                                ) : column.id === 'url' ? (
                                  <Box>
                                    {' '}
                                    <Typography
                                      variant='p'
                                      component='p'
                                      fontSize={14}
                                    >
                                      <a href={value} target='_blank'>
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
                                  </Box>
                                ) : column.id === 'view-details' ? (
                                  <Link
                                    to={`/payment-link/details/${row?.id}/${userDetail?.id}`}
                                  >
                                    <Box
                                      component={'img'}
                                      src={ViewDetailsEyeIcon}
                                      alt='View Details Eye Icon'
                                    />
                                  </Link>
                                ) : column.id === 'icon' ? (
                                  <Box>
                                    <IconButton
                                      aria-label='more'
                                      id='long-button'
                                      aria-controls={
                                        open ? 'long-menu' : undefined
                                      }
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
                                          boxShadow: 'none',
                                          border: '2px solid #e8eefd',
                                        },
                                      }}
                                    >
                                      <MenuItem
                                        key={'edit'}
                                        // selected={'option' !== 'edit'}
                                        onClick={() =>
                                          navigate(
                                            `/edit-payment-link/${row?.id}/${userDetail?.id}`
                                          )
                                        }
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        key={'delete'}
                                        // selected={'option' === 'delete'}
                                        onClick={() => setOpenDeleteModal(true)}
                                      >
                                        Delete
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
                        {openDeleteModal && (
                          <DeleteModal
                            handleCls={handleClose}
                            open={openDeleteModal}
                            requestId={row.id}
                            // ApproveSuccess={handleRequestSuccess}
                          />
                        )}
                      </>
                    )
                  })}
                {tabValue === 'DRAFT' &&
                  filterData?.map((row, index) => {
                    return (
                      <>
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={index}
                        >
                          {columns?.map((column) => {
                            const value = row[column.id]

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === 'created_at' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {moment(value).format('LL')}
                                  </Typography>
                                ) : column.id === 'id' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    <span style={{ color: '#ED2079' }}>
                                      {value}
                                    </span>
                                  </Typography>
                                ) : column.id === 'name' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value.toUpperCase()}
                                  </Typography>
                                ) : column.id === 'total_no_of_orders' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                ) : column.id === 'details' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {userDetail?.iso2 === 'PK' &&
                                      Number(value?.amount).toLocaleString(
                                        'ur-PK',
                                        {
                                          style: 'currency',
                                          currency: 'PKR',
                                        }
                                      )}
                                    {userDetail?.iso2 === 'PH' &&
                                      Number(value?.amount).toLocaleString(
                                        'fil-PH',
                                        {
                                          style: 'currency',
                                          currency: 'PHP',
                                        }
                                      )}

                                    {userDetail?.iso2 !== 'PK' &&
                                    userDetail?.iso2 !== 'PH'
                                      ? Number(value?.amount).toLocaleString(
                                          'en-US',
                                          {
                                            style: 'currency',
                                            currency: 'USD',
                                          }
                                        )
                                      : ''}
                                  </Typography>
                                ) : column.id === 'status' ? (
                                  <Box
                                    sx={{
                                      color:
                                        value == 'ACTIVE'
                                          ? '#379200'
                                          : value === 'REJECTED'
                                          ? 'red'
                                          : value === 'EXPIRED'
                                          ? '#6B7280'
                                          : '#FF6A16',
                                      backgroundColor:
                                        value == 'ACTIVE'
                                          ? '#EBF4E6'
                                          : value === 'REJECTED'
                                          ? '#F5EBEB'
                                          : value === 'EXPIRED'
                                          ? '#F2F2F4'
                                          : '#F8E0CE',
                                      padding: '3px 10px',
                                      borderRadius: '15px',
                                      display: 'inline-block',
                                      whiteSpace: 'nowrap',
                                      width: '140px',
                                      height: '24px',
                                    }}
                                    variant={'p'}
                                    component={'p'}
                                  >
                                    {value}
                                  </Box>
                                ) : column.id === 'url' ? (
                                  <Box>
                                    {' '}
                                    {/* <Typography
                                      variant='p'
                                      component='p'
                                      fontSize={14}
                                    >
                                      <a href={value} target='_blank'>
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
                                    </Typography> */}
                                  </Box>
                                ) : column.id === 'view-details' ? (
                                  <Link
                                    to={`/payment-link/details/${row?.id}/${userDetail?.id}`}
                                  >
                                    <Box
                                      component={'img'}
                                      src={ViewDetailsEyeIcon}
                                      alt='View Details Eye Icon'
                                    />
                                  </Link>
                                ) : column.id === 'icon' ? (
                                  <Box>
                                    <IconButton
                                      aria-label='more'
                                      id='long-button'
                                      aria-controls={
                                        open ? 'long-menu' : undefined
                                      }
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
                                          boxShadow: 'none',
                                          border: '2px solid #e8eefd',
                                        },
                                      }}
                                    >
                                      <MenuItem
                                        key={'edit'}
                                        // selected={'option' !== 'edit'}
                                        onClick={() =>
                                          navigate(
                                            `/edit-payment-link/${row?.id}/${userDetail?.id}`
                                          )
                                        }
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        key={'delete'}
                                        // selected={'option' === 'delete'}
                                        onClick={() => setOpenDeleteModal(true)}
                                      >
                                        Delete
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
                        {openDeleteModal && (
                          <DeleteModal
                            handleCls={handleClose}
                            open={openDeleteModal}
                            requestId={row.id}
                            // ApproveSuccess={handleRequestSuccess}
                          />
                        )}
                      </>
                    )
                  })}
                {tabValue === 'EXPIRED' &&
                  filterData?.map((row, index) => {
                    return (
                      <>
                        {console.log(row, 'row')}
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={index}
                        >
                          {columns?.map((column) => {
                            const value = row[column.id]

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === 'created_at' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {moment(value).format('LL')}
                                  </Typography>
                                ) : column.id === 'id' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    <span style={{ color: '#ED2079' }}>
                                      {value}
                                    </span>
                                  </Typography>
                                ) : column.id === 'name' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value.toUpperCase()}
                                  </Typography>
                                ) : column.id === 'total_no_of_orders' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                ) : column.id === 'details' ? (
                                  <Typography variant={'p'} component={'p'}>
                                    {userDetail?.iso2 === 'PK' &&
                                      Number(value?.amount).toLocaleString(
                                        'ur-PK',
                                        {
                                          style: 'currency',
                                          currency: 'PKR',
                                        }
                                      )}
                                    {userDetail?.iso2 === 'PH' &&
                                      Number(value?.amount).toLocaleString(
                                        'fil-PH',
                                        {
                                          style: 'currency',
                                          currency: 'PHP',
                                        }
                                      )}

                                    {userDetail?.iso2 !== 'PK' &&
                                    userDetail?.iso2 !== 'PH'
                                      ? Number(value?.amount).toLocaleString(
                                          'en-US',
                                          {
                                            style: 'currency',
                                            currency: 'USD',
                                          }
                                        )
                                      : ''}
                                  </Typography>
                                ) : column.id === 'status' ? (
                                  <Box
                                    sx={{
                                      color:
                                        value == 'ACTIVE'
                                          ? '#379200'
                                          : value === 'REJECTED'
                                          ? 'red'
                                          : value === 'EXPIRED'
                                          ? '#6B7280'
                                          : '#FF6A16',
                                      backgroundColor:
                                        value == 'ACTIVE'
                                          ? '#EBF4E6'
                                          : value === 'REJECTED'
                                          ? '#F5EBEB'
                                          : value === 'EXPIRED'
                                          ? '#F2F2F4'
                                          : '#F8E0CE',
                                      padding: '3px 10px',
                                      borderRadius: '15px',
                                      display: 'inline-block',
                                      whiteSpace: 'nowrap',
                                      width: '140px',
                                      height: '24px',
                                    }}
                                    variant={'p'}
                                    component={'p'}
                                  >
                                    {value}
                                  </Box>
                                ) : column.id === 'url' ? (
                                  <Box>
                                    {' '}
                                    {/* <Typography
                                      variant='p'
                                      component='p'
                                      fontSize={14}
                                    >
                                      <a href={value} target='_blank'>
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
                                    </Typography> */}
                                  </Box>
                                ) : column.id === 'view-details' ? (
                                  <Link
                                    to={`/payment-link/details/${row?.id}/${userDetail?.id}`}
                                  >
                                    <Box
                                      component={'img'}
                                      src={ViewDetailsEyeIcon}
                                      alt='View Details Eye Icon'
                                    />
                                  </Link>
                                ) : column.id === 'icon' ? (
                                  <Box>
                                    <IconButton
                                      aria-label='more'
                                      id='long-button'
                                      aria-controls={
                                        open ? 'long-menu' : undefined
                                      }
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
                                          boxShadow: 'none',
                                          border: '2px solid #e8eefd',
                                        },
                                      }}
                                    >
                                      <MenuItem
                                        key={'edit'}
                                        // selected={'option' !== 'edit'}
                                        onClick={() =>
                                          navigate(
                                            `/edit-payment-link/${row?.id}/${userDetail?.id}`
                                          )
                                        }
                                      >
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        key={'delete'}
                                        // selected={'option' === 'delete'}
                                        onClick={() => setOpenDeleteModal(true)}
                                      >
                                        Delete
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
                        {openDeleteModal && (
                          <DeleteModal
                            handleCls={handleClose}
                            open={openDeleteModal}
                            requestId={row.id}
                            // ApproveSuccess={handleRequestSuccess}
                          />
                        )}
                      </>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {filterData?.length > 0 ? (
          <Grid item className='page-container'>
            <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
              <SharedPagination
                totalRecords={filterData?.totalElements}
                NumberOfRecordsPerPage={10}
                totalPages={filterData.totalPages}
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
    </React.Fragment>
  )
}

export default LinkBuilderTable

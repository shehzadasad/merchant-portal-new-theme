import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  Button,
  Checkbox,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import qpMall from 'assets/qp-mall/Qp-malls.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Link from '@mui/material/Link'
import ApplyForSellingModal from './ApplyForSellingModal'
import SellingModal from './SellingModal'

const MyQPMall = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [tabValue, setTabValue] = useState('all')
  const [checked, setChecked] = useState(false)
  const [sellingModal, setSellingModal] = useState(false)
  const [title, setTitle] = useState('')
  const [availableMalls, setAvailableMalls] = React.useState([])
  const [StatusMalls, setStatusMalls] = React.useState([])
  const [mallIds, setAllMallIds] = React.useState([])
  const [checkboxCurrentIndex, setCheckboxCurrentIndex] = useState(0)
  const [success, setSuccess] = useState(false)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleChange = (event, index, id) => {
    const mall_ids = [...mallIds]
    if (event.target.checked) {
      mall_ids.push(id)
    }

    setAllMallIds(mall_ids)
    setCheckboxCurrentIndex(index)
    setChecked(event.target.checked)
  }
  const getAvailableMalls = () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/mall/requests/available-for-selling`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        setAvailableMalls(response?.data?.data?.malls)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleCloseModal = (val) => {
    setOpenModal(false)
    setSellingModal(false)
  }
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
    if (newValue === 'all') {
      getAvailableMalls()
    } else {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/mall/requests/mall-by-status?request_status=${newValue}`,

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }

      axios(config)
        .then(function (response) {
          setStatusMalls(response?.data?.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenu = (title) => {
    setTitle(title)
    setSellingModal(true)
  }

  useEffect(() => {
    getAvailableMalls()
  }, [])

  return (
    <Box
      display={'flex'}
      flexDirection='column'
      sx={{ justifyContent: 'center' }}
      alignItems='center'
    >
      <Typography textAlign={'left'} pb='20px'>
        Increase your sales by selling on multiple e-commerce malls.
      </Typography>
      <Box
        bgcolor={'#FFFFFF'}
        width={'70%'}
        boxShadow={'0px 4px 8px rgba(0, 0, 0, 0.08)'}
        borderRadius='10px'
        padding={'12px'}
      >
        <Box sx={{ width: '100%' }}>
          <Box id='Integrations' marginBottom={'20px'}>
            <Tabs
              value={tabValue}
              textColor='secondary'
              indicatorColor='secondary'
              onChange={handleChangeTab}
              aria-label='secondary tabs example'
            >
              <Tab value='all' label='Available Malls' />
              <Tab value='APPROVED' label='Approved' />
              <Tab value='PENDING' label='Pending Approval' />
              <Tab value='REJECTED' label='Rejected Malls' />
            </Tabs>
          </Box>
        </Box>
        {tabValue === 'all' ? (
          <Box>
            {availableMalls?.map((mall, index) => {
              return (
                <>
                  <Box
                    display={'flex'}
                    justifyContent='space-between'
                    mb='12px'
                    bgcolor={
                      checkboxCurrentIndex === index && checked ? '#FDEFF5' : ''
                    }
                    padding={'12px'}
                  >
                    <Box
                      display={'flex'}
                      justifyContent='space-evenly'
                      alignItems={'center'}
                    >
                      {availableMalls.length > 1 && (
                        <Checkbox
                          checked={checkboxCurrentIndex === index && checked}
                          onChange={(e) => handleChange(e, index, mall.id)}
                          sx={{
                            color: '#e93a7d',
                            '&.Mui-checked': {
                              color: '#e93a7d',
                            },
                          }}
                        />
                      )}
                      <img
                        src={qpMall}
                        alt='qp-mall'
                        style={{ width: '60px', height: '60px' }}
                      />{' '}
                      <Typography ml={'0.5rem'}> {mall?.name}</Typography>
                    </Box>
                    {availableMalls.length <= 1 ? (
                      <Box alignItems={'center'} display='flex'>
                        <Button
                          variant='contained'
                          sx={{
                            backgroundColor: '#e93a7d',
                            borderRadius: '48px',
                            '&:hover, &:focus': {
                              background: '#e93a7d',
                            },
                          }}
                          onClick={() => setOpenModal(true)}
                        >
                          Apply for Selling
                        </Button>
                      </Box>
                    ) : (
                      ''
                    )}
                    {openModal && (
                      <ApplyForSellingModal
                        handleCls={handleCloseModal}
                        openModal={openModal}
                        mallIds={mall.id}
                      />
                    )}
                  </Box>
                </>
              )
            })}
            {availableMalls.length > 1 && (
              <Box
                padding={'12px'}
                display='flex'
                alignItems={'center'}
                justifyContent='space-between'
              >
                <Typography display={'flex'}>
                  {mallIds.length} malls selected
                </Typography>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: '#e93a7d',
                    borderRadius: '48px',
                    '&:hover, &:focus': {
                      background: '#e93a7d',
                    },
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  Apply for Selling
                </Button>
                <ApplyForSellingModal
                  handleCls={handleCloseModal}
                  openModal={openModal}
                  mallIds={mallIds}
                />
              </Box>
            )}
          </Box>
        ) : tabValue === 'APPROVED' ? (
          <Box>
            {StatusMalls?.map((mall) => {
              return (
                <Box
                  display={'flex'}
                  justifyContent='space-between'
                  mb='12px'
                  padding={'12px'}
                >
                  <Box
                    display={'flex'}
                    justifyContent='space-evenly'
                    alignItems={'center'}
                  >
                    <img
                      src={qpMall}
                      alt='qp-mall'
                      style={{ width: '60px', height: '60px' }}
                    />{' '}
                    <Box display={''}>
                      <Typography ml={'0.75rem'}>{mall?.name}</Typography>

                      <Link
                        ml={'0.75rem'}
                        href={mall?.mall_url}
                        color='#ED2079'
                        underline='none'
                        display={'flex'}
                        target='_blank'
                      >
                        View mall
                        <Box
                          component={'img'}
                          src='/assets/icons/LinkIcon.svg'
                          ml={'0.75rem'}
                        ></Box>
                      </Link>
                    </Box>
                  </Box>
                  <Box alignItems={'center'} display='flex'>
                    <Box
                      bgcolor={
                        mall?.status === 'ACTIVE'
                          ? '#EBF4E6'
                          : mall?.status === 'CANCELLED'
                          ? '#F5EBEB'
                          : mall?.status === 'DEACTIVATED'
                          ? '#6B7280'
                          : ''
                      }
                      sx={{ borderRadius: '50px' }}
                    >
                      <Typography
                        color={
                          mall?.status === 'ACTIVE'
                            ? '#379200'
                            : mall?.status === 'DEACTIVATED'
                            ? '#6B7280'
                            : mall?.status === 'CANCELLED'
                            ? 'red'
                            : ''
                        }
                        paddingX={'13px'}
                        paddingY={'8px'}
                      >
                        {mall?.status}
                      </Typography>
                    </Box>
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
                          Pause Selling
                        </MenuItem>
                        <MenuItem
                          key={'cancel'}
                          selected={'option' === 'cancel'}
                          onClick={() => handleMenu('Cancel Selling')}
                        >
                          Cancel Selling
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                  <SellingModal
                    handleCls={handleCloseModal}
                    openSelling={sellingModal}
                    title={title}
                    id={mall?.id}
                  />
                </Box>
              )
            })}
          </Box>
        ) : tabValue === 'PENDING' ? (
          <Box>
            {StatusMalls?.map((mall) => {
              return (
                <Box
                  display={'flex'}
                  justifyContent='space-between'
                  mb='12px'
                  padding={'12px'}
                >
                  <Box
                    display={'flex'}
                    justifyContent='space-evenly'
                    alignItems={'center'}
                  >
                    <img
                      src={qpMall}
                      alt='qp-mall'
                      style={{ width: '60px', height: '60px' }}
                    />{' '}
                    <Typography ml={'0.5rem'}>{mall?.name}</Typography>
                  </Box>
                  <Box alignItems={'center'} display='flex'>
                    <Box
                      bgcolor={
                        mall?.status === 'ACTIVE'
                          ? '#EBF4E6'
                          : mall?.status === 'CANCELLED'
                          ? '#F5EBEB'
                          : mall?.status === 'DEACTIVATED'
                          ? '#6B7280'
                          : ''
                      }
                      sx={{ borderRadius: '50px' }}
                    >
                      <Typography
                        color={
                          mall?.status === 'ACTIVE'
                            ? '#379200'
                            : mall?.status === 'DEACTIVATED'
                            ? '#6B7280'
                            : mall?.status === 'CANCELLED'
                            ? 'red'
                            : ''
                        }
                        paddingX={'13px'}
                        paddingY={'8px'}
                      >
                        {mall?.status}
                      </Typography>
                    </Box>
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
                          key={'withDraw'}
                          selected={'option' !== 'withdraw'}
                          onClick={() => handleMenu('Withdraw Request')}
                        >
                          Withdraw Request
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                  <SellingModal
                    handleCls={handleCloseModal}
                    openSelling={sellingModal}
                    title={title}
                    id={mall?.id}
                  />
                </Box>
              )
            })}
          </Box>
        ) : tabValue === 'REJECTED' ? (
          <Box>
            {StatusMalls?.map((mall, index) => {
              return (
                <Box
                  display={'flex'}
                  justifyContent='space-between'
                  mb='12px'
                  bgcolor={
                    checkboxCurrentIndex === index && checked ? '#FDEFF5' : ''
                  }
                  padding={'12px'}
                >
                  <Box
                    display={'flex'}
                    justifyContent='space-evenly'
                    alignItems={'center'}
                  >
                    {availableMalls.length > 1 && (
                      <Checkbox
                        checked={checkboxCurrentIndex === index && checked}
                        onChange={(e) => handleChange(e, index, mall.id)}
                        sx={{
                          color: '#e93a7d',
                          '&.Mui-checked': {
                            color: '#e93a7d',
                          },
                        }}
                      />
                    )}
                    <img
                      src={qpMall}
                      alt='qp-mall'
                      style={{ width: '60px', height: '60px' }}
                    />{' '}
                    <Typography ml={'0.5rem'}> {mall?.name}</Typography>
                  </Box>
                  {availableMalls.length <= 1 ? (
                    <Box alignItems={'center'} display='flex'>
                      <Button
                        variant='contained'
                        sx={{
                          backgroundColor: '#e93a7d',
                          borderRadius: '48px',
                        }}
                        onClick={() => setOpenModal(true)}
                        disabled={success ? true : false}
                      >
                        Apply Again
                      </Button>
                    </Box>
                  ) : (
                    ''
                  )}
                  {openModal && (
                    <ApplyForSellingModal
                      handleCls={handleCloseModal}
                      openModal={openModal}
                      mallIds={mall.id}
                      setSuccess={setSuccess}
                    />
                  )}
                </Box>
              )
            })}
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  )
}

export default MyQPMall

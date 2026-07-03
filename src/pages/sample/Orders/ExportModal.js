import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import SharedButton from 'shared/components/SharedButton'
import TextField from '@mui/material/TextField'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import axios from 'axios'
import { fetchDownloadOrdersCount } from 'redux/actions/OrderAction'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
const ExportModal = ({ open, handleCls }) => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [isLoading, setIsLoading] = useState(false)
  const [isDownload, setIsDownload] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startStamp, setStartStamp] = useState(0)
  const [endStamp, setEndStamp] = useState(0)
  const [email, setEmail] = useState('')
  const [orderCount, setOrderCount] = useState(0)
  const [success, setSuccess] = useState(null)
  const ordersDownloadCount = useSelector(
    (state) => state.orders.orderDownloadCount.data
  )
  useEffect(() => {
    if (startDate === '' || endDate === '') {
      setOrderCount(0)
    } else {
      setOrderCount(ordersDownloadCount ? ordersDownloadCount : 0)
    }
  }, [ordersDownloadCount, endDate, startDate])
  const exportCSV = () => {
    if (orderCount < 2000) {
      setSuccess(true)
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      var raw = JSON.stringify({})
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }
      fetch(
        `${process.env.REACT_APP_API_URL}merchant/orders/download_orders?merchant_user_id=${userDetail.id}&fromTimeStamp=${startStamp}&toTimestamp=${endStamp}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          var blob = new Blob([result], {
            type: 'text/csv;charset=utf-8;',
          })
          setSuccess(false)
          var url = URL.createObjectURL(blob)
          var pom = document.createElement('a')
          pom.href = url
          pom.setAttribute('download', 'orders.csv')
          pom.click()
          handleCls(false)
        })
        .catch((error) => console.log('error', error))
    } else {
      setIsDownload(true)
    }
  }

  const handleEmail = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      toast.error('Invalid Email')
    } else {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/orders/download_request?merchant_user_id=${userDetail.id}&fromTimeStamp=${startStamp}&toTimestamp=${endStamp}&email=${email}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
      axios(config)
        .then(function (response) {
          toast.success('Email sent')

          handleCls(false)
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.errors?.[0].errorMessage)
        })
    }
  }

  useEffect(() => {
    if (userDetail !== {}) {
    }
  }, [userDetail.id])

  const handleDateTimeChange = (val, time) => {
    if (time === 'start') {
      setStartStamp(new Date(val?.$d)?.getTime().toString().slice(0, -3))
      setStartDate(val)
    } else {
      setEndStamp(new Date(val?.$d)?.getTime().toString().slice(0, -3))
      setEndDate(val)
    }
    if (startStamp !== 0 && endStamp !== 0) {
      dispatch(fetchDownloadOrdersCount(userDetail.id, startStamp, endStamp))
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleCls}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          background: '#fff',
          border: 'none',
          boxShadow: 24,
          p: 4,
          borderRadius: '16px',
          padding: 20,
        }}
      >
        <Box display={'flex'} justifyContent='space-between'>
          <Typography
            id='modal-modal-title'
            variant='p'
            component='p'
            fontSize={20}
            fontWeight={'bold'}
          >
            Export CSV
          </Typography>

          <IconButton onClick={handleCls}>
            {' '}
            <Close />
          </IconButton>
        </Box>

        {isLoading ? (
          <Box
            display='flex'
            justifyContent={'center'}
            alignItems={'center'}
            marginY={'40px'}
          >
            <Typography color='#6B7280'>Fetching Information....</Typography>
          </Box>
        ) : (
          <>
            <Box display='flex' justifyContent={'space-between'} mr='30px'>
              <Box ml='12px'>
                <Typography color='#6B7280' mb='15px'>
                  Start Date
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      label=' time picker'
                      className='css-i8wfgk-MuiStack-root>.MuiTextField-root'
                      value={startDate}
                      onChange={(e) => handleDateTimeChange(e, 'start')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box ml='12px'>
                {' '}
                <Typography color='#6B7280' mb='15px'>
                  End Date{' '}
                </Typography>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  xs={{ width: '30px' }}
                >
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      label=' time picker'
                      className='css-i8wfgk-MuiStack-root>.MuiTextField-root'
                      value={endDate}
                      onChange={(e) => handleDateTimeChange(e, 'end')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box ml='12px'>
                {' '}
                <Typography color='#6B7280' mb='15px'>
                  No. of Orders{' '}
                </Typography>
                <Typography
                  display='flex'
                  justify-content='center'
                  alignItem='center'
                >
                  {orderCount ? orderCount : 0}
                </Typography>
              </Box>
            </Box>
            {isDownload && (
              <Box mt={'35px'}>
                <TextField
                  fullWidth
                  label='Email'
                  id='email'
                  name='email'
                  variant='outlined'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  //   error={formik.touched.title && Boolean(formik.errors.title)}
                  //   helperText={formik.touched.title && formik.errors.title}
                  placeholder='Email Address'
                />
              </Box>
            )}
            <Box display='flex' justifyContent={'end'} mt='20px'>
              <SharedButton
                text='Cancel'
                style={{
                  color: '#e93a7d',
                  borderRadius: '8px',
                  background: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: '100px',
                  border: '1px solid #e93a7d',
                  height: '36px',
                  cursor: 'pointer',
                  marginRight: 17,
                  marginTop: 20,
                }}
                onClick={handleCls}
              />
              <Button
                variant='outlined'
                style={{
                  background: orderCount < 1 ? 'grey' : '#e93a7d',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',

                  border: 'none',
                  height: '36px',
                  cursor: 'pointer',
                  marginRight: 17,
                  marginTop: 20,
                }}
                disabled={orderCount < 1 ? true : false}
                onClick={!isDownload ? exportCSV : handleEmail}
              >
                {success === true ? (
                  <ThreeDots
                    height='30'
                    width='30'
                    radius='9'
                    color='white'
                    ariaLabel='three-dots-loading'
                    wrapperStyle={{}}
                    wrapperClassName=''
                    visible={true}
                  />
                ) : isDownload ? (
                  'Send Email'
                ) : (
                  'Download'
                )}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default ExportModal

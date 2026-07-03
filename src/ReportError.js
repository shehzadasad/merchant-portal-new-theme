import { Grid, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SharedButton from 'shared/components/SharedButton'
import './Style.css'

const ReportError = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenTemp, setIsOpenTemp] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)

  const submitMessage = () => {
    if (message.length < 20) {
      toast.error('Please enter at least 20 characters')
    } else {
      const data = {
        value: userDetail.merchantId,
        type: 'MERCHANT_ID',
        message: message,
        channelType: 'MERCHANT_ISSUE',
      }

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}ms-communication-service/common/slack/message/publish`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
        data: data,
      }

      axios(config)
        .then(function (response) {
          toast.success('Our agents will contact you shortly')
          setIsOpen(false)
          setMessage('')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const submitMessageGuest = () => {
    if (email.length < 1) {
      toast.error('Email field is required')
      return
    }

    const data = {
      value: email,
      type: 'MERCHANT_EMAIL',
      message: message,
      channelType: 'MERCHANT_ISSUE',
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-communication-service/common/slack/message/publish`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        toast.success('Our agents will contact you shortly')
        setIsOpen(false)
        setMessage('')
      })
      .catch(function (error) {
        toast.error(error.response.data.errors[0].errorMessage)
      })
  }

  const style = {
    position: 'absolute',
    width: '500px',
    height: isLoggedIn === false ? '480px' : '400px',
    background: '#FFFFFF',
    borderRadius: '16px',
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  })

  return (
    <div className='fixedButton'>
      <div
        className='roundedFixedBtn'
        onClick={() => {
          if (Object.keys(userDetail).length === 0) {
            setIsOpenTemp(true)
          } else {
            setIsOpen(true)
          }
        }}
      >
        <FaEnvelope fontSize={20} />
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24px',
              marginLeft: '20px',
              marginTop: '30px',
              marginBottom: '20px',
            }}
          >
            Report An Error
          </Typography>

          {isLoggedIn === false ? (
            <TextField
              id='outlined-basic'
              label='Email'
              style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            ''
          )}

          <TextField
            id='outlined-basic'
            label='Message'
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            rows={6}
            variant='outlined'
            value={message}
            multiline={true}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Grid
            container
            style={{
              justifyContent: 'flex-end',
              marginTop: '60px',
            }}
            xs={12}
          >
            <Grid item>
              <SharedButton
                text='Cancel'
                style={{
                  background: '#fff',
                  borderRadius: 50,
                  color: '#e93a7d',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  borderRadius: '8px',
                  borderColor: '#e93a7d',
                  border: 'solid',
                  cursor: 'pointer',
                  width: ' 100px',
                  height: '36px',
                  marginRight: 25,
                }}
                onClick={() => setIsOpen(false)}
              />
            </Grid>
            <Grid item>
              <SharedButton
                text='Submit'
                style={{
                  background: '#e93a7d',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: '130px',
                  border: 'none',
                  height: '36px',
                  cursor: 'pointer',
                  marginRight: 17,
                }}
                onClick={submitMessage}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={isOpenTemp}
        onClose={() => setIsOpenTemp(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24px',
              marginLeft: '20px',
              marginTop: '30px',
              marginBottom: '20px',
            }}
          >
            Feedback
          </Typography>

          <TextField
            id='outlined-basic'
            label='Email'
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id='outlined-basic'
            label='Message'
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            rows={6}
            variant='outlined'
            value={message}
            multiline={true}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Grid
            container
            style={{
              justifyContent: 'flex-end',
              marginTop: '60px',
            }}
            xs={12}
          >
            <Grid item>
              <SharedButton
                text='Cancel'
                style={{
                  background: '#fff',
                  borderRadius: 50,
                  color: '#e93a7d',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  borderRadius: '8px',
                  borderColor: '#e93a7d',
                  border: 'solid',
                  cursor: 'pointer',
                  width: ' 100px',
                  height: '36px',
                  marginRight: 25,
                }}
                onClick={() => setIsOpenTemp(false)}
              />
            </Grid>
            <Grid item>
              <SharedButton
                text='Submit'
                style={{
                  background: '#e93a7d',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: '130px',
                  border: 'none',
                  height: '36px',
                  cursor: 'pointer',
                  marginRight: 17,
                }}
                onClick={submitMessageGuest}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default ReportError

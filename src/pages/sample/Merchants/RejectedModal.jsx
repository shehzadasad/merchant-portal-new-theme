import React, { useRef, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  TextareaAutosize,
} from '@mui/material'
import _ from 'lodash'
import { toast } from 'react-toastify'
import SharedButton from 'shared/components/SharedButton'
import { Close } from '@mui/icons-material'

import { useDispatch } from 'react-redux'

const RejectModal = ({ handleCls, open, requestId, RejectSuccess }) => {
  const [rejectReason, setRejectReason] = useState('')
  const inputElement = useRef(null)
  const [Images, setImages] = useState([])
  const [ImagesFile, setImagesFile] = useState([])
  const [S3url, setS3url] = useState([])
  const dispatch = useDispatch()

  const handleClose = () => {
    handleCls(false)
  }

  const handleChange = (e) => {
    setRejectReason(e.target.value)
  }

  const handleReject = () => {
    const data = {
      request_id: requestId,
      reason: rejectReason,
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/mall/requests/reject`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }
    axios(config)
      .then(function (response) {
        toast.success('Request Rejected')
        RejectSuccess(true)
        handleCls(false)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
      })
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: window.innerWidth < 600 ? '90vw' : 500,
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
              Reject Request
            </Typography>
            <IconButton onClick={handleClose}>
              {' '}
              <Close />
            </IconButton>
          </Box>

          <Typography fontSize={'16px'} color={'#6B7280'}>
            Please specify the reason onf rejection. It will be shared with
            merchant.
          </Typography>

          <Box mt={'15px'}>
            <TextareaAutosize
              fullWidth
              label='Title'
              id='title'
              name='title'
              minRows={5}
              style={{ width: '458px', padding: '10px' }}
              variant='outlined'
              onChange={handleChange}
              value={rejectReason}
              //    onChange={formik.handleChange}
              //   error={formik.touched.title && Boolean(formik.errors.title)}
              //   helperText={formik.touched.title && formik.errors.title}
              placeholder='Reason of Rejection'
            />
          </Box>

          <Box display='flex' justifyContent={'end'}>
            <SharedButton
              text='Cancel'
              variant='outlined'
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
              onClick={handleClose}
            />
            <Button
              text='Add'
              variant='contained'
              style={{
                background: '#e93a7d',
                borderRadius: '8px',

                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '100px',
                border: 'none',
                height: '36px',

                marginRight: 17,
                marginTop: 20,
              }}
              onClick={handleReject}
            >
              Reject
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default RejectModal

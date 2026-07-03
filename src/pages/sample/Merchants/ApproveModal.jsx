import axios from 'axios'
import React from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'
import SharedButton from 'shared/components/SharedButton'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
const ApproveModal = ({ handleCls, open, requestId, ApproveSuccess }) => {
  const handleClose = () => {
    handleCls(false)
  }

  const handleAccept = () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/mall/requests/approve?request_id=${requestId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        toast.success('Request Accepted')
        ApproveSuccess(true)
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
              Approve Request
            </Typography>
            <IconButton onClick={handleClose}>
              {' '}
              <Close />
            </IconButton>
          </Box>

          <Typography fontSize={'16px'} color={'#6B7280'}>
            Are you sure you want to approve this request? We will refund the
            order amount and it will adjusted in your next payout.
          </Typography>

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
              onClick={handleAccept}
            >
              Accept
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ApproveModal

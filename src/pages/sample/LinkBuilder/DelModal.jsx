import React, { useState } from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'

import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { getBinDiscount } from 'redux/actions/DiscountActions'
import { useDispatch, useSelector } from 'react-redux'
const DelModal = ({ handleCls, open, requestId, setDelSuccess }) => {
  const [success, setSuccess] = useState(null)
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()
  const handleClose = () => {
    handleCls(false)
  }

  const handleDel = () => {
    setSuccess(false)
    setDelSuccess(false)
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/url-builder/delete_payment_link?id=${requestId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setSuccess(true)

          setDelSuccess(true)
          toast.success(
            response.data.message.toLowerCase() ===
              'deleted payment link successfully'
              ? 'Payment Link Deleted Successfully!'
              : response.data.message.toUpperCase()
          )
          handleCls(false)
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data)
        setSuccess(true)
      })
  }
  return (
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
            fontSize={'20px'}
            fontWeight={'bold'}
          >
            Delete Payment Link
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        <Typography marginTop={'10px'} fontSize={'16px'} color={'#111827'}>
          Are you sure you want to delete this payment link?
        </Typography>

        <Box display='flex' justifyContent={'end'} marginTop={'25px'}>
          <Button
            variant='outlined'
            sx={{
              paddingX: '30px',
              color: '#e93a7d',
              background: '#fff',
              border: '1px solid #e93a7d',
              marginRight: '18px',
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={{
              background: '#e93a7d',
              color: '#fff',
              paddingX: '30px',
              boxShadow: 'none',
            }}
            onClick={() => handleDel()}
          >
            {success === false ? (
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
            ) : (
              'Delete'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DelModal

import React, { useState } from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'
import SharedButton from 'shared/components/SharedButton'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
const DeleteModal = ({ handleCls, open, deleteOptionId, delSuccesss }) => {
  const [success, setSuccess] = useState(null)
  const handleClose = () => {
    handleCls(false)
  }

  const handleDel = () => {
    // dispatch(deleteDropOffLocation(deleteOptionId))
    setSuccess(false)
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/delete/dropOffLocation/${deleteOptionId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        toast.success('Address Deleted')
        setSuccess(true)
        handleCls(false)
        delSuccesss(true)
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
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
            fontSize={20}
            fontWeight={'bold'}
          >
            Delete Address
          </Typography>
          <IconButton onClick={handleClose}>
            {' '}
            <Close />
          </IconButton>
        </Box>

        <Typography fontSize={'12px'} fontStyle='italic' color={'#6B7280'}>
          Are you sure you want to delete this address?
        </Typography>
        <Box mt={'35px'}></Box>
        <Box mt={'15px'}></Box>

        <Box display='flex' justifyContent={'end'}>
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
            onClick={handleClose}
          />
          <Button
            variant='outlined'
            style={{
              background: '#e93a7d',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: '100px',
              border: 'none',
              height: '36px',
              cursor: 'pointer',
              marginRight: 17,
              marginTop: 20,
            }}
            onClick={handleDel}
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

export default DeleteModal

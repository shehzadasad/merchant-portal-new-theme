import React, { useState } from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import {
  deleteBinDiscount,
  getBinDiscount,
} from 'redux/actions/DiscountActions'
import { useDispatch, useSelector } from 'react-redux'
const DeleteDiscountModal = ({
  handleCls,
  open,
  deleteOptionId,
  delSuccesss,
  setDiscountsData,
}) => {
  const [success, setSuccess] = useState(null)
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()
  const handleClose = () => {
    handleCls(false)
  }

  const handleDel = () => {
    setSuccess(false)
    // dispatch(
    //   deleteBinDiscount(
    //     deleteOptionId,
    //     userDetail.merchantId,
    //     setSuccess,
    //     handleCls
    //   )
    // )
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}merchant/discounts/bin/delete?discount_id=${deleteOptionId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        toast.success(response.data)
        setSuccess(true)
        handleCls(false)
        dispatch(getBinDiscount(userDetail.merchantId, setDiscountsData))
      })
      .catch(function (error) {
        console.log(error)

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
            Delete this Discount
          </Typography>
          <IconButton onClick={handleClose}>
            {' '}
            <Close />
          </IconButton>
        </Box>

        <Typography fontSize={'12px'} fontStyle='italic' color={'#6B7280'}>
          Are you sure you want to delete this discount?
        </Typography>
        <Box mt={'35px'}></Box>
        <Box mt={'15px'}></Box>

        <Box display='flex' justifyContent={'end'} marginTop={'20px'}>
          <Button
            variant='outlined'
            sx={{
              color: '#e93a7d',
              border: '1px solid #e93a7d',
              marginRight: '17px',
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={{
              background: '#e93a7d',
              borderRadius: '8px',
              color: '#fff',
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

export default DeleteDiscountModal

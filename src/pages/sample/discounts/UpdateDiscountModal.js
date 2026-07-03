import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useFormik } from 'formik'
import { ThreeDots } from 'react-loader-spinner'
import * as Yup from 'yup'
import { getBinDiscount } from 'redux/actions/DiscountActions'
import { useDispatch, useSelector } from 'react-redux'
const UpdateDiscountModal = ({
  handleCls,
  open,
  discountId,
  name,
  setDiscountsData,
}) => {
  const [success, setSuccess] = useState(null)
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()
  const handleClose = () => {
    handleCls(false)
  }

  const updateSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
  })
  const formik = useFormik({
    initialValues: {
      name: name,
    },

    validationSchema: updateSchema,
    onSubmit: (values) => {
      const data = {
        name: values.name,
      }
      setSuccess(false)
      var myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      )
      var requestOptions = {
        method: 'PATCH',
        redirect: 'follow',
        headers: myHeaders,
      }

      fetch(
        `${process.env.REACT_APP_API_URL}merchant/discounts/bin/change-name?discount_id=${discountId}&updatedName=${values.name}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          toast.success(result)
          setSuccess(true)

          handleCls(false)
          dispatch(getBinDiscount(userDetail.merchantId, setDiscountsData))
        })
        .catch((error) => {
          console.log('error', error)
          toast.error(error?.response?.data?.errors?.[0].errorMessage)
          setSuccess(true)
        })
    },
  })
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
            Update Discount
          </Typography>
          <IconButton onClick={handleClose}>
            {' '}
            <Close />
          </IconButton>
        </Box>

        <Typography fontSize={'12px'} fontStyle='italic' color={'#6B7280'}>
          Enter details for your discount
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={'20px'}>
            <TextField
              fullWidth
              label='Name'
              id='name'
              name='name'
              variant='outlined'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              placeholder='Returns and Refunds Policy'
            />
          </Box>

          <Box display='flex' justifyContent={'end'} marginTop={10}>
            <Button
              variant='outlined'
              sx={{
                color: '#e93a7d',
                borderRadius: '8px',
                background: '#fff',
                border: '1px solid #e93a7d',
                marginRight: 17,
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
                border: 'none',
                marginRight: 17,
              }}
              type='submit'
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
                'Update'
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateDiscountModal

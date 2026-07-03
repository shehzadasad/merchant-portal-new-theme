import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Grid, ThreeDots } from 'react-loader-spinner'
import axios from 'axios'

import { addBinDiscount, getBinDiscount } from 'redux/actions/DiscountActions'
const CreateDiscountModal = ({
  handleCls,
  open,
  address,
  setDiscountsData,
}) => {
  const userDetail = useSelector((state) => state.users.userDetail)

  const [success, setSuccess] = useState(null)
  const dispatch = useDispatch()

  const handleClose = () => {
    handleCls(false)
  }

  const discountSchema = Yup.object().shape({
    // address: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    discountValue: Yup.number('must be a number').required('Required'),
    maximumDiscount: Yup.number('must be a number').required('Required'),
    minimumAmount: Yup.number('must be a number').required('Required'),
    cardName: Yup.string().required('Required'),
    binNumber: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  })

  const formik = useFormik({
    initialValues: {
      discountType: '',
      name: '',
      discountValue: 0,
      cardName: '',
      maximumDiscount: 0,
      minimumAmount: 0,
      binNumber: '',
    },

    validationSchema: discountSchema,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        discountType: values.discountType,
        discountValue: parseFloat(values.discountValue),
        maximumDiscount: parseFloat(values.maximumDiscount),
        minimumAmount: parseFloat(values.minimumAmount),
        cardName: values.cardName,
        binNumber: values.binNumber,
        merchant_user_id: userDetail.merchantId,
      }

      setSuccess(false)

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}merchant/discounts/bin/add`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setSuccess(true)
            toast.success('Bin discount created')
            dispatch(getBinDiscount(userDetail.merchantId, setDiscountsData))
          }
        })
        .catch(function (error) {
          console.log(error?.response?.data)
          toast.error(error?.response?.data)
          setSuccess(true)
        })
      handleCls(false)
    },
  })

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            container
            bgcolor={'#fff'}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: window.innerWidth < 600 ? '90vw' : '40vw',
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
                Create Discount
              </Typography>
              <IconButton onClick={handleClose}>
                {' '}
                <Close />
              </IconButton>
            </Box>
            <Typography fontSize={'12px'} fontStyle='italic' color={'#6B7280'}>
              Customers will send return package to below address.
            </Typography>
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
                placeholder='Discount Name'
              />
            </Box>
            <Box mt={'15px'}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Type of Discount
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='discountType'
                  label='Type of Discount'
                  value={formik.values.discountType || ''}
                  onChange={formik.handleChange}
                  name='discountType'
                  error={
                    formik.touched.discountType &&
                    Boolean(formik.errors.discountType)
                  }
                >
                  <MenuItem value={'PERCENTAGE'}>PERCENTAGE</MenuItem>
                  <MenuItem value={'FIXED'}>FIXED</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={'15px'}>
              <TextField
                fullWidth
                label='Discount Value'
                id='discountValue'
                name='discountValue'
                variant='outlined'
                value={formik.values.discountValue}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountValue &&
                  Boolean(formik.errors.discountValue)
                }
                helperText={
                  formik.touched.discountValue && formik.errors.discountValue
                }
              />
            </Box>
            <Box mt={'15px'}>
              <TextField
                fullWidth
                label={`Maximum Discount amount  ${
                  userDetail?.iso2 === 'PK'
                    ? 'Rs'
                    : userDetail?.iso2 === 'PH'
                    ? '₱'
                    : '$ '
                } `}
                id='maximumDiscount'
                name='maximumDiscount'
                variant='outlined'
                value={formik.values.maximumDiscount}
                onChange={formik.handleChange}
                error={
                  formik.touched.maximumDiscount &&
                  Boolean(formik.errors.maximumDiscount)
                }
                helperText={
                  formik.touched.maximumDiscount &&
                  formik.errors.maximumDiscount
                }
              />
            </Box>
            <Box mt={'15px'}>
              <TextField
                fullWidth
                label={`Minimum Purchase amount  ${
                  userDetail?.iso2 === 'PK'
                    ? 'Rs'
                    : userDetail?.iso2 === 'PH'
                    ? '₱'
                    : '$ '
                } `}
                id='minimumAmount'
                name='minimumAmount'
                variant='outlined'
                value={formik.values.minimumAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.minimumAmount &&
                  Boolean(formik.errors.minimumAmount)
                }
                helperText={
                  formik.touched.minimumAmount && formik.errors.minimumAmount
                }
              />
            </Box>

            <Box mt={'15px'}>
              <TextField
                fullWidth
                label='Card Name '
                id='cardName'
                name='cardName'
                variant='outlined'
                value={formik.values.cardName}
                onChange={formik.handleChange}
                error={
                  formik.touched.cardName && Boolean(formik.errors.cardName)
                }
                helperText={formik.touched.cardName && formik.errors.cardName}
              />
            </Box>
            <Box mt={'15px'}>
              <TextField
                fullWidth
                label='Card Patterns'
                id='binNumber'
                name='binNumber'
                variant='outlined'
                value={formik.values.binNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.binNumber && Boolean(formik.errors.binNumber)
                }
                helperText={formik.touched.binNumber && formik.errors.binNumber}
              />
            </Box>
            <Box display='flex' justifyContent={'end'} marginTop={10}>
              <Button
                variant='outlined'
                sx={{
                  color: '#e93a7d',
                  borderRadius: '8px',
                  border: '1px solid #e93a7d',
                  marginRight: 5,
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
                  border: 'none',
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
                    wrapperClassName=''
                    visible={true}
                  />
                ) : (
                  'Create'
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  )
}

export default CreateDiscountModal

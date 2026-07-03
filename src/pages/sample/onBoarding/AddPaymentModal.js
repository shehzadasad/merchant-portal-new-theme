import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
  Grid,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import SharedButton from 'shared/components/SharedButton'
import * as Yup from 'yup'
import { useFormik } from 'formik'
const AddPaymentModal = ({ open, handleCls, addPayment }) => {
  const addressSchema = Yup.object().shape({
    businessVolumePerPaymentMethod: Yup.number().required('Required'),
    paymentMethod: Yup.string().required('Required'),
 
  })

  const formik = useFormik({
    initialValues: {
        paymentMethod: '',
        businessVolumePerPaymentMethod: '',

    },

    validationSchema: addressSchema,
    onSubmit: (values) => {
        addPayment({
        paymentMethod: values.paymentMethod,
        businessVolumePerPaymentMethod: values.businessVolumePerPaymentMethod,
  
      })
      handleCls()
    },
  })

  return (
    <Modal
      open={open}
      onClose={handleCls}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <form onSubmit={formik.handleSubmit}>
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
              Add another Payment method
            </Typography>

            <IconButton onClick={handleCls}>
              {' '}
              <Close />
            </IconButton>
          </Box>

          <Box>
          <>
                   <TextField
                  fullWidth
                  id='paymentMethod'
                  name='paymentMethod'
                  label='Payment Methods '
                  variant='outlined'
                  placeholder='payment methods '
                  value={formik.values.paymentMethod }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.paymentMethod &&
                    Boolean(formik.errors.paymentMethod)
                  }
                  helperText={
                    formik.touched.paymentMethod &&
                    formik.errors.paymentMethod
                  }
                />
                 <TextField
                  fullWidth
                  id='businessVolumePerPaymentMethod'
                  name='businessVolumePerPaymentMethod'
                  label='Business Volume Per payment method'
                  variant='outlined'
                  placeholder='Business VolumePer PaymentMethod'
                  value={formik.values.businessVolumePerPaymentMethod }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.businessVolumePerPaymentMethod &&
                    Boolean(formik.errors.businessVolumePerPaymentMethod)
                  }
                  helperText={
                    formik.touched.businessVolumePerPaymentMethod &&
                    formik.errors.businessVolumePerPaymentMethod
                  }
                  style={{marginTop:'15px'}}
                />
                        </>
          </Box>
       

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
              onClick={handleCls}
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
              //   onClick={handleAddReason}
              type='submit'
            >
              Add
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  )
}

export default AddPaymentModal

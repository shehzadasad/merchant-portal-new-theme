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
const AddDirectorModal = ({ open, handleCls, addDirector }) => {
  const addressSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
    cnic: Yup.number()
      .required('Required')
      .min(13, 'Must be exactly 13 digits'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      designation: '',
      cnic: '',
    },

    validationSchema: addressSchema,
    onSubmit: (values) => {
      addDirector({
        name: values.name,
        designation: values.designation,
        cnic: values.cnic,
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
              Add another director
            </Typography>

            <IconButton onClick={handleCls}>
              {' '}
              <Close />
            </IconButton>
          </Box>

          <Box>
            <Grid item xs={12} marginTop='15px'>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Director Name'
                variant='outlined'
                value={formik.values.name || ''}
                placeholder='Director Name'
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} marginTop='15px'>
              <TextField
                fullWidth
                id='designation'
                name='designation'
                label='designation'
                variant='outlined'
                placeholder='designation'
                value={formik.values.designation || ''}
                onChange={formik.handleChange}
                error={
                  formik.touched.designation &&
                  Boolean(formik.errors.designation)
                }
                helperText={
                  formik.touched.designation && formik.errors.designation
                }
              />
            </Grid>
            <Grid item xs={12} marginTop='15px'>
              <TextField
                fullWidth
                id='cnic'
                name='cnic'
                label='CNIC'
                variant='outlined'
                placeholder='CNIC'
                value={formik.values.cnic || ''}
                onChange={formik.handleChange}
                error={formik.touched.cnic && Boolean(formik.errors.cnic)}
                helperText={formik.touched.cnic && formik.errors.cnic}
              />
            </Grid>
          </Box>
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

export default AddDirectorModal

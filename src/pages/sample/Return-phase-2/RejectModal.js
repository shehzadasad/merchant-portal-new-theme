import React, { useRef, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
  TextareaAutosize,
} from '@mui/material'
import _ from 'lodash'
import { toast } from 'react-toastify'
import SharedButton from 'shared/components/SharedButton'
import { Close } from '@mui/icons-material'

import { useDispatch } from 'react-redux'
import { approveOrDeclineOrderRequest } from 'redux/actions/ReturnAction'

const RejectModal = ({ handleCls, open, orderId, RejectSuccess }) => {
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

  const handleFileUpload = (event) => {
    let arr = [...Images]
    let arr2 = [...ImagesFile]
    arr.push(URL.createObjectURL(event.target.files[0]))
    arr2.push(event.target.files[0])
    setImages(arr)
    let formData = new FormData()

    _.forEach(event.target.files, (file) => {
      formData.append('files', file)
    })

    var formdata = new FormData()
    var FormValue = formData.get('files')

    formdata.append(
      'files',
      new Blob(
        [
          {
            lastModified: FormValue.lastModified,
            lastModifiedDate: FormValue.lastModifiedDate,
            name: FormValue.name,
            size: FormValue.size,
            type: FormValue.type,
            webkitRelativePath: FormValue.webkitRelativePath,
          },
        ],
        { type: 'application/json' }
      )
    )

    formdata.append('bucket-name', 'merchants/return-rejection')

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      `${process.env.REACT_APP_API_URL}ms-web-external-apis/file/upload/image`,
      requestOptions
    )
      .then((response) => setS3url([...S3url, response.url]))
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }
  const handleReject = () => {
    const data = {
      status: 'REJECTED',
      returnOrderId: orderId,
      rejectReason: rejectReason,
      imageURLs: S3url,
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/merchant/order/handle`,
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
            Please select a reason and provide detail answer. We will share this
            with customer. This way customer will better understand why return
            request is rejected.
          </Typography>
          <Box mt={'35px'}>
            <TextField
              fullWidth
              label='Title'
              id='title'
              name='title'
              variant='outlined'
              value={rejectReason}
              onChange={handleChange}
              //   error={formik.touched.title && Boolean(formik.errors.title)}
              //   helperText={formik.touched.title && formik.errors.title}
              placeholder='Returns and Refunds Policy'
            />
          </Box>
          <Box mt={'15px'}>
            <TextareaAutosize
              fullWidth
              label='Title'
              id='title'
              name='title'
              minRows={5}
              style={{ width: '458px', padding: '10px' }}
              variant='outlined'
              //   value={formik.values.title}
              //    onChange={formik.handleChange}
              //   error={formik.touched.title && Boolean(formik.errors.title)}
              //   helperText={formik.touched.title && formik.errors.title}
              placeholder='Returns and Refunds Policy'
            />
          </Box>
          <Box bgcolor={'#D8DADD'} padding='10px'>
            <Typography margin='10px 0px' textAlign={'center'}>
              Upload Image
            </Typography>
            <Box display='flex' marginBottom={'10px'}>
              {Images?.length < 4 &&
                Images?.map((items, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        position: 'relative',
                        width: '75pt',
                        height: '75pt',
                        marginRight: '20pt',
                      }}
                    >
                      <img
                        color='secondary'
                        variant='contained'
                        component='span'
                        src={items}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '7px',
                          marginRight: '10pt',
                        }}
                        alt='img'
                      />
                    </div>
                  )
                })}
              <input
                ref={inputElement}
                onChange={handleFileUpload}
                type='file'
                style={{ display: 'none' }}
                multiple={true}
              />
            </Box>
            {Images.length < 4 ? (
              <Box width='100%' textAlign={'center'}>
                <Typography
                  color='secondary'
                  variant='contained'
                  component='span'
                  textAlign={'center'}
                  marginTop='10px'
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => inputElement.current.click()}
                >
                  (Jpg, or Png smaller than 10MB)
                </Typography>
              </Box>
            ) : (
              <Typography>You can upload only 3 pictures</Typography>
            )}
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

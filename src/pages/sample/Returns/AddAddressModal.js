import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'
import SharedButton from 'shared/components/SharedButton'
import { Close } from '@mui/icons-material'
import InputAdornment from '@mui/material/InputAdornment'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import TextField from '@mui/material/TextField'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addDropOffLocation } from 'redux/actions/ReturnAction'
import { useLoadScript } from '@react-google-maps/api'
import GoogleMapComp from './GoogleMap'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
const AddAddressModal = ({ handleCls, open, address }) => {
  const userDetail = useSelector((state) => state.users.userDetail)
  const getDropOff = useSelector((state) => state.return.getDropOffLocation)
  const [success, setSuccess] = useState(null)
  const [currentCoord, setCurrentCoord] = useState({
    lat: '',
    lng: '',
  })
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: '',
  })
  const [googleCountry, setGoogleCountry] = useState('')
  const [googleCity, setGoogleCity] = useState('')
  const [googleState, setGoogleState] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')
  const [dropOffRes, setDropOffRes] = useState({})

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_API_KEY',
  })
  const [openMap, setOpenMap] = useState(false)
  const dispatch = useDispatch()

  const dropOffError = (val) => {
    setErrorMessage(val)
  }
  const dropOffResponse = (val) => {
    setDropOffRes(val)
  }
  const handleClose = () => {
    handleCls(false)
  }

  const handleGetCoordinate = (lat, lng) => {
    setCoordinates(() => ({
      ...coordinates,
      latitude: lat,
      longitude: lng,
    }))
  }
  const addressSchema = Yup.object().shape({
    address: Yup.string().required('Required'),
  })
  const getGoogleAdress = (address) => {
    address.map((add) => {
      if (add.types.includes('country')) {
        setGoogleCountry(add.long_name)
      }
      if (add.types.includes('locality')) {
        setGoogleCity(add.long_name)
      }
      if (add.types.includes('administrative_area_level_1')) {
        setGoogleState(add.long_name)
      }
    })
  }
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentCoord(() => ({
        ...currentCoord,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }))
    })
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentCoord(() => ({
        ...currentCoord,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }))
    })
  }, [])
  const formik = useFormik({
    initialValues: {
      address: '',
      title: '',
    },

    validationSchema: addressSchema,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.address,
        merchantId: userDetail.merchantId,
        optionId: null,
        addressDTO: {
          id: null,
          country: googleCountry && googleCountry,
          state: googleState && googleState,
          city: googleCity && googleCity,
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
          zipCode: '',
          address: values.address,
        },
      }
      setSuccess(false)
      // dispatch(
      //   addDropOffLocation(data, dropOffResponse, dropOffError, setSuccess)
      // )

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/add/dropOffLocation`,

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          dropOffResponse(response)

          if (response.status === 200) {
            toast.success('Address Added')
            setSuccess(true)
            address(response.data)

            handleClose()
          }
        })
        .catch(function (error) {
          dropOffError(error?.response?.data?.errors?.[0].errorMessage)
          toast.error(error?.response?.data?.errors?.[0].errorMessage)
          setSuccess(true)
        })
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
            bgcolor='#fff'
            padding='30px'
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: window.innerWidth < 600 ? '90vw' : 500,
              border: 'none',
              boxShadow: 24,
              borderRadius: '16px',
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
                Add Address
              </Typography>
              <IconButton onClick={handleClose}>
                {' '}
                <Close />
              </IconButton>
            </Box>

            <Typography fontSize={'12px'} fontStyle='italic' color={'#6B7280'}>
              Customers will send return package to below address.
            </Typography>
            <Box mt={'35px'}>
              <TextField
                fullWidth
                label='Title'
                id='title'
                name='title'
                variant='outlined'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                placeholder='Returns and Refunds Policy'
              />
            </Box>
            <Box mt={'15px'}>
              <TextField
                fullWidth
                label='Delivery Address'
                sx={{ m: 1 }}
                id='address'
                name='address'
                variant='outlined'
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={getCurrentLocation}>
                        <MyLocationIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Typography
                style={{
                  color: 'red',
                  marginLeft: '10px',
                  marginTop: '10px',
                  fontWeight: 'bold',
                }}
              >
                {ErrorMessage}
              </Typography>
            </Box>

            <GoogleMapComp
              open={openMap}
              GetCoordinate={handleGetCoordinate}
              getGoogleAdress={getGoogleAdress}
              currentCoord={currentCoord}
            />

            <Box display='flex' justifyContent={'end'} marginTop='20px'>
              <Button
                variant='outlined'
                sx={{
                  color: '#e93a7d',
                  borderRadius: '8px',
                  marginRight: '20px',

                  border: '1px solid #e93a7d',
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
                  paddingX: '30px',
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
                  'Add'
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  )
}

export default AddAddressModal

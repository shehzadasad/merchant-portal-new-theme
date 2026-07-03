import {
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Typography,
  FormGroup,
  Button,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './styles.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import AddAddressModal from './AddAddressModal'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteModal from './DeleteModal'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import * as React from 'react'
import AppLoader from '@crema/core/AppLoader'
import {
  addRefundPolicy,
  getAllDropOffLocation,
  getRefundPolicy,
} from 'redux/actions/ReturnAction'
import { useDispatch } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'
import TextEditor from './TextEditor'
import AddReasonModal from './AddReasonModal'
import { toast } from 'react-toastify'
const Returns = () => {
  const userDetail = useSelector((state) => state.users.userDetail)

  const [loader, setLoader] = useState(true)
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openReason, setOpenReason] = useState(false)
  const [descriptionVal, setDescriptionVal] = useState('')
  const [refundData, setRefundData] = useState({})
  const [allDropOffLoc, setAllDropOffLoc] = useState([])
  const [success, setSuccess] = useState(null)
  const [dropOffReturnOptionDTOList1, setDropOffReturnOptionDTOList1] =
    useState([])
  const [newReason, setNewReason] = useState({})
  let reason1 = []
  const cusReason =
    refundData?.reason?.filter((r) => r.isActive === true).length > 0
  const [customerReasons, setCustomerReasons] = useState([])
  const [optionID, setOptionID] = useState('')

  const dispatch = useDispatch()

  const returnSchema = Yup.object().shape({
    timeQuantity: Yup.string().required('Required'),
    timeUnit: Yup.string().required('Required'),
    title: Yup.string().required('Required'),
    pickupCharges: Yup.number('must be a Number').required('Required'),
  })
  const handleClose = (val) => {
    setOpen(val)

    setOpenDelete(val)
  }

  const getAddress = (val) => {
    setAllDropOffLoc([
      ...allDropOffLoc,
      {
        addressDTO: val?.body?.addressDTO,
        optionId: val?.body?.optionId,
        description: val?.body.description,
      },
    ])
    setDropOffReturnOptionDTOList1([
      ...dropOffReturnOptionDTOList1,
      {
        optionId: val?.body?.optionId,
        addressId: val?.body?.addressDTO?.id,
      },
    ])
  }

  useEffect(() => {
    // dispatch(getDropOffLocations())
    dispatch(
      getRefundPolicy(
        userDetail.merchantId,
        setRefundData,
        setLoader,
        setCustomerReasons
      )
    )
  }, [userDetail])

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      timeQuantity: refundData?.timeQuantity,
      returnDays: '',
      timeUnit: refundData?.timeUnit,
      title: refundData?.title,
      pickupCharges: refundData?.pickupCharges,
      description: refundData?.description,
      isCourierActive: refundData?.isCourierActive || false,
      isSelfDropOffActive: refundData?.isSelfDropOffActive || false,

      reason: '',

      Item_has_a_missing_freebie: '',
      Item_does_not_match_description_or_picture: '',
      Item_is_not_my_size: '',
      Item_is_damaged_has_dent_or_scratched: '',
      returnReason: refundData?.isNoReason ? 'NoReason' : cusReason && 'reason',

      isNoReason: refundData?.isNoReason,
    },

    validationSchema: returnSchema,

    onSubmit: (values) => {
      const data = {
        merchantId: userDetail.merchantId,
        title: values.title,
        timeQuantity: values.timeQuantity,
        timeUnit: values.timeUnit,
        description: descriptionVal && descriptionVal,
        pickupCharges: parseFloat(values.pickupCharges),
        isCourierActive: values.isCourierActive,
        isSelfDropOffActive: values.isSelfDropOffActive,
        courierOptionId: null,
        reason: customerReasons,
        dropOffReturnOptionDTOList: dropOffReturnOptionDTOList1,
        id: refundData?.id,
        isNoReason: values.returnReason === 'NoReason' ? true : false,
      }

      if (!values.isCourierActive && !values.isSelfDropOffActive) {
        toast.error('select one of the courier options')
      } else {
        setSuccess(false)
        dispatch(addRefundPolicy(data, setSuccess))
      }
      {
      }
    },
  })
  useEffect(() => {
    dispatch(getAllDropOffLocation(userDetail?.merchantId, setAllDropOffLoc))
  }, [userDetail])

  const getalldropofLoc = (val) => {
    setAllDropOffLoc(val.data.body)
  }
  const handleDelete = (optionId) => {
    setOpenDelete(true)

    setOptionID(optionId)
    // dispatch(getAllDropOffLocation(userDetail?.merchantId, setAllDropOffLoc))
  }
  const handleDeleteSuccess = (val) => {
    if (val) {
      dispatch(getAllDropOffLocation(userDetail?.merchantId, setAllDropOffLoc))
    }
  }
  const handleCheckbox = (e) => {}
  const handleAddReasons = () => {
    setOpenReason(true)
  }
  const handleCloseReason = () => {
    setOpenReason(false)
  }
  const addReason = (val) => {
    setNewReason(val)

    setCustomerReasons([
      ...customerReasons,
      {
        reason: val.reason,
        isActive: val.isActive,
        id: val.id,
      },
    ])
  }

  const handleChangeReason = (e, index) => {
    let newReasonArr = [...customerReasons]
    newReasonArr[index].isActive = e.target.checked

    setCustomerReasons(newReasonArr)
  }
  const handleNoAdress = () => {
    if (allDropOffLoc.length < 1) {
      setOpen(true)
    }
  }
  const dayArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
  ]
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <>
      {!loader ? (
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={0}
            direction='column'
            marginTop='20px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              minHeight: '100vh',
            }}
          >
            <Grid item>
              <Typography variant='h2' component='h2'>
                Returns and Refunds Configuration
              </Typography>
              <Paper
                sx={{
                  width: window.innerWidth > 700 ? '50vw' : '80vw',
                  marginTop: '35px',
                  padding: 12,
                  borderRadius: 2,
                }}
              >
                <Stack spacing={5}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={7} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Time Unit
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='timeUnit'
                          label='Time Unit'
                          value={formik.values.timeUnit || ''}
                          onChange={formik.handleChange}
                          name='timeUnit'
                          error={
                            formik.touched.timeUnit &&
                            Boolean(formik.errors.timeUnit)
                          }
                          helperText={
                            formik.touched.timeUnit && formik.errors.timeUnit
                          }
                        >
                          <MenuItem value={'Days'}>Days</MenuItem>
                          <MenuItem value={'Week'}>Week</MenuItem>
                          <MenuItem value={'Month'}> Month</MenuItem>
                        </Select>
                      </FormControl>

                      {formik.errors.timeQuantity && (
                        <Typography
                          sx={{
                            color: '#d32f2f',
                            fontSize: '12px',
                            marginLeft: '14px',
                            marginTop: '3px',
                          }}
                        >
                          {formik.errors.timeQuantity}
                        </Typography>
                      )}
                    </Grid>{' '}
                    <Grid item xs={12} md={7} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          I accept returns within
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='timeQuantity'
                          label='I accept returns within'
                          value={formik.values.timeQuantity || ''}
                          onChange={formik.handleChange}
                          name='timeQuantity'
                          error={
                            formik.touched.timeQuantity &&
                            Boolean(formik.errors.timeQuantity)
                          }
                          helperText={
                            formik.touched.timeQuantity &&
                            formik.errors.timeQuantity
                          }
                        >
                          {formik.values.timeUnit === 'Month'
                            ? monthArr.map((month) => {
                                return (
                                  <MenuItem value={month}>{month} </MenuItem>
                                )
                              })
                            : dayArr.map((day) => {
                                return <MenuItem value={day}>{day} </MenuItem>
                              })}
                        </Select>
                      </FormControl>

                      {formik.errors.timeQuantity && (
                        <Typography
                          sx={{
                            color: '#d32f2f',
                            fontSize: '12px',
                            marginLeft: '14px',
                            marginTop: '3px',
                          }}
                        >
                          {formik.errors.timeQuantity}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                  </Grid>
                  <Box>
                    <TextField
                      fullWidth
                      id='title'
                      name='title'
                      label='Title*'
                      variant='outlined'
                      value={formik.values.title || ''}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                      placeholder='Returns and Refunds Policy '
                    />
                  </Box>
                  <Box>
                    <TextEditor
                      descriptionVal={refundData?.description}
                      setDescriptionVal={setDescriptionVal}
                    />
                  </Box>
                </Stack>
              </Paper>
              <Typography variant='h2' component='h2' marginTop={10}>
                How do you want to refund?
              </Typography>
              <Paper
                sx={{
                  width: window.innerWidth > 700 ? '50vw' : '80vw',
                  marginTop: '35px',
                  padding: 12,
                  borderRadius: 2,
                }}
              >
                <Stack spacing={5}>
                  <Box>
                    <Box display='grid'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name='isCourierActive'
                            value={formik.values.isCourierActive}
                            onChange={formik.handleChange}
                            checked={formik.values.isCourierActive}
                            error={
                              formik.touched.isCourierActive &&
                              Boolean(formik.errors.isCourierActive)
                            }
                            helperText={
                              formik.touched.isCourierActive &&
                              formik.errors.isCourierActive
                            }
                            sx={{
                              '&.Mui-checked': {
                                color: '#E71583',
                              },
                            }}
                          />
                        }
                        label='Courier Pickup'
                      />
                      {formik.values.isCourierActive && (
                        <Grid xs={3}>
                          <TextField
                            id='pickupCharges'
                            name='pickupCharges'
                            label='Pickup Charges'
                            variant='outlined'
                            value={formik.values.pickupCharges || ''}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.pickupCharges &&
                              Boolean(formik.errors.pickupCharges)
                            }
                            helperText={
                              formik.touched.pickupCharges &&
                              formik.errors.pickupCharges
                            }
                          />
                        </Grid>
                      )}
                    </Box>
                    {
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name='isSelfDropOffActive'
                              value={formik.values.isSelfDropOffActive}
                              checked={formik.values.isSelfDropOffActive}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.isSelfDropOffActive &&
                                Boolean(formik.errors.isSelfDropOffActive)
                              }
                              onClick={handleNoAdress}
                              helperText={
                                formik.touched.isSelfDropOffActive &&
                                formik.errors.isSelfDropOffActive
                              }
                              sx={{
                                '&.Mui-checked': {
                                  color: '#E71583',
                                },
                              }}
                            />
                          }
                          label='Customer Drop-off'
                        />
                      </FormGroup>
                    }

                    {allDropOffLoc?.map((add) => {
                      return (
                        <>
                          {add && (
                            <TextField
                              variant='filled'
                              sx={{ marginTop: '15px' }}
                              value={add?.description}
                              disabled
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() =>
                                        handleDelete(add?.optionId)
                                      }
                                    >
                                      <DeleteIcon sx={{ cursor: 'pointer' }} />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                          {openDelete && (
                            <DeleteModal
                              handleCls={handleClose}
                              open={openDelete}
                              deleteOptionId={optionID}
                              delSuccesss={handleDeleteSuccess}
                            />
                          )}
                        </>
                      )
                    })}
                  </Box>
                  <Typography
                    variant={'p'}
                    component={'p'}
                    className='modalText'
                    onClick={() => setOpen(true)}
                  >
                    Add another address
                  </Typography>
                  {open && (
                    <AddAddressModal
                      handleCls={handleClose}
                      open={open}
                      address={getAddress}
                    />
                  )}
                </Stack>
              </Paper>
              <Typography variant='h2' component='h2' marginTop={10}>
                Specify return reason
              </Typography>
              <Paper
                sx={{
                  width: window.innerWidth > 700 ? '50vw' : '80vw',
                  marginTop: '35px',
                  padding: 12,
                  borderRadius: 2,
                }}
              >
                <Stack spacing={5}>
                  <Box>
                    <RadioGroup
                      aria-labelledby='demo-controlled-radio-buttons-group'
                      name='returnReason'
                      value={formik.values.returnReason}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.returnReason &&
                        Boolean(formik.errors.returnReason)
                      }
                    >
                      <FormControlLabel
                        value='NoReason'
                        control={
                          <Radio
                            sx={{
                              '&.Mui-checked': {
                                color: '#E71583',
                              },
                            }}
                          />
                        }
                        label='No Reason required'
                      />
                      <FormControlLabel
                        value='reason'
                        control={
                          <Radio
                            sx={{
                              '&.Mui-checked': {
                                color: '#E71583',
                              },
                            }}
                          />
                        }
                        label='Customer Specify Reason'
                      />
                    </RadioGroup>

                    {formik.values.returnReason === 'reason' && (
                      <Box mt={'30px'}>
                        <Typography
                          id='modal-modal-title'
                          variant='p'
                          component='p'
                          fontSize={16}
                          fontWeight='bold'
                        >
                          Add Reasons
                        </Typography>
                        <Typography
                          fontSize={'12px'}
                          fontStyle='italic'
                          color={'#6B7280'}
                        >
                          Customers will select return reason from these options
                          while initiating return request
                        </Typography>
                        <FormGroup>
                          {customerReasons?.map((r, index) => {
                            return (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={r.isActive}
                                    onChange={(e) =>
                                      handleChangeReason(e, index)
                                    }
                                    checked={r.isActive}
                                    name={r.reason}
                                    sx={{
                                      '&.Mui-checked': {
                                        color: '#E71583',
                                      },
                                    }}
                                  />
                                }
                                label={r.reason?.replaceAll('_', ' ')}
                              />
                            )
                          })}

                          <Typography
                            sx={{ color: '#E71583', marginTop: '20px' }}
                            onClick={handleAddReasons}
                            className='modalText'
                          >
                            Add another reason
                          </Typography>
                          {openReason && (
                            <AddReasonModal
                              handleCls={handleCloseReason}
                              open={openReason}
                              addReason={addReason}
                            />
                          )}
                        </FormGroup>
                      </Box>
                    )}
                  </Box>
                </Stack>
              </Paper>
              <Button
                variant='contained'
                sx={{
                  background: '#e93a7d',
                  marginTop: '20px',
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
                  'Save'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <AppLoader />
      )}
    </>
  )
}

export default Returns

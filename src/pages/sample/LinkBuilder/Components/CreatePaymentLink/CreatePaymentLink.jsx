import React, { useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import styles from '../../../Invoices/Invoices/CustomerInvoices.module.css'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import AutoComplete from '../Autocomplete/AutoComplete'
import { toast } from 'react-toastify'

import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate, useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPaymentLink,
  updatePaymentLink,
  getAllPaymentLinks,
  getPaymentLink,
} from 'redux/actions/LinkBuilder'
import { useFormik } from 'formik'
import { DatePicker } from '@mui/lab/DatePicker'
import * as Yup from 'yup'

const CreatePaymentLink = () => {
  const userDetail = useSelector((state) => state.users.userDetail)

  const permOptions = {
    id: 'add-customer',
    name: 'Add One Time Product',
    color: 'rgb(226, 47, 126)',
    fontWeight: 'bold',
    cursor: 'pointer',
  }

  const [productDetail, setProductDetail] = React.useState(null)
  const [total, setTotal] = React.useState(0)
  const [subtotal, setSubTotal] = React.useState(0)
  const [discount, setDiscount] = React.useState(0)
  const [customerOptions, setCustomerOptions] = React.useState([permOptions])
  const [success, setSuccess] = React.useState(false)
  const [showAddProductModal, setShowAddProductModal] = React.useState(false)
  const [customerSelected, setCustomerSelected] = React.useState(null)
  const [showAddCustomerModal, setShowAddCustomerModal] = React.useState(false)
  const [productList, setProductList] = React.useState([])
  const [customerSearchError, setCustomerSearchError] = React.useState('')
  const [linkExpiry, setLinkExpiry] = React.useState(false)
  const [paymentLimit, setPaymentLimit] = React.useState(false)
  const [data, setData] = React.useState([])

  const [btnClicked, setBtnClicked] = React.useState('')
  const [showAddProductModalToBE, setShowAddProductModalToBE] =
    React.useState(false)
  const [linkDiscount, setLinkDiscount] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const [selectItemError, setSelectItemError] = React.useState(false)
  const [singleData, setSingleData] = React.useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  let { pd } = useParams()

  React.useEffect(() => {
    if (id && singleData !== null) {
      const pdetail = JSON.parse(singleData?.data)

      setProductDetail(pdetail.products)
    }
  }, [singleData])

  function showModal() {
    setShowAddCustomerModal(true)
  }
  React.useEffect(() => {
    dispatch(getAllPaymentLinks(userDetail?.id, setData, ''))
    if (id && pd) {
      dispatch(getPaymentLink(userDetail?.id, id, setSingleData))
    }
  }, [userDetail, pd])

  React.useEffect(() => {
    if (selectedItem !== null) {
      if (id) {
        setProductDetail([...productDetail, selectedItem])
      } else {
        setProductList([...productList, selectedItem])
      }
    }
  }, [selectedItem])

  const handleCheckboxChange = () => {
    setLinkExpiry(!linkExpiry)
  }
  const handleCheckboxLimitChange = () => {
    setPaymentLimit(!paymentLimit)
  }
  const handleChangeDiscount = () => {
    setLinkDiscount(!linkDiscount)
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    order_limit: Yup.number(),

    // link_discount_value: Yup.number().test(
    //   'Is positive?',
    //   'The number must be greater than 0!',
    // (value) => value && value > 0
    // ),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: singleData?.name || '',
      expiry_time: singleData?.expiry_time?.slice(0, 10) || '',
      order_limit: singleData?.order_limit || 0,
      shipping_charges: singleData?.shipping_charges || false,
      tax_charges: singleData?.tax_charges || false,
      single_product_purchase: singleData?.single_product_purchase || false,
      link_discount_type: singleData?.link_discount_type || 'PERCENTAGE',
      link_discount_value: singleData?.link_discount_value || '',
      status: '',
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const regex = /^[0-9\b]+$/
      const currentDate = new Date() // Get the current date and time

      const isExpired = new Date(values.expiry_time) <= currentDate

      const data = {
        id: id ? id : null,
        name: values.name,
        expiry_time: linkExpiry ? Date.parse(values.expiry_time) : null,
        order_limit: paymentLimit ? parseInt(values.order_limit) : 1,
        shipping_charges: values.shipping_charges,
        tax_charges: values.tax_charges,
        single_product_purchase: values.single_product_purchase,
        link_discount_type: values.link_discount_type,
        link_discount_value: parseInt(values.link_discount_value),
        status: btnClicked === 'save_as_draft' ? 'DRAFT' : 'ACTIVE',
        data:
          productList?.length === 0
            ? { products: productDetail }
            : {
                products: productList,
              },
      }

      setSuccess(false)

      if (data.data == null || !data.data) {
        setSelectItemError(true)
      } else {
        setSelectItemError(false)
        if (values.order_limit !== '' && !regex.test(values.order_limit)) {
          toast.error(' Price should be a positive number')
        }
        if (
          values.link_discount_value !== '' &&
          !regex.test(values.link_discount_value)
        ) {
          toast.error(' Discount value should be a positive number')
        }
        if (linkExpiry && values.expiry_time !== '' && isExpired) {
          toast.error('Expiry date should be in future')
        } else {
          if (!id) {
            dispatch(addPaymentLink(data, setSuccess))
          } else {
            dispatch(updatePaymentLink(data, setSuccess))
          }
        }
      }
    },
  })

  React.useEffect(() => {
    if (showAddCustomerModal) {
      navigate('/product-create')
    }
  }, [showAddCustomerModal])

  const handleCalculateDiscount = () => {
    let discount = 0
    let subtotal = 0
    if (formik.values.link_discount_type === 'PERCENTAGE') {
      if (productList?.length === 0) {
        productDetail?.map((item) => {
          subtotal += parseInt(item?.price)
        })
        const dis = (formik.values.link_discount_value / 100) * subtotal

        return setDiscount(dis.toFixed(2))
      } else {
        productList?.map((item) => {
          subtotal += parseInt(item?.price)
        })
        discount = (formik.values.link_discount_value / 100) * subtotal

        setDiscount(discount.toFixed(2))
      }
    } else {
      setDiscount(formik.values.link_discount_value)
    }
  }
  const handleCalculateTotal = () => {
    let total = 0
    let total1 = 0
    let total2 = 0
    let subtotal = 0
    if (productList?.length === 0) {
      productDetail?.map((item) => {
        total2 += item?.price
        total1 = total2 - discount
      })
      setSubTotal(total2.toFixed(2))
      setTotal(total1.toFixed(2))
    } else {
      productList?.map((item) => {
        if (item?.price) {
          subtotal += item?.price
          total = subtotal - discount
        }
      })
      productDetail?.map((item) => {
        total2 += item?.price
      })
      total = total + total2
      subtotal = subtotal + total2
      setSubTotal(subtotal.toFixed(2))
      setTotal(total.toFixed(2))
    }
  }
  useEffect(() => {
    handleCalculateDiscount()
  }, [selectedItem, productDetail, formik.values.link_discount_value])
  useEffect(() => {
    handleCalculateTotal()
  }, [discount, productDetail, productList])

  useEffect(() => {
    if (singleData?.link_discount_value) {
      setLinkDiscount(true)
    }
    if (singleData?.expiry_time) {
      setLinkExpiry(true)
    }
    if (singleData?.order_limit) {
      setPaymentLimit(true)
    }
  }, [singleData, formik?.values?.expiry_time])

  const handleDeleteProduct = (ind, id, val) => {
    let newArr = [...productList]
    newArr.splice(ind, 1)
    setProductList(newArr)
    if (val === 'edit') {
      productDetail?.map((item, index) => {
        if (item.product_id === id) {
          let newArr2 = [...productDetail]

          newArr2.splice(index, 1)

          setProductDetail(newArr2)
        }
      })
    }
  }
  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                paddingTop: '50px',
              }}
            >
              <ArrowBackIcon
                className={styles.BackArrow}
                onClick={() => {
                  navigate('/link-builder')
                }}
              />
              <Typography variant='h3' marginLeft={'15px'}>
                {!id ? 'Create Payment Link' : 'Edit Payment Link'}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box
              bgcolor='#FFFFFF'
              boxShadow='0px 4px 8px rgba(0, 0, 0, 0.08)'
              borderRadius='10px'
              padding='30px'
            >
              <Grid item xs={12} md={6} pb={'20px'}>
                <TextField
                  fullWidth
                  id='name'
                  name='name'
                  label='Payment Link Name'
                  variant='outlined'
                  placeholder='Payment Link Name'
                  value={formik.values.name || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <Typography marginTop={'12px'} fontWeight={500}>
                  What are you selling?
                </Typography>
              </Grid>
              <Grid item sx={12}>
                <TableContainer component={Paper} sx={{ marginTop: '12px' }}>
                  <Table aria-label='customized table'>
                    <TableHead style={{ background: '#ECEDEF' }}>
                      <TableRow>
                        <TableCell align='center' sx={{ color: '#6B7280' }}>
                          Item
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#6B7280' }}>
                          Variant
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#6B7280' }}>
                          Inventory
                        </TableCell>
                        <TableCell align='center' sx={{ color: '#6B7280' }}>
                          Amount
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{ color: '#6B7280' }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Box key={1} sx={{ margin: '20px' }}>
                        <AutoComplete
                          // token={props.token}
                          customerOptions={customerOptions}
                          setCustomerSelected={setCustomerSelected}
                          setCustomerOptions={setCustomerOptions}
                          showModal={showModal}
                          showAddCustomerModal={showAddCustomerModal}
                          customerSelected={customerSelected}
                          showAddProductModal={showAddProductModal}
                          setShowAddProductModal={setShowAddProductModal}
                          setCustomerSearchError={setCustomerSearchError}
                          showAddProductModalToBE={showAddProductModalToBE}
                          prodList={
                            productList?.length === 0
                              ? productDetail
                              : productList
                          }
                          setSelectedItem={setSelectedItem}
                        />
                      </Box>
                      {productList?.map((item, index) => {
                        return (
                          <TableRow key={2}>
                            <TableCell
                              component='th'
                              scope='row'
                              sx={{
                                // width: 190,
                                // padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <Box display='flex' alignItems='center'>
                                {' '}
                                <img
                                  src={item?.src}
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    marginRight: '10px',
                                  }}
                                />{' '}
                                {item?.title}
                              </Box>
                            </TableCell>
                            <TableCell
                              component='th'
                              scope='row'
                              sx={{ width: 160, padding: 2 }}
                              align='center'
                            >
                              {item?.variants + ' '} Variant(s)
                            </TableCell>

                            <TableCell align='center' sx={{ width: 160 }}>
                              {item?.inventory ? item?.inventory : 0}
                            </TableCell>
                            <TableCell align='center' sx={{ width: 160 }}>
                              {userDetail?.iso2 === 'PK' &&
                                Number(item?.price).toLocaleString('ur-PK', {
                                  style: 'currency',
                                  currency: 'PKR',
                                })}
                              {userDetail?.iso2 === 'PH' &&
                                Number(item?.price).toLocaleString('fil-PH', {
                                  style: 'currency',
                                  currency: 'PHP',
                                })}

                              {userDetail?.iso2 !== 'PK' &&
                              userDetail?.iso2 !== 'PH'
                                ? Number(item?.price).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })
                                : ''}
                            </TableCell>
                            <TableCell>
                              <DeleteIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleDeleteProduct(index)}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                      {productDetail?.map((item, index) => {
                        return (
                          <TableRow key={3}>
                            <TableCell
                              component='th'
                              scope='row'
                              sx={{
                                // width: 190,
                                // padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <img
                                src={item?.src}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  marginRight: '10px',
                                }}
                              />{' '}
                              {item?.title}
                            </TableCell>
                            <TableCell
                              component='th'
                              scope='row'
                              sx={{ width: 160, padding: 2 }}
                            >
                              {item?.variant ? item?.variant : 0} Varaint(s)
                            </TableCell>

                            <TableCell align='center' sx={{ width: 160 }}>
                              {item?.inventory ? item?.inventory : 0}
                            </TableCell>
                            <TableCell align='center' sx={{ width: 160 }}>
                              {userDetail?.iso2 === 'PK'
                                ? 'Rs'
                                : userDetail?.iso2 === 'PH'
                                ? '₱'
                                : '$ '}{' '}
                              {item?.price}
                            </TableCell>
                            <TableCell>
                              <DeleteIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={() =>
                                  handleDeleteProduct(
                                    index,
                                    item.product_id,
                                    'edit'
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  <Typography
                    sx={{ marginY: '10px', marginLeft: '20px', color: 'red' }}
                  >
                    {selectItemError ? 'Please Select or Add a product' : ''}
                  </Typography>
                </TableContainer>
              </Grid>

              <Grid item>
                <Box sx={{ display: 'flex' }}>
                  <FormControl
                    sx={{ m: 3 }}
                    component='fieldset'
                    variant='standard'
                  ></FormControl>
                  <FormControl
                    required
                    //   error={error}
                    component='fieldset'
                    sx={{ m: 3 }}
                    variant='standard'
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={linkExpiry}
                            onChange={handleCheckboxChange}
                            value
                            name='link-expiry'
                            sx={{
                              '&.Mui-checked': {
                                color: '#ED2079',
                              },
                            }}
                          />
                        }
                        label='Link Expiry'
                      />
                      {linkExpiry && (
                        <Box mt='5px'>
                          <TextField
                            id='outlined-basic'
                            variant='outlined'
                            name='expiry_time'
                            value={formik.values.expiry_time || ''}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.expiry_time &&
                              Boolean(formik.errors.expiry_time)
                            }
                            helperText={
                              formik.touched.expiry_time &&
                              formik.errors.expiry_time
                            }
                            type='date'
                            inputProps={{
                              min: new Date().toISOString().split('T')[0], // Set min attribute to today's date
                            }}
                          />
                        </Box>
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={paymentLimit}
                            onChange={handleCheckboxLimitChange}
                            name='jason'
                            sx={{
                              '&.Mui-checked': {
                                color: '#ED2079',
                              },
                            }}
                          />
                        }
                        label='Set Limits for successful payments'
                      />
                      {paymentLimit && (
                        <Box mt='5px'>
                          <TextField
                            fullWidth
                            id='order_limit'
                            name='order_limit'
                            label='No. of Limits'
                            variant='outlined'
                            placeholder='No. of limits'
                            value={formik.values.order_limit || ''}
                            onChange={formik.handleChange}
                            type='number'
                            InputProps={{
                              inputProps: { min: 1 },
                            }}
                            error={
                              formik.touched.order_limit &&
                              Boolean(formik.errors.order_limit)
                            }
                            helperText={
                              formik.touched.order_limit &&
                              formik.errors.order_limit
                            }
                          />
                        </Box>
                      )}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={linkDiscount}
                            onChange={handleChangeDiscount}
                            name='linkDiscount'
                            sx={{
                              '&.Mui-checked': {
                                color: '#ED2079',
                              },
                            }}
                          />
                        }
                        label='Link Discounts'
                      />
                      {linkDiscount && (
                        <Box display='flex' mt='15px'>
                          <FormControl fullWidth sx={{ marginRight: '10px' }}>
                            <InputLabel id='demo-simple-select-label'>
                              Type of Discount
                            </InputLabel>

                            <Select
                              labelId='demo-simple-select-label'
                              id='link_discount_type'
                              label='Type of Discount'
                              value={formik.values.link_discount_type || ''}
                              onChange={formik.handleChange}
                              name='link_discount_type'
                              error={
                                formik.touched.link_discount_type &&
                                Boolean(formik.errors.link_discount_type)
                              }
                            >
                              <MenuItem value={'PERCENTAGE'}>
                                PERCENTAGE
                              </MenuItem>
                              <MenuItem value={'FIXED'}>FIXED</MenuItem>
                            </Select>
                          </FormControl>
                          {formik.values.link_discount_type === 'PERCENTAGE' ? (
                            <>
                              <TextField
                                fullWidth
                                id='link_discount_value'
                                label=' Discount'
                                value={formik.values.link_discount_value || ''}
                                onChange={formik.handleChange}
                                name='link_discount_value'
                                error={
                                  formik.touched.link_discount_value &&
                                  Boolean(formik.errors.link_discount_value)
                                }
                                InputProps={{
                                  inputProps: { min: 1, max: 100 },
                                }}
                                type='number'
                                // InputLabelProps={{
                                //   shrink: true,
                                // }}
                              />
                            </>
                          ) : (
                            <TextField
                              fullWidth
                              id='link_discount_value'
                              name='link_discount_value'
                              label='Discount'
                              variant='outlined'
                              placeholder='Discount'
                              InputProps={{
                                inputProps: { min: 1, max: subtotal },
                              }}
                              value={formik.values.link_discount_value || ''}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.link_discount_value &&
                                Boolean(formik.errors.link_discount_value)
                              }
                              type='number'
                              helperText={
                                formik.touched.link_discount_value &&
                                formik.errors.link_discount_value
                              }
                            />
                          )}
                        </Box>
                      )}

                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name='shipping_charges'
                              value={formik.values.shipping_charges || ''}
                              checked={formik.values.shipping_charges}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.shipping_charges &&
                                Boolean(formik.errors.shipping_charges)
                              }
                              helperText={
                                formik.touched.shipping_charges &&
                                formik.errors.shipping_charges
                              }
                              sx={{
                                '&.Mui-checked': {
                                  color: '#E71583',
                                },
                              }}
                            />
                          }
                          label='Shipping Charges'
                        />
                      </FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name='tax_charges'
                            checked={formik.values.tax_charges}
                            value={formik.values.tax_charges || ''}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.tax_charges &&
                              Boolean(formik.errors.tax_charges)
                            }
                            helperText={
                              formik.touched.tax_charges &&
                              formik.errors.tax_charges
                            }
                            sx={{
                              '&.Mui-checked': {
                                color: '#ED2079',
                              },
                            }}
                          />
                        }
                        label='Tax Charges'
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formik.values.single_product_purchase}
                            value={formik.values.single_product_purchase || ''}
                            onChange={formik.handleChange}
                            name='single_product_purchase'
                            error={
                              formik.touched.single_product_purchase &&
                              Boolean(formik.errors.single_product_purchase)
                            }
                            helperText={
                              formik.touched.single_product_purchase &&
                              formik.errors.single_product_purchase
                            }
                            sx={{
                              '&.Mui-checked': {
                                color: '#ED2079',
                              },
                            }}
                          />
                        }
                        label='Enable single product purchase'
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              bgcolor='#FFFFFF'
              boxShadow='0px 4px 8px rgba(0, 0, 0, 0.08)'
              borderRadius='10px'
              padding='25px'
              color='#7E8792'
            >
              <Typography marginBottom={'15px'} fontWeight={500}>
                PAYMENT SUMMARY
              </Typography>
              <Box display={'flex'} justifyContent='space-between'>
                <Typography marginBottom={'15px'}>Invoice Type</Typography>
                <Typography>
                  {' '}
                  {paymentLimit && linkExpiry ? 'Link with Limit & Expiry' : ''}
                </Typography>
              </Box>

              <Divider />
              <Box
                display='flex'
                marginTop={'15px'}
                justifyContent='space-between'
              >
                <Typography marginBottom={'15px'}> Subtotal</Typography>
                <Typography marginBottom={'15px'}>
                  {userDetail?.iso2 === 'PK' &&
                    Number(subtotal).toLocaleString('ur-PK', {
                      style: 'currency',
                      currency: 'PKR',
                    })}
                  {userDetail?.iso2 === 'PH' &&
                    Number(subtotal).toLocaleString('fil-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    })}

                  {userDetail?.iso2 !== 'PK' && userDetail?.iso2 !== 'PH'
                    ? Number(subtotal).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : ''}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Typography marginBottom={'15px'}> Discount</Typography>

                <Typography marginBottom={'15px'}>
                  {userDetail?.iso2 === 'PK' &&
                    Number(discount).toLocaleString('ur-PK', {
                      style: 'currency',
                      currency: 'PKR',
                    })}
                  {userDetail?.iso2 === 'PH' &&
                    Number(discount).toLocaleString('fil-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    })}

                  {userDetail?.iso2 !== 'PK' && userDetail?.iso2 !== 'PH'
                    ? Number(discount).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : ''}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Typography marginBottom={'15px'}> Shipping</Typography>
                <Typography marginBottom={'15px'}>
                  {formik.values.shipping_charges
                    ? 'Calculated at checkout'
                    : 0}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Typography
                  marginBottom={'15px'}
                  fontWeight={500}
                  color='black'
                >
                  {' '}
                  Total
                </Typography>
                <Typography
                  marginBottom={'15px'}
                  fontWeight={500}
                  color='black'
                >
                  {' '}
                  {userDetail?.iso2 === 'PK' &&
                    Number(total).toLocaleString('ur-PK', {
                      style: 'currency',
                      currency: 'PKR',
                    })}
                  {userDetail?.iso2 === 'PH' &&
                    Number(total).toLocaleString('fil-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    })}
                  {userDetail?.iso2 !== 'PK' && userDetail?.iso2 !== 'PH'
                    ? Number(total).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : ''}
                </Typography>
              </Box>
              <Grid item xs={12} marginBottom={'10px'}>
                <Button
                  variant='contained'
                  type='submit'
                  onClick={(event) => {
                    setBtnClicked('create_payment_link')
                  }}
                  sx={{
                    width: '310px',
                    height: '50px',
                    background: '#e93a7d',
                    '&:hover, &:focus': {
                      background: '#e93a7d',
                    },
                  }}
                  disabled={
                    !id
                      ? productList?.length === 0
                        ? true
                        : false
                      : productDetail?.length === 0 || productDetail === null
                      ? true
                      : false
                  }
                >
                  {!id ? 'Create Payment Link' : 'Update Payment Link'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='outlined'
                  type='submit'
                  sx={{
                    width: '310px',
                    height: '50px',
                    border: '1px solid #e93a7d',
                    color: '#e93a7d',
                  }}
                  disabled={
                    !id
                      ? productList?.length === 0
                        ? true
                        : false
                      : productDetail?.length === 0 || productDetail === null
                      ? true
                      : false
                  }
                  onClick={(event) => {
                    setBtnClicked('save_as_draft')
                  }}
                >
                  Save as Draft
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}

export default CreatePaymentLink

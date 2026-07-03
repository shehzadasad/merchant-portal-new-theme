import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import styles from './AddCustomerModal.module.css'
import { alpha, styled } from '@mui/material/styles'
import { TextFieldProps, TextField, Grid, Alert } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Select from '@mui/material/Select'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Editor from './Editor/Editor'
import RTEeditor from './Editor/RTEeditor'
import UploadImage from './UploadImage/UploadImage'
import SelectCustom from './Input/Select/CustomSelect'
import StandardCustom from './Input/Select/Select'

import PLUS from '../../../../assets/invoices/PLUS.svg'
import axios from 'axios'

const queryParams = new URLSearchParams(window.location.search)

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

export default function AddCustomer(props) {
  const [serviceName, setServiceName] = useState('')
  const [price, setPrice] = useState('')
  const [priceType, setPriceType] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const userDetail = useSelector((state) => state.users.userDetail)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    if (category === 'product') {
      navigate('/product-create')
    }
  }, [category])

  function handleServiceNameChange(e) {
    let val = e.target.value

    setServiceName(val)
  }

  function handlePriceChange(e) {
    let val = e.target.value

    if (val.match(/^[0-9]*$/)) {
      setPrice(val)
    }
  }

  const handlePriceTypeChange = (e) => {
    setPriceType(e.target.value)
  }

  function handleCategoryChange(e) {
    let val = e.target.value
    setCategory(val)
  }

  function handleSubCategoryChange(e) {
    let val = e.target.value

    setSubCategory(val)
  }

  function handleProductDescriptionChange(e) {
    let val = e.target.value
    setProductDescription(val)
  }

  function AddProduct() {
    if (serviceName == '') {
      setError('Service name is missing')
    } else if (price == '') {
      setError('Price is missing')
    } else if (priceType == '') {
      setError('Price type is missing')
    } else if (category == '') {
      setError('Category is missing')
    }
    //  else if (productDescription == '') {
    //   setError('Product description is missing')
    // }
    else {
      if (props.type) {
        if (props.type == 'BE') {
          let prod = {}

          let prodDes = productDescription

          if (
            productDescription &&
            productDescription.blocks &&
            productDescription.blocks[0] &&
            productDescription.blocks[0].text
          ) {
            prodDes = productDescription.blocks[0]?.text
            setProductDescription(prodDes)
          } else {
            prodDes = 'No description'
          }
          prod.name = serviceName
          prod.title = serviceName
          prod.price = price
          prod.qty = 1
          prod.totalPrice = price
          prod.price_type = priceType
          prod.category = category
          prod.sub_category = subCategory
          prod.description = prodDes
          prod.token = userDetail.id

          // props.AddOneTimeProduct(prod);
          axios
            .post(
              `${process.env.REACT_APP_INVOICE_API}/invoice/addproduct`,
              prod
            )
            .then((response) => {
              if (
                response &&
                response.data &&
                response.data.data &&
                response.data.data.product &&
                response.data.status === true
              ) {
                setError('')
                setPrice('')
                setPriceType('')
                setServiceName('')
                setCategory('')
                setProductDescription('')

                props.AddOneTimeProduct(response.data.data.product, props.type)
              } else {
                setError("Couldn't add product")
              }
            })
            .catch((error) => {
              if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.msg
              ) {
                setError(error.response.data.msg)
              } else if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
              ) {
                setError(error.response.data.message)
              } else {
                setError("Couldn't add product")
              }
            })
        } else {
          let prod = {}
          prod.name = serviceName
          prod.price = price
          prod.qty = 1
          prod.totalPrice = price
          prod.price_type = priceType
          prod.category = category
          prod.sub_category = subCategory
          prod.description = productDescription
          prod.has_variants = 'NO'

          props.AddOneTimeProduct(prod, props.type)
        }
      }
    }
  }

  return (
    <Container className={styles.AddProductModal}>
      <div className={styles.headingDiv}>
        <h5
          className={styles.AddProductHeading}
          style={{ marginBottom: '20px' }}
        >
          {props.type == 'OneTime' ? 'Add One Time Product' : 'Add New Product'}
        </h5>
        <CloseIcon
          onClick={(e) => props.handleClose(e, props.type)}
          className={styles.CloseIcon}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='category'
              label='Category'
              //   value={formik.values.timeUnit || ''}
              //   onChange={formik.handleChange}
              //   name='timeUnit'
              //   error={
              //     formik.touched.timeUnit &&
              //     Boolean(formik.errors.timeUnit)
              //   }
              //   helperText={
              //     formik.touched.timeUnit && formik.errors.timeUnit
              //   }
              onChange={handleCategoryChange}
              value={category}
            >
              {/* <MenuItem value="" aria-label="None"></MenuItem> */}
              <MenuItem value={'services'}>Services</MenuItem>
              <MenuItem value={'product'}> Product</MenuItem>
            </Select>
          </FormControl>
          {/* <SelectCustom label="Category" id="category" onchange={handleCategoryChange} value={category} /> */}
        </Grid>
        <Grid item xs={12}>
          <RedditTextField
            label={category === 'product' ? 'Product Name' : 'Service Name'}
            id='product-name-input'
            variant='filled'
            // style={{ marginTop: 11 }}
            className={styles.ProductNameInput}
            onChange={handleServiceNameChange}
            value={serviceName}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Price Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='price-type'
              label='Price Type'
              //   value={formik.values.timeUnit || ''}
              //   onChange={formik.handleChange}
              //   name='timeUnit'
              //   error={
              //     formik.touched.timeUnit &&
              //     Boolean(formik.errors.timeUnit)
              //   }
              //   helperText={
              //     formik.touched.timeUnit && formik.errors.timeUnit
              //   }
              onChange={handlePriceTypeChange}
              value={priceType}
            >
              {/* <MenuItem value="" aria-label="None"></MenuItem> */}
              <MenuItem value={'oneTime'}>One Time</MenuItem>
              {/* <MenuItem value={'hourly'}>Hourly</MenuItem>
              <MenuItem value={'monthly'}>Monthly</MenuItem>
              <MenuItem value={'yearly'}>Yearly</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <RedditTextField
            label='Price'
            id='price-input'
            variant='filled'
            style={{ width: '100%' }}
            // className={styles.PriceInput}
            onChange={handlePriceChange}
            value={price}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Quantity</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='sub-category'
              label='Quantity'
              //   value={formik.values.timeUnit || ''}
              //   onChange={formik.handleChange}
              //   name='timeUnit'
              //   error={
              //     formik.touched.timeUnit &&
              //     Boolean(formik.errors.timeUnit) 
              //   }
              //   helperText={
              //     formik.touched.timeUnit && formik.errors.timeUnit
              //   }
              onChange={handleSubCategoryChange}
              value={subCategory}
            >
              {/* <MenuItem value="" aria-label="None"></MenuItem> */}
        {/* <MenuItem value={'10'}>Ten</MenuItem>
              <MenuItem value={'20'}>Twenty</MenuItem>
              <MenuItem value={'30'}>Thirty</MenuItem>
            </Select>
          </FormControl> 
        </Grid> */}{' '}
        <Grid item xs={12}>
          <Editor
            setProductDescription={setProductDescription}
            value={productDescription}
          />
        </Grid>
      </Grid>

      {/* <Row style={{marginTop: '10px'}}>
                <Col>
                    <SelectCustom label="Price Type" id="price-type" onchange={handlePriceTypeChange} value={priceType} />
                </Col>
            
                <Col>
                    <RedditTextField
                        label="Price"
                        id="price-input"
                        variant="filled"
                        // style={{ marginTop: 11 }}
                        className={styles.PriceInput}
                        onChange={handlePriceChange}
                        value={price}
                    />
                </Col>
                
                
                
                
                

                <Col>
                    <SelectCustom label="Quantity" id="sub-category" onchange={handleSubCategoryChange} value={subCategory} />
                </Col>
            </Row> */}

      {/* <Editor setProductDescription={setProductDescription} value={productDescription}/> */}
      {/* <RTEeditor /> */}

      {/* <Row>
                <Col>
                    <SelectCustom />
                </Col>
                
                <Col>
                    <SelectCustom />
                </Col>
                
                <Col>
                    <RedditTextField
                        label="Price"
                        id="price-input"
                        variant="filled"
                        style={{ marginTop: 11 }}
                        className={styles.PriceInput}
                    />
                </Col>
            </Row> */}

      {/* <Row>
                <Col>
                    <UploadImage>
                        <p className={styles.UploadImage}>Upload Image</p>
                        <p className={styles.UploadImageText}>(Jpg, or Png smaller than 10MB)</p>
                    </UploadImage>
                </Col>
                <Col>
                    <UploadImage>
                        <img src={PLUS} className={styles.PLUS} />
                    </UploadImage>
                </Col>
                <Col>
                    <UploadImage>
                        <img src={PLUS} className={styles.PLUS} />
                    </UploadImage>
                </Col>
            </Row> */}

      <div>
        <p className={`${styles.ErrorMsg} ${styles.ErrorProduct}`}>{error}</p>
        <button
          style={{ width: '40%', marginBottom: '20px' }}
          onClick={AddProduct}
          className={styles.AddProductBtn}
        >
          {category === 'product' ? 'Add Product' : 'Add Service'}
        </button>
      </div>
    </Container>
  )
}

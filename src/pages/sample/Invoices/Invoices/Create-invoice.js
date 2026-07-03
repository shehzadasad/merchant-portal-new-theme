import React, { useState, useEffect } from 'react'
import styles from './CustomerInvoices.module.css'
import './Customer.css'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Modal from './Modal.js'
import AddCustomerModal from './AddCustomerModal'
import AddProductModal from './AddProductModal'
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
import ProductsSelected from './ProductsSelected/ProductsSelected'
import PreviewInvoice from '../../../../assets/invoices/Preview-invoice.svg'
import ReactAutoComplete from './Input/Autocomplete/ReactAutoComplete'
import DisabledPreviewInvoice from '../../../../assets/invoices/disabled-preview-invoice.svg'
import CustomerAutoComplete from './Input/Autocomplete/CustomerAutoComplete'
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import ClipLoader from 'react-spinners/ClipLoader'
import MuiAlert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Shipping from 'pages/sample/Shipping'

const queryParams = new URLSearchParams(window.location.search)

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

// const RedditTextField = styled((props: TextFieldProps) => (
//     <TextField
//       InputProps={{ disableUnderline: true }}
//       {...props}
//     />
//   ))(({ theme }) => ({
//     '& .MuiFilledInput-root': {
//       border: '1px solid #e2e2e1',
//       overflow: 'hidden',
//       borderRadius: 4,
//       backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//       transition: theme.transitions.create([
//         'border-color',
//         'background-color',
//         'box-shadow',
//       ]),
//       '&:hover': {
//         backgroundColor: 'transparent',
//       },
//       '&.Mui-focused': {
//         backgroundColor: 'transparent',
//         boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//         borderColor: theme.palette.primary.main,
//       },
//     },
//   }));

export default function CreateInvoice(props) {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showAddProductModalToBE, setShowAddProductModalToBE] = useState(false)
  const navigate = useNavigate()
  const userDetail = useSelector((state) => state.users.userDetail)

  const permOptions = {
    id: 'add-customer',
    name: 'Add Customer',
    color: 'rgb(226, 47, 126)',
    fontWeight: 'bold',
    cursor: 'pointer',
  }

  const permProdOptions = [
    {
      id: 'add-product1',
      name: 'Add New Product',
    },
    // {
    //   id: 'add-product2',
    //   name: 'Add One Time Product',
    // },
  ]

  const [customerOptions, setCustomerOptions] = useState([permOptions])
  const [productOptions, setProductOptions] = useState(permProdOptions)
  const [customerSelected, setCustomerSelected] = useState(null)
  const [productsSelected, setProductsSelected] = useState([])

  // const [variantsSelected, setVariantsSelected] = useState([]);

  const [canPlaceOrder, setCanPlaceOrder] = useState(false)
  const [sms, setSms] = useState(false)
  const [email, setEmail] = useState(false)
  const [whatsApp, setWhatsApp] = useState(false)

  const [subTotal, setSubTotal] = useState(0)
  const [currency, setCurrency] = useState('PKR')
  const [salesTax, setSalesTax] = useState(0)

  const [customerSearchError, setCustomerSearchError] = useState('')
  const [productSearchError, setProductSearchError] = useState('')

  const [placeOrderError, setPlaceOrderError] = useState('')
  const [previewInvoiceError, setPreviewInvoiceError] = useState('')

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (
      productsSelected.length > 0 &&
      customerSelected?.name !== '' &&
      (sms || email)
    ) {
      setCanPlaceOrder(true)
    } else {
      setCanPlaceOrder(false)
    }
  }, [productsSelected, customerSelected, sms, email, whatsApp])

  useEffect(() => {
    let prodsSelected = [...productsSelected]
    let totalAmt = 0
    let currency = localStorage.getItem('currency')

    for (let i = 0; i < prodsSelected.length; i++) {
      let prod = prodsSelected[i]

      if (prod.variant) {
        prod.totalPrice = prod.variant.price * (prod.qty ? prod.qty : 1)
        // prod.currency = prod.variant.currency;
      } else {
        prod.variant = prod.variants ? prod.variants[0] : null
        prod.totalPrice =
          (prod.variant ? prod.variant.price : prod.price ? prod.price : 0) *
          (prod.qty ? prod.qty : 1)
        // prod.currency = prod.variant ? prod.variant.currency : (prod.currency ? prod.currency : 'PKR');
      }

      totalAmt = totalAmt + Number(prod.totalPrice)
      // currency = prod.currency;
    }

    setSubTotal(totalAmt)
    setCurrency(currency)
  }, [productsSelected])

  useEffect(() => {
    if (customerSelected) {
      // let taxFee = customerSelected.taxfee;
      let percentTax = customerSelected.taxfee
        ? customerSelected.taxfee.percent
        : 0
      let flatFee = customerSelected.taxfee
        ? customerSelected.taxfee.flat_fee
        : 0

      let taxCal = (subTotal * percentTax) / 100 + flatFee

      setSalesTax(taxCal)
    }
  }, [subTotal, customerSelected])

  function hideModal() {
    setShowAddCustomerModal(false)
  }

  function showModal() {
    setShowAddCustomerModal(true)
  }

  function hideProductModal(e, type) {
    setPRDSearchString('')
    if (type === 'OneTime') {
      setShowAddProductModal(false)
    } else if (type === 'BE') {
      setShowAddProductModalToBE(false)
    }
  }

  function showProductModal() {
    setShowAddProductModal(true)
  }

  // const handleChange = e => {
  //     let prevOptions = [];
  //     prevOptions.push(permOptions);

  //     setCustomerOptions(prevOptions);
  // };

  // const handleSearch = e => {
  //     let val = e.target.value;

  //     // let localToken = localStorage.getItem('token');

  //     let postData = {
  //         token: queryParams.get('token'),
  //         search: val
  //     }

  //     axios.post(`${process.env.REACT_APP_INVOICE_API}/invoice/searchcustomer`, postData)
  //     .then((response) => {

  //         setCustomerSearchError('');
  //         let options = [];
  //         let prevOptions = permOptions;
  //         // let newOptions = response.data.data;
  //         options = response.data.data;
  //         options.push(prevOptions)

  //         setCustomerOptions(options);
  //     })
  //     .catch((error) => {
  //         // if(error.msg) {
  //         //     setCustomerSearchError(error.msg);
  //         // }
  //         // else {
  //         //     setCustomerSearchError("Sorry cannot get customers right now");
  //         // }

  //     })
  // };

  // const handleKeypress = e => {
  //     if (e.key === 'Enter') {
  //         handleSearch(e);
  //     }
  // };

  //Product
  // const handleProdChange = e => {
  //     let prevOptions = [];
  //     prevOptions.push(permProdOptions);

  //     setProductOptions(prevOptions);
  // };

  // const handleProdSearch = e => {
  //     let val = e.target.value;

  //     // let localToken = localStorage.getItem('token');

  //     let postData = {
  //         token: queryParams.get('token'),
  //         search: val
  //     }

  //     axios.post(`${process.env.REACT_APP_INVOICE_API}/invoice/searchproducts`, postData)
  //     .then((response) => {
  //         setProductSearchError('');
  //         let options = [];
  //         let prevOptions = permProdOptions;
  //         let newOptions = response.data.data;
  //         options = newOptions.concat(prevOptions);
  //         // options.push(prevOptions)

  //         setProductOptions(options);
  //     })
  //     .catch((error) => {

  //         if(error && error.response && error.response.data && error.response.data.msg) {
  //             setProductSearchError(error.response.data.msg);
  //         }
  //         else {
  //             setProductSearchError("Sorry cannot get products right now");
  //         }

  //       })
  // };

  // const handleProdKeypress = e => {
  //     if (e.key === 'Enter') {
  //         handleProdSearch(e);
  //     }
  // };

  // const SelectCustomer = e => {
  // }

  const SelectVariant = (e, product) => {
    let products = [...productsSelected]
    let variant1 = e.target.value
    let index = products.indexOf(product)

    if (index !== -1) {
      products[index].variant = variant1
      setProductsSelected(products)
    }
  }

  const SelectQty = (e, product) => {
    let products = [...productsSelected]
    let qty = e.target.value
    let index = products.indexOf(product)

    if (index !== -1) {
      products[index].qty = qty
      setProductsSelected(products)
    }
  }

  const [PRDSearchString, setPRDSearchString] = useState('')
  const DeleteProduct = (e, product) => {
    setPRDSearchString('')
    let products = [...productsSelected]
    // let qty = e.target.value;
    let index = products.indexOf(product)

    if (index !== -1) {
      products.splice(index, 1)
      setProductsSelected(products)
    }
  }

  const GetPreviewInvoice = (e) => {
    // let localToken = localStorage.getItem('token');

    let prodsSelected = []
    let OTProdsSelect = []

    for (let i = 0; i < productsSelected.length; i++) {
      let pS = productsSelected[i]

      if (pS.OneTime) {
        OTProdsSelect.push(pS)
      } else {
        prodsSelected.push(pS)
      }
    }

    let postData = {
      token: userDetail.id,
      products: prodsSelected,
      onetimeproducts: OTProdsSelect,
      customer: customerSelected,
    }
    axios
      .post(`${process.env.REACT_APP_INVOICE_API}/invoice/create`, postData)
      .then((response) => {
        setPreviewInvoiceError('')
        window.open(response.data.link)
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msg
        ) {
          setPreviewInvoiceError(error.response.data.msg)
        } else {
          setPreviewInvoiceError('Invoice cannot be previewed')
        }
      })
  }

  const AddOneTimeProduct = (prod, type) => {
    let prods = [...productsSelected]
    let curr = localStorage.getItem('currency')

    let product = {}

    if (type === 'BE') {
      let prd = {}
      prd = prod
      prd.currency = curr
      prods.push(prd)
      setProductsSelected(prods)

      setShowAddProductModal(false)
      setShowAddProductModalToBE(false)
    } else if (type === 'OneTime') {
      product.OneTime = true
      product.name = prod.name
      product.price = prod.price
      product.totalPrice = prod.totalPrice
      product.qty = prod.qty
      product.price_type = prod.price_type
      product.category = prod.category
      product.sub_category = prod.sub_category

      if (
        prod.description &&
        prod.description.blocks &&
        prod.description.blocks[0] &&
        prod.description.blocks[0].text
      ) {
        product.description = prod.description.blocks[0].text
      } else {
        product.description = 'No Description'
      }

      product.has_variants = prod.has_variants
      product.currency = curr

      prods.push(product)
      setProductsSelected(prods)
      setShowAddProductModal(false)
      setShowAddProductModalToBE(false)
    }
  }

  const PlaceOrder = () => {
    setLoading(true)
    let Sms = sms
    let Email = email
    let WhatsApp = whatsApp

    // let localToken = localStorage.getItem('token');

    let sendOption = []

    if (Sms) {
      sendOption.push('sms')
    }

    if (Email) {
      sendOption.push('email')
    }

    if (WhatsApp) {
      sendOption.push('whatsapp')
    }

    let prodsSelected = []
    let OTProdsSelect = []

    for (let i = 0; i < productsSelected.length; i++) {
      let pS = productsSelected[i]

      if (pS.OneTime) {
        OTProdsSelect.push(pS)
      } else {
        prodsSelected.push(pS)
      }
    }

    let postData = {
      token: userDetail.id,
      send_option: sendOption,
      products: prodsSelected,
      onetimeproducts: OTProdsSelect,
      customer: customerSelected,
    }

    axios
      .post(`${process.env.REACT_APP_INVOICE_API}/invoice/placeorder`, postData)
      .then((response) => {
        toast.success('Invoice Sent!')
        setPlaceOrderError('')

        // window.location.href = '/customer-invoices';
        // props.OffCreateInvoice();
        setTimeout(props.OffCreateInvoice, 5000)
      })
      .catch((error) => {
        setLoading(false)

        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msg
        ) {
          setPlaceOrderError(error.response.data.msg)
        } else if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setPlaceOrderError(error.response.data.message)
        } else {
          setPlaceOrderError('Cannot place order')
        }
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  function currencyFormat(num) {
    num = Number(num)
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  // const action = (
  //     <React.Fragment>
  //       <IconButton
  //         size="small"
  //         aria-label="close"
  //         color="inherit"
  //         onClick={handleClose}
  //       >
  //         <CloseIcon fontSize="small" />
  //       </IconButton>
  //     </React.Fragment>
  //   );

  return (
    <div style={{ height: '1000px' }}>
      <Modal show={showAddCustomerModal}>
        <AddCustomerModal
          handleClose={hideModal}
          setCustomerSelected={setCustomerSelected}
          showAddCustomerModal={showAddCustomerModal}
        />
      </Modal>

      <Modal show={showAddProductModal}>
        <AddProductModal
          handleClose={hideProductModal}
          AddOneTimeProduct={AddOneTimeProduct}
          type='OneTime'
        />
      </Modal>

      <Modal show={showAddProductModalToBE}>
        <AddProductModal
          handleClose={hideProductModal}
          AddOneTimeProduct={AddOneTimeProduct}
          type='BE'
        />
      </Modal>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div
          style={{ display: 'flex', marginLeft: '50px', paddingTop: '50px' }}
        >
          <ArrowBackIcon
            className={styles.BackArrow}
            onClick={() => {
              navigate('/link-builder')
            }}
          />
          <p
            style={{
              marginLeft: '20px',
              color: '#111111',
              fontSize: '18px',
              fontWeight: '800',
            }}
          >
            Create New Invoice
          </p>
        </div>
        {!canPlaceOrder && (
          <img
            alt='Preview Invoice'
            style={{ marginLeft: '535px', marginTop: '40px' }}
            src={DisabledPreviewInvoice}
          />
        )}

        {canPlaceOrder && (
          <img
            alt='Preview Invoice'
            style={{
              marginLeft: '535px',
              marginTop: '40px',
              cursor: 'pointer',
            }}
            src={PreviewInvoice}
            onClick={GetPreviewInvoice}
          />
        )}
      </div>
      <p
        style={{
          color: 'red',
          fontWeight: 'bold',
          textAlign: 'right',
          marginRight: '400px',
        }}
      >
        {previewInvoiceError}
      </p>

      <div className={styles.CreateInvoiceCon}>
        <div className={styles.CreateInvoiceForm}>
          <div className={styles.SelectCustomerInput}>
            <div
              style={{
                color: '#111111',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '10px',
              }}
            >
              Select Customer
            </div>

            <CustomerAutoComplete
              token={props.token}
              customerOptions={customerOptions}
              setCustomerSelected={setCustomerSelected}
              setCustomerOptions={setCustomerOptions}
              showModal={showModal}
              showAddCustomerModal={showAddCustomerModal}
              customerSelected={customerSelected}
              showAddProductModal={showAddProductModal}
              setCustomerSearchError={setCustomerSearchError}
              showAddProductModalToBE={showAddProductModalToBE}
            />
            {/* <CustomAutoComplete /> */}
            {/* <Stack>
                                <Autocomplete
                                    // freeSolo
                                    id="free-solo-2-demo"
                                    // disableClearable
                                    renderOption={(props, option) => {
                                        return(
                                            <li {...props}>
                                                {option.id == 'add-customer' && <div key={option.id} onClick={showModal} style={{color: option.color, fontWeight: option.fontWeight, cursor: option.cursor}}><img src={PinkPlusIcon} /> {option.name}</div>}
                                                {option.id != 'add-customer' && <div><div key={option.id} style={{color: '#111111', fontSize: '14px', fontWeight: '500'}}>{option.name}</div><div style={{color: '#7E8792', fontSize: '14px', fontWeight: '500'}}>{option.address}</div></div>}
                                            </li>
                                        )    
                                    }}
                                    options={customerOptions.map((option) => option)}
                                    autoComplete={true}
                                    getOptionLabel={(option) => option.name}
                                    onChange={SelectCustomer}
                                    // value={}
                                    isOptionEqualToValue={(option, value) => {    
                                        if(customerSelected.id != value.id) {
                                            setCustomerSelected(value);
                                        }                                        
                                    }}
                                    renderInput={(params) => (
                                        
                                        <TextField 
                                            {...params}
                                            // label="Search input"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                                startAdornment: (
                                                    <InputAdornment position="middle" onClick={handleSearch}>
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            
                                            className={styles.InputText} 
                                            // id="outlined-basic" 
                                            placeholder={`Search Customer`} 
                                            // variant="outlined"
                                            onChange={handleChange}
                                            onKeyPress={handleKeypress}
                                        />
                                    )}/>
                            </Stack> */}

            {/* <p onClick={showModal} className={styles.CreateCustomerLink}>Add Customer</p> */}
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {customerSearchError}
            </p>
          </div>

          <div className={styles.SellingInput}>
            <div
              style={{
                color: '#111111',
                fontSize: '16px',
                fontWeight: '600',
                marginTop: '-200px',
              }}
            >
              What are you selling?
            </div>
            <ReactAutoComplete
              token={props.token}
              productOptions={productOptions}
              setProductOptions={setProductOptions}
              setProductsSelected={setProductsSelected}
              productsSelected={productsSelected}
              showAddCustomerModal={showAddCustomerModal}
              showProductModal={showProductModal}
              showAddProductModal={showAddProductModal}
              setShowAddProductModalToBE={setShowAddProductModalToBE}
              setProductSearchError={setProductSearchError}
              showAddProductModalToBE={showAddProductModalToBE}
              PRDSearchString={PRDSearchString}
              setPRDSearchString={setPRDSearchString}
            />
            {/* <Stack>
                            <Autocomplete
                                // freeSolo
                                id="free-solo-3-demo"
                                key={'free'}
                                disableClearable
                                clearOnBlur={true}
                                blurOnSelect={true}
                                renderOption={(props, option) => {
                                    return(
                                        <li {...props}>
                                            {(option.id == 'add-product1' || option.id == 'add-product2') && <div key={option.id} onClick={showModal} style={{color: option.color, fontWeight: option.fontWeight, cursor: option.cursor}}><img src={PinkPlusIcon} /> {option.title}</div>}
                                            {(option.id != 'add-product1' && option.id != 'add-product2') && <div key={option.id} style={{color: '#111111', fontSize: '14px', fontWeight: '500'}}>{option.title}</div>}
                                        </li>
                                    )    
                                }}
                                options={productOptions.map((option) => option)}
                                autoComplete={true} 
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => {    
                                    let tempArr = [...productsSelected];

                                    if(tempArr.indexOf(value) == -1) {
                                        tempArr.push(value);
                                        setProductsSelected(tempArr);
                                    }                                      
                                }}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params}
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                            startAdornment: (
                                                <InputAdornment position="middle" onClick={handleProdSearch}>
                                                    <SearchIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                        
                                        className={styles.InputText} 
                                        id="outlined-basic" 
                                        placeholder={`Search Product`} 
                                        variant="outlined" 
                                        onChange={handleProdChange}
                                        onKeyPress={handleProdKeypress}
                                    />
                                )}/>
                        </Stack> */}
            {/* <p onClick={showProductModal} className={styles.CreateCustomerLink}>Create Product</p> */}
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              {productSearchError}
            </p>
          </div>

          <ProductsSelected
            NumberOfProducts={productsSelected.length}
            ProductsSelected={productsSelected}
            SelectVariant={SelectVariant}
            SelectQty={SelectQty}
            DeleteProduct={DeleteProduct}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked style={{ color: '#E22F7E' }} />}
              label='Tax'
            />
            <FormControlLabel
              control={<Checkbox defaultChecked style={{ color: '#E22F7E' }} />}
              label='Shipping'
            />
          </FormGroup>

          <Divider
            sx={{
              marginBottom: '20px',
            }}
          />

          <FormGroup>
            <h4
              style={{ color: '#111111', fontSize: '16px', fontWeight: '600' }}
            >
              Share invoice link via
            </h4>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => {
                      setSms(!sms)
                    }}
                    style={{ color: '#E22F7E' }}
                  />
                }
                label='SMS'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => setEmail(!email)}
                    style={{ color: '#E22F7E' }}
                  />
                }
                label='Email'
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => setWhatsApp(!whatsApp)}
                    style={{ color: '#E22F7E', outlineColor: 'black' }}
                  />
                }
                label='WhatsApp'
              /> */}
            </div>
          </FormGroup>

          {/* <div style={{marginTop: '20px'}}> */}
          {/* <TextField className={styles.PaymentLink} id="standard-basic" label="Payment Link" variant="standard" /> */}
          {/* <RedditTextField
                            label="Payment Link"
                            id="reddit-input"
                            variant="filled"
                            style={{ marginTop: 11 }}
                            className={styles.PaymentLink}
                        />
                    </div> */}
        </div>

        {/* <div> */}
        <div className={styles.CostCon}>
          <h4
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '30px',
            }}
          >
            Invoice Summary
          </h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#7E8792',
              fontSize: '16px',
            }}
          >
            <h5>Subtotal</h5>
            <h5>
              {currency} {currencyFormat(subTotal)}
            </h5>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#7E8792',
              fontSize: '16px',
            }}
          >
            <h5>Sales tax</h5>
            <h5>
              {currency} {currencyFormat(salesTax)}
            </h5>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#7E8792',
              fontSize: '16px',
              marginBottom: '15px',
            }}
          >
            <h5>Shipping</h5>
            <h5>
              {currency} {currencyFormat(0)}
            </h5>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              marginBottom: '30px',
            }}
          >
            <h5>Total</h5>
            <h5>
              {currency} {currencyFormat(Number(subTotal) + Number(salesTax))}
            </h5>
          </div>

          <div>
            {/* <ClipLoader
              color='#E72E80'
              loading={loading}
              size={30}
              css={{ marginRight: '10px' }}
            /> */}

            {/* {!canPlaceOrder && (
              <button
                // className={styles.CreateInvoiceBtn}
                // disabled={loading}
                style={{
                  // cursor: 'not-allowed',
                  width: '100%',
                }}
              >
                Create & Send Invoice waltestin
              </button>
            )} */}

            <Button
              variant='contained'
              onClick={canPlaceOrder && PlaceOrder}
              disabled={!canPlaceOrder && true}
              sx={{ backgroundColor: canPlaceOrder ? '#e93a7d' : '' }}
            >
              {loading ? (
                <ThreeDots
                  height='22'
                  width='22'
                  radius='9'
                  color='white'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  wrapperClassName=''
                  visible={true}
                />
              ) : (
                'Create & Send Invoice'
              )}
            </Button>
          </div>

          <p style={{ color: 'red', fontWeight: 'bold' }}>{placeOrderError}</p>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Invoice Sent
            </Alert>
          </Snackbar>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

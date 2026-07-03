import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import styles from './AddCustomerModal.module.css'
import { alpha, styled } from '@mui/material/styles'
import { TextField, TextFieldProps, Grid } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import SelectCustom from './Input/Select/CustomSelect'
import IntlTelInput from 'react-intl-tel-input'
import './AddCustomerModal.css'
import 'react-intl-tel-input/dist/main.css'
import { useSelector } from 'react-redux'

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
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [number, setIntlNumber] = useState('')

  const [emailAddress, setEmailAddress] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')
  const [sameBilling, setSameBilling] = useState('')

  const [selectedCountry, setSelectedCountry] = useState(
    `{"id": "236", "name": "United States"}`
  )
  const [selectedState, setSelectedState] = useState(
    `{"id": "4649", "name": "Alabama"}`
  )
  const [selectedCity, setSelectedCity] = useState(
    `{"id": "126687", "name": "Ahwatukee Foothills"}`
  )

  const [countriesList, setCountriesList] = useState([])
  const [statesList, setStatesList] = useState([])
  const [citiesList, setCitiesList] = useState([])

  const [error, setError] = useState('')
  const [emailValidate, setEmailValidate] = useState(false)
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)

  const [phoneNumberWithCountryCode, setPhoneNumberWithCountryCode] =
    useState('')
  const userDetail = useSelector((state) => state.users.userDetail)

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_INVOICE_API}/invoice/getcountry`)
      .then((response) => {
        if (response && response.data && response.data.data) {
          setCountriesList(response.data.data)
        }
      })
  }, [props.showAddCustomerModal])

  useEffect(() => {
    if (selectedCountry) {
      let coun = selectedCountry
      coun = JSON.parse(coun)
      let counId = coun.id

      axios
        .post(`${process.env.REACT_APP_INVOICE_API}/invoice/getstate/${counId}`)
        .then((response) => {
          if (response && response.data && response.data.data) {
            setStatesList(response.data.data)
          }
        })
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedState) {
      let st = selectedState
      st = JSON.parse(st)
      let stId = st.id

      axios
        .post(`${process.env.REACT_APP_INVOICE_API}/invoice/getcity/${stId}`)
        .then((response) => {
          if (response && response.data && response.data.data) {
            setCitiesList(response.data.data)
          }
        })
    }
  }, [selectedState])

  const handleNameChange = (e) => {
    setCustomerName(e.target.value)
  }

  const handleNumberChange = (e, intN) => {
    let val = e
    if (val.length) {
      if (val.match(/^(?=.*[0-9])[- +()0-9]+$/)) {
        setPhone(e)
        setPhoneNumberWithCountryCode(intN)
      }
    } else {
      setPhone('')
    }
  }

  const handleEmailChange = (e) => {
    let val = e.target.value
    setEmailAddress(e.target.value)
  }

  const handleStreetChange = (e) => {
    setStreetAddress(e.target.value)
  }

  const handleCityChange = (e) => {
    let ob = e.target.value

    setSelectedCity(ob)
  }

  const handleStateChange = (e) => {
    // setState(e.target.value);
    let ob = e.target.value

    setSelectedState(ob)
  }

  const handleZipChange = (e) => {
    let val = e.target.value

    if (val.length) {
      if (val.match(/^[0-9 -]+$/)) {
        setZipCode(e.target.value)
      }
    } else {
      setZipCode('')
    }
  }

  const handleCountryChange = (e) => {
    let ob = e.target.value

    setSelectedCountry(ob)
  }

  const submit = () => {
    if (customerName == '') {
      setError('Please enter customer name')
    } else if (phone == '') {
      setError('Please enter mobile number')
    } else if (emailAddress == '') {
      setError('Please enter email address')
    } else if (streetAddress == '') {
      setError('Please enter street address')
    } else if (selectedCity == '') {
      setError('Please enter city')
    } else if (selectedState == '') {
      setError('Please enter state')
    } else if (zipCode == '') {
      setError('Please enter zip code')
    } else if (selectedCountry == '') {
      setError('Please enter country')
    } else if (
      !emailAddress.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setEmailValidate(false)
      setError('Please enter valid email address')
    } else {
      let state1 = ''
      let city1 = ''
      let country1 = ''

      if (selectedState) {
        state1 = selectedState
        state1 = JSON.parse(state1)
        state1 = state1.name
      }

      if (selectedCity) {
        city1 = selectedCity
        city1 = JSON.parse(city1)
        city1 = city1.name
      }

      if (selectedCountry) {
        country1 = selectedCountry
        country1 = JSON.parse(country1)
        country1 = country1.name
      }

      let customer = {}
      customer.name = customerName

      let mobile_no

      mobile_no = phone.replace(0, number.dialCode)

      mobile_no = mobile_no.replaceAll('-', '')
      mobile_no = mobile_no.replaceAll('(', number.dialCode)
      mobile_no = mobile_no.replaceAll(')', '')
      mobile_no = mobile_no.replaceAll(' ', '')

      customer.cno = mobile_no
      customer.email = emailAddress
      customer.address = streetAddress
      customer.city = city1
      customer.state = state1
      customer.zip = zipCode
      customer.country = country1
      customer.same_billing = sameBilling

      let billing = {}
      billing.address = streetAddress
      billing.city = city1
      billing.state = state1
      billing.zip = zipCode
      billing.country = country1

      customer.billing = billing

      let postData = {}
      postData.token = userDetail.id
      postData.customer = customer

      axios
        .post(
          `${process.env.REACT_APP_INVOICE_API}/invoice/calculate_customer_tax_fee`,
          postData
        )
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data.status &&
            response.data.data
          ) {
            customer.taxfee = response.data.data
            props.setCustomerSelected(customer)
            props.handleClose()
          }
        })
        .catch(() => {
          setError('Could get tax information for this address')
        })
    }
  }

  return (
    <Container className={styles.AddCustomerModal}>
      <Box className='center-box'>
        <Box className='flex-box'>
          <Box className='checkout-container bg-checkout relative'>
            <div className={styles.headingDiv} style={{ marginBottom: '10px' }}>
              <h5>Add New Customer</h5>
              <CloseIcon
                onClick={props.handleClose}
                className={styles.CloseIcon}
              />
            </div>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <RedditTextField
                  label='Customer Name'
                  id='customer-name-input'
                  variant='filled'
                  className={styles.CustomerNameInput}
                  value={customerName}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <IntlTelInput
                  containerClassName='intl-tel-input'
                  inputClassName='MuiOutlinedInput-input MuiInputBase-input css-1rpt010-MuiInputBase-input-MuiOutlinedInput-input intl-tel-input-field'
                  fieldId='outlined-basic'
                  id='outlined-basic'
                  name='phone'
                  autoFocus={true}
                  defaultValue={phone}
                  autoPlaceholder
                  required='required'
                  format={true}
                  defaultCountry='us'
                  preferredCountries={['pk', 'us']}
                  value={phone}
                  onSelectFlag={(e) => {
                    handleNumberChange({
                      payload: {
                        phone: '',
                        phoneNumberWithCountryCode: '',
                      },
                    })
                  }}
                  onPhoneNumberChange={(isValid, value, intlNumber) => {
                    setIsPhoneNumberValid(isValid)
                    setIntlNumber(intlNumber)
                    setPhone(value)
                  }}
                  onPhoneNumberBlur={(isValid) => {
                    setIsPhoneNumberValid(isValid)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <RedditTextField
                  label='Email Address'
                  id='email-address-input'
                  variant='filled'
                  // style={{ marginTop: 11 }}
                  className={styles.EmailAddressInput}
                  value={emailAddress}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <RedditTextField
                  label='Street Address'
                  id='street-address-input'
                  variant='filled'
                  className={styles.StreetAddressInput}
                  value={streetAddress}
                  onChange={handleStreetChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Country</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='country'
                    label='Country'
                    onChange={handleCountryChange}
                    // countriesList={countriesList}
                    selectedCountry={selectedCountry}
                    defaultValue={selectedCountry}
                    value={selectedCountry}
                  >
                    {countriesList &&
                      countriesList.map((country) => {
                        return (
                          <MenuItem
                            value={`{"id": "${country.id}", "name": "${country.name}"}`}
                          >
                            {country.name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>State</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='state'
                    label='State'
                    onChange={handleStateChange}
                    defaultValue={selectedState}
                    value={selectedState}
                  >
                    {/* {countriesList && countriesList.map((country) => {
            return <MenuItem value={`{"id": "${country.id}", "name": "${country.name}"}`}>{country.name}</MenuItem>
          })} */}
                    {statesList &&
                      statesList.map((state) => {
                        return (
                          <MenuItem
                            value={`{"id": "${state.id}", "name": "${state.name}"}`}
                          >
                            {state.name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>City</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='city'
                    label='City'
                    onChange={handleCityChange}
                    defaultValue={selectedCity}
                    value={selectedCity}
                  >
                    {citiesList &&
                      citiesList.map((city) => {
                        return (
                          <MenuItem
                            value={`{"id": "${city.id}", "name": "${city.name}"}`}
                          >
                            {city.name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <RedditTextField
                  label='ZIP Code'
                  id='zip-code-input'
                  variant='filled'
                  className={styles.ZipCodeInput}
                  value={zipCode}
                  onChange={handleZipChange}
                />
              </Grid>
            </Grid>

            {/* <Row>
                            <Col>
                                <RedditTextField
                                    label="Customer Name11"
                                    id="customer-name-input"
                                    variant="filled"
                                    style={{ marginTop: 11 }}
                                    className={styles.CustomerNameInput}
                                    value={customerName}
                                    onChange={handleNameChange}
                                />
                            </Col>     
                        </Row>  */}

            {/*                         
                        
                        <Row>
                            <Col>
                                <RedditTextField
                                    label="Email Address"
                                    id="email-address-input"
                                    variant="filled"
                                    style={{ marginTop: 11 }}
                                    className={styles.EmailAddressInput}
                                    value={emailAddress}
                                    onChange={handleEmailChange}
                                />
                            </Col>     
                        </Row> */}

            {/* <Row>
                            <Col>
                                <RedditTextField
                                    label="Street Address"
                                    id="street-address-input"
                                    variant="filled"
                                    style={{ marginTop: 11 }}
                                    className={styles.StreetAddressInput}
                                    value={streetAddress}
                                    onChange={handleStreetChange}
                                />
                            </Col>    
                        </Row> */}

            {/* <Row>
                            <Col> */}
            {/* <RedditTextField
                                    label="City"
                                    id="city-input"
                                    variant="filled"
                                    style={{ marginTop: 11 }}
                                    className={styles.CityInput}
                                    value={city}
                                    onChange={handleCityChange}
                                /> */}
            {/* <SelectCustom label="city" id="city" citiesList={citiesList} onchange={handleCityChange} />
                            </Col> */}

            {/* <Col> */}
            {/* <RedditTextField
                                    label="State"
                                    id="state-input"
                                    variant="filled"
                                    style={{ marginTop: 11 }}
                                    className={styles.StateInput}
                                    value={state}
                                    onChange={handleStateChange}
                                /> */}
            {/* <SelectCustom label="state" id="state" statesList={statesList} selectedState={selectedState} onchange={handleStateChange} />
                            </Col>     
                        </Row> */}

            {/* <Row>
                            <Col>
                                <RedditTextField
                                    label="ZIP Code"
                                    id="zip-code-input"
                                    variant="filled"
                                    style={{ marginTop: 11 }}
                                    className={styles.ZipCodeInput}
                                    value={zipCode}
                                    onChange={handleZipChange}
                                />
                            </Col> */}

            {/* <Col>
                                {/* <RedditTextField
                                    label="Country"
                                    id="country-input"
                                    variant="filled"
                                    style={{ marginTop: 11 }}
                                    className={styles.CountryInput}
                                    value={country}
                                    onChange={handleCountryChange}
                                /> */}
            {/* <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                        >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box> */}
            {/* <SelectCustom label="country" id="country" countriesList={countriesList} selectedCountry={selectedCountry} onchange={handleCountryChange} /> */}
            {/* </Col>          */}
            {/* </Row> */}

            <Row>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onChange={() => setSameBilling(!sameBilling)}
                    style={{ color: '#E22F7E' }}
                  />
                }
                label='Same billing address'
              />
            </Row>

            <Row>
              <Col>
                {error != '' && <p className={styles.ErrorMsg}>{error}</p>}
                <button onClick={submit} className={styles.AddCustomerBtn}>
                  Add Customer
                </button>
              </Col>
            </Row>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

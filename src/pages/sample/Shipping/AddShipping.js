import { Grid, Stack, Typography, Button } from '@mui/material'
import InfoIcon from 'assets/icon/InfoIcon.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createShippingRule } from 'redux/actions/TaxAction'
import AddShippingZone from './AddShippingZone'
import FreeShipping from './FreeShipping'
import OvernightShipping from './OvernightShipping'
import StandardShipping from './StandardShipping'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
const AddShipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetail = useSelector((state) => state.users.userDetail)
  const [selectedCountry, setSelectedCountry] = useState([])
  const [selectedState, setSelectedState] = useState([])
  const [selectedCity, setSelectedCity] = useState([])
  const [zoneName, setZoneName] = useState('')

  const [isFreeShipping, setIsFreeShipping] = useState(false)
  const [isOvernight, setIsOverNight] = useState(false)
  const [rateByPriceOverNight, setRateByPriceOverNight] = useState(false)
  const [isFSByWeight, setIsFSByWeight] = useState(false)
  const [isFSByPrice, setIsFSByPrice] = useState(false)
  const [fsMin, setFsMin] = useState(0)
  const [titleValue, setTitleValue] = useState('')
  const [fieldChanged, setFieldChanged] = useState(false)
  const [shippingOptionError, setShipppingOptionError] = useState('')
  const [overnightShipping, setOvernightShipping] = useState([])
  const [standardShipping, setStandardShipping] = useState([])
  const [rateByWeight, setRateByWeight] = useState(false)
  const [isStandartShipping, setIsStandardShipping] = useState(false)
  const [success, setSuccess] = useState(null)
  const [rateByPriceStandardShipping, setRateByPriceStandardShipping] =
    useState(false)
  const [rateByWeightStandardShipping, setRateByWeightStandardShipping] =
    useState(false)
  const addShippingZoneHelper = () => {
    if (typeof userDetail === 'undefined') {
      return
    }

    if (zoneName === '') {
      toast.error('Zone name required.')
      return
    }

    if (selectedCountry?.length < 1) {
      toast.error('Country required.')
      return
    }
    if (!isFreeShipping && !isOvernight && !isStandartShipping) {
      toast.error('Select atleast one shipping option')
      return
    }

    // if (selectedCity && selectedCity?.length < 1) {
    //   alert('City required')
    //   return
    // }

    if (isFreeShipping && !isFSByWeight && !isFSByPrice) {
      toast.error('Invalid shipping options')

      return
    } else if (isOvernight && !rateByPriceOverNight && !rateByWeight) {
      toast.error('Invalid shipping options')
      return
    } else if (
      isStandartShipping &&
      !rateByPriceStandardShipping &&
      !rateByWeightStandardShipping
    ) {
      toast.error('Invalid shipping options')
      return
    }

    // if (isFreeShipping === true ) {
    //   const data = {
    //     merchantId: userDetail.merchantId,
    //     title: zoneName.trim(),
    //     country: selectedCountry,
    //     states: selectedState,
    //     cities: selectedCity,
    //     shippingOption: {
    //       freeShipping: [
    //         {
    //           shippingFlatFee: 0,
    //           minAmount: fsMin,
    //           basedOn: isFSByPrice === true ? 'PRICE' : 'WEIGHT',
    //         },
    //       ],
    //       overnightShipping: overnightShipping,
    //       standardShipping: standardShipping,
    //     },
    //   }

    //   dispatch(createShippingRule(data, navigate))
    // }
    else {
      const data = {
        merchantId: userDetail.merchantId,
        title: zoneName.trim(),
        country: selectedCountry,
        states: selectedState,
        cities: selectedCity,
        shippingOption: {
          freeShipping: isFreeShipping
            ? [
                {
                  shippingRuleOptionTitle: titleValue,
                  shippingFlatFee: 0,
                  minAmount: fsMin,
                  maxAmount: null,
                  basedOn: isFSByPrice === true ? 'PRICE' : 'WEIGHT',
                },
              ]
            : [],
          overnightShipping: isOvernight ? overnightShipping : [],
          standardShipping: isStandartShipping ? standardShipping : [],
        },
      }

      setSuccess(false)
      dispatch(createShippingRule(data, navigate, setSuccess))
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} lg={12} md={12} sm={12}>
        <Grid container alignItems={'center'}>
          <Grid container style={{ marginBottom: '12px', marginRight: '1rem' }}>
            <Grid>
              <Link to='/shipping'>
                <ArrowBack />
              </Link>
            </Grid>
            <Typography
              variant='h2'
              component='h2'
              style={{ marginLeft: '10px' }}
            >
              Add Shipping Zone
            </Typography>
            <img
              src={InfoIcon}
              alt='Gray Info Icon'
              style={{ marginLeft: 10, height: 20, width: 20 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12} md={12} sm={12}>
          <AddShippingZone
            setSelectedCountry={(e) => {
              setSelectedCountry(e)
            }}
            setSelectedCity={(e) => setSelectedCity(e)}
            setSelectedState={(e) => {
              setSelectedState(e)
            }}
            selectedState={selectedState}
            setZoneName={(e) => setZoneName(e)}
            zoneName={zoneName}
            fieldChanged={fieldChanged}
          />
        </Grid>

        <Typography
          variant='h2'
          component='h2'
          style={{ marginTop: 25, marginBottom: 25 }}
        >
          Shipping Rates
        </Typography>

        <Grid item xs={12} lg={12} md={12} sm={12}>
          <Stack spacing={5}>
            <FreeShipping
              checked={isFreeShipping}
              setChecked={setIsFreeShipping}
              setIsFSByWeight={setIsFSByWeight}
              setIsFSByPrice={setIsFSByPrice}
              setMinimumPrice={(e) => setFsMin(e)}
              setMinimumWeight={(e) => setFsMin(e)}
              minimumPrice={fsMin}
              minimumWeight={fsMin}
              setTitle={(e) => setTitleValue(e)}
              title={titleValue}
              shippingOptionError={shippingOptionError}
            />
            <OvernightShipping
              onChange={(data) => setOvernightShipping(data)}
              isOvernight={isOvernight}
              setIsOverNight={setIsOverNight}
              rateByPrice={rateByPriceOverNight}
              setRateByPrice={setRateByPriceOverNight}
              setRateByWeight={setRateByWeight}
              rateByWeight={rateByWeight}
              setTitle={(e) => setTitleValue(e)}
              title={titleValue}
            />
            <StandardShipping
              onChange={(data) => setStandardShipping(data)}
              isStandartShipping={isStandartShipping}
              setIsStandardShipping={setIsStandardShipping}
              rateByPriceStandardShipping={rateByPriceStandardShipping}
              setRateByPriceStandardShipping={setRateByPriceStandardShipping}
              rateByWeightStandardShipping={rateByWeightStandardShipping}
              setRateByWeightStandardShipping={setRateByWeightStandardShipping}
              setTitle={(e) => setTitleValue(e)}
              title={titleValue}
            />
            <Button
              style={{
                background: '#e93a7d',
                borderRadius: 5,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: 150,
                border: 'none',
                height: 40,
                cursor: 'pointer',
              }}
              onClick={addShippingZoneHelper}
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
                'Add Zone'
              )}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddShipping

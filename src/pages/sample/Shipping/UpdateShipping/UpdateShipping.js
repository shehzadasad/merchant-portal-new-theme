import { Grid, Stack, Typography, Button } from '@mui/material'
import InfoIcon from 'assets/icon/InfoIcon.png'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  updateShippingRule,
  setUpdateShippingRuleDetails,
} from 'redux/actions/TaxAction'
import { fetchUserDetail } from 'redux/reducers/Users'
import SharedButton from 'shared/components/SharedButton'
import FreeShippingUpdate from './FreeShippingUpdate'
import OvernightShippingUpdate from './OvernightShippingUpdate'
import StandardShippingUpdate from './StandardShippingUpdate'
import UpdateShippingZone from './UpdateShippingZone'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { encode, decode } from 'js-base64'
import { ThreeDots } from 'react-loader-spinner'
import AppLoader from '@crema/core/AppLoader'
import { useNavigate } from 'react-router-dom'
const UpdateShipping = () => {
  let { id } = useParams()
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  const [success, setSuccess] = useState(null)
  useEffect(() => {
    if (isNaN(parseInt(decode(id))) === false) {
      setLoader(false)
    }
  }, [])

  document.title = 'Update Shipping | QisstPay - Merchants'
  const dispatch = useDispatch()

  const userDetail = useSelector((state) => state.users.userDetail)
  const shippingDetails = useSelector(
    (state) => state.tax.updateShippingRuleDetails
  )

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState([])
  const [selectedCity, setSelectedCity] = useState([])
  const [zoneName, setZoneName] = useState('')
  const [fieldChanged, setFieldChanged] = useState(false)
  const [isFreeShipping, setIsFreeShipping] = useState(false)
  const [isStandartShipping, setIsStandardShipping] = useState(false)
  const [isOvernight, setIsOverNight] = useState(false)
  const [isFSByWeight, setIsFSByWeight] = useState(false)
  const [isFSByPrice, setIsFSByPrice] = useState(false)
  const [fsMin, setFsMin] = useState(0)

  const [overnightShipping, setOvernightShipping] = useState([])
  const [standardShipping, setStandardShipping] = useState([])

  const updateShippingZoneHelper = () => {
    if (zoneName.length < 1) {
      toast.error('Zone Name required')
      return
    }

    if (selectedCountry.length < 1) {
      toast.error('Zone Name required')
      return
    }

    if (selectedCity.length < 1) {
      toast.error('City required')
      return
    }

    if (isFreeShipping === true) {
      if (isFSByWeight === false && isFSByPrice === false) {
        toast.error('Invalid Shipping Option')
        return
      }
    }

    const data = {
      id: shippingDetails?.id,
      merchantId: userDetail.merchantId,
      title: zoneName,
      country: selectedCountry,
      states: selectedState,
      cities: selectedCity,
      shippingOption: {
        freeShipping: isFreeShipping
          ? [
              {
                merchantShippingRuleOptionId: parseInt(decode(id)),
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
    dispatch(updateShippingRule(data, setSuccess, navigate))
  }

  useEffect(() => {
    if (Object.keys(shippingDetails)?.length === 0) {
      if (localStorage.getItem('updateShippingDetails')) {
        const persistedData = JSON.parse(
          localStorage.getItem('updateShippingDetails')
        )
        setOvernightShipping(persistedData.shippingOption.overnightShipping)
        setStandardShipping(persistedData.shippingOption.standardShipping)
        setIsFSByPrice(
          persistedData.shippingOption?.freeShipping[0]?.basedOn === 'PRICE'
            ? true
            : false
        )
        setIsFSByWeight(
          persistedData.shippingOption?.freeShipping[0]?.basedOn === 'WEIGHT'
            ? true
            : false
        )
        setFsMin(persistedData.shippingOption?.freeShipping[0]?.minAmount)
        setZoneName(persistedData?.title)
        setSelectedCountry(persistedData?.country)
        setSelectedCity(persistedData?.cities)
        setSelectedState(persistedData?.states)
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(shippingDetails).length !== 0) {
      localStorage.setItem(
        'updateShippingDetails',
        JSON.stringify(shippingDetails)
      )
      setSelectedCountry(shippingDetails.country)
      setSelectedCity(shippingDetails.cities)
      setSelectedState(shippingDetails.states)
      setOvernightShipping(shippingDetails.shippingOption.overnightShipping)
      setStandardShipping(shippingDetails.shippingOption.standardShipping)
      setIsFSByPrice(
        shippingDetails.shippingOption.freeShipping[0]?.basedOn === 'PRICE'
          ? true
          : false
      )
      setIsFSByWeight(
        shippingDetails.shippingOption.freeShipping[0]?.basedOn === 'WEIGHT'
          ? true
          : false
      )
      setFsMin(shippingDetails.shippingOption.freeShipping[0]?.minAmount)
      setZoneName(shippingDetails.title)
    }
  }, [shippingDetails])

  return loader === true ? (
    <AppLoader />
  ) : (
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
          <Grid style={{ marginTop: '7px' }}>
            <Link to='/shipping'>
              <ArrowBack />
            </Link>
          </Grid>
          <Typography variant='h2' component='h2' marginLeft={3}>
            Update Shipping Zone
          </Typography>
          <img
            src={InfoIcon}
            alt='Gray Info Icon'
            style={{ marginLeft: 10, height: 20, width: 20 }}
          />
        </Grid>
        <Grid item xs={12} lg={12} md={12} sm={12}>
          <UpdateShippingZone
            setSelectedCountry={(e) => {
              setFieldChanged(true)
              setSelectedCountry(e)
            }}
            setSelectedCity={(e) => {
              setFieldChanged(true)
              setSelectedCity(e)
            }}
            setSelectedState={(e) => {
              setFieldChanged(true)
              setSelectedState(e)
            }}
            setZoneName={(e) => setZoneName(e)}
            zoneName={zoneName}
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedCity={selectedCity}
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
            <FreeShippingUpdate
              checked={isFreeShipping}
              setChecked={setIsFreeShipping}
              setIsFSByWeight={setIsFSByWeight}
              setIsFSByPrice={setIsFSByPrice}
              setMinimumPrice={(e) => setFsMin(e)}
              setMinimumWeight={(e) => setFsMin(e)}
              minimumPrice={fsMin}
              minimumWeight={fsMin}
              isFSByPrice={isFSByPrice}
              isFSByWeight={isFSByWeight}
            />
            <OvernightShippingUpdate
              onChange={(data) => setOvernightShipping(data)}
              data={overnightShipping}
              isOvernight={isOvernight}
              setIsOverNight={setIsOverNight}
            />
            <StandardShippingUpdate
              onChange={(data) => setStandardShipping(data)}
              data={standardShipping}
              setIsStandardShipping={setIsStandardShipping}
              isStandartShipping={isStandartShipping}
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
              onClick={() => updateShippingZoneHelper()}
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
                'Update Zone'
              )}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UpdateShipping

import {
  Paper,
  Stack,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchCitiesByCountryId,
  fetchStatesByCountryId,
  fetchCountries,
  setCities,
  setCountry,
} from 'redux/reducers/Users'
import SharedFormInput from 'shared/components/SharedFormInput'
import SharedMultiSelect from 'shared/components/SharedMultiSelect'
import ShippingMultiSelect from './ShippingMultiSelect'

const AddShippingZone = ({
  setSelectedCountry,
  setSelectedCity,
  setSelectedState,
  selectedState,
  zoneName,
  setZoneName,
}) => {
  const [countryId, setCountryId] = useState('')
  const [stateId, setStateId] = useState([])
  const [country, setCountry] = useState([])

  const dispatch = useDispatch()
  const countriesObj = {}
  const [countriesObject, setCountryObject] = useState({})
  const cities = useSelector((state) => state.users.cities)
  const states = useSelector((state) => state.users.states)
  const countries = useSelector((state) => state.users.countries)

  let stateList = states
  let stateObj = {}
  for (let singleState of stateList) {
    stateObj[singleState.name] = singleState.stateId
  }

  let stateList2 = Object.keys(stateObj)

  let stateArray = {}
  stateArray = stateList2

  // setCountry(countries)
  // useEffect(() => {
  //   setCountry(countries)
  // }, [])
  const [fieldChanged, setFieldChanged] = useState(false)

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/app/world/countries`,
      headers: {
        'IP-ADDRESS': '52.76.98.234',
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        let countriesList = response.data.data
        let countriesObj = {}
        for (let singleCountry of countriesList) {
          countriesObj[singleCountry.name] = singleCountry.countryId
        }

        let countriesList2 = Object.keys(countriesObj)

        setCountry(countriesList2)
        setCountryObject(countriesObj)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  const fetchStatesByCountryIdHelper = (countryId) => {
    dispatch(fetchStatesByCountryId(countryId))
  }

  const fetchCitiesByCountryIdHelper = (stateId) => {
    dispatch(fetchCitiesByCountryId(stateId))
  }

  useEffect(() => {
    if (countryId) {
      fetchStatesByCountryIdHelper(countryId)
    }
  }, [countryId])

  useEffect(() => {
    if (stateId) {
      fetchCitiesByCountryIdHelper(stateId)
    }
  }, [stateId])

  const processStates = (selectedState) => {
    if (selectedState.length > 0) {
      const stateObject = states?.filter(
        (state) => state.name === selectedState
      )

      const citiesByState = cities?.filter(
        (city) => city?.stateId === stateObject?.[0]?.stateId
      )

      if (citiesByState?.length > 0) {
        dispatch(setCities(citiesByState))
      }
    }
  }

  const handleChange = (e) => {
    setStateId(e.target.value)
  }

  return (
    <Paper
      sx={{
        width: window.innerWidth > 700 ? '50vw' : '80vw',
        marginTop: '35px',
        padding: 12,
        borderRadius: 2,
      }}
    >
      <Stack spacing={5}>
        <SharedFormInput
          label='Zone Name *'
          type='text'
          style={{ marginBottom: 0 }}
          value={zoneName}
          onInputChange={(e) => setZoneName(e)}
        />
        <Box>
          <SharedMultiSelect
            names={country}
            label={'Select Country *'}
            onChange={(e) => console.log(e)}
            multiple={false}
            onSelect={(value) => {
              setFieldChanged(!fieldChanged)
              setSelectedCountry(value)
              setCountryId(country.indexOf(value) + 1)
            }}
          />
          <Typography
            variant={'p'}
            component={'p'}
            style={{
              fontSize: 12,
              color: '#6B7280',
              marginTop: 10,
              marginLeft: 3,
              fontStyle: 'italic',
            }}
          >
            Customers won't see this at checkout
          </Typography>
        </Box>
        <Box>
          {/* {states &&
            states?.map((item) => {
              ;<> */}
          {/* <h1>HELLO</h1> */}

          {/* <ShippingMultiSelect
            names={states}
            fieldChanged={fieldChanged}
            label={'Select State/Province (Optional)'}
            value={states.stateId}
            onSelect={(value) => {
            
              setFieldChanged(!fieldChanged)
              setSelectedState(value)
              processStates(value)

              setStateId(states)
            }}
            multiple={true}
            // disabled={states.length > 0 ? false : true}
          /> */}
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>States</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='states'
              label='States'
              value={stateId}
              onChange={handleChange}
              name='States'
              multiple
            >
              {states.map((state) => {
                return (
                  <MenuItem
                    value={state.stateId}
                    onClick={() =>
                      setSelectedState([...selectedState, state.name])
                    }
                  >
                    {' '}
                    {state.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          {/* </> */}
          {/* })} */}

          <Typography
            variant={'p'}
            component={'p'}
            style={{
              fontSize: 12,
              color: '#6B7280',
              marginTop: 10,
              marginLeft: 3,
              fontStyle: 'italic',
            }}
          >
            Adding a state will add all cities in that state in this zone. If
            you want to include specific cities of the state please use the
            below “Select Cities” dropdown instead and add it one by one.
          </Typography>
        </Box>

        <ShippingMultiSelect
          fieldChanged={fieldChanged}
          names={cities}
          label={'Select Cities'}
          disabled={cities.length < 1}
          onSelect={(e) => setSelectedCity(e)}
        />
      </Stack>
    </Paper>
  )
}

export default AddShippingZone

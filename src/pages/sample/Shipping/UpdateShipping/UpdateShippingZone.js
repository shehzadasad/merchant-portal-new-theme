import { Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCitiesByCountryId,
  fetchStatesByCountryId,
  setCities,
} from 'redux/reducers/Users'
import SharedFormInput from 'shared/components/SharedFormInput'
import UpdateCitySelect from './UpdateCitySelect'
import UpdateCountrySelect from './UpdateCountrySelect'
import UpdateStateSelect from './UpdateStateSelect'
import './index.css'
const UpdateShippingZone = ({
  setSelectedCountry,
  setSelectedCity,
  setSelectedState,
  zoneName,
  setZoneName,
  selectedCountry,
  selectedState,
  selectedCity,
  fieldChanged,
}) => {
  const countriesList = [
    'Afghanistan',
    'Åland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas (the)',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory (the)',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands (the)',
    'Central African Republic (the)',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands (the)',
    'Colombia',
    'Comoros (the)',
    'Congo (the Democratic Republic of the)',
    'Congo (the)',
    'Cook Islands (the)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Czechia',
    "Côte d'Ivoire",
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic (the)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Falkland Islands (the) [Malvinas]',
    'Faroe Islands (the)',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories (the)',
    'Gabon',
    'Gambia (the)',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See (the)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea (the Democratic People's Republic of)",
    'Korea (the Republic of)',
    'Kuwait',
    'Kyrgyzstan',
    "Lao People's Democratic Republic (the)",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands (the)',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia (Federated States of)',
    'Moldova (the Republic of)',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands (the)',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger (the)',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands (the)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'State of Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines (the)',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of North Macedonia',
    'Romania',
    'Russian Federation (the)',
    'Rwanda',
    'Réunion',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin (French part)',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten (Dutch part)',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan (the)',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan (Province of China)',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands (the)',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates (the)',
    'United Kingdom of Great Britain and Northern Ireland (the)',
    'United States Minor Outlying Islands (the)',
    'United States of America (the)',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela (Bolivarian Republic of)',
    'Viet Nam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ]

  const [countryId, setCountryId] = useState()

  const dispatch = useDispatch()
  const cities = useSelector((state) => state.users.cities)
  const states = useSelector((state) => state.users.states)

  const fetchStatesByCountryIdHelper = (countryId) => {
    dispatch(fetchStatesByCountryId(countryId))
  }

  const fetchCitiesByCountryIdHelper = (countryId) => {
    dispatch(fetchCitiesByCountryId(countryId))
  }

  useEffect(() => {
    setCountryId(countriesList.indexOf(selectedCountry) + 1)
  }, [selectedCountry])

  useEffect(() => {
    if (countryId) {
      fetchStatesByCountryIdHelper(countryId)
    }
  }, [countryId])

  useEffect(() => {
    if (countryId) {
      fetchCitiesByCountryIdHelper(countryId)
    }
  }, [countryId])

  const processStates = (selectedState) => {
    if (selectedState.length > 0) {
      const stateObject = states.filter((state) => state.name === selectedState)
      if (stateObject[0]) {
        const citiesByState = cities.filter(
          (city) => city.stateId === stateObject[0].stateId
        )

        if (citiesByState.length > 0) {
          dispatch(setCities(citiesByState))
        }
      }
    }
  }

  useEffect(() => {
    if (selectedCountry) {
      if (selectedState) {
        processStates(selectedState)
      } else {
        fetchStatesByCountryIdHelper(countriesList.indexOf(selectedCountry) + 1)
        fetchCitiesByCountryIdHelper(countriesList.indexOf(selectedCountry) + 1)
      }
    }
  }, [selectedCountry])

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
          style={{ marginBottom: 0 }}
          value={zoneName}
          onInputChange={(e) => setZoneName(e)}
        />
        <Box>
          <UpdateCountrySelect
            names={countriesList}
            selectedCountry={selectedCountry}
            label={'Select Country *'}
            onChange={(e) => console.log(e)}
            multiple={false}
            onSelect={(value) => {
              setSelectedCountry(value)
              setCountryId(countriesList.indexOf(value) + 1)
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
          <UpdateStateSelect
            names={states}
            label={'Select State/Province (Optional)'}
            selectedState={selectedState}
            onSelect={(e) => {
              setSelectedState(e)
              processStates(e)
            }}
            multiple={false}
            disabled={states.length > 0 ? false : true}
            fieldChanged={fieldChanged}
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
            Adding a state will add all cities in that state in this zone. If
            you want to include specific cities of the state please use the
            below “Select Cities” dropdown instead and add it one by one.
          </Typography>
        </Box>
        <UpdateCitySelect
          names={cities}
          label={'Select Cities'}
          selectedCity={selectedCity}
          disabled={cities.length > 0 ? false : true}
          onSelect={(e) => setSelectedCity(e)}
          fieldChanged={fieldChanged}
        />
      </Stack>
    </Paper>
  )
}

export default UpdateShippingZone

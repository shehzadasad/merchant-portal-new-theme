import { Container, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { pink } from '@mui/material/colors'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  closeUpdateTaxModal,
  createTaxRule,
  updateTaxRule,
} from 'redux/actions/TaxAction'
import { fetchStatesByCountryId, fetchUserDetail } from 'redux/reducers/Users'
import SharedButton from 'shared/components/SharedButton'
import SharedFormInput from 'shared/components/SharedFormInput'
import SharedMultiSelect from 'shared/components/SharedMultiSelect'
import ShippingMultiSelect from '../Shipping/ShippingMultiSelect'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const names = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
  {
    name: 'American Samoa',
    abbreviation: 'AS',
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
  },
  {
    name: 'California',
    abbreviation: 'CA',
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM',
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
  },
  {
    name: 'Guam',
    abbreviation: 'GU',
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
  },
  {
    name: 'Marshall Islands',
    abbreviation: 'MH',
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
  },
  {
    name: 'New York',
    abbreviation: 'NY',
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    abbreviation: 'MP',
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
  },
  {
    name: 'Palau',
    abbreviation: 'PW',
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
  },
  {
    name: 'Puerto Rico',
    abbreviation: 'PR',
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI',
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
  },
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth < 600 ? '90vw' : 500,
  height: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
}

const styleofdeletemodal = {
  position: 'absolute',
  background: '#FFFFFF',
  borderRadius: '16px',
  width: '500px',
  height: '200px',
  background: '#FFFFFF',
  left: '710px',
  top: '350px',
}

const TaxTitleRow = () => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const isUpdateTaxModalOpened = useSelector(
    (state) => state.tax.isUpdateTaxModalOpened
  )
  const updateTaxRuleDetails = useSelector(
    (state) => state.tax.updateTaxRuleDetails
  )

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

  const states = useSelector((state) => state.users.states)

  const [title, setTitle] = useState('')

  const [countryId, setCountryId] = useState([])
  const [taxPercentage, setTaxPercentage] = useState()
  const [taxOnShipping, setTaxOnShipping] = useState(false)

  const [updateTitle, setUpdateTitle] = useState('')
  const [updateTaxPercentage, setUpdateTaxPercentage] = useState()
  const [updateTaxOnShipping, setUpdateTaxOnShipping] = useState(false)
  const [updateStates, setUpdateStates] = useState([])
  const [updateCountry, setUpdateCountry] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [open1, setOpen1] = useState(false)
  const handleOpen1 = () => setOpen1(true)
  const handleClose1 = () => setOpen1(false)

  const [age, setAge] = useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
    setCountryId(countriesList.indexOf(event.target.value) + 1)
  }

  const [personName, setPersonName] = useState([])
  const [personName1, setPersonName1] = useState([])

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event
    setUpdateStates(typeof value === 'string' ? value.split(',') : value)
  }

  const fetchUserDetailHelper = () => {
    dispatch(fetchUserDetail())
  }

  const addTaxRule = () => {
    if (userDetail) {
      if (userDetail.merchantId) {
        if (title.length < 1) {
          toast.error('Missing title')
          return
        }

        if (age.length < 1) {
          toast.error('Missing Country')
        }

        if (personName.length < 1) {
          toast.error('Missing states')
          return
        }

        if (!taxPercentage) {
          toast.error('Missing tax percentage')
          return
        }

        if (parseInt(taxPercentage) < 0 || parseInt(taxPercentage) > 100) {
          toast.error('Invalid Tax Rate')
          return
        }

        const data = {
          merchantId: userDetail.merchantId,
          title: title.trim(),
          description: title.trim(),
          country: age,
          states: personName,
          cities: personName,
          taxFlatRate: 10,
          taxPercentage: taxPercentage,
          taxOnShipping: taxOnShipping,
        }

        dispatch(createTaxRule(data))
      }
    }

    handleClose()
  }

  const updateTaxRuleHelper = () => {
    if (updateTaxRuleDetails) {
      if (updateTitle.length < 1) {
        toast.error('Missing title')
        return
      }

      if (updateStates.length < 1) {
        toast.error('Missing states')
        return
      }

      if (!updateTaxPercentage) {
        toast.error('Missing tax percentage')
        return
      }

      if (
        parseInt(updateTaxPercentage) < 0 ||
        parseInt(updateTaxPercentage) > 100
      ) {
        toast.error('Invalid Tax Rate')
        return
      }

      const data = {
        id: updateTaxRuleDetails.id,
        merchantId: userDetail.merchantId,
        title: updateTitle,
        description: updateTitle,
        country: updateCountry,
        states: updateStates,
        cities: updateStates,
        taxFlatRate: 10,
        taxPercentage: updateTaxPercentage,
        taxOnShipping: updateTaxOnShipping,
      }

      dispatch(updateTaxRule(data))
    }
  }

  const closeUpdateTaxModalHelper = () => {
    dispatch(closeUpdateTaxModal(false))
  }

  useEffect(() => {
    fetchUserDetailHelper()
  }, [])

  useEffect(() => {
    setUpdateTitle(updateTaxRuleDetails.title)
    setUpdateTaxPercentage(updateTaxRuleDetails.taxPercentage)
    setUpdateTaxOnShipping(updateTaxRuleDetails.taxOnShipping)
    if (updateTaxRuleDetails.country) {
      setUpdateCountry(updateTaxRuleDetails.country)
    }

    if (updateTaxRuleDetails.states) {
      setUpdateStates(updateTaxRuleDetails.states)
    }
  }, [updateTaxRuleDetails])

  const fetchStatesByCountryIdHelper = (countryId) => {
    dispatch(fetchStatesByCountryId(countryId))
  }

  useEffect(() => {
    if (countryId) {
      fetchStatesByCountryIdHelper(countryId)
    }
  }, [countryId])

  return (
    <Grid container alignItems='center'>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid item>
          <Typography
            variant='h1'
            component='h2'
            sx={(theme) => ({
              [theme.breakpoints.down('md')]: {
                marginBottom: 3,
              },
            })}
          >
            Tax Configuration
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: 0 }}>
          <Grid
            container
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
          >
            <Grid
              item
              sx={(theme) => ({
                [theme.breakpoints.down('lg')]: {
                  marginTop: 10,
                },

                marginTop: window.innerWidth < 1489 ? 10 : 0,
              })}
            >
              <SharedButton
                text='Create Tax Rule'
                style={{
                  background: '#e93a7d',
                  borderRadius: 50,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  border: 'none',
                  height: 40,
                  cursor: 'pointer',
                  justifySelf: 'flex-end',
                }}
                onClick={handleOpen}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24px',
              paddingBottom: 20,
              paddingTop: '15px',
            }}
          >
            Create New Tax Rule
          </Typography>
          <SharedFormInput
            id='outlined-basic'
            label='Tax Name'
            style={{ width: '100%', marginTop: '20px', marginBottom: 0 }}
            variant='outlined'
            value={title}
            onInputChange={(e) => setTitle(e)}
            type='text'
          />
          <FormControl
            style={{ width: '460px', marginTop: '20px' }}
            variant='outlined'
          >
            <SharedMultiSelect
              names={countriesList}
              label={'Select Country *'}
              onChange={(e) => console.log(e)}
              multiple={false}
              onSelect={(value) => {
                setAge(value)
                setCountryId(countriesList.indexOf(value) + 1)
                setPersonName([])
              }}
            />
          </FormControl>

          <FormControl
            style={{ width: '460px', marginTop: '20px' }}
            variant='outlined'
          >
            <InputLabel
              id='outlined-state-select-label'
              style={{ maxWidth: 150, width: 150 }}
            >
              State
            </InputLabel>
            <Select
              labelId='outlined-state-select-label'
              id='demo-multiple-checkbox'
              multiple
              label='State'
              value={personName}
              onChange={handleChange1}
              input={<OutlinedInput label='State' />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              variant='outlined'
            >
              {states.map((name, index) => (
                <MenuItem key={index} value={name.name}>
                  <Checkbox checked={personName.indexOf(name.name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            style={{ width: '460px', marginTop: '20px' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-amount'>
              Tax Rate
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              value={taxPercentage}
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                if (e.target.value === '') {
                  setTaxPercentage(e.target.value)
                }

                if (value < 0 || value > 100) {
                  return
                }
                if (value >= 0) {
                  setTaxPercentage(value)
                }
              }}
              endAdornment={<InputAdornment position='start'>%</InputAdornment>}
              label='Amount'
              type='number'
            />
          </FormControl>
          <div style={{ color: '#6B7280', marginTop: '20px' }}>
            <Checkbox
              {...label}
              checked={taxOnShipping}
              onChange={() => setTaxOnShipping(!taxOnShipping)}
              sx={{
                '&.Mui-checked': {
                  color: pink[600],
                },
                paddingLeft: 0,
              }}
            />
            Tax on Shipping
          </div>
          <center>
            <Container sx={{ marginTop: 10 }}>
              {/* <Grid container style={{ justifyContent: 'flex-end' }} xs={12}> */}
              {/* <Grid item xs={6} lg={6} md={6}> */}
              <SharedButton
                text='Cancel'
                style={{
                  background: 'white',
                  border: '1px solid #e93a7d',
                  borderRadius: 10,
                  color: '#e93a7d',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  height: 40,
                  cursor: 'pointer',
                  marginRight: 10,
                }}
                onClick={handleClose}
              />
              {/* </Grid> */}
              {/* <Grid item> */}
              <SharedButton
                text='Create Tax Rule'
                style={{
                  background: '#e93a7d',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  border: 'none',
                  height: 40,
                  cursor: 'pointer',
                }}
                onClick={addTaxRule}
              />
              {/* </Grid> */}
              {/* </Grid> */}
            </Container>
          </center>
        </Box>
      </Modal>

      <Modal
        open={isUpdateTaxModalOpened}
        onClose={closeUpdateTaxModalHelper}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24px',

              paddingTop: '15px',
            }}
          >
            Update Tax Rule
          </Typography>
          <TextField
            id='outlined-basic'
            label='Tax Name'
            style={{ width: '460px', marginTop: '20px' }}
            variant='outlined'
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <FormControl style={{ width: '460px', marginTop: '20px' }}>
            <InputLabel id='demo-simple-select-label'>Country</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={updateCountry}
              label='Country'
              onChange={handleChange}
            >
              <MenuItem value={updateCountry}>{updateCountry}</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: '460px', marginTop: '20px' }}>
            <InputLabel id='demo-multiple-checkbox-label'>State</InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={personName}
              onChange={handleChange1}
              input={<OutlinedInput label='State' />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {states.map((name, index) => (
                <MenuItem key={index} value={name.name}>
                  <Checkbox checked={personName.indexOf(name.name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            style={{ width: '460px', marginTop: '20px' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Tax Rate
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              label='Tax Rate'
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
              value={updateTaxPercentage}
              onChange={(e) => setUpdateTaxPercentage(e.target.value)}
            />
          </FormControl>
          <div style={{ color: '#6B7280', marginTop: '20px' }}>
            <Checkbox
              {...label}
              checked={updateTaxOnShipping}
              onChange={() => setUpdateTaxOnShipping(!updateTaxOnShipping)}
              sx={{
                '&.Mui-checked': {
                  color: pink[600],
                },
                paddingLeft: 0,
              }}
            />
            Tax on Shipping
          </div>
          <center>
            <Container sx={{ marginTop: 10 }}>
              {/* <Grid container style={{ justifyContent: 'flex-end' }} xs={12}> */}
              {/* <Grid item xs={6} lg={6} md={6}> */}
              <SharedButton
                text='Cancel'
                style={{
                  background: 'white',
                  border: '1px solid #e93a7d',
                  borderRadius: 10,
                  color: '#e93a7d',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  height: 40,
                  cursor: 'pointer',
                  marginRight: 10,
                }}
                onClick={closeUpdateTaxModalHelper}
              />
              {/* </Grid> */}
              {/* <Grid item> */}
              <SharedButton
                text='Update Tax Rule'
                style={{
                  background: '#e93a7d',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  border: 'none',
                  height: 40,
                  cursor: 'pointer',
                }}
                onClick={updateTaxRuleHelper}
              />
              {/* </Grid> */}
              {/* </Grid> */}
            </Container>
          </center>
        </Box>
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleofdeletemodal}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24px',

              paddingTop: '15px',
            }}
          >
            Delete Tax Rule
          </Typography>
          <Typography
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontweight: ' 400',
              fontSize: ' 16px',
              lineHeight: '24px',
              paddingLeft: '20px',
              paddingTop: '25px',
            }}
          >
            Are you sure you want to delete this tax rule?
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Button
                  style={{
                    background: '#fff',
                    borderRadius: 50,
                    color: '#e93a7d',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    borderRadius: '8px',
                    borderColor: '#e93a7d',
                    border: 'solid',
                    cursor: 'pointer',
                    width: '100px ',
                    height: '36px',
                  }}
                  variant='secondary'
                  onClick={handleClose1}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  style={{
                    color: '#FFFFFF',
                    backgroundColor: '#E71583',
                    borderColor: '#E71583',
                    width: '100px ',
                  }}
                  variant='primary'
                  onClick={handleOpen1}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>{' '}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  )
}
export default TaxTitleRow

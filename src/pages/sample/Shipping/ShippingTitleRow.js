import { Container, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
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
import { Link } from 'react-router-dom'
import {
  closeUpdateTaxModal,
  createTaxRule,
  updateTaxRule,
} from 'redux/actions/TaxAction'
import SharedButton from 'shared/components/SharedButton'

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

const ShippingTitleRow = () => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const isUpdateTaxModalOpened = useSelector(
    (state) => state.tax.isUpdateTaxModalOpened
  )
  const updateTaxRuleDetails = useSelector(
    (state) => state.tax.updateTaxRuleDetails
  )

  const [title, setTitle] = useState('')
  const [taxPercentage, setTaxPercentage] = useState()
  const [taxOnShipping, setTaxOnShipping] = useState(false)

  const [updateTitle, setUpdateTitle] = useState('')
  const [updateTaxPercentage, setUpdateTaxPercentage] = useState()
  const [updateTaxOnShipping, setUpdateTaxOnShipping] = useState(false)
  const [updateStates, setUpdateStates] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [open1, setOpen1] = useState(false)
  const handleOpen1 = () => setOpen1(true)
  const handleClose1 = () => setOpen1(false)

  const [age, setAge] = useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
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
    setPersonName1(typeof value === 'string' ? value.split(',') : value)
  }

  const addTaxRule = () => {
    if (userDetail) {
      if (userDetail.merchantId) {
        if (title.length < 1) {
          alert('Missing title')
          return
        }

        if (personName.length < 1) {
          alert('Missing states')
          return
        }

        if (!taxPercentage) {
          alert('Missing tax percentage')
          return
        }

        const data = {
          merchantId: userDetail.merchantId,
          title: title,
          description: title,
          country: 'United States',
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
        alert('Missing title')
        return
      }

      if (updateStates.length < 1) {
        alert('Missing states')
        return
      }

      if (!updateTaxPercentage) {
        alert('Missing tax percentage')
        return
      }

      const data = {
        id: updateTaxRuleDetails.id,
        merchantId: userDetail.merchantId,
        title: updateTitle,
        description: updateTitle,
        country: 'United States',
        states: JSON.parse(updateStates),
        cities: JSON.parse(updateStates),
        taxFlatRate: 10,
        taxPercentage: updateTaxPercentage,
        taxOnShipping: updateTaxOnShipping,
      }

      dispatch(updateTaxRule(data))
    }

    // closeUpdateTaxModalHelper(false)
  }

  const closeUpdateTaxModalHelper = () => {
    dispatch(closeUpdateTaxModal(false))
  }

  useEffect(() => {
    setUpdateTitle(updateTaxRuleDetails.title)
    setUpdateTaxPercentage(updateTaxRuleDetails.taxPercentage)
    setUpdateTaxOnShipping(updateTaxRuleDetails.taxOnShipping)
    setUpdateStates(updateTaxRuleDetails.states)
  }, [updateTaxRuleDetails])

  return (
    <Grid container alignItems='center'>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
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
            Shipping Configuration
          </Typography>
        </Grid>
        <Grid item>
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
                marginTop: window.innerWidth < 1489 ? 10 : 0,
              })}
            >
              <Link to={'/shipping/add'}>
                <SharedButton
                  text='Add Shipping Zone'
                  style={{
                    background: '#e93a7d',
                    borderRadius: 50,
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 180,
                    border: 'none',
                    height: 40,
                    cursor: 'pointer',
                    justifySelf: 'flex-end',
                  }}
                />
              </Link>
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
              marginLeft: '20px',
              paddingTop: '15px',
            }}
          >
            Add Shipping Zone
          </Typography>
          <TextField
            id='outlined-basic'
            label='Tax Name'
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl
            style={{
              width: '460px',
              marginLeft: '20px',
              marginRight: '20px',
              marginTop: '20px',
            }}
          >
            <InputLabel id='demo-simple-select-label'>Country</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value={'United States'}>United States</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{
              width: '460px',
              marginLeft: '20px',
              marginRight: '20px',
              marginTop: '20px',
            }}
          >
            <InputLabel id='demo-multiple-checkbox-label'>State</InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={personName}
              onChange={handleChange1}
              input={<OutlinedInput label='Tag' />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name, index) => (
                <MenuItem key={index} value={name.name}>
                  <Checkbox checked={personName.indexOf(name.name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Tax Rate
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
            />
          </FormControl>
          <div
            style={{ color: '#6B7280', marginLeft: '13px', marginTop: '20px' }}
          >
            <Checkbox
              {...label}
              checked={taxOnShipping}
              onChange={() => setTaxOnShipping(!taxOnShipping)}
            />
            Tax on Shipping
          </div>
          <Container sx={{ marginTop: 10, marginLeft: -2 }}>
            <Grid container style={{ justifyContent: 'flex-end' }} xs={12}>
              <Grid item xs={6} lg={6} md={6}>
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
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </Container>
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
              marginLeft: '20px',
              paddingTop: '15px',
            }}
          >
            Update Tax Rule
          </Typography>
          <TextField
            id='outlined-basic'
            label='Tax Name'
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <FormControl
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
          >
            <InputLabel id='demo-simple-select-label'>Country</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value={'United States'}>United States</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
          >
            <InputLabel id='demo-multiple-checkbox-label'>State</InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={personName1}
              onChange={handleChange2}
              input={<OutlinedInput label='Tag' />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name, index) => (
                <MenuItem key={index} value={name.name}>
                  <Checkbox checked={personName1.indexOf(name.name) > -1} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Tax Rate
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
              value={updateTaxPercentage}
              onChange={(e) => setUpdateTaxPercentage(e.target.value)}
            />
          </FormControl>
          <div
            style={{ color: '#6B7280', marginLeft: '13px', marginTop: '20px' }}
          >
            <Checkbox
              {...label}
              checked={updateTaxOnShipping}
              onChange={() => setUpdateTaxOnShipping(!updateTaxOnShipping)}
            />
            Tax on Shipping
          </div>
          <Container sx={{ marginTop: 10, marginLeft: -2 }}>
            <Grid container style={{ justifyContent: 'flex-end' }} xs={12}>
              <Grid item xs={6} lg={6} md={6}>
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
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </Container>
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
              marginLeft: '20px',
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
export default ShippingTitleRow

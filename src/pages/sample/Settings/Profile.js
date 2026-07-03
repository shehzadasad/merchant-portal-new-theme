import { Avatar } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { updateMerchantProfile } from 'redux/reducers/Users'
import SharedFormInput from 'shared/components/SharedFormInput'
import './ProfileCSS.css'

const buttonn = {
  width: '137px',
  height: '36px',
  borderRadius: '8px',
  marginLeft: '10px',
  marginTop: '50px',
  backgroundColor: '#ED2079',
  color: '#fff',
}

function Profile() {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [number, setIntlNumber] = useState('')
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
  const [countryCode, setCountryCode] = useState('092')

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    toast.error('You have entered an invalid email address!')
    return false
  }

  const handleFormSubmit = () => {
    const isEmailValidated = validateEmail(email)

    if (isEmailValidated === false) {
      return
    }

    if (isPhoneNumberValid === false) {
      toast.error('Invalid number')
      return
    }

    const data = {
      merchant_user_id: userDetail.id,
      full_name: fullName,
      phone: number.length > 0 ? number : phone,
    }

    dispatch(updateMerchantProfile(data))
  }

  const getUserAvatar = () => {
    if (userDetail.name) {
      return userDetail.name.charAt(0).toUpperCase()
    }
    if (userDetail.email) {
      return userDetail.email.charAt(0).toUpperCase()
    }
  }

  useEffect(() => {
    if (userDetail) {
      setFullName(userDetail.name)
      setEmail(userDetail.email)
      setPhone(userDetail.phoneNumber)
    }
  }, [userDetail])

  return (
    <Card
      sx={{
        height: '500px',
      }}
      className='update-profile'
    >
      <CardContent>
        <p style={{ fontWeight: '500', fontSize: '16px' }}>Profile</p>
        <div
          style={{
            display: 'flex',
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <Avatar
              sx={{
                height: 50,
                width: 50,
                fontSize: 24,
                backgroundColor: '#6B7280',
              }}
            >
              {getUserAvatar()}
            </Avatar>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <p style={{ marginTop: '10px' }}>{userDetail.name}</p>
            <p>{userDetail.email}</p>
          </div>
        </div>
        <ToastContainer />
        <SharedFormInput
          style={{ marginBottom: 0 }}
          id='outlined-required'
          label='Full Name'
          type='text'
          placeholder='John Alex'
          value={fullName}
          onInputChange={(e) => setFullName(e)}
        />

        <TextField
          style={{
            marginBottom: 0,
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
          }}
          id='outlined-required'
          label='Email Address'
          placeholder='test@gmail.com'
          value={email}
          onChange={(e) => setEmail()}
          disabled={true}
        />

        <IntlTelInput
          containerClassName='intl-tel-input'
          inputClassName='MuiOutlinedInput-input MuiInputBase-input css-1rpt010-MuiInputBase-input-MuiOutlinedInput-input intl-tel-input-field'
          fieldId='outlined-basic'
          id='outlined-basic'
          name='phone'
          autoFocus={true}
          // defaultValue={phone}
          autoPlaceholder
          required='required'
          format={true}
          defaultCountry={countryCode}
          preferredCountries={['pk', 'us']}
          value={phone ?? '+92 1234567'}
          formatOnInit={true}
          onSelectFlag={() => {
            setIntlNumber('')
          }}
          onPhoneNumberChange={(isValid, value, intlNumber, fullNumber) => {
            setIsPhoneNumberValid(isValid)
            setIntlNumber(fullNumber.replace(' ', '').replace(' ', ''))
            setPhone(value)
          }}
          onPhoneNumberBlur={(isValid) => {
            setIsPhoneNumberValid(isValid)
          }}
        />

        <Button style={buttonn} onClick={handleFormSubmit}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}
export default Profile

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react'
import './CustomCSS.css'
const buttonn = {
  width: '90%',
  height: '40px',
  borderRadius: '4px',
  color: '#000',
  fontFamily: 'Poppins',
  fontWeight: 400,
  justifyContent: 'left',
}
const divv = {
  fontSize: '1rem',
  fontFamily: 'Poppins',
  letterSpacing: '0.00938em',
}
function Settings() {
  const [isProfile, setIsProfile] = useState(true)
  const [isPayment, setIsPayment] = useState(false)
  const [isPassword, setIsPassword] = useState(false)

  return (
    <Card
      sx={{
        height: '180px',
      }}
    >
      <CardContent>
        <a
          className='settings-href'
          href='#profile'
          onClick={() => {
            setIsProfile(true)
            setIsPayment(false)
            setIsPassword(false)
          }}
        >
          <div style={divv} color='text.secondary' gutterBottom>
            <Button
              style={
                isProfile === true
                  ? {
                      width: '99%',
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: '#FDEFF5',
                      color: '#E72E80',
                      fontWeight: 400,
                      justifyContent: 'left',
                    }
                  : buttonn
              }
            >
              Profile
            </Button>
          </div>
        </a>
        <div style={divv} color='text.secondary' gutterBottom></div>
        <a
          className='settings-href'
          href='#payment'
          onClick={() => {
            setIsProfile(false)
            setIsPayment(true)
            setIsPassword(false)
          }}
        >
          <Button
            style={
              isPayment === true
                ? {
                    width: '99%',
                    height: '40px',
                    borderRadius: '4px',
                    backgroundColor: '#FDEFF5',
                    color: '#E72E80',
                    fontWeight: 400,
                    justifyContent: 'left',
                  }
                : buttonn
            }
          >
            Payment Method
          </Button>
        </a>
        <a
          className='settings-href'
          href='#password'
          onClick={() => {
            setIsProfile(false)
            setIsPayment(false)
            setIsPassword(true)
          }}
        >
          <div style={divv} color='text.secondary' gutterBottom>
            <Button
              style={
                isPassword === true
                  ? {
                      width: '99%',
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: '#FDEFF5',
                      color: '#E72E80',
                      fontWeight: 400,
                      justifyContent: 'left',
                    }
                  : buttonn
              }
            >
              Change Password
            </Button>
          </div>
        </a>
      </CardContent>
      <div style={{ width: '100%', textAlign: 'center' }}></div>
    </Card>
  )
}
export default Settings

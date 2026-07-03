import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getTimer, updateTimerConfiguration } from 'redux/reducers/Users'
import SharedFormInput from 'shared/components/SharedFormInput'
import AppLoader from '@crema/core/AppLoader'

const buttonn = {
  width: '137px',
  height: '36px',
  borderRadius: '8px',
  marginLeft: '10px',
  marginTop: '50px',
  backgroundColor: '#ED2079',
  color: '#fff',
  textTransform: 'capitalize',
  marginBottom: 10,
}
const buttonnDisable = {
  width: '137px',
  height: '36px',
  borderRadius: '8px',
  marginLeft: '10px',
  marginTop: '50px',
  backgroundColor: '#979797',
  color: '#fff',
  textTransform: 'capitalize',
  marginBottom: 10,
  cursor: 'not-allowed',
}

const textfeilds = {
  width: '95%',
  height: '58px',
  borderRadius: '8px',
  marginLeft: '10px',
  marginTop: '25px',
}

let theme = createTheme({
  palette: {
    primary: {
      main: '#ED2079',
    },
    secondary: {
      main: '#ED2079',
    },
  },
})

function ApiKey() {
  const [radiobutton, setRadiobutton] = useState(false)
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })
  const timer = useSelector((state) => state.users.timer)
  const [script, setScript] = useState('')
  const [mallUrl, setMallUrl] = useState('')
  const [haveScript, setHaveScript] = useState(false)
  const [scriptID, setScriptID] = useState()
  const [isMall, setIsMall] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  //   function TimerConfiguration() {
  const dispatch = useDispatch()
  const userID = jwt_decode(localStorage.getItem('token')).user_id

  const handleFormSubmit = () => {
    const data = {
      has_order_timer: radiobutton,
      merchant_user_id: parseInt(userID),
    }

    dispatch(updateTimerConfiguration(data))
  }

  const fetchScript = () => {
    var axios = require('axios')

    var config = {
      method: 'get',
      url: `${
        process.env.REACT_APP_API_URL
      }merchant/scripts/list?merchant_user_id=${parseInt(userID)}`,

      headers: {},
    }

    axios(config)
      .then(function (response) {
        const data = response.data

        const scripts = response.data.merchant_scripts
        setScript(response.data.merchant_scripts[0]?.url)

        if (Array.isArray(scripts)) {
          scripts.map(({ url, id }) => {
            const last12Letters = url.slice(url.length - 16)
            if (response.data.merchant_scripts[0]?.url.includes('Facebook')) {
              // setScript(url)
              setHaveScript(true)
              setScriptID(id)
              return
            }
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleScriptSubmit = () => {
    const axios = require('axios')

    if (haveScript === false) {
      const data = {
        merchant_user_id: parseInt(userID),
        url: script,
      }

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}merchant/scripts/add`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          if (response.data.success === true) {
            toast.success('Script Added Successfully!')
          } else {
            // toast.error('Invalid script')
            console.log('Invalid response: ')
          }
        })
        .catch(function (error) {
          toast.error('Invalid Script!')
          console.log(error)
        })
    } else {
      const data = {
        id: scriptID ?? 1,
        merchant_user_id: parseInt(userID),
        url: script,
      }

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}merchant/scripts/update`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then(function (response) {
          if (response.data.success === true) {
            toast.success('Script Updated Successfully!')
          } else {
            console.log('Invalid Script')
          }
        })
        .catch(function (error) {
          toast.error('Invalid Script!')

          console.log(error)
        })
    }
  }
  // Authorization: `Bearer ${localStorage.getItem('token')}`
  const getMallUrl = () => {
    const axios = require('axios')

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}merchant/mall/url`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false)
        setMallUrl(JSON.stringify(response.data.data).replace(/["']/g, ''))
        setIsMall(response.data.result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchScript()
    dispatch(getTimer(userID))
    getMallUrl()
  }, [])

  useEffect(() => {
    setRadiobutton(timer)
  }, [timer])

  return isLoading ? (
    <AppLoader />
  ) : (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          height: '250px',
          borderRadius: 5,
        }}
      >
        <CardContent>
          <p style={{ fontWeight: '500', fontSize: '16px' }}>
            Do you want to add 5 minutes timer in your Checkout?
          </p>
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant='outlined'
            style={textfeilds}
          >
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              defaultValue={radiobutton}
              onChange={(e) => {
                setRadiobutton(e.target.value == 'true' ? true : false)
              }}
              value={radiobutton}
            >
              <FormControlLabel value={true} control={<Radio />} label='Yes' />
              <FormControlLabel value={false} control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>

          <Button style={buttonn} onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card
        sx={{
          height: '250px',
          borderRadius: 5,
          marginTop: 5,
        }}
      >
        <CardContent>
          <p style={{ fontWeight: '500', fontSize: '16px', marginBottom: 30 }}>
            Facebook Script
          </p>
          <SharedFormInput
            placeholder='Facebook Script'
            style={{ marginBottom: 0 }}
            onInputChange={(e) => {
              setScript(e)
            }}
            value={script}
          />
          {script === undefined || script === null || script === '' ? (
            <Button style={buttonnDisable}>Save</Button>
          ) : (
            <Button style={buttonn} onClick={handleScriptSubmit}>
              Save
            </Button>
          )}
        </CardContent>
      </Card>
      {isMall && (
        <Card
          sx={{
            height: '175px',
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <CardContent>
            <p
              style={{ fontWeight: '500', fontSize: '16px', marginBottom: 30 }}
            >
              Mall URL
            </p>
            <SharedFormInput
              placeholder='Mall URL'
              style={{ marginBottom: 0 }}
              disabled={true}
              // onInputChange={(e) => {
              //   setMallUrl(e)
              // }}
              value={mallUrl}
            />
          </CardContent>
        </Card>
      )}
    </ThemeProvider>
  )
}
export default ApiKey
// background: '#979797'

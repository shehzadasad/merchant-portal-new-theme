import React, { useState, useRef } from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'
import SharedButton from 'shared/components/SharedButton'
import { Close } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
import Select from 'react-select'

const ConnectIntegrationModal = ({
  open,
  handleClose,
  userDetail,
  data,
  getThirdPartyList,
}) => {
  const textInput = React.useRef(null)
  const [DropDownValue, setDropDownValue] = useState({
    value: 'Choose Type',
    label: 'Choose Type',
  })
  const [credentials, setCredentials] = useState({
    [data.required_credentials?.options.default ??
    Object.keys(data.required_credentials?.options)[0]]: '',
  })

  const handleCredentials = (type, key) => {
    setCredentials({
      type: type,
      [key]: '',
    })
  }

  const ConnectThirdPartyItem = () => {
    toast.info('Connecting...')
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      app_id: data.id,
      merchant_user_id: userDetail.id,
      credentials: credentials,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(
      process.env.REACT_APP_API_URL + 'merchant/third-party/add',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          getThirdPartyList()
          toast.success('App successdully added!')
          handleClose()
        } else if (result.success === false) {
          toast.error(result.message)
        }
      })
      .catch((error) => {
        toast.error('Error! Please try again.')
      })
  }

  const getOptions = (optionsData) => {
    let array = []
    optionsData.map((opt) => array.push({ value: opt, label: opt }))

    return array
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: window.innerWidth < 600 ? '90vw' : 500,
          background: '#fff',
          border: 'none',
          boxShadow: 24,
          p: 4,
          borderRadius: '16px',
          padding: 20,
        }}
      >
        <Box
          display={'flex'}
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography
            id='modal-modal-title'
            variant='p'
            component='p'
            fontSize={20}
            fontWeight={'bold'}
          >
            Connect Integration
          </Typography>
          <IconButton onClick={handleClose}>
            {' '}
            <Close />
          </IconButton>
        </Box>

        {/*With Type*/}
        {data?.required_credentials.type?.length > 0 && (
          <Box mt={'15px'} display='flex' alignItems={'center'}>
            <Typography variant='p' component='p' fontSize={14} marginRight={2}>
              Type:
            </Typography>
            <Select
              options={getOptions(data?.required_credentials?.type)}
              value={DropDownValue}
              onChange={(e) => {
                setDropDownValue(e)
                handleCredentials(
                  e.label,
                  data.required_credentials?.options[e.label]
                )
                if (DropDownValue.value !== 'Choose Type')
                  textInput.current.value = ''
              }}
            />
          </Box>
        )}

        {data?.required_credentials.type?.length > 0 &&
          DropDownValue.label !== 'Choose Type' && (
            <Box mt={'15px'}>
              <TextField
                fullWidth
                label={data?.required_credentials?.options[DropDownValue.label]
                  ?.toUpperCase()
                  ?.replaceAll('_', ' ')}
                id='title'
                name='title'
                variant='outlined'
                placeholder='key'
                inputRef={textInput}
                onChange={(e) => {
                  let array = credentials
                  array[
                    data?.required_credentials?.options[DropDownValue.label]
                  ] = e.target.value

                  setCredentials(array)
                }}
              />
            </Box>
          )}

        {/*With OUT Type*/}
        {!data?.required_credentials.type && (
          <Box mt={'15px'}>
            <TextField
              fullWidth
              label={data?.required_credentials?.options.default
                ?.toUpperCase()
                ?.replaceAll('_', ' ')}
              id='title'
              name='title'
              variant='outlined'
              placeholder='key'
              onChange={(e) => {
                let array = credentials
                array[data?.required_credentials?.options.default] =
                  e.target.value
                setCredentials(array)
              }}
            />
          </Box>
        )}

        <Box
          width='460px'
          height='130px'
          borderRadius='10px'
          marginTop={'20px'}
          padding='20px'
          style={{ background: '#F3F3F3' }}
        >
          <Typography>What this app can acccess in your store</Typography>
          <ul style={{ marginLeft: '15px' }}>
            <li>Orders</li>
            <li>Products</li>
            <li>Customers</li>
          </ul>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <SharedButton
            text='Cancel'
            style={{
              color: '#e93a7d',
              borderRadius: '8px',
              background: '#fff',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: '100px',
              border: '1px solid #e93a7d',
              height: '36px',
              cursor: 'pointer',
              marginRight: 17,
              marginTop: 20,
            }}
            onClick={handleClose}
          />

          <Button
            text='Add'
            variant='outlined'
            style={{
              background: '#e93a7d',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: '100px',
              border: 'none',
              height: '36px',
              cursor: 'pointer',
              marginTop: 20,
              // opacity: Object.keys(data.required_credentials?.options)[0]
              //   ? '0.6'
              //   : '1',
            }}
            // disabled={
            //   credentials[Object.keys(credentials)[0]] === '' ? true : false
            // }
            onClick={() => ConnectThirdPartyItem()}
          >
            Connect
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConnectIntegrationModal

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Switch,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import SharedButton from 'shared/components/SharedButton'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import SharedFormInput from 'shared/components/SharedFormInput'
import EditIcon from '@mui/icons-material/Edit'

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

const StackBuilderView = ({
  data,
  index,
  deleteStack,
  fetchStacks,
  EditStack,
  StackData,
  setStackData,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35vw',
    bgcolor: 'background.paper',
    borderRadius: '2px',
    boxShadow: 24,
    p: 6,
  }

  const userDetail = useSelector((state) => state.users.userDetail)
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName='.Mui-focusVisible'
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 35,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor:
            theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 15,
      height: 16,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }))
  return (
    <>
      <Paper
        style={{
          marginBottom: '20px',
          marginLeft: '10px',
          padding: '15px',
          textAlign: 'left',
          width: '300px',
          minWidth: '300px',
          wrap: '1 0 25%',
        }}
      >
        <span style={{ fontWeight: 'bold', float: 'left' }}>{data.name}</span>
        <span
          style={{
            fontWeight: 'bold',
            float: 'right',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IOSSwitch
            sx={{ m: 1, marginTop: '0px', margin: '0px' }}
            checked={data.isEnabled}
            onChange={() => {
              toast.info('Changing Stack...')

              const axios = require('axios')

              const config = {
                method: 'PUT',
                url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/toggle/stack/${data.id}?merchantId=${userDetail.merchantId}`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }

              axios(config)
                .then(function (response) {
                  if (response.status === 200) {
                    fetchStacks()
                    toast.success('Stack Changed Successfully!')
                  }
                })
                .catch(function (error) {
                  console.log(error)
                  toast.error('Error!')
                })
            }}
          />
          <EditIcon
            style={{
              height: '15pt',
              cursor: 'pointer',
              marginLeft: '8px',
            }}
            onClick={() => {
              setStackData({
                id: data.id,
                name: data.name,
                userId: data.userId,
                isEnabled: data.isEnabled,
                stackViewDtoList: data.stackViewDtoList,
              })
              handleOpen()
            }}
          />
          <CloseIcon
            style={{
              height: '15pt',
              cursor: `${data.isEnabled === true ? 'no-drop' : 'pointer'}`,
              opacity: `${data.isEnabled === true ? '0.6' : '1'}`,
            }}
            onClick={() =>
              data.isEnabled === true ? null : deleteStack(data.id)
            }
          />
        </span>
        <br />
        <div
          style={{
            marginTop: 10,
          }}
        >
          {data.stackViewDtoList.map((view, index) => (
            <Link to={`/add-view/${data.id}`}>
              <Box
                key={view}
                style={{
                  border: '0.5px solid #000000',
                  borderRadius: '5px',
                  padding: 10,
                  marginBottom: '4pt',
                }}
              >
                <Typography variant='p' component='p'>
                  {view.name}
                </Typography>
              </Box>
            </Link>
          ))}
          <br />
          <Link
            to={`${
              data.stackViewDtoList.length < 3 ? `/add-view/${data.id}` : ''
            }`}
          >
            <Button
              style={{
                textTransform: 'capitalize',
                color: '#E71583',
                fontWeight: 'bold',
                cursor: `${
                  data.stackViewDtoList.length < 3 ? 'pointer' : 'not-allowed'
                }`,
                opacity: `${data.stackViewDtoList.length < 3 ? '1' : '0.6'}`,
              }}
            >
              <AddCircleOutlineIcon
                style={{
                  fontSize: '20px',
                  marginLeft: 35,
                  marginRight: '5px',
                }}
              />{' '}
              Create Checkout View{' '}
            </Button>
          </Link>
          {/* <Typography>Comming soon</Typography> */}
          {/* <br />
          <br />
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id='demo-multiple-chip-label'>{'Select'}</InputLabel>
            <Select
              labelId='demo-multiple-chip-label'
              id='demo-multiple-chip'
              multiple={false}
              input={
                <OutlinedInput id='select-multiple-chip' label={'Select'} />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <Chip label={selected} style={{ borderRadius: 5 }} />
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {['Buy Now Pay Later', 'Payment Gateways', 'Fraud Engines'].map(
                (name, index) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <br />
          <br /> */}

          {/* <FormControl sx={{ width: '100%' }}>
            <InputLabel id='demo-multiple-chip-label'>{'Select'}</InputLabel>
            <Select
              labelId='demo-multiple-chip-label'
              id='demo-multiple-chip'
              multiple={false}
              input={
                <OutlinedInput id='select-multiple-chip' label={'Select'} />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <Chip label={selected} style={{ borderRadius: 5 }} />
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {[
                'Impressions',
                'Approval Rate',
                'Click-through Rate',
                'Impressions',
                'Conversion Rate',
                'AOV',
              ].map((name, index) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th>
                  <Typography
                    variant='p'
                    component='p'
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: 20,
                    }}
                  >
                    Approved (%)
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant='p'
                    component='p'
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: 20,
                    }}
                  >
                    Declined (%)
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >
                  0
                </td>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >
                  0
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >
                  0
                </td>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >
                  0
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >
                  0
                </td>
                <td
                  style={{
                    textAlign: 'center',
                  }}
                >
                  0
                </td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </Paper>

      {/*Edit Stack Modal*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <SharedFormInput
            label='Stack Name'
            onInputChange={(e) => {
              setStackData((prevData) => ({ ...prevData, name: e }))
            }}
            value={StackData.name}
            style={{
              marginBottom: 0,
              height: 250,
            }}
            multiline={true}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10pt',
            }}
          >
            <SharedButton
              text='Cancel'
              style={{
                background: '#b0bec5',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '45%',
                border: 'none',
                height: 40,
                cursor: 'pointer',
                marginRight: 10,
              }}
              onClick={handleClose}
            />

            <SharedButton
              text='Edit Stack'
              style={{
                background: '#e93a7d',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '45%',
                border: 'none',
                height: 40,
                cursor: 'pointer',
                marginRight: 10,
              }}
              onClick={() => {
                EditStack()
              }}
            />
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default StackBuilderView

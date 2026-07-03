import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import OutlinedInput from '@mui/material/OutlinedInput'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import {
  addBankAccount,
  addBankAccountPasswordVerify,
  deleteBankAccount,
  deleteBankAccountPasswordVerify,
  fetchBanks,
  getBankingAccounts,
  markBankAccountDefault,
} from 'redux/reducers/Users'
import SharedButton from 'shared/components/SharedButton'
import Dots from '../../../assets/icon/3dots.svg'
import Bank from '../../../assets/icon/bank.svg'
import 'react-toastify/dist/ReactToastify.css'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const style = {
  position: 'absolute',
  width: '500px',
  height: '560px',
  background: '#FFFFFF',
  borderRadius: '16px',
}
function PaymentMethod() {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const userDetail = useSelector((state) => state.users.userDetail)
  const banks = useSelector((state) => state.users.banks)

  const handleChange1 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()

  const handleClick = (newPlacement, accId) => (event) => {
    if (newPlacement === 'bottom-end') {
      setSelectedBankAccountId(accId)
    }
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  const handleOpendeletebankdetails = () => setOpen4(true)
  const handleClosedeletebankdetails = () => setOpen4(false)
  const [open4, setOpen4] = useState(false)

  const handleOpenbankdetails = () => setOpen1(true)
  const handleClosebankdetails = () => setOpen1(false)
  const [open1, setOpen1] = useState(false)

  const handleOpen1 = () => {
    setOpen1(true)
  }

  const handleClose1 = () => setOpen1(false)

  const [open2, setOpen2] = useState(false)

  const handleOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const [bank, setBank] = useState('')

  const handleChange = (event) => {
    setBank(event.target.value)
  }

  const [addPassword, setAddPassword] = useState('')
  const [deletePassword, setDeletePassword] = useState('')
  const [addAccNumber, setAddAccNumber] = useState('')
  const [addBankAccountMarkDefault, setAddBankAccountMarkDefault] =
    useState(false)
  const addBankAccountPasswordVerifyStatus = useSelector(
    (state) => state.users.addBankAccountPasswordVerifyStatus
  )
  const deleteBankAccountPasswordVerifyStatus = useSelector(
    (state) => state.users.deleteBankAccountPasswordVerifyStatus
  )

  const bankAccounts = useSelector((state) => state.users.bankAccounts)
  const [selectedBankAccountId, setSelectedBankAccountId] = useState(null)

  const dispatch = useDispatch()

  const verifyPasswordHelper = () => {
    if (addPassword.length <= 0) {
      alert('Enter password first')
      return
    }

    const userDetail = jwt_decode(localStorage.getItem('token'))
    dispatch(
      addBankAccountPasswordVerify({
        email: userDetail.sub,
        password: addPassword,
      })
    )
  }

  const verifyPasswordDeleteHelper = () => {
    if (deletePassword.length <= 0) {
      alert('Enter password first')
      return
    }

    const userDetail = jwt_decode(localStorage.getItem('token'))
    dispatch(
      deleteBankAccountPasswordVerify({
        email: userDetail.sub,
        password: deletePassword,
      })
    )
  }

  const addBankAccountHelper = () => {
    const userDetail = jwt_decode(localStorage.getItem('token'))

    if (bank === 'Not Available') {
      toast.error(
        'Select a valid bank, or contact us if your bank is not listed here'
      )
      return
    }

    const data = {
      bank_name: bank,
      account_number: addAccNumber,
      is_default: addBankAccountMarkDefault,
    }

    dispatch(addBankAccount(userDetail.user_id, data))
    dispatch(getBankingAccounts(userDetail.user_id))
    dispatch(getBankingAccounts(userDetail.user_id))
    handleClosebankdetails()
  }

  const getBankAccountsHelper = () => {
    const userDetail = jwt_decode(localStorage.getItem('token'))

    dispatch(getBankingAccounts(userDetail.user_id))
  }

  const markBankAccountDefaultHelper = (event) => {
    const userDetail = jwt_decode(localStorage.getItem('token'))

    dispatch(markBankAccountDefault(userDetail.user_id, selectedBankAccountId))
    dispatch(getBankingAccounts(userDetail.user_id))
    dispatch(getBankingAccounts(userDetail.user_id))

    handleClick('bottom-end', selectedBankAccountId)(event)
  }

  const deleteBankAccountHelper = () => {
    const userDetail = jwt_decode(localStorage.getItem('token'))
    handleClosedeletebankdetails()
    getBankAccountsHelper()
    dispatch(deleteBankAccount(userDetail.user_id, selectedBankAccountId))
  }

  const fetchBanksAPI = () => {
    dispatch(fetchBanks(userDetail.countryId ?? 168))
  }

  useEffect(() => {
    if (addBankAccountPasswordVerifyStatus === 'USER_SUCCESSFULLY_ADDED') {
      addBankAccountHelper()
    } else if (addBankAccountPasswordVerifyStatus === 'USER_ADD_ERROR') {
      alert('Password not valid')
    }
  }, [addBankAccountPasswordVerifyStatus])

  useEffect(() => {
    if (deleteBankAccountPasswordVerifyStatus === 'USER_SUCCESSFULLY_DELETED') {
      deleteBankAccountHelper()
    } else if (deleteBankAccountPasswordVerifyStatus === 'USER_DELETE_ERROR') {
      alert('Password not valid')
    }
  }, [deleteBankAccountPasswordVerifyStatus])

  useEffect(() => {
    getBankAccountsHelper()
  }, [])

  useEffect(() => {
    fetchBanksAPI()
  }, [])

  return (
    <>
      <List
        sx={{
          minHeight: '330px',
          marginTop: '25px',
          backgroundColor: '#fff',
          borderRadius: '16px ',
        }}
      >
        <Popper
          style={{ width: '150px', height: '88px' }}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography
                  sx={{ p: 2, fontWeight: '500', cursor: 'pointer' }}
                  onClick={markBankAccountDefaultHelper}
                >
                  Make as Default
                </Typography>
                <Typography
                  onClick={handleOpendeletebankdetails}
                  sx={{ p: 2, fontWeight: '500', cursor: 'pointer' }}
                >
                  Delete
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <ToastContainer />
        <p
          style={{
            fontWeight: '500',
            fontSize: '16px',
            marginLeft: '20px',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          Account Information - Payouts
        </p>
        {Array.isArray(bankAccounts) && bankAccounts.length > 0
          ? bankAccounts.map((account) => (
              <>
                <ListItem
                  style={{ marginTop: '5px', marginBottom: '5px' }}
                  key={account.id}
                >
                  <ListItemAvatar>
                    <img src={Bank} />
                  </ListItemAvatar>
                  <ListItemText primary={account.account_number} />
                  <ListItemAvatar
                    style={{
                      visibility:
                        account.is_default === true ? 'visible' : 'hidden',
                    }}
                  >
                    <button
                      style={{
                        width: '80px',
                        height: '25px',
                        backgroundColor: '#DCDCDC	',
                        borderRadius: '6px',
                        border: 'none',
                      }}
                    >
                      Default
                    </button>
                  </ListItemAvatar>
                  <ListItemAvatar
                    style={{ paddingLeft: '46px', cursor: 'pointer' }}
                    onClick={(e) => handleClick('bottom-end', account.id)(e)}
                  >
                    <img src={Dots} />
                  </ListItemAvatar>
                </ListItem>
                <Divider variant='middle' component='li' />
              </>
            ))
          : ''}
        <ListItem
          style={{
            marginTop: '5px',
            marginBottom: '5px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '24px',
            color: '#ED2079',
            cursor: 'pointer',
          }}
        >
          <a onClick={handleOpenbankdetails}>Add New Bank Account</a>
        </ListItem>
      </List>

      <Modal
        open={open1}
        onClose={handleClosebankdetails}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            Add New Bank Account
          </Typography>

          <FormControl
            style={{
              width: '460px',
              marginLeft: '20px',
              marginTop: '20px',
              marginBottom: '15px',
            }}
          >
            <InputLabel id='demo-simple-select-label'>Select Bank</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={bank}
              label='Select Bank'
              onChange={handleChange}
              MenuProps={{ PaperProps: { sx: { maxHeight: '25vh' } } }}
            >
              {banks.map((bank, index) => (
                <MenuItem key={index} value={bank.name}>
                  {bank.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id='outlined-basic'
            label='Account Number/IBAN'
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
            value={addAccNumber}
            onChange={(e) => setAddAccNumber(e.target.value)}
          />

          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '24px',
              marginLeft: '20px',
              marginTop: '40px',
            }}
          >
            Please enter your merchant portal password below
          </Typography>

          <FormControl
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              value={addPassword}
              onChange={(e) => setAddPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>

          <Typography
            style={{ color: '#6B7280', marginLeft: '13px', marginTop: '20px' }}
          >
            <Checkbox
              style={{ color: '#ED2079' }}
              {...label}
              onChange={() =>
                setAddBankAccountMarkDefault(!addBankAccountMarkDefault)
              }
              checked={addBankAccountMarkDefault}
            />
            Make this bank account as default payout account
          </Typography>

          <Grid
            container
            style={{
              justifyContent: 'flex-end',
              marginTop: '60px',
            }}
            xs={12}
          >
            <Grid item xs={4}>
              <SharedButton
                text='Cancel'
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
                  width: ' 100px',
                  height: '36px',
                }}
                onClick={handleClosebankdetails}
              />
            </Grid>
            <Grid item xs={4}>
              <SharedButton
                text='Add Account'
                style={{
                  background: '#e93a7d',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: '130px',
                  border: 'none',
                  height: '36px',
                  cursor: 'pointer',
                }}
                onClick={verifyPasswordHelper}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={open4}
        onClose={handleClosebankdetails}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            width: '500px',
            height: '310px',
            background: '#FFFFFF',
            borderRadius: '16px',
          }}
        >
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
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            Delete Bank Account
          </Typography>

          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '24px',
              marginLeft: '20px',
              marginTop: '40px',
            }}
          >
            Please enter your password to delete this account.
          </Typography>

          <FormControl
            style={{ width: '460px', marginLeft: '20px', marginTop: '20px' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>

          <Grid
            container
            style={{
              justifyContent: 'flex-end',
              marginTop: '60px',
            }}
            xs={12}
          >
            <Grid item xs={4}>
              <SharedButton
                text='Cancel'
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
                  width: ' 100px',
                  height: '36px',
                }}
                onClick={handleClosedeletebankdetails}
              />
            </Grid>
            <Grid item xs={4}>
              <SharedButton
                text='Delete'
                style={{
                  background: '#e93a7d',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: '130px',
                  border: 'none',
                  height: '36px',
                  cursor: 'pointer',
                }}
                onClick={verifyPasswordDeleteHelper}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
export default PaymentMethod

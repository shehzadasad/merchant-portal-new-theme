import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ConnectIcon from '@mui/icons-material/Cable'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import { Alert, Slide, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import { alpha, styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import QPLogo from 'assets/icon/qpsquarelogo.png'
import AdyenLogo from 'assets/img/adyen.svg'
import AffirmIcon from 'assets/img/affirm.png'
import ApplePayLogo from 'assets/img/apple.svg'
import BitpayLogo from 'assets/img/bitpay.svg'
import CashIcon from 'assets/img/cashicon.png'
import CheckoutIcon from 'assets/img/checkout.png'
import CrossIcon from 'assets/img/cross.svg'
import DropIcon from 'assets/img/dropicon.svg'
import EasypaisaIcon from 'assets/img/easypaisa.jpeg'
import GooglePayIcon from 'assets/img/google.svg'
import GPayIcon from 'assets/img/gpayicon.svg'
import KlarnaIcon from 'assets/img/klarna.png'
import MasterCardLogo from 'assets/img/master.svg'
import OneClickLogo from 'assets/img/oneClickLogo.svg'
import PaypalIcon from 'assets/img/paypal.svg'
import SplitIcon from 'assets/img/splitit.svg'
import StripeIcon from 'assets/img/stripe.svg'
import VisaLogo from 'assets/img/visa.svg'
import ZipLogo from 'assets/img/zip.svg'
import JazzCash from 'assets/img/JazzCash.png'
import alfa from 'assets/img/alfa.png'
import alfasvg from 'assets/icon/alfa.svg'
import payfast from 'assets/img/payfast-icon.png'
import ubl from 'assets/img/ubl2.png'
import bankalfalah from 'assets/img/bankalfalah2.png'
import vault from 'assets/icon/vault.svg'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AfterpayIcon from 'assets/payment-method-icons/afterpay.svg'
import AuthorizeIcon from 'assets/payment-method-icons/authorize.svg'
import BigCommerceIcon from 'assets/payment-method-icons/bigcommerce.svg'
import BraintreeIcon from 'assets/payment-method-icons/braintree.svg'
import Clover from 'assets/payment-method-icons/clover.svg'
import Foree from 'assets/payment-method-icons/foree.svg'
import NAB from 'assets/payment-method-icons/nab.svg'
import PinWheel from 'assets/payment-method-icons/pinwheel.svg'
import Square from 'assets/payment-method-icons/square.svg'
import SezzleIcon from 'assets/payment-method-icons/sezzle.svg'
import CardPointeIcon from 'assets/payment-method-icons/cardpointe.svg'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUserDetail } from 'redux/reducers/Users'
import './builder.css'
import styles from './builder.module.css'
import { useParams } from 'react-router-dom'
import { AppLoader } from '@crema'
import SharedButton from 'shared/components/SharedButton'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: 'none',
  color: theme.palette.text.secondary,
}))

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
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
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
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
const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png',
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png',
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png',
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png',
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png',
  },
]
const options = ['Disconnect']

const ITEM_HEIGHT = 48

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))
function Transition(props) {
  return <Slide {...props} direction='down' />
}

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

function Builder() {
  const forceUpdate = useForceUpdate()
  const TOKEN = localStorage.getItem('token')
  const { id } = useParams()
  const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}ms-merchant-portal`
  const [characters, updateCharacters] = useState(finalSpaceCharacters)
  const [activeViews, setActiveViews] = useState(0)
  const [showViews, setShowViews] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [totalViews, setTotalViews] = useState(0)
  const [gatewayModalOpen, setGatewayModalOpen] = React.useState(false)
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false)
  const [credentialsModal, setCredentialsModal] = useState(false)
  const [gatewaysData, setGateWaysData] = useState([])
  const [paymentMethodsData, setPaymentMethodsData] = useState([])
  const [credentialFields, setCredentialFields] = useState([])
  const [currentGateway, setCurrentgateway] = useState(null)
  const [currentMethods, setCurrentMethod] = useState([])
  const [fieldValues, setFieldValues] = useState([{}])
  const [selectedMethod, setSelectedMethod] = useState({ name: '' })

  const [merchantPackagesData, setMerchantPackagesData] = useState([])
  const [abTestID, setAbTestID] = useState('')
  const [credentialsScreenHTML, setCredentialScreenHTML] = useState('')
  const [openNotification, setOpenNotification] = React.useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [apiViewsData, setApiViewsData] = useState([])
  const [activeViewsArr, setActiveViewsArr] = useState([])
  const [fieldLabels, setFieldLabels] = useState([])
  const userDetail = useSelector((state) => state.users.userDetail)
  const [viewPercentages, setViewPercentages] = useState([])
  const dispatch = useDispatch()

  const handleClickNotification = () => {
    setOpenNotification(true)
  }

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenNotification(false)
  }

  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleCloseNotification}>
        Close
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleCloseNotification}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  )

  useEffect(() => {
    dispatch(fetchUserDetail())
  }, [])

  useEffect(() => {
    fetchGateways()
    getMerchantPaymentMethods()
  }, [userDetail])

  function updateViewPercentage(index, value) {
    viewPercentages[index] = value
  }

  function deletePackage(view, merchantPackage) {
    const payload = {
      viewId: view,
      merchantPackageId: merchantPackage.merchant_package_id,
    }
    axios
      .post(REACT_APP_API_URL + '/views/merchant-packages/delete', payload)
      .then((response) => {
        setNotificationMessage('Payment Method Removed')
        setOpenNotification(true)
        getViews()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function deleteView(id) {
    toast.info('Deleting View...')

    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/delete/view/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('View Successfully Deleted!')
          getViews()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    if (userDetail && userDetail.merchantId) {
      getViews()
    }
  }, [userDetail])

  const getMerchantPackageData = (data) => {
    let array = []
    for (let i = 0; i < data?.length; i++) {
      array.push({
        id: data[i].id,
        merchantPackageId: data[i].merchantPackage.id,
        viewId: data[i].viewId,
        sortOrderNumber: data[i].sortOrderNumber,
      })
    }
    return array
  }

  const [DataObject, setDataObject] = useState([])
  function getViews() {
    setShowViews(false)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/getAll/views/${userDetail.merchantId}?stackId=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (resp) {
        if (resp.status === 200) {
          let dataArray = []
          resp.data.body.map((item) => {
            return dataArray.push({
              merchantPackageViewList:
                item.merchantPackageViewList[0] !== null
                  ? getMerchantPackageData(item.merchantPackageViewList)
                  : [],
              name: item.view.name,
              percentage: item.view.percentage,
              stackId: parseFloat(id),
              userId: item.view.userId,
              viewId: item.view.id,
            })
          })

          setDataObject(dataArray)

          let checks = []
          resp.data.body.map((item) => {
            return checks.push({
              id: item.view.id,
              isEnabled: item.view.isEnabled,
            })
          })
        }

        setTotalViews(resp.data.body.length)
        let arr = []
        resp.data.body.map((a, index) => {
          arr.push(a.view.id)
          setViewPercentages([...viewPercentages, a.view.percentage * 100])
        })

        let temp = methodsInView[0]
        let temparr = []
        // let uniq = [
        //   ...new Set(
        //     resp.data.body.map((a) => [
        //       ...new Set(
        //         a.merchantPackageViewList.map(
        //           (q) => q.merchantPackage.apackage.name
        //         )
        //       ),
        //     ])
        //   ),
        // ]

        resp.data.body.map((view, index) => {
          view.merchantPackageViewList.map((pk, ind) => {
            if (pk) {
              if (pk.id) {
                temparr.push({
                  id: pk.id,
                  merchantId: pk.merchantId,
                  packageGatewayPercentageList: pk.packageGatewayPercentage,
                  paymentMethodName: pk.merchantPackage.apackage.name,
                })
              }
            }
          })

          let newArray = []
          let uniq = [...new Set(temparr.map((q) => q.paymentMethodName))]
          uniq.map((item, index) => {
            newArray.push({
              id: null,
              merchantId: null,
              packageGatewayPercentageList: [],
              paymentMethodName: item,
            })

            temparr.map((it, idx) => {
              newArray[index].id = temparr[index].id
              newArray[index].merchantId = temparr[index].merchantId
              if (it.paymentMethodName === item)
                newArray[index].packageGatewayPercentageList.push(
                  it.packageGatewayPercentageList
                )
            })
          })

          temp[index] = newArray

          temparr = []
        })

        setMethodsInView([...methodsInView, temp])

        setActiveViews(resp.data.body)
        setApiViewsData(resp.data.body)
        setActiveViewsArr(arr)
        setShowViews(true)
      })
      .catch(function (error) {
        console.error(error.message)
      })
  }

  function createView() {
    toast.info('Adding View...')
    const tempObject = [
      {
        viewId: null,
        stackId: id,
        name: `View`,
        percentage: 0,
        userId: userDetail.id,
        merchantPackageViewList: [],
      },
    ]

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/add/view`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      data: tempObject,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Checkout View Created')
          setTotalViews(parseFloat(totalViews) + 1)
          setActiveViews([
            ...activeViews,
            {
              view: {
                id: null,
              },
              merchantPackageViewList: [],
            },
          ])
          setApiViewsData([...activeViews, response.data.body[0]])
          setActiveViewsArr([...activeViewsArr, activeViewsArr.length])
          setViewPercentages([...viewPercentages, viewPercentages.length + 1])
          getViews()
        }
      })
      .catch(function (error) {
        toast.error('Error')
      })

    setShowViews(true)
  }

  const SaveViewData = () => {
    if (ViewPercentageCheck() < 100) {
      toast.error('Views percentage should be 100%')
    } else if (ViewPercentageCheck() > 100) {
      toast.error('Views percentage exceeded 100%')
    } else if (ViewPercentageCheck() === 100) {
      toast.info('Saving!')

      try {
        var myHeaders = new Headers()
        myHeaders.append(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        )
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify(DataObject)

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          timeout: 5000,
          redirect: 'follow',
        }

        fetch(
          `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/add/view`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result?.body?.length > 0) {
              toast.success('Saved successfully!')
              getViews()
            }
          })
          .catch((error) => console.log('error', error))
      } catch (e) {
        console.error(e)
      }
    }
  }

  const ViewPercentageCheck = () => {
    let no = 0
    DataObject.map((items) => {
      no = no + items.percentage
    })

    return no
  }

  const deletePaymentMethod = (data) => {}

  function uniqByKeepFirst(a, key) {
    let seen = new Set()
    return a.filter((item) => {
      let k = key(item)
      return seen.has(k) ? false : seen.add(k)
    })
  }

  function onDrop(ev, cat, viewIndex, newViewIndex) {
    try {
      let duplicate = false

      ev.dataTransfer.setDragImage(new Image(), 0, 0)
      let item = ev.dataTransfer.getData('item')
      let finalItem = PaymentMethodData.filter((method, index) => {
        if (
          method.paymentMethodName === JSON.parse(item)[0].paymentMethodName
        ) {
          // if (methodsInView[0][viewIndex]) {

          //   if (methodsInView[0][viewIndex].includes(method)) {

          //     return
          //   }
          // }

          return method
        }
      })

      methodsInView[0][viewIndex].map((tempElement) => {
        if (tempElement.paymentMethodName === finalItem[0].paymentMethodName) {
          duplicate = true
        }
      })

      if (duplicate === true) {
        setNotificationMessage('Duplicate not allowed')
        toast.warning('Duplicate not allowed!')
        return
      }

      if (finalItem.length != 0) {
        if (methodsInView[0][viewIndex]) {
          let tempObj = []

          tempObj = methodsInView[0][viewIndex]

          tempObj.push(finalItem[0])

          setMethodsInView([...methodsInView, tempObj])
        } else {
          setMethodsInView([...methodsInView, finalItem])
        }
      }

      let tempArray = []
      if (Array.isArray(methodsInView[0][viewIndex])) {
        if (methodsInView[0][viewIndex])
          methodsInView[0][viewIndex].map((view) => {
            if (duplicate === false) {
              let object = {}
              view.packageGatewayPercentageList.map((methods) => {
                object = {
                  id: view.id === undefined ? null : view.id,
                  merchantPackageId: methods.merchantPackageId,
                  viewId: newViewIndex.view.id,
                  sortOrderNumber: methodsInView[0][viewIndex].length + 1,
                }
                tempArray.push(object)
              })
            } else {
              setNotificationMessage('Duplicate not allowed')
              setOpenNotification(true)
              return
            }
          })
      } else {
        tempArray = [
          {
            id: null,
            merchantPackageId: finalItem[0].packageGatewayPercentageList,
            viewId: newViewIndex.view.id,
            sortOrderNumber: apiViewsData.length + 1,
          },
        ]
      }

      let dataArray = [...DataObject]
      dataArray.map((items, index) => {
        if (items.viewId.toString() === newViewIndex.view.id.toString()) {
          dataArray[index] = {
            viewId: newViewIndex.view.id,
            name: newViewIndex.view.name,
            percentage: items.percentage,
            userId: userDetail.id,
            merchantPackageViewList: tempArray,
            stackId: parseFloat(id),
          }
        }
      })
      setDataObject(dataArray)
    } catch (e) {
      console.error(e)
    }
  }

  function getABTestID() {
    return
    axios
      .get(REACT_APP_API_URL + '/ab-tests?token=' + TOKEN)
      .then((response) => {
        setAbTestID(response.data.id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function updateGatewayPercentage(event, gatewayID, packageID) {
    const payload = {
      gatewayID: gatewayID,
      packageID: packageID,
      percentage: event.target.value / 100,
      token: TOKEN,
    }

    setTimeout(() => {
      if (event.target.value < 101) {
        axios
          .post(
            REACT_APP_API_URL + '/merchant-package-payment-gateways',
            payload
          )
          .then((response) => {
            setNotificationMessage('Percentage Updated')
            getMerchantPaymentMethods()
            setOpenNotification(true)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        setNotificationMessage(
          'Update Failed ! Percentage Value must be between 1 to 100 '
        )
        setOpenNotification(true)
      }
    }, 1000)
  }

  const [PaymentMethodData, setPaymentMethodData] = useState([])
  const [PaymentMethodDataLoader, setPaymentMethodDataLoader] = useState(true)
  function getMerchantPaymentMethods() {
    setPaymentMethodDataLoader(true)
    if (userDetail && userDetail.merchantId) {
      const config = {
        method: 'get',
        url:
          REACT_APP_API_URL +
          `/payment/getMerchantPaymentDetail?merchantId=${userDetail.merchantId}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        timeout: 5000,
      }
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setPaymentMethodDataLoader(false)
            setPaymentMethodData(response.data.body)
            setMerchantPackagesData(response.data.body)
            let objData = []
            if (response.data.body.length > 0) {
              response.data.body.map((item, index) => {
                objData.push({
                  merchant_package_id: item.merchantPackageId,
                  ...item,
                })
              })
              setPaymentMethods(objData)
            }
          }
        })
        .catch(function (error) {
          console.error(error.message)
        })
    }
  }

  const saveMerhantPaymentMethods = () => {
    let check = {
      LimitCheck: false,
      names: [],
      errorMessage: '',
    }

    // let MainArray123 = [...PaymentMethodData]
    // MainArray123.map((item, index) => {
    //   // let array = [item]
    //   let packages = []
    //   item.packageGatewayPercentageList
    //     .filter((fl) => fl.isMerchantGateway !== false)
    //     .map((it, index) => {
    //       packages.push(it)
    //     })
    //   return (item.packageGatewayPercentageList = packages)
    // })

    PaymentMethodData.map((item, index) => {
      // let packages = []
      // item.packageGatewayPercentageList
      //   .filter((fl) => fl.isMerchantGateway !== false)
      //   .map((it, index) => {
      //     packages.push(it)
      //   })

      // item.packageGatewayPercentageList = packages

      let sum = 0

      item.packageGatewayPercentageList.map((it) => {
        if (it.percentage !== null) sum = sum + it.percentage
        if (it.isMerchantGateway === false) sum = null
      })

      if (
        sum > 100 &&
        item.packageGatewayPercentageList.length > 0 &&
        sum !== null
      ) {
        check.LimitCheck = true
        check.names.push(item.paymentMethodName)
        check.errorMessage = 'Percentage Limit Increased for '
      } else if (
        sum < 100 &&
        item.packageGatewayPercentageList.length > 0 &&
        sum !== null
      ) {
        check.LimitCheck = true
        check.names.push(item.paymentMethodName)
        check.errorMessage = 'Percentage sum should be 100% for '
      }
    })

    if (check.LimitCheck === true) {
      check.names.map((name) => {
        return toast.error(check.errorMessage + name)
      })
    } else {
      toast.info('Saving...')
      var myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      )
      myHeaders.append('Content-Type', 'application/json')

      // let rawData = [...PaymentMethodData]
      // PaymentMethodData.map((items, index) => {
      //   let packages = []

      //   items.packageGatewayPercentageList
      //     .filter((fl) => fl.isMerchantGateway !== false)
      //     .map((it) => {
      //       return packages.push(it)
      //     })
      //   // items.packageGatewayPercentageList = packages

      //   return (rawData[index].packageGatewayPercentageList = packages)
      // })

      var raw = JSON.stringify(PaymentMethodData)

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      fetch(
        `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/addGatewayPercentage`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.body.length > 0) {
            toast.success('Percentage Saved Successfully!')
            getViews()
            getMerchantPaymentMethods()
          }
        })
        .catch((error) => console.log('error', error))
    }
  }

  function fetchGateways() {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/getAllPaymentGateway`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        console.log('Gate ways => ', response)
        setGateWaysData(response.data.body)
      })
      .catch(function (error) {
        console.trace(error.message)
      })
  }

  function closeAll() {
    setGatewayModalOpen(false)
    setPaymentMethodModalOpen(false)
    setCredentialsModal(false)
  }

  function handleOpenCredentialsModal() {
    setCredentialsModal(open)
    setPaymentMethodModalOpen(false)
  }

  const handleCloseCredentialsModal = () => setPaymentMethodModalOpen(false)

  function handleOpenModalPaymentMethod(credentials, gatewayID) {
    if (credentials) {
      setCredentialScreenHTML(credentials)
    }
    setCurrentgateway(gatewayID)

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/getPaymentMethod?gatewayId=${gatewayID}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        setPaymentMethodsData(response.data.body)
        setPaymentMethodModalOpen(true)
        setGatewayModalOpen(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleCloseModalPaymentMethod = () => {
    setPaymentMethodModalOpen(false)
  }

  function handleOpenModalGateways() {
    setGatewayModalOpen(true)
  }

  const handleCloseModalGateways = () => setGatewayModalOpen(false)

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Apple Pay', category: 'wip', bgcolor: 'yellow' },
    { id: 2, name: 'Google Pay', category: 'wip', bgcolor: 'pink' },
    { id: 3, name: 'Visa', category: 'complete', bgcolor: 'skyblue' },
  ])

  const [methodsInView, setMethodsInView] = useState([
    {
      0: [],
    },
  ])

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  function deleteMerchantPaymentDetail(
    pkgId,
    pkgName,
    packageGatewayPercentageList
  ) {
    let check = false

    DataObject.map((item) => {
      item.merchantPackageViewList.map((it) => {
        if (it.merchantPackageId === pkgId) {
          check = true
        }
      })
    })

    if (check === true) {
      toast.error(
        'Payment method already in use. Please remove payment method from view and try again.'
      )
      toast.error(pkgName + ' is being used in a view below!')
    } else {
      toast.info('Deleting...')

      const data = {
        merchantPackageIdToDelete: pkgId,
        packageGatewayPercentageList: packageGatewayPercentageList,
      }

      const config = {
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/delMerchantPaymentDetail`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
        data: data,
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            toast.success('Payment Method Deleted!')
            getMerchantPaymentMethods()
            getViews()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const [viewSize, setViewSize] = useState(6)
useEffect(()=>{
                        console.log(PaymentMethodData,"itemitemitemitemitem");
},[PaymentMethodData])
  useEffect(() => {
    if (activeViews > 0) {
      setViewSize(12 / activeViews)
      if (activeViews > 0) {
        setShowViews(true)
      }
    }
  }, [activeViews])

  const [expanded, setExpanded] = useState('panel0')

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleViewsChange = (check, viewID) => {
    // toast.info(check === true ? 'Enabling...' : 'Disabling...')
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/toggle/view/${viewID}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          // toast.success(check === true ? 'View Enabled!' : 'View Disabled!')
          getViews()
        }
      })
      .catch(function (error) {
        toast.error(error)
      })

    if (check === true) {
      setActiveViews(activeViews + 1)
      let temp = activeViewsArr
      temp.push(viewID)
      setActiveViewsArr(temp)
    } else {
      setActiveViews(activeViews - 1)
      setActiveViewsArr(activeViewsArr.filter((item) => item !== viewID))
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateCharacters(items)
  }

  function contact(value, gateway) {
    setGatewayModalOpen(false)

    const payload = {
      token: TOKEN,
    }
    axios
      .post(REACT_APP_API_URL + '/payment-gateways/' + gateway, payload)
      .then((response) => {
        setNotificationMessage(
          'ThankYou for Contacting Us, Our team will get back to you soon !'
        )
        setOpenNotification(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function onDragStart(ev, item) {
    let array = []
    array.push(item)

    ev.dataTransfer.setData('item', JSON.stringify(array))
  }

  function onDragOver(ev) {
    ev.preventDefault()
  }

  function onDragEnd(ev, i, viewIndex) {
    if (ev.dataTransfer.dropEffect == 'none') {
    }
  }

  function deleteMethod(id) {
    const newMethodItems = methodsInView.filter((item) => item.id !== id)
    setMethodsInView(newMethodItems)
  }

  function selectPaymentMethodClick(method) {
    let pkgs = []
    pkgs.push(method.id)

    setSelectedMethod(method)

    setCurrentMethod(pkgs)

    if (credentialsScreenHTML != undefined || credentialsScreenHTML != null) {
      var parser = new DOMParser()
      var doc = parser.parseFromString(credentialsScreenHTML, 'text/html')
      let inputs = doc.getElementsByTagName('input')
      let fields = []
      let labels = []
      Array.from(inputs).forEach((element) => {
        fields.push(element.getAttribute('id'))
        labels.push(element.getAttribute('label'))
      })
      let obj = {}
      setCredentialFields(fields)
      setFieldLabels(labels)
      fields.forEach((field, index) => {
        obj[field] = ''
      })
    }
    handleCloseModalPaymentMethod()
    setCredentialsModal(true)
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...fieldValues]
    list[0][name] = value
    setFieldValues(list)
  }

  function submitPaymentMethod() {
    toast.info('Adding Payment Method...')

    const payload = {
      credentials: fieldValues[0],
      paymentMethod: selectedMethod.paymentMethodName,
      paymentGatewayId: currentGateway,
      userId: userDetail.id,
      maxAmount: parseFloat(fieldValues[0].max),
      minAmount: parseFloat(fieldValues[0].min),
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/addPaymentDetail`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      data: payload,
    }

    setCurrentMethod([])
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Payment Method Added')
        }
        setCredentialsModal(false)

        getMerchantPaymentMethods()
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className='App'>
      <a href='/payment'><KeyboardBackspaceIcon style={{cursor:'pointer', color: 'black'}}/></a>
      <DragDropContext>
        <br />
        <Container maxWidth='lg' style={{ overflowX: 'auto' }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Paper style={{ padding: '20px' }}>
                <span
                  className={styles.Title}
                  style={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  Checkout Views
                </span>

                <div
                  style={{
                    paddingBottom: '10px',
                    height: '160px',
                    padding: '10px',
                    paddingRight: '20px',
                  }}
                >
                  {[...Array(apiViewsData.length)].map((view, index) => {
                    return (
                      <div key={index} className={styles.ViewBox}>
                        <span style={{ float: 'left' }}>View {index + 1}</span>
                        <span
                          style={{
                            float: 'right',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <IOSSwitch
                            defaultChecked={apiViewsData[index].view.isEnabled}
                            onChange={(e) => {
                              handleViewsChange(
                                e.target.checked,
                                apiViewsData[index].view.id
                              )
                            }}
                            sx={{ m: 1, marginTop: '0px' }}
                          />{' '}
                          <DeleteIcon
                            onClick={(e) => {
                              deleteView(apiViewsData[index].view.id)
                            }}
                            style={{ cursor: 'pointer', marginTop: '-5px' }}
                          />{' '}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <Button
                  onClick={() => {
                    createView()
                  }}
                  style={{
                    textTransform: 'capitalize',
                    color: '#E71583',
                    fontWeight: 'bold',
                    marginTop: '16pt',
                    opacity: `${apiViewsData.length < 3 ? '1' : '0.6'}`,
                    cursor: `${
                      apiViewsData.length < 3 ? 'pointer' : 'not-allowed'
                    }`,
                  }}
                  disabled={apiViewsData.length < 3 ? false : true}
                >
                  <AddCircleOutlineIcon
                    style={{ fontSize: '20px', marginRight: '5px' }}
                  />{' '}
                  Create Checkout View{' '}
                </Button>
              </Paper>
              <br />
            </Grid>
            <Grid item xs={9}>
              <Item style={{ textAlign: 'left', padding: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6pt',
                  }}
                >
                  <span
                    className={styles.Title}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '15px',
                      float: 'left',
                    }}
                  >
                    Payment Methods{' '}
                  </span>
                  <span
                    className={styles.Title}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '15px',
                      float: 'left',
                      marginLeft: '80px',
                    }}
                    onClick={() => console.log(PaymentMethodData)}
                  >
                    Payment Processors{' '}
                  </span>
                  <div style={{ width: '40%' }}>
                    <Button
                      onClick={handleOpenModalGateways}
                      style={{
                        textTransform: 'capitalize',
                        color: '#E71583',
                        fontWeight: 'bold',
                        float: 'right',
                      }}
                    >
                      <AddCircleOutlineIcon style={{ fontSize: '20px' }} /> Add
                      Payment Method{' '}
                    </Button>
                  </div>
                </div>

                <Grid
                  container
                  style={{
                    height: '150px',
                    overflow: 'auto',
                    paddingRight: '15px',
                  }}
                >
                  {PaymentMethodDataLoader === true
                    ? ''
                    : PaymentMethodData.sort((a, b) =>
                        a.paymentMethodName > b.paymentMethodName ? 1 : -1
                      ).map((item, index) => {
                        return (
                          <>
                            <Grid
                              item
                              xs={3}
                              style={{
                                padding: '3px',
                                paddingRight: '8pt',
                              }}
                              onDragOver={(e) => onDragOver(e)}
                              onDrop={(e) => {
                                onDrop(e, 'wip')
                              }}
                              key={index}
                            >
                              <div
                                className={`draggable ${styles.ViewBox}`}
                                style={{
                                  height: '35px',
                                  paddingTop: '6px',
                                  marginRight: '5px',
                                  cursor: 'grab',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                                key={index}
                                onDragStart={(e) => onDragStart(e, item)}
                                draggable
                              >
                                <img
                                  src={DropIcon}
                                  width={15}
                                  style={{ marginRight: '20%' }}
                                />

                                {item.paymentMethodName.toLowerCase() ==
                                'card' ? (
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img
                                      width={20}
                                      src={VisaLogo}
                                      style={{ marginRight: '5pt' }}
                                      alt={'img'}
                                    />{' '}
                                    <img src={MasterCardLogo} alt={'img'} />
                                  </div>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'vault' ? (
                                  <span>
                                    <img
                                      // Add Vault Image
                                      src={vault}
                                      style={{ width: '17px' }}
                                    />{' '}
                                    Vault
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'alfalah' ? (
                                  <span>
                                    <img
                                      src={bankalfalah}
                                      style={{ width: '40px' }}
                                    />{' '}
                                    Alfalah
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'ubl' ? (
                                  <span>
                                    <img src={ubl} style={{ width: '20px' }} />{' '}
                                    UBL
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'foree' ? (
                                  <span>
                                    <img
                                      src={Foree}
                                      style={{ width: '20px' }}
                                    />{' '}
                                    Foree
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'jazzcash' ? (
                                  <span>
                                    <img
                                      src={JazzCash}
                                      style={{ width: '20px' }}
                                    />{' '}
                                    Jazzcash
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'jazzcash_c' ? (
                                  <span>
                                    <img
                                      src={JazzCash}
                                      style={{ width: '20px' }}
                                    />{' '}
                                    Jazzcash C
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'payfast' ? (
                                  <span>
                                    <img
                                      src={payfast}
                                      style={{ width: '20px' }}
                                    />{' '}
                                    Pay Fast
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'alfa' ? (
                                  <span>
                                    <img
                                      src={alfasvg}
                                      style={{ width: '20px' }}
                                    />{' '}
                                    Alfa
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'easypaisa' ? (
                                  <span>
                                    <img
                                      src={EasypaisaIcon}
                                      style={{ width: '20px' }}
                                    />{' '}
                                    EasyPaisa
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'applepay' ? (
                                  <img width={40} src={ApplePayLogo} />
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'affirm' ? (
                                  <span>
                                    <img src={AffirmIcon} width='20' /> Affirm
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'googlepay' ? (
                                  <img width={70} src={GooglePayIcon} />
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'klarna' ? (
                                  <span>
                                    <img src={KlarnaIcon} width='20' /> Klarna
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'adyen' ? (
                                  <img
                                    src={AdyenLogo}
                                    style={{ width: '20px' }}
                                  />
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'nab' ? (
                                  <span>
                                    <img src={NAB} width='20' /> NAB
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'clover' ? (
                                  <span>
                                    <img src={Clover} width='20' /> Clover
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'afterpay' ? (
                                  <span>
                                    <img src={AfterpayIcon} width='20' />{' '}
                                    Afterpay
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'uplift' ? (
                                  <span>Uplift</span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'bigcommerce' ? (
                                  <span>
                                    <img src={BigCommerceIcon} width='20' />{' '}
                                    BigCommerce
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'braintree' ? (
                                  <span>
                                    <img src={BraintreeIcon} width='20' />{' '}
                                    Braintree
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'square' ? (
                                  <span>Square</span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'pay_in_3' ? (
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img
                                      src={QPLogo}
                                      style={{ width: '20px' }}
                                    />
                                    &nbsp;&nbsp; Pay In 3
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'pay_in_2' ? (
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img
                                      src={QPLogo}
                                      style={{ width: '20px' }}
                                    />
                                    &nbsp;&nbsp; PAY_IN_2
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'pay_in_4' ? (
                                  <span>
                                    <img
                                      src={QPLogo}
                                      style={{ width: '20px' }}
                                    />
                                    &nbsp;&nbsp; Pay In 4
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'pay_in_6' ? (
                                  <span>
                                    <img
                                      src={QPLogo}
                                      style={{ width: '20px' }}
                                    />
                                    &nbsp;&nbsp; Pay In 6
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'paypal' ? (
                                  <span>
                                    <img
                                      src={PaypalIcon}
                                      style={{ width: '20px' }}
                                    />{' '}
                                    Paypal
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'bitpay' ? (
                                  <img
                                    src={BitpayLogo}
                                    style={{ width: '20px' }}
                                  />
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'split_pay' ? (
                                  <span>
                                    <img
                                      src={SplitIcon}
                                      style={{ width: '17px' }}
                                      alt='img'
                                    />{' '}
                                    SplitIt
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'split-it' ? (
                                  <span>
                                    <img
                                      src={SplitIcon}
                                      style={{ width: '17px' }}
                                      alt='img'
                                    />{' '}
                                    SplitIt
                                  </span>
                                ) : (
                                  ''
                                )}
                                {item.paymentMethodName.toLowerCase() ==
                                'cod' ? (
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img
                                      src={CashIcon}
                                      style={{
                                        width: '17px',
                                        marginRight: '5pt',
                                      }}
                                      alt='img'
                                    />{' '}
                                    &nbsp;COD
                                  </span>
                                ) : (
                                  ''
                                )}
                              </div>
                            </Grid>

                            <Grid
                              item
                              xs={9}
                              style={{
                                paddingLeft: '10px',
                                marginTop: '0px',
                                borderLeft: '1px solid #909090',
                              }}
                            >
                              {item.packageGatewayPercentageList.map(
                                (package1, index2) => {
                                  return (
                                    <div
                                      className={styles.MethodsRow}
                                      style={{
                                        paddingTop: `${
                                          index2 === 0 ? '10px' : '6px'
                                        }`,
                                      }}
                                      key={index2}
                                    >
                                      <Grid container spacing={3}>
                                        <Grid item xs={5}>
                                          <div
                                            style={{
                                              width: '100%',
                                            }}
                                          >
                                            {/*Gateway Image*/}
                                            <span style={{ float: 'left' }}>
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'alfalah' ? (
                                                <img
                                                  alt='img'
                                                  src={bankalfalah}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'vault' ? (
                                                <img
                                                  alt='img'
                                                  src={vault}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'alfa' ? (
                                                <img
                                                  alt='img'
                                                  src={alfa}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'foree' ? (
                                                <img
                                                  alt='img'
                                                  src={Foree}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'jazzcash' ? (
                                                <img
                                                  alt='img'
                                                  src={JazzCash}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'jazzcash_c' ? (
                                                <img
                                                  alt='img'
                                                  src={JazzCash}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'ubl' ? (
                                                <img
                                                  alt='img'
                                                  src={ubl}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'payfast' ? (
                                                <img
                                                  alt='img'
                                                  src={payfast}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'stripe' ? (
                                                <img
                                                  alt='img'
                                                  src={StripeIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'checkout' ? (
                                                <img
                                                  alt='img'
                                                  src={CheckoutIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'affirm' ? (
                                                <img
                                                  alt='img'
                                                  src={AffirmIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'klarna' ? (
                                                <img
                                                  alt='img'
                                                  src={KlarnaIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'split' ? (
                                                <img
                                                  alt='img'
                                                  src={SplitIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'paypal' ? (
                                                <img
                                                  alt='img'
                                                  src={PaypalIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'easypaisa' ? (
                                                <img
                                                  alt='img'
                                                  src={EasypaisaIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'cash' ? (
                                                <img
                                                  alt='img'
                                                  src={CashIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'cod' ? (
                                                <img
                                                  alt='img'
                                                  src={CashIcon}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'adyen' ? (
                                                <img
                                                  alt='img'
                                                  src={AdyenLogo}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}

                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'bitpay' ? (
                                                <img
                                                  alt='img'
                                                  src={BitpayLogo}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'adyen' ? (
                                                <img
                                                  alt='img'
                                                  src={AdyenLogo}
                                                  style={{ width: '20px' }}
                                                />
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'nab' ? (
                                                <span>
                                                  <img
                                                    alt='img'
                                                    src={NAB}
                                                    width='20'
                                                  />{' '}
                                                  NAB
                                                </span>
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'clover' ? (
                                                <span>
                                                  <img
                                                    alt='img'
                                                    src={Clover}
                                                    width='20'
                                                  />
                                                </span>
                                              ) : (
                                                ''
                                              )}
                                              {package1.paymentGatewayName.toLowerCase() ==
                                              'afterpay' ? (
                                                <span>
                                                  <img
                                                    alt='img'
                                                    src={AfterpayIcon}
                                                    width='20'
                                                  />{' '}
                                                </span>
                                              ) : (
                                                ''
                                              )}
                                            </span>

                                            {/*Gateway name*/}
                                            <span
                                              style={{
                                                float: 'left',
                                                fontSize: '13px',
                                                color: '#000',
                                                fontWeight: 'bold',
                                                marginLeft: '5px',
                                              }}
                                            >
                                              {package1.paymentGatewayName}
                                            </span>

                                            {/*Gateway Percentage*/}
                                            {package1.isMerchantGateway && (
                                              <span
                                                style={{
                                                  float: 'right',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                }}
                                              >
                                                <input
                                                  className={styles.percent}
                                                  type='number'
                                                  max={100}
                                                  min={0}
                                                  value={package1.percentage}
                                                  style={{
                                                    width: '50px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    marginRight: '2pt',
                                                  }}
                                                  onChange={(e) => {
                                                    let array = [
                                                      ...PaymentMethodData,
                                                    ]
                                                    array[
                                                      index
                                                    ].packageGatewayPercentageList[
                                                      index2
                                                    ].percentage = parseFloat(
                                                      e.target.value
                                                    )
                                                    setPaymentMethodData(array)
                                                  }}
                                                />{' '}
                                                %
                                                <DeleteIcon
                                                  style={{
                                                    cursor: 'pointer',
                                                    marginLeft: '3pt',
                                                    height: '16pt',
                                                  }}
                                                  onClick={() => {
                                                    deleteMerchantPaymentDetail(
                                                      package1.merchantPackageId,
                                                      package1.paymentGatewayName,
                                                      item.packageGatewayPercentageList
                                                    )
                                                  }}
                                                />
                                              </span>
                                            )}
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  )
                                }
                              )}
                            </Grid>
                          </>
                        )
                      })}
                </Grid>

                {PaymentMethodData.length !== 0 && (
                  <SharedButton
                    text='Save Percentage'
                    style={{
                      background: '#E93A7D',
                      borderRadius: 50,
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '800',
                      textAlign: 'center',
                      width: '100pt',
                      border: 'none',
                      height: 30,
                      cursor: 'pointer',
                      marginTop: '15pt',
                    }}
                    onClick={() => {
                      saveMerhantPaymentMethods()
                    }}
                  />
                )}
              </Item>
            </Grid>
          </Grid>
          <br />
          <Container
            maxWidth={false}
            style={{
              overflow: 'auto',
              padding: '0px',
            }}
          >
            <div
              style={{
                width: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
                justifyContent: 'center',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {showViews ? (
                apiViewsData.map((view, index) => {
                  return (
                    <Paper
                      key={index}
                      style={{
                        marginBottom: '20px',
                        marginLeft: '10px',
                        padding: '15px',
                        textAlign: 'left',
                        width: '300px',
                        minWidth: '300px',
                        display:
                          apiViewsData[index].view.isEnabled === true
                            ? 'inline-block'
                            : 'none',
                        wrap: '1 0 25%',
                      }}
                    >
                      <span style={{ fontWeight: 'bold', float: 'left' }}>
                        {' '}
                        View {index + 1}{' '}
                      </span>
                      <span style={{ fontWeight: 'bold', float: 'right' }}>
                        <input
                          className={styles.percent}
                          onChange={(event) => {
                            const PercentageValue = parseFloat(
                              event.target.value
                            )

                            let newArray = [...apiViewsData]
                            newArray[index].view.percentage = PercentageValue
                            setApiViewsData(newArray)

                            let dataArray = [...DataObject]
                            dataArray[index].percentage = PercentageValue
                            setDataObject(dataArray)
                          }}
                          defaultValue={view.view.percentage}
                          type='number'
                          max={100}
                          min={0}
                          style={{
                            width: '50px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}
                        />{' '}
                        %
                      </span>
                      <br />
                      <div className={styles.CheckoutInnerContainer}>
                        <center>
                          <img
                            src={OneClickLogo}
                            style={{
                              marignLeft: 'auto',
                              marginRight: 'auto',
                            }}
                          />
                        </center>
                        <br />
                        <span
                          className={styles.Title}
                          style={{ textAlign: 'left' }}
                        >
                          Select Payment Method
                        </span>
                        <div className={`${styles.inner_scroll}`}>
                          <div
                            className='droppable'
                            style={{ overflowY: 'auto' }}
                            onDragOver={(e) => onDragOver(e)}
                            onDrop={(e) => onDrop(e, 'complete', index, view)}
                          >
                            {methodsInView[0][index] &&
                            methodsInView[0][index].length > 0
                              ? [
                                  ...new Set(
                                    methodsInView[0][index].map(
                                      (q) => q.paymentMethodName
                                    )
                                  ),
                                ].map((item, pkgIndex) => {
                                  return (
                                    <div
                                      key={pkgIndex}
                                      className={` ${styles.ViewBox}`}
                                    >
                                      {item?.toLowerCase() === 'card' ? (
                                        <>
                                          <img src={VisaLogo} />{' '}
                                          <img src={MasterCardLogo} />
                                        </>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'cod' ? (
                                        <span>
                                          <img
                                            src={CashIcon}
                                            style={{ width: '17px' }}
                                          />{' '}
                                          &nbsp;COD
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'applepay' ? (
                                        <span>
                                          <img src={ApplePayLogo} />
                                          Apple Pay
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'alfa' ? (
                                        <span>
                                          <img
                                            src={alfa}
                                            style={{
                                              width: '35px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          Alfa
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'alfalah' ? (
                                        <span>
                                          <img
                                            src={bankalfalah}
                                            style={{
                                              width: '50px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          Alfalah
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'vault' ? (
                                        <span>
                                          <img
                                            src={vault}
                                            style={{
                                              width: '17px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          Vault
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'jazzcash' ? (
                                        <span>
                                          <img
                                            src={JazzCash}
                                            style={{
                                              width: '20px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          Jazzcash
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'jazzcash_c' ? (
                                        <span>
                                          <img
                                            src={JazzCash}
                                            style={{
                                              width: '20px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          Jazzcash C
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'foree' ? (
                                        <span>
                                          <img
                                            src={Foree}
                                            style={{
                                              width: '35px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          Foree
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'ubl' ? (
                                        <span>
                                          <img
                                            src={ubl}
                                            style={{
                                              width: '35px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          UBL
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'payfast' ? (
                                        <span>
                                          <img
                                            src={payfast}
                                            style={{
                                              width: '17px',
                                              marginRight: '10px',
                                            }}
                                          />
                                          Payfast
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'googlepay' ? (
                                        <img src={GooglePayIcon} />
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'easypaisa' ? (
                                        <span>
                                          <img
                                            src={EasypaisaIcon}
                                            style={{ width: '20px' }}
                                          />{' '}
                                          EasyPaisa
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'affirm' ? (
                                        <span>
                                          <img src={AffirmIcon} width='20' />{' '}
                                          Affirm
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'adyen' ? (
                                        <img
                                          src={AdyenLogo}
                                          style={{ width: '20px' }}
                                        />
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'paypal' ? (
                                        <span>
                                          <img
                                            src={PaypalIcon}
                                            style={{
                                              width: '20px',
                                              marginRight: 5,
                                            }}
                                          />{' '}
                                          Paypal
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'split' ? (
                                        <span>
                                          <img
                                            src={SplitIcon}
                                            style={{
                                              width: '20px',
                                              marginRight: 5,
                                            }}
                                          />{' '}
                                          SplitIt
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'stripe' ? (
                                        <span>
                                          <img
                                            src={StripeIcon}
                                            style={{
                                              width: '20px',
                                              marginRight: 5,
                                            }}
                                          />{' '}
                                          Stripe
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'klarna' ? (
                                        <span>
                                          <img src={KlarnaIcon} width='20' />{' '}
                                          Klarnaa
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'adyen' ? (
                                        <img
                                          src={AdyenLogo}
                                          style={{ width: '20px' }}
                                        />
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'nab' ? (
                                        <span>
                                          <img src={NAB} width='20' /> NAB
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'sezzle' ? (
                                        <span>
                                          <img src={SezzleIcon} width='20' />{' '}
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'cardpointe' ? (
                                        <span>
                                          <img
                                            src={CardPointeIcon}
                                            width='20'
                                          />{' '}
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'clover' ? (
                                        <span>
                                          <img src={Clover} width='20' /> Clover
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'afterpay' ? (
                                        <span>
                                          <img src={AfterpayIcon} width='20' />{' '}
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'uplift' ? (
                                        <span>Uplift</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'bigcommerce' ? (
                                        <span>
                                          <img
                                            src={BigCommerceIcon}
                                            width='20'
                                          />{' '}
                                          BigCommerce
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'braintree' ? (
                                        <span>
                                          <img src={BraintreeIcon} width='20' />{' '}
                                          Braintree
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'square' ? (
                                        <span>Square</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'pay_in_6' ? (
                                        <>
                                          <span>
                                            <img
                                              src={QPLogo}
                                              style={{
                                                width: '20px',
                                                marginRight: 5,
                                              }}
                                            />{' '}
                                            Pay In 6
                                          </span>
                                        </>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'pay_in_3' ? (
                                        <>
                                          <span>
                                            <img
                                              src={QPLogo}
                                              style={{
                                                width: '20px',
                                                marginRight: 5,
                                              }}
                                            />{' '}
                                            Pay In 3
                                          </span>
                                        </>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'pay_in_4' ? (
                                        <>
                                          <span>
                                            <img
                                              src={QPLogo}
                                              style={{
                                                width: '20px',
                                                marginRight: 5,
                                              }}
                                            />{' '}
                                            Pay In 4
                                          </span>
                                        </>
                                      ) : (
                                        ''
                                      )}
                                       {item?.toLowerCase() === 'pay_in_2' ? (
                                        <>
                                          <span>
                                            <img
                                              src={QPLogo}
                                              style={{
                                                width: '20px',
                                                marginRight: 5, 
                                                marginBottom: "-5px",
                                              }}
                                            />{' '}
                                            Pay In 2
                                          </span>
                                        </>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'bitpay' ? (
                                        <img
                                          src={BitpayLogo}
                                          style={{ width: '20px' }}
                                        />
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'split-it' ? (
                                        <span>
                                          <img
                                            src={SplitIcon}
                                            style={{ width: '17px' }}
                                          />{' '}
                                          SplitIt
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'nab' ? (
                                        <span>NAB</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'clover' ? (
                                        <span>Clover</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'afterpay' ? (
                                        <span>Afterpay</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'uplift' ? (
                                        <span>Uplift</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'bigcommerce' ? (
                                        <span>BigCommerce</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'braintree' ? (
                                        <span>Brain Tree</span>
                                      ) : (
                                        ''
                                      )}
                                      {item?.toLowerCase() === 'square' ? (
                                        <span>Square</span>
                                      ) : (
                                        ''
                                      )}
                                      <DeleteIcon
                                        onClick={() => {
                                          let tempArray = []
                                          let mainObj = []
                                          methodsInView[0][index].map(
                                            (method, tempIndex) => {
                                              if (
                                                method.paymentMethodName !==
                                                item
                                              ) {
                                                mainObj.push(method)
                                                method.packageGatewayPercentageList.map(
                                                  (it) => {
                                                    tempArray.push({
                                                      id: method.id,
                                                      merchantPackageId:
                                                        it.merchantPackageId,
                                                      viewId: view.view.id,
                                                      sortOrderNumber:
                                                        tempIndex + 1,
                                                    })
                                                  }
                                                )
                                              }
                                            }
                                          )

                                          if (tempArray.length > 0) {
                                            let newArray = [...methodsInView]
                                            newArray[0][index] = mainObj
                                            setMethodsInView(newArray)

                                            let dataArray = [...DataObject]
                                            dataArray[
                                              index
                                            ].merchantPackageViewList = tempArray

                                            setDataObject(dataArray)
                                          } else {
                                            let newArray = [...methodsInView]
                                            newArray[0][index] = tempArray
                                            setMethodsInView(newArray)

                                            let dataArray = [...DataObject]
                                            dataArray[
                                              index
                                            ].merchantPackageViewList = []

                                            setDataObject(dataArray)
                                          }
                                        }}
                                        style={{
                                          cursor: 'pointer',
                                          fontSize: '20px',
                                          float: 'right',
                                        }}
                                      />{' '}
                                    </div>
                                  )
                                })
                              : ''}
                          </div>
                        </div>

                        {/* map end */}
                        <br />
                        <br />
                        <div style={{ height: '25px' }}>
                          <span
                            className={styles.Title}
                            style={{ float: 'left' }}
                          >
                            Order Summary
                          </span>
                          <span
                            className={styles.Title}
                            style={{ float: 'right' }}
                          >
                            $ 0.00
                          </span>
                        </div>
                        <div style={{ height: '25px' }}>
                          <span
                            className={styles.Title}
                            style={{ float: 'left' }}
                          >
                            Shipping
                          </span>
                          <span
                            className={styles.Title}
                            style={{ float: 'right' }}
                          >
                            $ 0.00
                          </span>
                        </div>
                        <div style={{ height: '15px' }}>
                          <span
                            className={styles.Title}
                            style={{ float: 'left' }}
                          >
                            Tax
                          </span>
                          <span
                            className={styles.Title}
                            style={{ float: 'right' }}
                          >
                            $ 0.00
                          </span>
                        </div>

                        <button className={styles.CheckoutButton}>
                          Place Order
                        </button>
                      </div>
                    </Paper>
                  )
                })
              ) : (
                <AppLoader />
              )}
            </div>
          </Container>
        </Container>
      </DragDropContext>

      {/*Save Button*/}
      {showViews ? (
        DataObject.length !== 0 && (
          <SharedButton
            text='Save View'
            style={{
              background: '#E93A7D',
              borderRadius: 50,
              color: '#fff',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: '100pt',
              border: 'none',
              height: 40,
              cursor: 'pointer',
            }}
            onClick={() => {
              SaveViewData()
            }}
          />
        )
      ) : (
        <AppLoader />
      )}

      <div></div>
      <Modal
        style={{
          top: '10%',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '600px',
        }}
        open={gatewayModalOpen}
        onClose={handleCloseModalGateways}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Paper sx={{ backgroundColor: 'white', padding: '15px' }}>
          <h3 style={{ marginTop: '0px' }}>
            Add Payment Processor{' '}
            <span style={{ float: 'right' }}>
              <button
                onClick={closeAll}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <img src={CrossIcon} />
              </button>
            </span>
          </h3>
          <div style={{ padding: '10px' }}>
            <Grid container style={{ height: '400px', overflow: 'auto' }}>
              {gatewaysData.length > 0
                ? gatewaysData.map((gateway, index) => {
                    return (
                      <Grid key={index} item xs={6}>
                        <div className={styles.OuterContainer}>
                          <div className={styles.InnerContainer}>
                            <div style={{ float: 'left' }}>
                              {gateway.paymentGateway.toLowerCase() ==
                              'jazzcash' ? (
                                <img src={JazzCash} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'alfa' ? (
                                <img src={alfa} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'alfalah' ? (
                                <img
                                  src={bankalfalah}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'jazzcash_c' ? (
                                <img src={JazzCash} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'payfast' ? (
                                <img src={payfast} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() == 'ubl' ? (
                                <img src={ubl} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'stripe' ? (
                                <img
                                  src={StripeIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'checkout' ? (
                                <img
                                  src={CheckoutIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'affirm' ? (
                                <img
                                  src={AffirmIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'klarna' ? (
                                <img
                                  src={KlarnaIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'split' ? (
                                <img
                                  src={SplitIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'paypal' ? (
                                <img
                                  src={PaypalIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'easypaisa' ? (
                                <img
                                  src={EasypaisaIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'cash' ? (
                                <img src={CashIcon} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'adyen' ? (
                                <img
                                  src={AdyenLogo}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'bitpay' ? (
                                <img
                                  src={BitpayLogo}
                                  style={{ width: '40px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() == 'zip' ? (
                                <img src={ZipLogo} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() == 'nab' ? (
                                <img src={NAB} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'authorize.net' ? (
                                <img
                                  src={AuthorizeIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'bigcommerce' ? (
                                <img
                                  src={BigCommerceIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'braintree' ? (
                                <img
                                  src={BraintreeIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'clover' ? (
                                <img src={Clover} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'sezzle' ? (
                                <span>
                                  <img src={SezzleIcon} width='20' />{' '}
                                </span>
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'cardpointe' ? (
                                <span>
                                  <img src={CardPointeIcon} width='20' />{' '}
                                </span>
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'foree' ? (
                                <img src={Foree} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'afterpay' ? (
                                <img
                                  src={AfterpayIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'pinwheel' ? (
                                <img src={PinWheel} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'square' ? (
                                <img src={Square} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {gateway.paymentGateway.toLowerCase() ==
                              'card' ? (
                                <>
                                  <img src={VisaLogo} />{' '}
                                  <img src={MasterCardLogo} />
                                </>
                              ) : (
                                ''
                              )}
                            </div>

                            <div style={{ float: 'left', marginLeft: '10px' }}>
                              <span className={styles.SubTitle}>
                                {gateway.payment_gateway_category !== null
                                  ? gateway.paymentGateway.toLowerCase() ===
                                    'split'
                                    ? 'Splitit'
                                    : gateway.paymentGateway.toLowerCase() ===
                                      'nab'
                                    ? 'NAB'
                                    : gateway.paymentGateway
                                  : gateway.paymentGateway}
                              </span>
                              <br />
                              <span
                                style={{
                                  margin: '0px',
                                  marginTop: '15px',
                                  fontWeight: '600',
                                }}
                              >
                                {gateway.paymentGateway.toLowerCase() ===
                                'split'
                                  ? 'Splitit'
                                  : gateway.paymentGateway.toLowerCase() ===
                                    'nab'
                                  ? 'NAB'
                                  : gateway.paymentGateway}
                              </span>
                            </div>

                            <br />
                            {typeof gateway.credentials !== 'undefined' &&
                            gateway.credentials ? (
                              gateway.credentials.length > 0 ? (
                                <Button
                                  onClick={() => {
                                    handleOpenModalPaymentMethod(
                                      gateway.credentials,
                                      gateway.id
                                    )
                                    setFieldValues([{}])
                                  }}
                                  className={styles.ConnectButton}
                                >
                                  <ConnectIcon style={{ fontSize: '15px' }} />{' '}
                                  Connect
                                </Button>
                              ) : (
                                <Button
                                  onClick={() =>
                                    contact(
                                      gateway.payment_gateway_packages,
                                      gateway.id
                                    )
                                  }
                                  className={styles.ConnectButton}
                                >
                                  Contact Us
                                </Button>
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </Grid>
                    )
                  })
                : ''}
            </Grid>
          </div>
        </Paper>
      </Modal>
      <Modal
        style={{
          top: '10%',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '550px',
        }}
        open={paymentMethodModalOpen}
        onClose={handleCloseModalPaymentMethod}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Paper sx={{ backgroundColor: 'white', padding: '15px' }}>
          <h3 style={{ marginTop: '0px' }}>
            <ArrowBackIcon
              onClick={() => {
                setPaymentMethodModalOpen(false)
                setGatewayModalOpen(true)
              }}
              style={{ float: 'left', marginRight: '15px', cursor: 'pointer' }}
            />
            Add Payment Method{' '}
            <span style={{ float: 'right' }}>
              <button
                onClick={() => {
                  handleCloseModalPaymentMethod()
                  gatewayModalOpen()
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <img src={CrossIcon} />
              </button>
            </span>
          </h3>
          <div style={{ padding: '10px' }}>
            <Grid container style={{ height: '400px', overflow: 'auto' }}>
              {paymentMethodsData.length > 0
                ? paymentMethodsData.map((method, index) => {
                    return (
                      <Grid key={index} item xs={6}>
                        <div
                          className={styles.OuterContainer}
                          style={{ width: '220px' }}
                        >
                          <div className={styles.InnerContainer}>
                            <div style={{ float: 'left' }}>
                              {method.paymentMethodName.toLowerCase() ==
                              'stripe' ? (
                                <img
                                  src={StripeIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'foree' ? (
                                <img src={Foree} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'ubl' ? (
                                <img src={ubl} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'alfa' ? (
                                <img src={alfa} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'alfalah' ? (
                                <img
                                  src={bankalfalah}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'jazzcash' ? (
                                <img src={JazzCash} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'jazzcash_c' ? (
                                <img src={JazzCash} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'payfast' ? (
                                <img src={payfast} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}

                              {method.paymentMethodName.toLowerCase() ==
                              'checkout' ? (
                                <img
                                  src={CheckoutIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'affirm' ? (
                                <img
                                  src={AffirmIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'klarna' ? (
                                <img
                                  src={KlarnaIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'split-it' ? (
                                <img
                                  src={SplitIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'paypal' ? (
                                <img
                                  src={PaypalIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'easypaisa' ? (
                                <img
                                  src={EasypaisaIcon}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'cash' ? (
                                <img src={CashIcon} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'cod' ? (
                                <img src={CashIcon} style={{ width: '50px' }} />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'applepay' ? (
                                <img
                                  src={ApplePayLogo}
                                  style={{ width: '70px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'googlepay' ? (
                                <span>
                                  <img
                                    src={GPayIcon}
                                    style={{
                                      width: '40px',
                                      display: 'inline-block',
                                    }}
                                  />{' '}
                                  <br />
                                  <br />
                                </span>
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'adyen' ? (
                                <img
                                  src={AdyenLogo}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'bitpay' ? (
                                <img
                                  src={BitpayLogo}
                                  style={{ width: '50px' }}
                                />
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'card' ? (
                                <>
                                  <img src={VisaLogo} />{' '}
                                  <img src={MasterCardLogo} />
                                </>
                              ) : (
                                ''
                              )}
                              {method.paymentMethodName.toLowerCase() ==
                              'pay_in_4' ? (
                                <>
                                  <img
                                    src={QPLogo}
                                    style={{ width: '150px' }}
                                  />{' '}
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                            <div style={{ float: 'left', marginLeft: '10px' }}>
                              <span className={styles.SubTitle}>
                                {method.paymentMethodName.toLowerCase() ===
                                'pay_in_4'
                                  ? 'Qisstpay'
                                  : method.paymentMethodName}
                              </span>
                              <br />
                              <span
                                style={{
                                  margin: '0px',
                                  marginTop: '15px',
                                  fontWeight: '600',
                                }}
                              >
                                {method.paymentMethodName.toLowerCase() ===
                                'pay_in_4'
                                  ? 'Pay In 4'
                                  : method.paymentMethodName}
                              </span>
                            </div>
                            <br />
                            <Button
                              onClick={() => {
                                selectPaymentMethodClick(method)
                                setFieldValues([{}])
                              }}
                              className={styles.ConnectButton}
                            >
                              <ConnectIcon style={{ fontSize: '15px' }} />{' '}
                              Select
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    )
                  })
                : ''}
            </Grid>
          </div>
        </Paper>
      </Modal>
      <Modal
        style={{
          top: '8%',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '500px',
        }}
        open={credentialsModal}
        onClose={() => setCredentialsModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Paper sx={{ backgroundColor: 'white', padding: '25px' }}>
          <h3 style={{ marginTop: '0px' }}>
            <ArrowBackIcon
              onClick={() => {
                setCredentialsModal(false)
                setPaymentMethodModalOpen(true)
              }}
              style={{ float: 'left', marginRight: '15px', cursor: 'pointer' }}
            />
            Add Payment Method{' '}
            <span style={{ float: 'right' }}>
              <button
                onClick={closeAll}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <img src={CrossIcon} />
              </button>
            </span>
          </h3>
          <div style={{ padding: '10px' }}>
            {selectedMethod && selectedMethod.paymentMethodName ? (
              <Grid container style={{ height: 'auto' }}>
                <Grid item xs={8} style={{ marginLeft: '40px' }}>
                  <div className={styles.OuterContainer}>
                    <div className={styles.InnerContainer}>
                      <div style={{ float: 'left' }}>
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'foree' ? (
                          <>
                            <img src={Foree} style={{ width: '50px' }} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'ubl' ? (
                          <>
                            <img src={ubl} style={{ width: '50px' }} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'jazzcash' ? (
                          <>
                            <img src={JazzCash} style={{ width: '50px' }} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'jazzcash_c' ? (
                          <>
                            <img src={JazzCash} style={{ width: '50px' }} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'alfa' ? (
                          <>
                            <img src={alfa} style={{ width: '50px' }} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'alfalah' ? (
                          <>
                            <img src={bankalfalah} style={{ width: '50px' }} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'payfast' ? (
                          <>
                            <img src={payfast} style={{ width: '50px' }} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'stripe' ? (
                          <img src={StripeIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'card' ? (
                          <>
                            <img src={VisaLogo} /> <img src={MasterCardLogo} />
                          </>
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'checkout' ? (
                          <img src={CheckoutIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'affirm' ? (
                          <img src={AffirmIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'klarna' ? (
                          <img src={KlarnaIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'split-it' ? (
                          <img src={SplitIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'paypal' ? (
                          <img src={PaypalIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'easypaisa' ? (
                          <img src={EasypaisaIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'cash' ? (
                          <img src={CashIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'cod' ? (
                          <img src={CashIcon} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'applepay' ? (
                          <img src={ApplePayLogo} style={{ width: '100px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'googlepay' ? (
                          <img
                            src={GooglePayIcon}
                            style={{ width: '100px', display: 'inline' }}
                          />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'adyen' ? (
                          <img src={AdyenLogo} style={{ width: '50px' }} />
                        ) : (
                          ''
                        )}
                        {selectedMethod.paymentMethodName.toLowerCase() ==
                        'bitpay' ? (
                          <img src={BitpayLogo} style={{ width: '60px' }} />
                        ) : (
                          ''
                        )}
                      </div>
                      <div style={{ float: 'left', marginLeft: '10px' }}>
                        <span className={styles.SubTitle}>
                          {selectedMethod.paymentMethodName}
                        </span>
                        <br />
                        <span
                          style={{
                            margin: '0px',
                            marginTop: '15px',
                            fontWeight: '600',
                          }}
                        >
                          {selectedMethod.paymentMethodName}
                        </span>
                      </div>
                      <br />
                    </div>
                  </div>
                </Grid>

                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: 'auto',
                    paddingRight: 'auto',
                  }}
                >
                  We're going to add this to your 1 Click Checkout
                </div>
                <br />
                <br />

                <div
                  style={{
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {credentialFields.length > 0
                    ? credentialFields.map((field, index) => {
                        return (
                          <div key={index}>
                            <label
                              style={{
                                textTransform: 'capitalize',
                                fontWeight: 'bold',
                              }}
                            >
                              {/* {fieldLabels[index]} */}
                              {field.replaceAll('_', ' ')}
                            </label>{' '}
                            <br />
                            <TextField
                              value={fieldValues.field}
                              name={field}
                              fullWidth
                              onChange={(e) => handleInputChange(e, index)}
                              id='field'
                              sx={{
                                borderRadius: '2px !important',
                                // border: '1px solid gray !important',
                                padding: '0px !important',
                                marginBottom: '10px',
                                width: '100%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                              }}
                              type='password'
                              size='small'
                              placeholder='*************'
                              inputProps={{
                                className: styles.SearchField,
                              }}
                            />
                          </div>
                        )
                      })
                    : ''}
                  <label
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                    }}
                  >
                    Min Value
                  </label>{' '}
                  <TextField
                    value={fieldValues.min}
                    name={'min'}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                    id='min'
                    sx={{
                      borderRadius: '2px !important',

                      padding: '0px !important',
                      marginBottom: '10px',
                      width: '100%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                    type='text'
                    size='small'
                    placeholder='0'
                    inputProps={{
                      className: styles.SearchField,
                    }}
                  />
                  <label
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                    }}
                  >
                    Max value
                  </label>{' '}
                  <TextField
                    value={fieldValues.max}
                    name={'max'}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                    id='max'
                    sx={{
                      borderRadius: '2px !important',

                      padding: '0px !important',
                      marginBottom: '10px',
                      width: '100%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                    type='text'
                    size='small'
                    placeholder='100'
                    inputProps={{
                      className: styles.SearchField,
                    }}
                  />
                </div>
                <br />
                <div style={{ width: '100%', marginLeft: '35px' }}>
                  <Button
                    style={{ width: '52% !important' }}
                    className={styles.CancelButton}
                    onClick={() => {
                      setCredentialsModal(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ width: '50% !important' }}
                    className={styles.SaveButton}
                    onClick={submitPaymentMethod}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            ) : (
              ''
            )}
          </div>
        </Paper>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        autoHideDuration={1500}
        onClose={handleCloseNotification}
        TransitionComponent={Transition}
        action={action}
      >
        <Alert
          onClose={handleCloseNotification}
          severity='info'
          sx={{ width: '100%', fontWeight: 'bold' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Builder

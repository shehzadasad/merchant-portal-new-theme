import axios from 'axios'
import {
  SET_DROP_OFF_LOCATION_API_SUCCESS,
  SET_DROP_OFF_LOCATION_API_FAIL,
} from 'shared/constants/ActionTypes'
import { toast } from 'react-toastify'
export const setDropOffLocation = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_DROP_OFF_LOCATION_API_SUCCESS, payload: data })
}
export const setDropOffLocationError = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_DROP_OFF_LOCATION_API_FAIL, payload: data })
}

//// Apis
export const addRefundPolicy = (dataObj, setSuccess) => {
  return () => {
    // const data = JSON.stringify({
    //   data: dataObj,
    // })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/policy`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setSuccess(true)
          toast.success('Submission Successful!!!')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
        setSuccess(true)
      })
  }
}
export const addDropOffLocation = (
  dataObj,
  dropOffResponse,
  dropOffError,
  setSuccess
) => {
  return (dispatch) => {
    // const data = JSON.stringify({
    //   dataObj,
    // })
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/add/dropOffLocation`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        dropOffResponse(response)
        dispatch(setDropOffLocation(response))
        if (response.status === 200) {
          toast.success('Address Added')
          setSuccess(true)
        }
      })
      .catch(function (error) {
        dropOffError(error?.response?.data?.errors?.[0].errorMessage)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
        setSuccess(true)
        dispatch(
          setDropOffLocationError(
            error?.response?.data?.errors?.[0].errorMessage
          )
        )
      })
  }
}

export const deleteDropOffLocation = (dataObj) => {
  return () => {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/delete/dropOffLocation/${dataObj}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const updateRefundPolicy = (dataObj) => {}

export const getDropOffLocations = (id) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/get/dropOffLocation/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const getRefundPolicy = (
  dataObj,
  setRefundData,
  setLoader,
  setCustomerReasons,
  setSuccess
) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/policy/${dataObj}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        setRefundData(response.data.body)
        setLoader(false)
        setCustomerReasons(response.data.body.reason)
        // setSuccess(true)
      })
      .catch(function (error) {
        // if (
        //   error?.response?.data?.errors[0]?.errorMessage ===
        //     'Refund Policies Does not Exist' ||
        //   !error
        // ) {
        //   setLoader(false)
        // }
        console.log(error, 'error')
        setLoader(false)
      })
  }
}

export const getAllDropOffLocation = (dataObj, setAllDropOffLoc) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/get/allDropOffLocations/${dataObj}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      // data: dataObj,
    }

    axios(config)
      .then(function (response) {
        setAllDropOffLoc(response.data.body)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const getAllReturnsOrder = (
  id,
  setGetAllReturnOrder,
  setGetAllReturnData
) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/merchant/${id}/order`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setGetAllReturnData(response.data.body)
        setGetAllReturnOrder(response.data.body.content)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export const getAllReturnsOrderFilter = (
  id,
  setGetAllReturnOrder,
  setGetAllReturnData,
  queryParamsObj,
  value
) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/merchant/${id}/order?filter=${queryParamsObj}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setGetAllReturnData(response.data.body)
        setGetAllReturnOrder(response.data.body.content)
      })
      .catch(function (error) {
        console.log(value, 'data encoded')
      })
  }
}
export const getAllReturnsOrderFilterSearch = (
  id,
  setGetAllReturnOrder,
  setGetAllReturnData,
  queryParamsObj,
  value
) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/merchant/${id}/order?filter=${queryParamsObj}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setGetAllReturnData(response.data.body)
        setGetAllReturnOrder(response.data.body.content)
      })
      .catch(function (error) {
        console.log(value, 'data encoded')
      })
  }
}
export const getReturnOrderDetail = (
  id,
  setRefundItems,
  setReturnOrderDetails,
  setBillingDetail,
  setShippingDetails
) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/merchant/order/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setRefundItems(response.data.body.refund_items)
        setReturnOrderDetails(response.data.body.refunded_order_details)
        setBillingDetail(response.data.body.billing_details)
        setShippingDetails(response.data.body.shipping_details)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export const approveOrDeclineOrderRequest = (dataObj, setApprovedResponse) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/merchant/order/handle`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }
    axios(config)
      .then(function (response) {
        toast.success('Success')
        setApprovedResponse(true)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
      })
  }
}

export const S3UploadImage = (dataObj) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/file/upload/image`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(dataObj),
    }
    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error)
      })
  }
}

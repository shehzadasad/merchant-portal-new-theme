import axios from 'axios'
import {
  SET_ORDERS,
  SET_ORDERS_AMOUNT,
  SET_ORDERS_COUNT,
  SET_ORDERS_PAGE_DATA,
  SET_ORDERS_PENDING_PAYOUTS,
  SET_ORDER_DETAILS,
  SET_TOTAL_ORDERS,
  SET_ORDERS_DOWNLOAD_COUNT,
} from 'shared/constants/ActionTypes'

export const setOrders = (data) => {
  return (dispatch) => dispatch({ type: SET_ORDERS, payload: data })
}

export const setOrderDetails = (data) => {
  return (dispatch) => dispatch({ type: SET_ORDER_DETAILS, payload: data })
}

export const setOrderCount = (data) => {
  return (dispatch) => dispatch({ type: SET_ORDERS_COUNT, payload: data })
}

export const setOrderDownloadCount = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_ORDERS_DOWNLOAD_COUNT, payload: data })
}

export const setOrderAmount = (data) => {
  return (dispatch) => dispatch({ type: SET_ORDERS_AMOUNT, payload: data })
}

export const setOrdersTotalPage = (data) => {
  return (dispatch) => dispatch({ type: SET_ORDERS_PAGE_DATA, payload: data })
}

export const setOrdersTotalOrders = (data) => {
  return (dispatch) => dispatch({ type: SET_TOTAL_ORDERS, payload: data })
}

export const setOrderPendingAmount = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_ORDERS_PENDING_PAYOUTS, payload: data })
}

export const convertOrdersToCSV = (arr) => {
  return () => {
    const data = JSON.stringify({
      data: arr,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/convert/toCSV`,
      headers: {
        user_id: '84312',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        var blob = new Blob([response.data], {
          type: 'text/csv;charset=utf-8;',
        })
        var url = URL.createObjectURL(blob)

        var pom = document.createElement('a')
        pom.href = url
        pom.setAttribute('download', 'orders.csv')
        pom.click()

        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchOrders = (userId, value, page) => {
  return (dispatch) => {
    if (typeof userId === 'undefined' || userId === null) {
      return
    }

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/orders/search_order?search_order=${value}&merchant_user_id=${userId}&page=${page}`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        // dispatch(setTotalOrders(response.data.total_orders))
        dispatch(setOrders(response.data.orders))
        dispatch(setOrdersTotalPage(response.data.total_pages))
        dispatch(setOrdersTotalOrders(response.data.total_orders))
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export const searchOrders = (userId, data) => {
  return (dispatch) => {
    if (typeof userId === 'undefined' || userId === null) {
      return
    }

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/orders/search_order?search_order=${data}&merchant_user_id=${userId}`,
    }

    axios(config)
      .then(function (response) {
        dispatch(setOrders(response.data.orders))
        dispatch(setOrdersTotalPage(response.data.total_pages))
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          const config = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}merchant/orders/merchant_orders?merchant_user_id=${userId}&page=1&limit=10&sort=desc`,
          }

          axios(config)
            .then(function (response) {
              dispatch(setOrders(response.data.orders))
              dispatch(setOrdersTotalPage(response.data.total_pages))
            })
            .catch(function (error) {
              console.error(error)
            })
        } else if (error.response.status === 500) {
          return
        }
      })
  }
}

export const filterOrders = (data, userId) => {
  return (dispatch) => {
    if (typeof userId === 'undefined' || userId === null) {
      return
    }

    const config = {
      url: `${process.env.REACT_APP_API_URL}merchant/orders/filter_orders?merchant_user_id=${userId}&start_date=${data.startDate}&end_date=${data.endDate}`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        dispatch(setOrders(response.data.orders))
        // dispatch(setOrdersTotalPage(response.data.total_pages))

        // dispatch(setTotalOrders(response.data.total_orders))
        // dispatch(setOrders(response.data.orders))
        dispatch(setOrdersTotalPage(response.data.total_pages))
        // dispatch(setOrdersTotalOrders(response.data.total_orders))
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export const fetchOrdersCount = (merchantId) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/orders/order_count?m_user_id=${merchantId}&days=30`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        dispatch(setOrderCount(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchOrdersAmount = (merchantId) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/orders/orders_amount?m_user_id=${merchantId}&days=30`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        dispatch(setOrderAmount(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchOrdersPendingAmount = (merchantId) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/orders/pending_payout_amount?m_user_id=${merchantId}&days=30`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        dispatch(setOrderPendingAmount(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchOrderDetails = (orderId, merchantId) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/orders/get_order_details?order_id=${orderId}&merchant_user_id=${merchantId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          dispatch(setOrderDetails(response.data.current_order_details))
        } else {
          alert('Error')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export const fetchDownloadOrdersCount = (userId, start, end) => {
  return (dispatch) => {
    console.log(userId)
    if (typeof userId === 'undefined' || userId === null) {
      return
    }

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/orders/order_count_download?merchant_user_id=${userId}&fromTimeStamp=${start}&toTimestamp=${end}`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        dispatch(setOrderDownloadCount(response.data))
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

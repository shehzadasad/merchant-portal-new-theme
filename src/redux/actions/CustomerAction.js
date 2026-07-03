import axios from 'axios'
import { toast } from 'react-toastify'
import {
  SET_CUSTOMERS,
  SET_CUSTOMERS_TOTAL_PAGES,
  SET_CUSTOMER_INFO,
  SET_TOTAL_CUSTOMERS,
} from 'shared/constants/ActionTypes'

export const setCustomers = (data) => {
  return (dispatch) => dispatch({ type: SET_CUSTOMERS, payload: data })
}
export const setTotalCustomers = (data) => {
  return (dispatch) => dispatch({ type: SET_TOTAL_CUSTOMERS, payload: data })
}

export const setCustomerInfo = (data) => {
  return (dispatch) => dispatch({ type: SET_CUSTOMER_INFO, payload: data })
}

export const setCustomersTotalPages = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_CUSTOMERS_TOTAL_PAGES, payload: data })
}

export const convertCustomersToCSV = (arr) => {
  return () => {
    const data = JSON.stringify({
      data: arr,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/convert/toCSV`,
      headers: {
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
        pom.setAttribute('download', 'customers.csv')
        pom.click()
      })
      .catch(function (error) {
        if (error.response.data.errors[0].errorCode === 'APP-0010') {
          toast.error('No Customers Exist')
        }
      })
  }
}

export const fetchCustomers = (currentPage, mUserId, setLoading) => {
  return (dispatch) => {
    if (mUserId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/customers/list?merchant_user_id=${mUserId}&page=${currentPage}`,
        headers: {},
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          setLoading(false)

          dispatch(setCustomers(response.data.merchant_customers_list))
          dispatch(setCustomersTotalPages(response.data.total_pages))
          dispatch(setTotalCustomers(response.data.total_merchant_customers))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const fetchCustomerDetails = (currentPage, mUserId, cUserId) => {
  return (dispatch) => {
    if (mUserId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/customers/details?merchant_user_id=${mUserId}&page=${currentPage}&limit=10&customer_user_id=${cUserId}`,
        headers: {},
      }

      axios(config)
        .then(function (response) {
          dispatch(setTotalCustomers(response.data.total_merchant_customers))
          dispatch(
            setCustomerInfo(
              response.data ?? {
                merchant_customer_orders: [],
                merchant_customer_info: {},
              }
            )
          )
          dispatch(setCustomersTotalPages(response.data.total_pages ?? 0))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const searchCustomers = (currentPage, mUserId, searchText) => {
  return (dispatch) => {
    if (mUserId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/customers/list?merchant_user_id=${mUserId}&page=${currentPage}&limit=30&sort=asc&search=${searchText}`,
        headers: {},
      }

      axios(config)
        .then(function (response) {
          dispatch(setCustomers(response.data.merchant_customers_list))
          dispatch(setCustomersTotalPages(response.data.total_pages))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

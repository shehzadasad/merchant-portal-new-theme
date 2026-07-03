import axios from 'axios'
import {
  SET_BALANCE_SHEET,
  SET_PAYOUTS,
  SET_PAYOUTS_PAGE_DATA,
  SET_PAYOUT_ORDERS,
  SET_SHEETS_PAGE_DATA,
  SET_SHEET_ORDERS,
  IS_DATA_PRESENT,
} from 'shared/constants/ActionTypes'

export const setPayouts = (data) => {
  return (dispatch) => dispatch({ type: SET_PAYOUTS, payload: data })
}

export const setPayoutOrders = (data) => {
  return (dispatch) => dispatch({ type: SET_PAYOUT_ORDERS, payload: data })
}

export const setBalanceSheetList = (data) => {
  return (dispatch) => dispatch({ type: SET_BALANCE_SHEET, payload: data })
}

export const setSheetOrders = (data) => {
  return (dispatch) => dispatch({ type: SET_SHEET_ORDERS, payload: data })
}

export const setPayoutsPageData = (data) => {
  return (dispatch) => dispatch({ type: SET_PAYOUTS_PAGE_DATA, payload: data })
}

export const setSheetsPageData = (data) => {
  return (dispatch) => dispatch({ type: SET_SHEETS_PAGE_DATA, payload: data })
}
export const setIsDataPresent = (data) => {
  return (dispatch) => dispatch({ type: IS_DATA_PRESENT, payload: data })
}

export const convertPayoutsToCSV = (arr, token) => {
  return () => {
    const data = JSON.stringify({
      data: arr,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/convert/toCSV`,
      headers: {
        Authorization: `Bearer ${token}`,
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
        pom.setAttribute('download', 'payouts.csv')
        pom.click()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const convertSheetToCSV = (merchantId) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/finance/balanceSheetCsv/${merchantId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        var blob = new Blob([response.data], {
          type: 'text/csv;charset=utf-8;',
        })
        var url = URL.createObjectURL(blob)

        var pom = document.createElement('a')
        pom.href = url
        pom.setAttribute('download', 'balanceSheets.csv')
        pom.click()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const filterPayouts = (data, merchantId) => {
  return (dispatch) => {
    if (merchantId) {
      const filterParams = JSON.stringify(data)

      const encoded = encodeURIComponent(filterParams)

      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/finance/deposits/${merchantId}?${encoded}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      axios(config)
        .then(function (response) {
          dispatch(setPayouts(response.data.body.content))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const fetchPayouts = (token, currentPage, merchantId) => {
  return (dispatch) => {
    if (merchantId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/finance/deposits/${merchantId}?&page=${currentPage}&size=10`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      axios(config)
        .then(function (response) {
          dispatch(setPayouts(response.data.body.content))
          dispatch(setIsDataPresent(false))

          const pageableObject = {
            currentPage: response.data.body.number,
            first: response.data.body.first,
            totalPages: response.data.body.totalPages,
          }
          dispatch(setPayoutsPageData(pageableObject))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const fetchPayoutOrders = (id) => {
  return (dispatch) => {
    if (id) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/finance/getOrdersByDeposit/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          if (response.data.errors === null) {
            dispatch(setPayoutOrders(response.data.body.content))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const fetchBalanceSheetList = (
  currentPage,
  merchantId
  // setPageBtnCheck
) => {
  return (dispatch) => {
    if (merchantId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/finance/balanceSheet/${merchantId}?&page=${currentPage}&size=10`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          dispatch(setBalanceSheetList(response.data.body.content))
          const pageableObject = {
            first: response.data.body.first,
            totalPages: response.data.body.totalPages,
            totalElements: response.data.body.totalElements,
          }
          dispatch(setSheetsPageData(pageableObject))
          // setPageBtnCheck(true)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const fetchSheetOrders = (id) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/finance/getOrdersByBalanceSheet/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        if (response.data.errors === null) {
          dispatch(setSheetOrders(response.data.body.content))
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

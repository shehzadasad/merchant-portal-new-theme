import axios from 'axios'
import {
  SET_MERCHANT_BILLINGS,
  SET_MERCHANT_BILLINGS_PAGE_DATA,
} from 'shared/constants/ActionTypes'

export const setMerchantBillings = (data) => {
  return (dispatch) => dispatch({ type: SET_MERCHANT_BILLINGS, payload: data })
}

export const setMerchantBillingsPageData = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_MERCHANT_BILLINGS_PAGE_DATA, payload: data })
}

export const fetchMerchantBillings = (currentPage, merchantId) => {
  return (dispatch) => {
    if (merchantId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/billing/${merchantId}?&page=${currentPage}&size=10`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      axios(config)
        .then(function (response) {
          dispatch(setMerchantBillings(response.data.body.content))
          const pageableObject = {
            currentPage: response.data.body.number,
            first: response.data.body.first,
            totalPages: response.data.body.totalPages,
          }
          dispatch(setMerchantBillingsPageData(pageableObject))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

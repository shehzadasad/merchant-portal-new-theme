import axios from 'axios'
import { toast } from 'react-toastify'
import {
  SET_PRODUCTS,
  SET_PRODUCT_CURRENT_PAGE,
  SET_PRODUCT_DETAILS,
  SET_TOTAL_PAGES,
  SET_IS_OMS,
  SET_CURRENCY,
  SET_IS_IN_PROGRESS,
  SET_IS_ERROR,
  SET_IS_ERROR_MESSAGE,
  SET_PLATFORM,
} from 'shared/constants/ActionTypes'

export const setProducts = (data) => {
  return (dispatch) => dispatch({ type: SET_PRODUCTS, payload: data })
}

export const setProductDetails = (data) => {
  return (dispatch) => dispatch({ type: SET_PRODUCT_DETAILS, payload: data })
}

export const setProductsTotalPages = (data) => {
  return (dispatch) => dispatch({ type: SET_TOTAL_PAGES, payload: data })
}

export const setIsOms = (data) => {
  return (dispatch) => dispatch({ type: SET_IS_OMS, payload: data })
}

export const setPlatform = (data) => {
  return (dispatch) => dispatch({ type: SET_PLATFORM, payload: data })
}
export const setIsError = (data) => {
  return (dispatch) => dispatch({ type: SET_IS_ERROR, payload: data })
}
export const setIsErrorMessage = (data) => {
  return (dispatch) => dispatch({ type: SET_IS_ERROR_MESSAGE, payload: data })
}

export const setIsInProgress = (data) => {
  return (dispatch) => dispatch({ type: SET_IS_IN_PROGRESS, payload: data })
}

export const setCurrency = (data) => {
  return (dispatch) => dispatch({ type: SET_CURRENCY, payload: data })
}

export const setCurrentPageProducts = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_PRODUCT_CURRENT_PAGE, payload: data })
}

export const convertProductsToCSV = (arr, token) => {
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
        pom.setAttribute('download', 'products.csv')
        pom.click()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchProducts = (id, currentPage, setProductSync) => {
  return (dispatch) => {
    if (id) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/products/list?merchant_user_id=${id}&page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      axios(config)
        .then(function (response) {
          dispatch(setIsError(response.data.success))
          dispatch(
            setProducts(
              response.data.merchant_products_list === undefined
                ? []
                : response.data.merchant_products_list
            )
          )

          dispatch(setPlatform(response.data.platform))
          dispatch(setProductsTotalPages(response.data.total_pages))
          dispatch(setIsOms(response.data.is_oms))

          dispatch(setIsInProgress(response.data.is_in_progress))
          dispatch(setCurrency(response.data.currency))

          setProductSync(response.data.message)

          localStorage.setItem('currency', response.data.currency)
        })
        .catch(function (error) {
          // if (error.response.data.message === 'merchant_site not found') {
          dispatch(setIsErrorMessage(error.response.data.message))
          setProductSync(error.response.data.message)

          toast.error(error.response.data.message)
          // }
          // if (error.response.data.message === 'products sync not run') {
          //   toast.error
          // }
        })
    }
  }
}

export const searchProducts = (id, data, currentPage) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/products/search?merchant_user_id=${id}&search=${data}&page=${currentPage}`,
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setProducts(response.data.merchant_products_list))
        dispatch(setProductsTotalPages(response.data.total_pages))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchProductDetails = (productId, mUserId) => {
  return (dispatch) => {
    if (mUserId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/products/details?product_id=${productId}&merchant_user_id=${mUserId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      axios(config)
        .then(function (response) {
          dispatch(setProductDetails(response.data.data))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const syncProducts = (id) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/products/sync?merchant_user_id=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (response) {
        console.log('iidisn:', response)
      })
      .catch(function (error) {
        toast.error(
          error.response.data.message.charAt(0).toUpperCase() +
            error.response.data.message.slice(1)
        )
      })
  }
}

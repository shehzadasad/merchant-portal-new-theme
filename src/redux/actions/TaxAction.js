import axios from 'axios'
import { toast } from 'react-toastify'
import {
  CLOSE_UPDATE_SHIPPING_MODAL,
  CLOSE_UPDATE_TAX_MODAL,
  OPEN_UPDATE_SHIPPING_MODAL,
  OPEN_UPDATE_TAX_MODAL,
  SET_SHIPPING_LIST,
  SET_SHIPPING_PAGE_DATA,
  SET_TAX_LIST,
  SET_TAX_PAGE_DATA,
  SET_UPDATE_SHIPPING_RULE_DETAILS,
  SET_UPDATE_TAX_RULE_DETAILS,
} from 'shared/constants/ActionTypes'

export const setTaxes = (data) => {
  return (dispatch) => dispatch({ type: SET_TAX_LIST, payload: data })
}

export const setTaxesPageData = (data) => {
  return (dispatch) => dispatch({ type: SET_TAX_PAGE_DATA, payload: data })
}

export const openUpdateTaxModal = (data) => {
  return (dispatch) => dispatch({ type: OPEN_UPDATE_TAX_MODAL, payload: data })
}

export const closeUpdateTaxModal = (data) => {
  return (dispatch) => dispatch({ type: CLOSE_UPDATE_TAX_MODAL, payload: data })
}

export const setUpdateTaxRuleDetails = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_UPDATE_TAX_RULE_DETAILS, payload: data })
}

export const setShipping = (data) => {
  return (dispatch) => dispatch({ type: SET_SHIPPING_LIST, payload: data })
}

export const setShippingPageData = (data) => {
  return (dispatch) => dispatch({ type: SET_SHIPPING_PAGE_DATA, payload: data })
}

export const openUpdateShippingModal = (data) => {
  return (dispatch) =>
    dispatch({ type: OPEN_UPDATE_SHIPPING_MODAL, payload: data })
}

export const closeUpdateShippingModal = (data) => {
  return (dispatch) =>
    dispatch({ type: CLOSE_UPDATE_SHIPPING_MODAL, payload: data })
}

export const setUpdateShippingRuleDetails = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_UPDATE_SHIPPING_RULE_DETAILS, payload: data })
}

export const fetchTaxList = (merchantID, currentPage) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/tax/get/${merchantID}?&page=${currentPage}&size=10`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setTaxes(response.data.body.content))
        const pageableObject = {
          currentPage: response.data.body.number,
          first: response.data.body.first,
          totalPages: response.data.body.totalPages,
        }
        dispatch(setTaxesPageData(pageableObject))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchShippingList = (
  merchantID,
  currentPage,
  setShippingAllData
) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/shipping/get/${merchantID}?&page=${currentPage}&size=10`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setShipping(response.data.body.content))
        const pageableObject = {
          currentPage: response.data.body.number,
          first: response.data.body.first,
          totalPages: response.data.body.totalPages,
        }
        localStorage.removeItem('updateShippingDetails')
        dispatch(setShippingPageData(pageableObject))
        setShippingAllData(response.data.body)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const createTaxRule = (data) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/tax/add`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          toast.success('Success')
          window.location.reload()
        } else {
          toast.error('Failed')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const updateTaxRule = (data) => {
  return (dispatch) => {
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/tax/update`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          toast.success('Success')
          dispatch(closeUpdateTaxModal(false))
          window.location.reload()
        } else {
          toast.error('Failed')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const removeTaxRule = (ruleId) => {
  return () => {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/tax/delete/${ruleId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          toast.success('Success')
          window.location.reload()
        } else {
          toast.error('Failed')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const createShippingRule = (data, navigate, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/shipping/add`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      // timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          setSuccess(true)
          toast.success('Success')
          navigate('/shipping')
        } else {
          toast.error('Failed')
        }
      })
      .catch(function (error) {
        setSuccess(true)
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const updateShippingRule = (data, setSuccess, navigate) => {
  return (dispatch) => {
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/shipping/update`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          toast.success('Success')
          setSuccess(true)
          // window.location.href = '/shipping'
          // window.location.reload()
          navigate('/shipping')
        } else {
          toast.failed('Failed')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
        setSuccess(true)
      })
  }
}

export const removeShippingRule = (ruleId) => {
  return () => {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/rule/shipping/delete/${ruleId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          toast.success('Successfully deleted')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
      })
  }
}

import axios from 'axios'
import { toast } from 'react-toastify'
export const addBinDiscount = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/discounts/bin/add`,
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
          toast.success('Bin discount created')
        }
      })
      .catch(function (error) {
        console.log(error?.response?.data)
        toast.error(error?.response?.data)
        setSuccess(true)
      })
  }
}
export const getBinDiscount = (id, setDiscountData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/discounts/bin/get?merchant_user_id=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setDiscountData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export const deleteBinDiscount = (id, merchantId, setSuccess, handleCls) => {
  return () => {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}merchant/discounts/bin/delete?discount_id=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        toast.success(response.data)
        setSuccess(true)
        handleCls(false)
      })
      .catch(function (error) {
        console.log(error)

        setSuccess(true)
      })
  }
}

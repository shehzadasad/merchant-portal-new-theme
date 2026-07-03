import axios from 'axios'
import { toast } from 'react-toastify'

export const addPaymentLink = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/url-builder/add-url`,
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

          toast.success(response.data.message)
          const data = response.data.data

          if (data) {
            window.location.href = `/Payment_Link_Successful/${data.user_id}/${data.link_id}`
          }
        }
      })
      .catch(function (error) {
        console.log(error?.response.data.message)

        toast.error(
          error?.response?.data.message === 'record not found'
            ? 'Select a product or add new Product '
            : error?.response?.data.message
        )
      })
  }
}
export const getAllPaymentLinks = (id, setData, filterDate, setLoader) => {
  return () => {
    const config = {
      method: 'get',
      url:
        filterDate == '' || filterDate === 'All'
          ? `${process.env.REACT_APP_API_URL}merchant/url-builder/get_all_payment_links?user_id=${id}`
          : `${process.env.REACT_APP_API_URL}merchant/url-builder/get_all_payment_links?user_id=${id}&filter=${filterDate}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setData(response?.data?.data?.sort((a, b) => b.date - a.date))
        setLoader(false)
      })
      .catch(function (error) {
        setLoader(false)
        console.log(error, 'data encoded')
      })
  }
}

export const getPaymentLink = (userid, linkid, setSingleData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/url-builder/get_payment_link?user_id=${userid}&link_id=${linkid}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setSingleData(response?.data?.data)
      })
      .catch(function (error) {
        console.log(error, 'data encoded')
      })
  }
}
export const updatePaymentLink = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/url-builder/update_payment_link`,
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

          toast.success(response.data.message)
          setTimeout((window.location.href = '/link-builder'), 3000)
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data.message)
      })
  }
}

export const getProductDetail = (id, itemID, setDetailData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/products/details?merchant_user_id=${id}&product_id=${itemID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setDetailData(response.data.data)
      })
      .catch(function (error) {
        console.log(error, 'data encoded')
      })
  }
}

export const generateQRCode = (setQRCode) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/url-builder/generate_qr_code?payment_link=https%3A%2F%2Fstage.tezcheckout.qisstpay.com%2F%3Fidentity-token%3D%2526queryUrl%3DcHJvZHVjdHM9W3siYXR0cmlidXRlIjpudWxsLCJpZCI6MzI4LCJwcmljZSI6MTAwMCwicXVhbnRpdHkiOjEsInNyYyI6Imh0dHBzOi8vbWFya2V0cGxhY2UuNGdpdmVzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyMi8wOC9ob29kaWUtd2l0aC1sb2dvLTIuanBnIiwidGl0bGUiOiJUZXN0IFByb2R1Y3QifV0mcHJpY2U9MTAwMCZjdXJyZW5jeT1QSFAmc2hpcHBpbmdfdG90YWw9MCZ0YXg9MCZ1cmw9aHR0cHM6Ly9oZWFkbGVzcy1jb21tZXJjZS1wcm9kdWN0LnFpc3N0cGF5LmNvbSZpc19oZWFkbGVzcz0x`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        setQRCode(response.data)
        console.log(response.data, 'qr')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const searchLinks = (id, value, getData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/url-builder/search_link?merchant_user_id=${id}&search=${value}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        console.log(response.data)
        getData(response.data)
      })
      .catch(function (error) {
        console.log(error, 'data encoded')
      })
  }
}

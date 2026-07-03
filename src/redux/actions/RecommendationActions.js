import axios from 'axios'
import { toast } from 'react-toastify'
export const getMerchantRecommendationSettings = (id,
    setRecommendationData) => {
    return () => {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/settings/reccomendation-engine?merchant_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
      axios(config)
        .then(function (response) {
         
          setRecommendationData(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

export const updateMerchantRecommendationSettings = (dataObj) => {
    return () => {
    
      const config = {
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}merchant/settings/reccomendation-engine`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
         
        })
        .catch(function (error) {
          console.log(error)
          toast.error(error?.response?.data?.errors?.[0].errorMessage)
     
        })
    }
  }
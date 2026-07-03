import axios from 'axios'
import { toast } from 'react-toastify'
export const getOnBoardingDetails = (id, setOnBoardingData) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/merchant-onboarding/${id}`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      // data: dataObj,
    }

    axios(config)
      .then(function (response) {

        setOnBoardingData(response.data.body)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export const addOnBoardingBussinessInfo = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/merchant-onboarding/business`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Bussiness Information Submitted!!!')
          setSuccess(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
        setSuccess(true)
      })
  }
}
export const addOnBoardingContactInfo = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/merchant-onboarding/contact`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Contact Information Submitted!!!')
          setSuccess(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
        setSuccess(true)
      })
  }
}
export const addOnBoardingDocument = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/merchant-onboarding/document`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Documents Submitted !!!')
          setSuccess(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
        setSuccess(true)
      })
  }
}
export const addMerchantOnboardingDetail = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/merchant-onboarding`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Submission Successful!!!')
          setSuccess(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
        setSuccess(true)
      })
  }
}
export const addOnBoardingBankInfo = (dataObj, setSuccess) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/merchant-onboarding/bank`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Bank Information submitted!!!')
          setSuccess(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
        setSuccess(true)
      })
  }
}

export const getCountries = (id, setGetCoutryData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/app/world/countries`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setGetCoutryData(response.data.data)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
      })
  }
}

export const getStateByCountyID = (id, setStatesData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/app/world/states/countryId/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
        
          setStatesData(response.data.data.states)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
      })
  }
}

export const getCitiesByStateID = (id, setCitiesData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/app/world/cities/stateId/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setCitiesData(response.data.data.cities)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
      })
  }
}

export const getBanksByCountryId = (id, setBankData) => {
  return () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/merchants/country/${id}/banks`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setBankData(response.data.banks)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error?.response?.data?.errors?.[0].errorMessage)
      })
  }
}

export const getBannerPercentage = (id, setPercentage) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/banner/percentage/${id}`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      // data: dataObj,
    }

    axios(config)
      .then(function (response) {

        setPercentage(response.data.body)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

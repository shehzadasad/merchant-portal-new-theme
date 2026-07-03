import { setAuthToken } from '@crema/services/auth/jwt-auth'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  SET_ADD_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS,
  SET_ADD_USER_PASSWORD_VERIFY,
  SET_BANKING_ACCOUNTS,
  SET_CITIES,
  SET_DELETE_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS,
  SET_DELETE_USER_PASSWORD_VERIFY,
  SET_OTP_TOKEN,
  SET_ROLES,
  SET_STATES,
  SET_UPDATE_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS,
  SET_UPDATE_USER_PASSWORD_VERIFY,
  SET_USERS,
  SET_USERS_API_ERROR,
  SET_USERS_API_SUCCESS,
  SET_USER_DETAIL,
  SET_USER_PASSWORD_VERIFY,
  SET_USER_TOKEN,
  SET_USERS_PAGE_DATA,
  SET_IS_LOGGED_IN,
  SET_MERCHANT_STATES,
  SET_BANKS,
  SET_TIMER,
  SET_COUNTRY,
} from 'shared/constants/ActionTypes'

export const setUsersList = (data) => {
  return (dispatch) => dispatch({ type: SET_USERS, payload: data })
}

export const setAPIError = (data) => {
  return (dispatch) => dispatch({ type: SET_USERS_API_ERROR, payload: data })
}

export const setAPISuccess = (data) => {
  return (dispatch) => dispatch({ type: SET_USERS_API_SUCCESS, payload: data })
}

export const setOTPToken = (data) => {
  return (dispatch) => dispatch({ type: SET_OTP_TOKEN, payload: data })
}

export const setUserToken = (data) => {
  return (dispatch) => dispatch({ type: SET_USER_TOKEN, payload: data })
}

export const setPasswordVerifySuccess = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_USER_PASSWORD_VERIFY, payload: data })
}

export const setAddUserPasswordVerifySuccess = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_ADD_USER_PASSWORD_VERIFY, payload: data })
}

export const setUpdateUserPasswordVerifySuccess = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_UPDATE_USER_PASSWORD_VERIFY, payload: data })
}

export const setDeleteUserPasswordVerifySuccess = (data) => {
  return (dispatch) =>
    dispatch({ type: SET_DELETE_USER_PASSWORD_VERIFY, payload: data })
}

export const setRoles = (data) => {
  return (dispatch) => dispatch({ type: SET_ROLES, payload: data })
}

export const setUserDetail = (data) => {
  return (dispatch) => dispatch({ type: SET_USER_DETAIL, payload: data })
}

export const setCities = (data) => {
  return (dispatch) => dispatch({ type: SET_CITIES, payload: data })
}

export const setStates = (data) => {
  return (dispatch) => dispatch({ type: SET_STATES, payload: data })
}

export const setCountry = (data) => {
  return (dispatch) => dispatch({ type: SET_COUNTRY, payload: data })
}

export const setBankingAccounts = (data) => {
  return (dispatch) => dispatch({ type: SET_BANKING_ACCOUNTS, payload: data })
}

export const setAddBankAccountPasswordVerifySuccess = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_ADD_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS,
      payload: data,
    })
}

export const setDeleteBankAccountPasswordVerifySuccess = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_DELETE_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS,
      payload: data,
    })
}

export const setUpdateBankAccountPasswordVerifySuccess = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_UPDATE_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS,
      payload: data,
    })
}

export const setUsersPageData = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_USERS_PAGE_DATA,
      payload: data,
    })
}

export const setIsLoggedIn = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_IS_LOGGED_IN,
      payload: data,
    })
}

export const setMerchantStates = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_MERCHANT_STATES,
      payload: data,
    })
}

export const setBanks = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_BANKS,
      payload: data,
    })
}

function uniqByKeepFirst(a, key) {
  let seen = new Set()
  return a.filter((item) => {
    let k = key(item)
    return seen.has(k) ? false : seen.add(k)
  })
}

export const getUsersList = (merchantId, pageNumber) => {
  return (dispatch) => {
    if (merchantId) {
      const config = {
        method: 'get',
        url: `${
          process.env.REACT_APP_API_URL
        }ms-merchant-portal/users/merchant/${merchantId}?&page=${parseInt(
          pageNumber
        )}&size=20`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      axios(config)
        .then(function (response) {
          const tempUsers = uniqByKeepFirst(
            response.data.body.content,
            (it) => it.id
          )

          dispatch(setUsersList(tempUsers))
          const pageableObject = {
            currentPage: response.data.body.number,
            first: response.data.body.first,
            totalPages: response.data.body.totalPages,
          }
          dispatch(setUsersPageData(pageableObject))
        })
        .catch(function (error) {
          console.error(error)
          setAPIError(error)
        })
    }
  }
}

export const fetchToken = () => {
  return (dispatch) => {
    const axios = require('axios')
    const data = JSON.stringify({
      value: '+923323561745',
      type: 'PHONE',
      otp: '0000',
      segmentId: '599a3c15-bd74-49b6-9ef4-a671c9d59396',
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/1cc/verifyotp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        dispatch(setOTPToken(response.data.data.token))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const addUser = ({ name, email, phoneNumber, merchantId, roles }) => {
  return (dispatch) => {
    const data = {
      merchantId: merchantId,
      cityId: 60,
      stateId: 54,
      countryId: 1,
      city: 'Karachi',
      state: 'Sindh',
      country: 'PK',
      name: name,
      email: email,
      type: 'STORE',
      phoneNumber: phoneNumber,
      dateOfBirth: '1996-09-09',
      gender: 'Male',
      zip: '7637',
      address: 'abc',
      status: 'ACTIVE',
      roles: roles,
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/users/add`,
      headers: {
        Authorization: `Bearer  ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 400) {
          toast.error('User already exists')
          return
        }

        if (response.data.body.id) {
          toast.success('User successfully added')
          dispatch(setAPISuccess('USER_SUCCESSFULLY_ADDED'))
          window.location.reload()
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.errors[0].errorMessage)
      })
  }
}

export const deleteUser = (userId) => {
  return () => {
    const axios = require('axios')

    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/users/delete/${userId}`,
      headers: {
        user_id: '84312',
        Authorization: `Bearer  ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        if (response.data.body.isDeleted === true) {
          toast.success('Successfully user deleted')
          return (window.location.href = '/users')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const updateUser = ({ userId, email, phoneNumber, roles }) => {
  return () => {
    const axios = require('axios')
    const data = JSON.stringify({
      userId: userId,
      email: email,
      phoneNumber: phoneNumber,
      roles: roles,
    })

    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/users/update`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${localStorage.getItem('token')}`,
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        toast.success('Success')
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const convertToCSV = (arr) => {
  // MER-89
  return () => {
    const axios = require('axios')
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

        // Create a link to download it
        var pom = document.createElement('a')
        pom.href = url
        pom.setAttribute('download', 'export.csv')
        pom.click()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const filterUsers = (data, merchantId) => {
  return (dispatch) => {
    const filterParams = JSON.stringify(data)

    const encoded = encodeURIComponent(filterParams)

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/users/merchant/${merchantId}?filter=${encoded}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (response) {
        dispatch(setUsersList(response.data.body.content))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const userLogin = ({ email, password, merchantId, setIsLoading }) => {
  return (dispatch) => {
    const data = {
      email: email,
      password: password,
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(async function (response) {
        if (response.status === 200) {
          if (response.data.accessToken.length > 9) {
            dispatch(setIsLoggedIn(true))
            // toast.success('Successfully logged in')
            dispatch(setUserToken(response.data.accessToken))
            setAuthToken(response.data.accessToken)
            localStorage.setItem('token', response.data.accessToken)

            const tempConfig = {
              method: 'get',
              url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/userInfo?type=MERCHANT`,
              headers: {
                Authorization: `Bearer ${response.data.accessToken}`,
                Accept: 'application/json',
              },
              timeout: 5000,
            }

            axios(tempConfig)
              .then(function (response) {
                localStorage.setItem(
                  'userCountryId',
                  response.data.countryId ?? 168
                )
                localStorage.setItem('isMall', response.data.isMall ?? false)

                localStorage.setItem('merchantType', response.data.merchantType)
                // if (
                //   response.data.passwordChangedAt === null ||
                //   typeof response.data.passwordChangedAt === 'undefined'
                // ) {
                //   window.location.href = '/reset-password'
                // } else {

                const config = {
                  method: 'get',
                  url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/status/${response.data.merchantId}`,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                  timeout: 5000,
                }

                axios(config)
                  .then(function (response) {
                    setIsLoading(false)

                    dispatch(setMerchantStates(response.data.body))
                    localStorage.setItem(
                      'merchantstatesOnboarding',
                      response.data.body.onboardingApplicationApproved
                    )

                    if (!response.data.body.onboardingApplicationApproved) {
                      window.location.href = '/onBoarding'
                    } else {
                      window.location.href = '/dashboard'
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
                // }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        } else {
          setIsLoading(false)

          console.log('error')
          toast.error('Error')
          dispatch(setIsLoggedIn(false))
          // setAuthToken(null)
          console.error(response.data.message)
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message)

        setIsLoading(false)
      })
  }
}

export const userSignUp = ({ name, email, phoneNumber }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      name: name,
      email: email,
      type: 'MERCHANT',
      status: 'ACTIVE',
      phoneNumber: phoneNumber,
      websiteURL: 'https://bilal.qisstpay.com',
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/signup`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('User successfully created')
          window.location.href = '/signin'
        } else {
          toast.error('User already exists')
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message)
      })
  }
}
export const lenderSignUp = ({ name, email, phoneNumber }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      name: name,
      email: email,
      type: 'MERCHANT',
      status: 'ACTIVE',
      phoneNumber: phoneNumber,
      websiteURL: 'https://bilal.qisstpay.com',
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/signup/lender`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('User successfully created')
          window.location.href = '/signin-lender'
        } else {
          toast.error('User already exists')
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message)
      })
  }
}

export const userPasswordVerify = ({ email, password, token }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/verifyUser`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          dispatch(setPasswordVerifySuccess(true))
          return true
        } else {
          dispatch(setPasswordVerifySuccess(false))
          return false
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export const addUserPasswordVerify = ({ email, password }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/verifyUser`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          dispatch(setAddUserPasswordVerifySuccess('USER_SUCCESSFULLY_ADDED'))
          return true
        } else {
          dispatch(setAddUserPasswordVerifySuccess('USER_ADD_ERROR'))
          return false
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.errors[0].errorMessage)
      })
  }
}

export const updateUserPasswordVerify = ({ email, password, token }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/verifyUser`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          dispatch(
            setUpdateUserPasswordVerifySuccess('USER_SUCCESSFULLY_UPDATED')
          )
          return true
        } else {
          dispatch(setUpdateUserPasswordVerifySuccess('USER_UPDATE_ERROR'))
          return false
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.errors[0].errorMessage)
      })
  }
}

export const deleteUserPasswordVerify = ({ email, password, token }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/verifyUser`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          dispatch(
            setDeleteUserPasswordVerifySuccess('USER_SUCCESSFULLY_DELETED')
          )
        } else {
          dispatch(setDeleteUserPasswordVerifySuccess('USER_DELETE_ERROR'))
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchRoles = () => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/users/roles`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setRoles(response.data.body))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const forgotPassword = (email) => {
  return () => {
    const body = {
      email: email,
      password: null,
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/forgetPassword`,
      timeout: 5000,
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const changePassword = (data) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/changePassword`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          toast.success('Success')
          localStorage.setItem('firstTime', 'false')
        } else {
          toast.error('Error')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const resetPassword = (data) => {
  return () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/changePassword`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 201 || response.status === 200) {
          toast.success('Success')
          localStorage.setItem('firstTime', 'false')
          window.location.href = '/dashboard'
        } else {
          toast.error('Error')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.message)
      })
  }
}

export const fetchUserDetail = () => {
  return (dispatch) => {
    if (
      localStorage.getItem('token') === null ||
      typeof localStorage.getItem('token') === 'undefined'
    ) {
      return
    }

    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/userInfo?type=MERCHANT`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 60000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setUserDetail(response.data))
        localStorage.setItem('userCountryId', response.data.countryId ?? 168)
      })
      .catch(function (error) {
        dispatch(logoutViaAPI())
        localStorage.clear()
        window.location.reload()
        window.location.href = '/signin'
      })
  }
}

export const fetchMerchantStates = (merchantId) => {
  return (dispatch) => {
    if (
      localStorage.getItem('token') === null ||
      typeof localStorage.getItem('token') === 'undefined'
    ) {
      return
    }
    if (merchantId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/status/${merchantId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          dispatch(setMerchantStates(response.data.body))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

// export const fetchCountries = () => {
//   return (dispatch) => {
//     const config = {
//       method: 'get',
//       url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/app/world/countries`,
//       headers: {
//         'IP-ADDRESS': '52.76.98.234',
//       },
//       timeout: 5000,
//     }

//     axios(config)
//       .then(function (response) {
//         let countriesList = response.data.data
//         let countriesObj = {}
//         for (let singleCountry of countriesList) {
//           countriesObj[singleCountry.name] = singleCountry.countryId
//         }

//         let countriesList2 = Object.keys(countriesObj)
//         let countryName = 'Afghanistan'
//         let countryId = countriesObj[countryName]

//         // dispatch(setCountry(countriesList2))

//       })
//       .catch(function (error) {
//         console.error(error)
//       })
//   }
// }

export const fetchStatesByCountryId = (countryId) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/app/world/states/countryId/${countryId}`,
      headers: {
        'IP-ADDRESS': '52.76.98.234',
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setStates(response.data.data.states))
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export const fetchCitiesByCountryId = (stateId) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/app/world/cities/stateId/${stateId}`,
      headers: {
        'IP-ADDRESS': '52.76.98.234',
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setCities(response.data.data.cities))
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export const updateMerchantProfile = (data) => {
  return () => {
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}merchant/settings/update_profile`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 202
        ) {
          toast.success('Success')
        } else {
          toast.error('Error')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const getBankingAccounts = (mUserId) => {
  return (dispatch) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/settings/get-bank-accounts?merchant_user_id=${mUserId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        dispatch(setBankingAccounts(response.data.bank_accounts))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const deleteBankAccount = (mUserId, mAccId) => {
  return (dispatch) => {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}merchant/settings/delete-bank-account?merchant_user_id=${mUserId}&merchant_account_id=${mAccId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    }

    axios(config)
      .then(function (response) {
        if (
          response.status === 201 ||
          response.status === 200 ||
          response.status === 202
        ) {
          toast.success('Successfully deleted')
          window.location.reload()
        }
        if (response.status === 500) {
          toast.success('Successfully deleted')
        }
      })
      .catch(function (error) {
        const message = error.response.data.message.toLowerCase()
        toast.error(message.charAt(0).toUpperCase() + message.slice(1))
      })
  }
}

export const updateBankAccount = (mUserId) => {
  return (dispatch) => {
    const data = {
      id: 1694,
      account_number: '1234fds',
    }

    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}merchant/settings/edit-bank-account?merchant_user_id=${mUserId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (
          response.status === 201 ||
          response.status === 200 ||
          response.status === 204
        ) {
          toast.success('Successfully updated')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const addBankAccount = (mUserId, data) => {
  return (dispatch) => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/settings/add-bank-account?merchant_user_id=${mUserId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (
          response.status === 201 ||
          response.status === 200 ||
          response.status === 204
        ) {
          toast.success('Successfully added')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const markBankAccountDefault = (mUserId, bankAccId) => {
  return (dispatch) => {
    const data = ''

    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}merchant/settings/default-bank-account?merchant_user_id=${mUserId}&bank_account_id=${bankAccId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 5000,
      data: data,
    }

    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const addBankAccountPasswordVerify = ({ email, password }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/verifyUser`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          dispatch(
            setAddBankAccountPasswordVerifySuccess('USER_SUCCESSFULLY_ADDED')
          )
          return true
        } else {
          dispatch(setAddBankAccountPasswordVerifySuccess('USER_ADD_ERROR'))
          return false
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const updateBankAccountPasswordVerify = ({ email, password }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/verifyUser`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          dispatch(
            setUpdateBankAccountPasswordVerifySuccess(
              'USER_SUCCESSFULLY_UPDATED'
            )
          )
          return true
        } else {
          dispatch(
            setUpdateBankAccountPasswordVerifySuccess('USER_UPDATE_ERROR')
          )
          return false
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const deleteBankAccountPasswordVerify = ({ email, password }) => {
  return (dispatch) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/verifyUser`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          dispatch(
            setDeleteBankAccountPasswordVerifySuccess(
              'USER_SUCCESSFULLY_DELETED'
            )
          )
        } else {
          dispatch(
            setDeleteBankAccountPasswordVerifySuccess('USER_DELETE_ERROR')
          )
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const fetchBanks = (countryId) => {
  return (dispatch) => {
    if (countryId) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-web-external-apis/merchants/country/${countryId}/banks`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          dispatch(setBanks(response.data.banks))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const logoutViaAPI = () => {
  return (dispatch) => {
    if (localStorage.getItem('token')) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/logout`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            toast.success('Logged out')
            localStorage.clear()
            window.location.href('/signin')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const updateTimerConfiguration = (data) => {
  return (dispatch) => {
    if (localStorage.getItem('token')) {
      const config = {
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}merchant/settings/update-order-timer`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
        data: data,
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            toast.success('Successfully Updated')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export const setTimer = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_TIMER,
      payload: data,
    })
}

export const getTimer = (user_id) => {
  return (dispatch) => {
    if (localStorage.getItem('token')) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/settings/get-order-timer?merchant_user_id=${user_id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            dispatch(setTimer(response.data.has_order_timer))
            // toast.success('Logged out')
            // localStorage.clear()
            // window.location.href('/signin')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

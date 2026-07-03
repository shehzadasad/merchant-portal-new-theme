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
  SET_COUNTRY,
  SET_UPDATE_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS,
  SET_UPDATE_USER_PASSWORD_VERIFY,
  SET_USERS,
  SET_USERS_API_ERROR,
  SET_USERS_API_SUCCESS,
  SET_USERS_PAGE_DATA,
  SET_USER_DETAIL,
  SET_USER_PASSWORD_VERIFY,
  SET_USER_TOKEN,
  SET_IS_LOGGED_IN,
  SET_MERCHANT_STATES,
  SET_BANKS,
  SET_TIMER,
} from 'shared/constants/ActionTypes'

const initialSettings = {
  users: [],
  otpToken: null,
  apiError: '',
  apiSuccess: '',
  userToken: null,
  userPasswordVerifyStatus: null,
  addUserPasswordVerifyStatus: null,
  updateUserPasswordVerifyStatus: null,
  deleteUserPasswordVerifyStatus: null,
  addBankAccountPasswordVerifyStatus: null,
  deleteBankAccountPasswordVerifyStatus: null,
  updateBankAccountPasswordVerifyStatus: null,
  roles: [],
  userDetail: {},
  cities: [],
  states: [],
  bankAccounts: [],
  pageData: {},
  isLoggedIn: false,
  merchantStates: {},
  banks: [],
  timer: false,
}

const usersReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case SET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      }
    case SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      }
    case SET_OTP_TOKEN:
      return {
        ...state,
        otpToken: action.payload,
      }
    case SET_USERS_API_ERROR:
      return {
        ...state,
        apiError: action.payload,
      }
    case SET_USERS_API_SUCCESS:
      return {
        ...state,
        apiSuccess: action.payload,
      }
    case SET_USER_PASSWORD_VERIFY:
      return {
        ...state,
        userPasswordVerifyStatus: action.payload,
      }
    case SET_ADD_USER_PASSWORD_VERIFY:
      return {
        ...state,
        addUserPasswordVerifyStatus: action.payload,
      }
    case SET_DELETE_USER_PASSWORD_VERIFY:
      return {
        ...state,
        deleteUserPasswordVerifyStatus: action.payload,
      }
    case SET_UPDATE_USER_PASSWORD_VERIFY:
      return {
        ...state,
        updateUserPasswordVerifyStatus: action.payload,
      }
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      }
    case SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      }
    case SET_STATES:
      return {
        ...state,
        states: action.payload,
      }
    case SET_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      }
    case SET_BANKING_ACCOUNTS:
      return {
        ...state,
        bankAccounts: action.payload,
      }
    case SET_ADD_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS:
      return {
        ...state,
        addBankAccountPasswordVerifyStatus: action.payload,
      }
    case SET_UPDATE_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS:
      return {
        ...state,
        updateBankAccountPasswordVerifyStatus: action.payload,
      }
    case SET_DELETE_BANK_ACCOUNT_PASSWORD_VERIFY_STATUS:
      return {
        ...state,
        deleteBankAccountPasswordVerifyStatus: action.payload,
      }
    case SET_USERS_PAGE_DATA:
      return {
        ...state,
        pageData: action.payload,
      }
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    case SET_MERCHANT_STATES:
      return {
        ...state,
        merchantStates: action.payload,
      }
    case SET_BANKS:
      return {
        ...state,
        banks: action.payload,
      }
    case SET_TIMER:
      return {
        ...state,
        timer: action.payload,
      }

    default:
      return state
  }
}

export default usersReducer

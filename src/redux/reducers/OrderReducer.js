import {
  SET_ORDERS,
  SET_ORDERS_AMOUNT,
  SET_ORDERS_API_ERROR,
  SET_ORDERS_API_SUCCESS,
  SET_ORDERS_COUNT,
  SET_ORDERS_PAGE_DATA,
  SET_ORDERS_PENDING_PAYOUTS,
  SET_ORDER_DETAILS,
  SET_OTP_TOKEN,
  SET_TOTAL_ORDERS,
  SET_ORDERS_DOWNLOAD_COUNT,
} from 'shared/constants/ActionTypes'

const initialSettings = {
  orders: [],
  ordersCount: {},
  ordersAmount: {},
  orderDetails: {},
  ordersPendingAmount: {},
  otpToken: null,
  apiError: '',
  apiSuccess: '',
  totalPages: 0,
  totalOrders: 0,
  orderDownloadCount: {},
}

const orderReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      }
    case SET_OTP_TOKEN:
      return {
        ...state,
        otpToken: action.payload,
      }
    case SET_ORDERS_COUNT:
      return {
        ...state,
        ordersCount: action.payload,
      }
    case SET_ORDERS_DOWNLOAD_COUNT:
      return {
        ...state,
        orderDownloadCount: action.payload,
      }
    case SET_ORDERS_AMOUNT:
      return {
        ...state,
        ordersAmount: action.payload,
      }
    case SET_ORDERS_PENDING_PAYOUTS:
      return {
        ...state,
        ordersPendingAmount: action.payload,
      }
    case SET_ORDERS_API_ERROR:
      return {
        ...state,
        apiError: action.payload,
      }
    case SET_ORDERS_API_SUCCESS:
      return {
        ...state,
        apiSuccess: action.payload,
      }
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      }
    case SET_ORDERS_PAGE_DATA:
      return {
        ...state,
        totalPages: action.payload,
      }
    case SET_TOTAL_ORDERS:
      return {
        ...state,
        totalOrders: action.payload,
      }
    default:
      return state
  }
}

export default orderReducer

import {
  SET_CUSTOMERS,
  SET_CUSTOMERS_TOTAL_PAGES,
  SET_CUSTOMER_INFO,
} from 'shared/constants/ActionTypes'

const initialSettings = {
  customers: [],
  customerInfo: {},
  totalPages: 1,
  currentPage: 1,
}

const customerReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      }
    case SET_CUSTOMERS_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      }
    case SET_CUSTOMER_INFO:
      return {
        ...state,
        customerInfo: action.payload,
      }
    default:
      return state
  }
}

export default customerReducer

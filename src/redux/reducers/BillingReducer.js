import {
  SET_BALANCE_SHEET,
  SET_PAYOUTS,
  SET_PAYOUTS_PAGE_DATA,
  SET_PAYOUT_ORDERS,
  SET_SHEETS_PAGE_DATA,
  SET_SHEET_ORDERS,
} from 'shared/constants/ActionTypes'

const initialSettings = {
  payouts: [],
  balanceSheet: [],
  payoutOrders: [],
  sheetOrders: [],
  payoutsPageData: {
    number: 0,
  },
  sheetPageData: {
    number: 0,
  },
}

const billingReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_PAYOUTS:
      return {
        ...state,
        payouts: action.payload,
      }
    case SET_BALANCE_SHEET:
      return {
        ...state,
        balanceSheet: action.payload,
      }
    case SET_PAYOUT_ORDERS:
      return {
        ...state,
        payoutOrders: action.payload,
      }
    case SET_SHEET_ORDERS:
      return {
        ...state,
        sheetOrders: action.payload,
      }
    case SET_SHEETS_PAGE_DATA:
      return {
        ...state,
        sheetPageData: action.payload,
      }
    case SET_PAYOUTS_PAGE_DATA:
      return {
        ...state,
        payoutsPageData: action.payload,
      }
    default:
      return state
  }
}

export default billingReducer

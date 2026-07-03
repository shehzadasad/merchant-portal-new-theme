import {
  SET_MERCHANT_BILLINGS,
  SET_MERCHANT_BILLINGS_PAGE_DATA,
} from 'shared/constants/ActionTypes'

const initialSettings = {
  merchantBillings: [],
  merchantBillingsPageData: {
    number: 0,
  },
}

const merchantBillingsReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_MERCHANT_BILLINGS:
      return {
        ...state,
        merchantBillings: action.payload,
      }
    case SET_MERCHANT_BILLINGS_PAGE_DATA:
      return {
        ...state,
        merchantBillingsPageData: action.payload,
      }
    default:
      return state
  }
}

export default merchantBillingsReducer

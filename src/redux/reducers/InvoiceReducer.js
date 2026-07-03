import { SET_INVOICES } from 'shared/constants/ActionTypes'

const initialSettings = {
  invoices: [],
  pageData: {
    number: 0,
  },
}

const invoiceReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      }
    default:
      return state
  }
}

export default invoiceReducer

import {
  CLOSE_UPDATE_SHIPPING_MODAL,
  CLOSE_UPDATE_TAX_MODAL,
  OPEN_UPDATE_SHIPPING_MODAL,
  OPEN_UPDATE_TAX_MODAL,
  SET_SHIPPING_LIST,
  SET_SHIPPING_PAGE_DATA,
  SET_TAX_LIST,
  SET_TAX_PAGE_DATA,
  SET_UPDATE_SHIPPING_RULE_DETAILS,
  SET_UPDATE_TAX_RULE_DETAILS,
} from 'shared/constants/ActionTypes'

const initialSettings = {
  taxes: [],
  isUpdateTaxModalOpened: false,
  updateTaxRuleDetails: {},
  shippings: [],
  isUpdateShippingModalOpened: false,
  updateShippingRuleDetails: {},
  taxesPageData: {},
  shippingsPageData: {},
}

const taxReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_TAX_LIST:
      return {
        ...state,
        taxes: action.payload,
      }
    case OPEN_UPDATE_TAX_MODAL:
      return {
        ...state,
        isUpdateTaxModalOpened: true,
      }
    case CLOSE_UPDATE_TAX_MODAL:
      return {
        ...state,
        isUpdateTaxModalOpened: false,
      }
    case SET_UPDATE_TAX_RULE_DETAILS:
      return {
        ...state,
        updateTaxRuleDetails: action.payload,
      }
    case SET_SHIPPING_LIST:
      return {
        ...state,
        shippings: action.payload,
      }
    case OPEN_UPDATE_SHIPPING_MODAL:
      return {
        ...state,
        isUpdateTaxModalOpened: true,
      }
    case CLOSE_UPDATE_SHIPPING_MODAL:
      return {
        ...state,
        isUpdateTaxModalOpened: false,
      }
    case SET_UPDATE_SHIPPING_RULE_DETAILS:
      return {
        ...state,
        updateShippingRuleDetails: action.payload,
      }
    case SET_TAX_PAGE_DATA:
      return {
        ...state,
        taxesPageData: action.payload,
      }
    case SET_SHIPPING_PAGE_DATA:
      return {
        ...state,
        shippingsPageData: action.payload,
      }

    default:
      return state
  }
}

export default taxReducer

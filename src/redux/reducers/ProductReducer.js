import {
  SET_PRODUCTS,
  SET_PRODUCT_CURRENT_PAGE,
  SET_PRODUCT_DETAILS,
  SET_TOTAL_PAGES,
  SET_IS_OMS,
  SET_CURRENCY,
  SET_IS_IN_PROGRESS,
  SET_IS_ERROR,
  SET_IS_ERROR_MESSAGE,
  SET_PLATFORM,
} from 'shared/constants/ActionTypes'

const initialSettings = {
  products: [],
  isOms: true,
  isInProgress: true,
  currency: '',
  productDetails: {},
  currentPage: 1,
  totalPages: 0,
  isError: false,
  isErrorMessage: '',
}

const productReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      }
    case SET_PRODUCT_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      }
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      }
    case SET_IS_OMS:
      return {
        ...state,
        isOms: action.payload,
      }
    case SET_PLATFORM:
      return {
        ...state,
        platform: action.payload,
      }
    case SET_IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      }
    case SET_IS_ERROR_MESSAGE:
      return {
        ...state,
        isErrorMessage: action.payload,
      }
    case SET_IS_IN_PROGRESS:
      return {
        ...state,
        isInProgress: action.payload,
      }
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      }

    default:
      return state
  }
}

export default productReducer

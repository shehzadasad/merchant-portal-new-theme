import {
  SET_REFUND_API_ERROR,
  SET_REFUND_API_SUCCESS,
  SET_DROP_OFF_LOCATION_API_SUCCESS,
  SET_DROP_OFF_LOCATION_API_FAIL,
} from 'shared/constants/ActionTypes'
const initialSettings = {
  apiError: '',
  apiSuccess: '',
  getDropOffLocation: {},
}

const returnReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case SET_REFUND_API_ERROR:
      return {
        ...state,
        apiError: action.payload,
      }
    case SET_REFUND_API_SUCCESS:
      return {
        ...state,
        apiSuccess: action.payload,
      }
    case SET_DROP_OFF_LOCATION_API_SUCCESS: {
      return {
        ...state,
        getDropOffLocation: action.payload,
      }
    }
    case SET_DROP_OFF_LOCATION_API_FAIL: {
      return {
        ...state,
        apiError: action.payload,
      }
    }
    default:
      return state
  }
}

export default returnReducer

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import usersReducer from 'redux/actions/Users'
import billingReducer from './BillingReducer'
import Common from './Common'
import customerReducer from './CustomerReducer'
import merchantBillingsReducer from './MerchantBillingReducer'
import orderReducer from './OrderReducer'
import returnReducer from './ReturnReducer'
import productReducer from './ProductReducer'
import Settings from './Setting'
import taxReducer from './TaxReducer'

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    common: Common,
    users: usersReducer,
    billing: billingReducer,
    orders: orderReducer,
    tax: taxReducer,
    product: productReducer,
    customer: customerReducer,
    merchantBillings: merchantBillingsReducer,
    return: returnReducer,
  })

export default reducers

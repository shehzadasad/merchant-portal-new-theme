import { Dashboard, Settings } from '@mui/icons-material'
import Customers from 'pages/sample/Customers/index'
import CustomerDetails from 'pages/sample/Customers/CustomerDetails'
import BalanceSheet from 'pages/sample/Finance/Balance Sheet/BalanceSheet'
import BalanceSheetDetails from 'pages/sample/Finance/Balance Sheet/BalanceSheetDetails'
import BillingPayout from 'pages/sample/Finance/Billing/BillingPayout'
import BillingPayoutDetails from 'pages/sample/Finance/Billing/BillingPayoutDetails'
import Orders from 'pages/sample/Orders'
import OrderDetails from 'pages/sample/Orders/OrderDetails'
import OrderItemDetails from 'pages/sample/Orders/OrderItemDetails'
import PaymentMethods from 'pages/sample/PaymentMethods'
import UserDetails from 'pages/sample/Users/UserDetails'
import UsersWrapper from 'pages/sample/Users/UserWrapper'
import React from 'react'
import NewPassword from './newPassword'
import AbandonedCart from 'pages/sample/AbandonedCart/AbandonedCart'
import Discounts from 'pages/sample/discounts/Discounts'
import OnBoarding from 'pages/sample/onBoarding/OnBoarding'
import SigninLender from './signInLender/SignInLender'
import SignupLender from './Signup/SignUpLender'
import Invoices from 'pages/sample/Invoices/Invoices'
import MyQPMall from 'pages/sample/MyQPMall/MyQPMall'
import Merchants from 'pages/sample/Merchants/Merchants'
import LinkBuilder from 'pages/sample/LinkBuilder/LinkBuilder'
import CreatePaymentLink from 'pages/sample/LinkBuilder/Components/CreatePaymentLink/CreatePaymentLink'
import PaymentDetailTable from 'pages/sample/LinkBuilder/Components/PaymentDetail.jsx/PaymentDetail'
import Payment_Link_Successful from 'pages/sample/LinkBuilder/Components/CreatePaymentLink/Payment_Link_Successful'
const Signin = React.lazy(() => import('./Signin'))
const Signup = React.lazy(() => import('./Signup'))
const ForgotPassword = React.lazy(() => import('./ForgetPassword'))
const SignInReturn = React.lazy(() =>
  import('./ForgetPassword/SignInReturn.js')
)
const ResetPasswordAwsCognito = React.lazy(() =>
  import('./ResetPasswordAwsCognito')
)
export const authRouteConfig = [
  {
    path: '/signin-lender',
    element: <SigninLender />,
  },
  {
    path: '/signup-lender',
    element: <SignupLender />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/super-login',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />,
  },
  {
    path: '/confirm-signup',
    element: <SignInReturn />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordAwsCognito />,
  },
  {
    path: '/new-password',
    element: <NewPassword />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordAwsCognito />,
  },
  {
    path: '/payment',
    element: <PaymentMethods />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/users',
    element: <UsersWrapper />,
  },
  {
    path: '/users/details/:id',
    element: <UserDetails />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/orders/details',
    element: <OrderDetails />,
  },
  {
    path: '/orders/item/details',
    element: <OrderItemDetails />,
  },
  {
    path: '/customers',
    element: <Customers />,
  },
  {
    path: '/customers/details',
    element: <CustomerDetails />,
  },
  {
    path: '/abandoned-cart',
    element: <AbandonedCart />,
  },
  {
    path: '/payment',
    element: <PaymentMethods />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/billingpayout',
    element: <BillingPayout />,
  },
  {
    path: '/billingpayout/details',
    element: <BillingPayoutDetails />,
  },
  {
    path: '/balancesheet',
    element: <BalanceSheet />,
  },
  {
    path: '/balancesheet/details',
    element: <BalanceSheetDetails />,
  },
  {
    path: '/onBoarding',
    element: <OnBoarding />,
  },
  {
    path: '/invoices',
    element: <Invoices />,
  },
  {
    path: '/discounts',
    element: <Discounts />,
  },
  {
    path: '/my-qp-malls',
    element: <MyQPMall />,
  },
  {
    path: '/merchants',
    element: <Merchants />,
  },
  {
    path: '/link-builder',
    element: <LinkBuilder />,
  },
  {
    path: '/create-payment-link',
    element: <CreatePaymentLink />,
  },
  {
    path: '/edit-payment-link',
    element: <CreatePaymentLink />,
  },
  {
    path: '/payment-link/details/:id/:pd',
    element: <PaymentDetailTable />,
  },
  {
    path: '/Payment_Link_Successful/:uid/:lid',
    element: <Payment_Link_Successful />,
  },
]

import Customers from './Customers'
import CustomerDetails from './Customers/CustomerDetails'
import CustomerOrderDetails from './Customers/CustomerOrderDetails'
import CustomerOrderDetailsTable from './Customers/CustomerOrderDetailsTable'
import CustomerOrderItemDetails from './Customers/CustomerOrderItemDetails'
import Dashboard from './Dashboard/Dashboard'
import BalanceSheet from './Finance/Balance Sheet/BalanceSheet'
import BalanceSheetDetails from './Finance/Balance Sheet/BalanceSheetDetails'
import BalanceSheetOrderDetails from './Finance/Balance Sheet/BalanceSheetOrderDetails'
import BalanceSheetOrderItemDetails from './Finance/Balance Sheet/BalanceSheetOrderItemDetails'
import BillingPayout from './Finance/Billing/BillingPayout'
import BillingPayoutDetails from './Finance/Billing/BillingPayoutDetails'
import MerchantBillingDetails from './Invoices/MerchantBilling/Details/MerchantBillingDetails'
import MerchantBilling from './Invoices/MerchantBilling/MerchantBilling'
import Orders from './Orders'
import OrderDetails from './Orders/OrderDetails'
import OrderItemDetails from './Orders/OrderItemDetails'
import StackBuilder from './PaymentMethods/StackBuilder/StackBuilder'
import Builder from './PaymentMethods/ViewBuilder/builder'
import Products from './Products'
import ProductDetails from './Products/QPMerchant/ProductDetails'
import ProductCreate from './Products/QPMerchant/ProductCreate'
import ProductEdit from './Products/QPMerchant/ProductEdit'
import Returns from './Returns/Returns'
import Settings from './Settings'
import Shipping from './Shipping'
import AddShipping from './Shipping/AddShipping'
import UpdateShipping from './Shipping/UpdateShipping/UpdateShipping.js'
import CreateSite from './Site/CreateSite'
import EditSite from './Site/EditSite'
import Site from './Site/Site'
import ViewSiteDetails from './Site/ViewSiteDetails'
import Tax from './Tax'
import UserDetails from './Users/UserDetails'
import UsersWrapper from './Users/UserWrapper'
import Integrations from './Integrations/Integrations'
import ReturnsAndRefundsTable from './Return-phase-2/RetuReturnsAndRefundsTable'
import ReturnOrderDetails from './Return-phase-2/ReturnOrderDetails'

import AbandonedCart from './AbandonedCart/AbandonedCart'
import AbandonedDetail from './AbandonedCart/AbandonedDetail'
import OnBoarding from './onBoarding/OnBoarding'
import OnBoardingApplication from './onBoarding/OnBoardingApplication'
import ReviewOnBoardingApplication from './onBoarding/ReviewOnBoardingApplication'
import ReviewTable from './onBoarding/ReviewTable'
import GoLive from './onBoarding/GoLive'
import SetUpPayment from './onBoarding/SetupPayment'
import OnBoardingApplicationSubmission from './onBoarding/OnBoardingApplicationSubmission'
import Invoices from './Invoices/Invoices'
import Discounts from './discounts/Discounts'
import RecommendationEngine from './RecommendationEngine/RecommendationEngine'
import MyQPMall from './MyQPMall/MyQPMall'
import Merchants from './Merchants/Merchants'
import LinkBuilder from './LinkBuilder/LinkBuilder'
import CreatePaymentLink from './LinkBuilder/Components/CreatePaymentLink/CreatePaymentLink'
import PaymentDetailTable from './LinkBuilder/Components/PaymentDetail.jsx/PaymentDetail'
import Payment_Link_Successful from './LinkBuilder/Components/CreatePaymentLink/Payment_Link_Successful'
export const samplePagesConfigs = [
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
    path: '/orders/details/:id',
    element: <OrderDetails />,
  },
  {
    path: '/orders/item/details/:id/:itemId',
    element: <OrderItemDetails />,
  },
  {
    path: '/customers',
    element: <Customers />,
  },
  {
    path: '/customers/details/:id',
    element: <CustomerDetails />,
  },
  {
    path: '/abandoned-cart/details/:id',
    element: <AbandonedDetail />,
  },
  {
    path: '/customers/order/details/:id',
    element: <CustomerOrderDetails />,
  },
  {
    path: '/customers/order/item/details/:id/:itemId',
    element: <CustomerOrderItemDetails />,
  },

  {
    path: '/payment',
    element: <StackBuilder />,
  },
  {
    path: '/integrations',
    element: <Integrations />,
  },
  {
    path: '/add-view/:id',
    element: <Builder />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/product-details/:id',
    element: <ProductDetails />,
  },
  {
    path: '/product-create',
    element: <ProductCreate />,
  },
  {
    path: '/product-edit/:PId',
    element: <ProductEdit />,
  },
  {
    path: '/billingpayout',
    element: <BillingPayout />,
  },
  {
    path: '/billingpayout/details/:id',
    element: <BillingPayoutDetails />,
  },
  {
    path: '/balancesheet',
    element: <BalanceSheet />,
  },
  {
    path: '/balancesheet/details/:id',
    element: <BalanceSheetDetails />,
  },
  {
    path: '/balancesheet/order/details/:id',
    element: <BalanceSheetOrderDetails />,
  },
  {
    path: '/balancesheet/order/item/details/:id/:itemId',
    element: <BalanceSheetOrderItemDetails />,
  },
  {
    path: '/tax',
    element: <Tax />,
  },
  {
    path: '/shipping',
    element: <Shipping />,
  },
  {
    path: '/shipping/add',
    element: <AddShipping />,
  },
  {
    path: '/shipping/update/:id',
    element: <UpdateShipping />,
  },
  {
    path: '/merchantbilling',
    element: <MerchantBilling />,
  },
  {
    path: '/merchantbilling/details/:id',
    element: <MerchantBillingDetails />,
  },
  {
    path: '/site',
    element: <Site />,
  },
  {
    path: '/site/new',
    element: <CreateSite />,
  },
  {
    path: '/site/view',
    element: <ViewSiteDetails />,
  },
  {
    path: '/site/edit/:id',
    element: <EditSite />,
  },
  {
    path: '/returns',
    element: <Returns />,
  },
  {
    path: '/returns-phase-2',
    element: <ReturnsAndRefundsTable />,
  },
  {
    path: '/abandoned-cart',
    element: <AbandonedCart />,
  },
  {
    path: '/onBoarding',
    element: <OnBoarding />,
  },
  {
    path: '/onboarding-application',
    element: <OnBoardingApplication />,
  },
  {
    path: '/onboarding-application-in-review',
    element: <ReviewOnBoardingApplication />,
  },

  { path: '/setup-payment-method', element: <SetUpPayment /> },
  { path: '/go-live', element: <GoLive /> },
  { path: '/refund/order/details/:id', element: <ReturnOrderDetails /> },
  {
    path: '/invoices',
    element: <Invoices />,
  },
  {
    path: '/discounts',
    element: <Discounts />,
  },
  {
    path: '/recommendation',
    element: <RecommendationEngine />,
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
    path: '/edit-payment-link/:id/:pd',
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

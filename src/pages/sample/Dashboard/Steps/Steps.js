import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMerchantStates } from 'redux/reducers/Users'
import ActiveStep from './ActiveStep'
import Step from './Step'

const Steps = ({
  OnBoarding,
  addPaymentMethods,
  ReviewApplication,
  CreateReview,
  integrate,
  setUpPayment,
}) => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const merchantStates = useSelector((state) => state.users.merchantStates)

  useEffect(() => {
    if (userDetail) {
      if (userDetail.merchantId) {
        dispatch(fetchMerchantStates(userDetail.merchantId))
      }
    }
  }, [userDetail])

  return (
    <Container
      style={{
        display: 'flex',
        height: 180,
        justifyContent: 'space-between',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 20,
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: '100%',
      }}
    >
      <Step
        title='Sign Up'
        checked={
          merchantStates
            ? merchantStates.signedUp === true
              ? true
              : false
            : false
        }
        number={1}
      />
      {OnBoarding && (
        <ActiveStep
          title='Onboarding
          Application'
          checked={
            merchantStates.onboardingApplicationInReview
            ? true  : false
             
          }
          number={2}
          linkText='In process'
          link='/onboarding-progress'
        />
      )}
      {addPaymentMethods && (
        <ActiveStep
          title='Add Payment Methods'
          checked={
            merchantStates
              ? merchantStates.paymentMethodAdded === true
                ? true
                : false
              : false
          }
          number={2}
          linkText='Add Payment Method'
          link='/payment'
        />
      )}
      {ReviewApplication && (
        <ActiveStep
          title='Review Application'
          checked={
            merchantStates.onboardingApplicationApproved === true ? true : false
          }
          number={3}
          linkText='It may take 3/5 day'
          link='/onboarding-application-in-review'
        />
      )}
      {CreateReview && (
        <ActiveStep
          title='Create your first view'
          checked={
            merchantStates
              ? merchantStates.firstViewCreated === true
                ? true
                : false
              : false
          }
          number={3}
          linkText='Add View'
          link='/payment'
        />
      )}
      {setUpPayment && (
        <ActiveStep
          title='Setup Payment
          Methods'
          checked={
            merchantStates
              ? merchantStates.paymentMethods === true
                ? true
                : false
              : false
          }
          number={4}
          linkText='Help Info'
          link='/setup-payment-method'
        />
      )}
      {integrate && (
        <ActiveStep
          title='Integrate'
          checked={
            merchantStates
              ? merchantStates.integrated === true
                ? true
                : false
              : false
          }
          number={4}
          linkText='Integrate'
          link='/dashboard'
        />
      )}
      <ActiveStep
        title='Go Live'
        checked={merchantStates?.live === true ? true : false}
        number={5}
        linkText='Contact Sales'
        link='/go-live'
      />
    </Container>
  )
}

export default Steps

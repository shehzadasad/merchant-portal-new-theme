import React, { useState, useEffect } from 'react'
import AbandonedCartTable from './AbandonedCartTable'
import AbandonedCartTitleRow from './AbandonedCartTitleRow'
import { useSelector } from 'react-redux'
import AppLoader from '@crema/core/AppLoader'

const AbandonedCart = () => {
  const columns = [
    {
      id: 'checkout_id',
      label: 'Checkout#',
      minWidth: 100,
    },
    {
      id: 'createdAt',
      label: ' DATE	',
      minWidth: 200,
      align: 'center',
      format: 'date',
    },
    {
      id: 'customer_email',
      label: 'CUSTOMER',
      minWidth: 100,
    },
    {
      id: 'phone_number',
      label: 'Phone Number',
      minWidth: 100,
    },
    {
      id: 'abandoned-step',
      label: 'Abandoned Step',
      minWidth: 150,
      align: 'left',
    },
    {
      id: 'order-id',
      label: 'Order ID',
      minWidth: 150,
      align: 'left',
    },
    {
      id: 'recovery-status',
      label: 'Recovery Status',
      minWidth: 120,
      align: 'center',
    },
    // {
    //   id: 'recovery-status',
    //   label: 'Recovery Status',
    //   minWidth: 150,
    //   align: 'center',
    // },

    {
      id: 'total-amount',
      label: 'ORDER AMOUNT',
      minWidth: 130,
      align: 'center',
    },

    {
      id: 'checkout-url',
      label: 'Check Out Url',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'view-details',
      minWidth: 100,
      align: 'left',
      format: 'img',
    },
  ]

  const userDetail = useSelector((state) => state.users.userDetail)
  const [AbandonedCartData, setAbandonedCartData] = useState(false)
  const fetchAbandonedCart = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(
      process.env.REACT_APP_API_URL +
        `ms-merchant-portal/cart/merchants/${userDetail.merchantId}/abandoned`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setAbandonedCartData(result)
        }
      })
      .catch((error) => console.log('error', error))
  }

  useEffect(() => {
    if (userDetail.merchantId) fetchAbandonedCart()
  }, [userDetail.merchantId])

  return (
    <div>
      {AbandonedCartData === false ? (
        <AppLoader />
      ) : (
        <>
          <AbandonedCartTitleRow />
          <AbandonedCartTable rows={AbandonedCartData} columns={columns} />
        </>
      )}
    </div>
  )
}

export default AbandonedCart

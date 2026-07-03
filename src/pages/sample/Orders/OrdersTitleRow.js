import { Grid, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  convertOrdersToCSV,
  fetchOrders,
  searchOrders,
} from 'redux/actions/OrderAction'
import SharedButton from 'shared/components/SharedButton'
import SharedSearchBox from 'shared/components/SharedSearchBox'
import { toast } from 'react-toastify'
import ExportModal from './ExportModal'

const OrdersTitleRow = ({ setSearchValue }) => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders.orders)
  const orderDetails = useSelector((state) => state.orders.orderDetails)
  const userDetails = useSelector((state) => state.users.userDetail)
  const ordersTotalOrders = useSelector((state) => state.orders.totalOrders)
  const [searchText, setSearchText] = useState('empty')
  const [orderWithDetailsData, setOrderWithDetailsData] = useState([])
  const [exportModal, setExportModal] = useState(false)
  const handleCSVExport = () => {
    setExportModal(true)
    // if (orders.length > 0) {
    //   toast.info('Exporting CSV File...')
    //   var myHeaders = new Headers()
    //   myHeaders.append('Content-Type', 'application/json')
    //   var raw = JSON.stringify({})
    //   var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow',
    //   }
    //   fetch(
    //     `${process.env.REACT_APP_API_URL}merchant/orders/download_orders?merchant_user_id=${userDetails.id}`,
    //     requestOptions
    //   )
    //     .then((response) => response.text())
    //     .then((result) => {
    //       var blob = new Blob([result], {
    //         type: 'text/csv;charset=utf-8;',
    //       })
    //       var url = URL.createObjectURL(blob)
    //       var pom = document.createElement('a')
    //       pom.href = url
    //       pom.setAttribute('download', 'orders.csv')
    //       pom.click()
    //     })
    //     .catch((error) => console.log('error', error))
    // }
  }
  const handleClose = () => {
    setExportModal(false)
  }

  useEffect(() => {
    if (
      (orderDetails.order_details !== undefined &&
        orderDetails.billing_details !== undefined,
      orderDetails.shipping_details !== undefined,
      orderDetails.order_items_details !== undefined)
    ) {
      if (orderWithDetailsData.indexOf(orderDetails) === -1) {
        const detailObject = {
          order_id: orderDetails.order_details.order_id,
          date: moment(orderDetails.order_details.date).format('LL'),
          customer_name: orderDetails.order_details.customer_name,
          customer_email: orderDetails.order_details.customer_email,
          payment_method: orderDetails.order_details.payment_method,
          fee: orderDetails.order_details.fee,
          amount: orderDetails.order_details.amount,
          merchant_order_id: orderDetails.order_details.merchant_order_id,
          store: orderDetails.order_details.store,
          status: orderDetails.order_details.status,
          billing_address1: orderDetails.billing_details.billing_address1,
          billing_address2: orderDetails.billing_details.billing_address2,
          billing_city: orderDetails.billing_details.billing_city,
          billing_state: orderDetails.billing_details.billing_state,
          shipping_zip: orderDetails.shipping_details.shipping_zip,
          shipping_address1: orderDetails.shipping_details.shipping_address1,
          shipping_address2: orderDetails.shipping_details.shipping_address2,
          shipping_city: orderDetails.shipping_details.shipping_city,
          shipping_state: orderDetails.shipping_details.shipping_state,
          shipping_zip: orderDetails.shipping_details.shipping_zip,
          order_items_details: JSON.stringify(orderDetails.order_items_details),
        }
        setOrderWithDetailsData([...orderWithDetailsData, detailObject])
      }
    }
  }, [orderDetails])

  useEffect(() => {
    if (
      orderWithDetailsData.length > 0 &&
      orderWithDetailsData.length === orders.length
    ) {
      dispatch(convertOrdersToCSV(orderWithDetailsData))
    }
  }, [orderWithDetailsData])

  return (
    <Grid
      container
      alignItems='center'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Grid item>
        <Typography variant='h1' component='h2'>
          ORDERS
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item>
            {ordersTotalOrders > 0 ? (
              <SharedButton
                text='Export CSV'
                style={{
                  background: '#e93a7d',
                  borderRadius: 50,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  border: 'none',
                  height: 40,
                  cursor: 'pointer',
                  marginRight: 10,
                }}
                onClick={() => handleCSVExport()}
              />
            ) : (
              <>
                <SharedButton
                  text='Export CSV'
                  style={{
                    background: '#979797',
                    borderRadius: 50,
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 150,
                    border: 'none',
                    height: 40,
                    // cursor: 'pointer',
                  }}
                />
              </>
            )}
          </Grid>
          <Grid
            item
            style={{
              marginRight: 10,
            }}
          >
            <SharedSearchBox
              width={window.innerWidth > 600 ? 290 : '100%'}
              onClick={(e) => {
                dispatch(fetchOrders(userDetails.id, e.target.value, 1))
                setSearchValue(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(fetchOrders(userDetails.id, e.target.value, 1))
                  setSearchValue(e.target.value)
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {exportModal && (
        <ExportModal handleCls={handleClose} open={exportModal} />
      )}
    </Grid>
  )
}
export default OrdersTitleRow

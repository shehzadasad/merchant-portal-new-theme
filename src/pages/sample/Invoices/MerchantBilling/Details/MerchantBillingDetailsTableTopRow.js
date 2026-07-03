import { ArrowBack, WindPower } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { PDFExport } from '@progress/kendo-react-pdf'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import SharedButton from 'shared/components/SharedButton'

import 'assets/invoice-templates/PaidInvoiceCard.css'
import 'assets/invoice-templates/PaidInvoiceStyle.css'
import 'assets/invoice-templates/UnPaidInvoiceCard.css'
import 'assets/invoice-templates/UnPaidInvoiceStyle.css'

import OneCLogo from 'assets/invoice-templates/1CLogo.svg'
import MasterCardLogo from 'assets/invoice-templates/masterCardIcon.svg'
import moment from 'moment'

const MerchantBillingDetailsTopRow = () => {
  const { id } = useParams()
  const [layoutSelection, setLayoutSelection] = useState({
    text: 'A4',
    value: 'size-a4',
  })

  const [data, setData] = useState(null)
  const [clicked, setClicked] = useState(false)

  const pdfExportComponent = useRef(null)

  const paidInvoiceCard = useRef(null)
  const paidInvoice = useRef(null)
  const unPaidInvoice = useRef(null)
  const unPaidInvoiceCard = useRef(null)

  const userDetail = useSelector((state) => state.users.userDetail)
  const generatePDF = () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/billing/generatePDF/${id}?merchantId=${userDetail.merchantId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (response) {
        setClicked(true)
        if (response.data.template === 'UnPaidInvoiceCard') {
          setData(response.data)
          unPaidInvoiceCard.current.save()
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else if (response.data.template === 'PaidInvoiceCard') {
          setData(response.data)
          paidInvoiceCard.current.save()
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else if (response.data.template === 'UnPaidInvoice') {
          setData(response.data)
          unPaidInvoice.current.save()
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else if (response.data.template === 'PaidInvoice') {
          setData(response.data)
          paidInvoice.current.save()
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <Grid
        container
        alignItems='center'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Grid item>
          <Grid container>
            <Link to='/merchantbilling'>
              <ArrowBack />
            </Link>
            <Typography
              variant='p'
              component='p'
              style={{ marginLeft: 5, fontSize: 20, fontWeight: 500 }}
            >
              Merchant Billing Details
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item>
              <SharedButton
                text='Generate PDF'
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
                onClick={generatePDF}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {clicked === true ? (
        <div>
          <PDFExport
            ref={unPaidInvoiceCard}
            paperSize='A4'
            margin='1cm'
            fileName='MerchantBilling.pdf'
          >
            <div>
              <div className='top-row'>
                <div className='top-row-left'>
                  <div className='top-row-item'>
                    <img src={OneCLogo} alt='logo' />
                  </div>
                </div>
                <div className='top-row-right'>
                  <span className='heading'>Invoice Details</span>
                </div>
              </div>
              <div className='details-row'>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>From</span>
                  <span className='details-row-c-name'>QisstPay</span>
                  <span className='details-row-c-address'>
                    1st Floor, UBL Tower, Jinnah Ave, F 6/1 Blue Area,
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>Islamabad</span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>Pakistan</span>
                  </div>
                  <span className='details-row-c-address'>031151231</span>
                  <span className='details-row-c-address'>
                    support@qisstpay.com
                  </span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>To</span>
                  <span className='details-row-c-name'>
                    {data ? data.merchantInfoDTO.name : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.address : ''}
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.city : ''}
                    </span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.country : ''}
                    </span>
                  </div>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.phoneNumber : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.email : ''}
                  </span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>
                    Invoice Details
                  </span>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Invoice ID</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.invoiceId : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Due Date</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dueDate ?? '-' : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Generated</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dateGenerated : ''}
                    </span>
                  </div>
                </div>
              </div>
              <div className='payment-row'>
                <div className='payment-row-left'>
                  <span className='details-row-sub-heading'>
                    Payment Method
                  </span>
                  <div>
                    <img src={MasterCardLogo} alt='Master Card' />
                    &nbsp; &nbsp;
                    <span>
                      {data
                        ? data.pdfBillingMerchantPaymentMethodCardDTO.cardNumber
                        : ''}
                    </span>
                  </div>
                </div>
                <div className='payment-row-right'>
                  <div className='payment-status-table'>
                    <table>
                      <thead>
                        <th>Not Paid</th>
                      </thead>
                    </table>
                  </div>
                  <div>{data ? data.billingSummaryDTO.amountDue : ''}</div>
                </div>
              </div>
              <div className='order-table'>
                <table>
                  <thead>
                    <th>Data</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                  </thead>
                  <tbody>
                    {data
                      ? Array.isArray(data.ordersDTOList)
                        ? data.ordersDTOList.map((order) => (
                            <tr key={order.id}>
                              <td>{moment(order.date).format('ll')}</td>
                              <td>{order.orderId}</td>
                              <td>{order.amount}</td>
                            </tr>
                          ))
                        : ''
                      : ''}
                  </tbody>
                </table>
              </div>
              <div className='funds-details'>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Subtotal:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.subTotal : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>GST (10%):</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.gst : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-value'>Total:</span>
                  <span className='details-row-item-value'>
                    {data ? data.billingSummaryDTO.total : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Paid:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.paid ?? '' : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Amount Due:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.amountDue : ''}
                  </span>
                </div>
              </div>
            </div>
          </PDFExport>
          <PDFExport
            ref={paidInvoiceCard}
            paperSize='A4'
            margin='1cm'
            fileName='MerchantBilling.pdf'
          >
            <div>
              <div className='top-row'>
                <div className='top-row-left'>
                  <div className='top-row-item'>
                    <img src={OneCLogo} alt='logo' />
                  </div>
                </div>
                <div className='top-row-right'>
                  <span className='heading'>Invoice Details</span>
                </div>
              </div>
              <div className='details-row'>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>From</span>
                  <span className='details-row-c-name'>QisstPay</span>
                  <span className='details-row-c-address'>
                    1st Floor, UBL Tower, Jinnah Ave, F 6/1 Blue Area,
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>Islamabad</span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>Pakistan</span>
                  </div>
                  <span className='details-row-c-address'>031151231</span>
                  <span className='details-row-c-address'>email@email.com</span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>To</span>
                  <span className='details-row-c-name'>
                    {data ? data.merchantInfoDTO.name : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.address : ''}
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.city : ''}
                    </span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.country : ''}
                    </span>
                  </div>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.phoneNumber : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.email : ''}
                  </span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>
                    Invoice Details
                  </span>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Invoice ID</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.invoiceId : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Due Date</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dueDate ?? '-' : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Generated</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dateGenerated : ''}
                    </span>
                  </div>
                </div>
              </div>
              <div className='payment-row'>
                <div className='payment-row-left'>
                  <span className='details-row-sub-heading'>
                    Payment Method
                  </span>
                  <div>
                    <img src={MasterCardLogo} alt='Master Card' />
                    &nbsp; &nbsp;
                    <span>
                      {data
                        ? data.pdfBillingMerchantPaymentMethodCardDTO.cardNumber
                        : ''}
                    </span>
                  </div>
                </div>
                <div className='payment-row-right'>
                  <div className='payment-status-table'>
                    <table>
                      <thead>
                        <th>PAID</th>
                        <th>On Dec 26, 2022</th>
                      </thead>
                    </table>
                  </div>
                  <div>Rs. 29840</div>
                </div>
              </div>
              <div className='order-table'>
                <table>
                  <thead>
                    <th>Data</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                  </thead>
                  <tbody>
                    {data
                      ? Array.isArray(data.ordersDTOList)
                        ? data.ordersDTOList.map((order) => (
                            <tr key={order.id}>
                              <td>{moment(order.date).format('ll')}</td>
                              <td>{order.orderId}</td>
                              <td>{order.amount}</td>
                            </tr>
                          ))
                        : ''
                      : ''}
                  </tbody>
                </table>
              </div>
              <div className='funds-details'>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Subtotal:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.subTotal : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>GST (10%):</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.gst : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-value'>Total:</span>
                  <span className='details-row-item-value'>
                    {data ? data.billingSummaryDTO.total : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Paid:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.paid ?? '' : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Amount Due:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.amountDue : ''}
                  </span>
                </div>
              </div>
            </div>
          </PDFExport>
          <PDFExport
            ref={unPaidInvoice}
            paperSize='A4'
            margin='1cm'
            fileName='MerchantBilling.pdf'
          >
            <div>
              <div className='top-row'>
                <div className='top-row-left'>
                  <div className='top-row-item'>
                    <img src={OneCLogo} alt='logo' />
                  </div>
                </div>
                <div className='top-row-right'>
                  <span className='heading'>Invoice Details</span>
                </div>
              </div>
              <div className='details-row'>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>From</span>
                  <span className='details-row-c-name'>QisstPay</span>
                  <span className='details-row-c-address'>
                    1st Floor, UBL Tower, Jinnah Ave, F 6/1 Blue Area,
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>Islamabad</span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>Pakistan</span>
                  </div>
                  <span className='details-row-c-address'>031151231</span>
                  <span className='details-row-c-address'>email@email.com</span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>To</span>
                  <span className='details-row-c-name'>
                    {data ? data.merchantInfoDTO.name : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.address : ''}
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.city : ''}
                    </span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.country : ''}
                    </span>
                  </div>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.phoneNumber : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.email : ''}
                  </span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>
                    Invoice Details
                  </span>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Invoice ID</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.invoiceId : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Due Date</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dueDate ?? '-' : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Generated</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dateGenerated : ''}
                    </span>
                  </div>
                </div>
              </div>
              <div className='payment-row'>
                <div className='payment-row-left'>
                  <span className='details-row-sub-heading'>
                    Payment Method
                  </span>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Payment Via</span>
                    <span className='details-row-item-value'>
                      ACH/wire transfer
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Bank Name</span>
                    <span className='details-row-item-value'>
                      Silicon Valley Bank
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Account #</span>
                    <span className='details-row-item-value'>3300998940</span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Routing #</span>
                    <span className='details-row-item-value'>121140399</span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Swift Code</span>
                    <span className='details-row-item-value'>SVBKUS6</span>
                  </div>
                </div>
                <div className='payment-row-right'>
                  <div className='payment-status-table'>
                    <table>
                      <thead>
                        <th>Not Paid</th>
                      </thead>
                    </table>
                  </div>
                  <div>Rs. 29840</div>
                </div>
              </div>
              <div className='order-table'>
                <table>
                  <thead>
                    <th>Data</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                  </thead>
                  <tbody>
                    {data
                      ? Array.isArray(data.ordersDTOList)
                        ? data.ordersDTOList.map((order) => (
                            <tr key={order.id}>
                              <td>{moment(order.date).format('ll')}</td>
                              <td>{order.orderId}</td>
                              <td>{order.amount}</td>
                            </tr>
                          ))
                        : ''
                      : ''}
                  </tbody>
                </table>
              </div>
              <div className='funds-details'>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Subtotal:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.subTotal : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>GST (10%):</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.gst : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-value'>Total:</span>
                  <span className='details-row-item-value'>
                    {data ? data.billingSummaryDTO.total : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Paid:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.paid ?? '' : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Amount Due:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.amountDue : ''}
                  </span>
                </div>
              </div>
            </div>
          </PDFExport>
          <PDFExport
            ref={paidInvoice}
            paperSize='A4'
            margin='1cm'
            fileName='MerchantBilling.pdf'
          >
            <div>
              <div className='top-row'>
                <div className='top-row-left'>
                  <div className='top-row-item'>
                    <img src={OneCLogo} alt='logo' />
                  </div>
                </div>
                <div className='top-row-right'>
                  <span className='heading'>Invoice Details</span>
                </div>
              </div>
              <div className='details-row'>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>From</span>
                  <span className='details-row-c-name'>QisstPay</span>
                  <span className='details-row-c-address'>
                    1st Floor, UBL Tower, Jinnah Ave, F 6/1 Blue Area,
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>Islamabad</span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>Pakistan</span>
                  </div>
                  <span className='details-row-c-address'>031151231</span>
                  <span className='details-row-c-address'>email@email.com</span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>To</span>
                  <span className='details-row-c-name'>
                    {data ? data.merchantInfoDTO.name : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.address : ''}
                  </span>
                  <div style={{ display: 'flex' }}>
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.city : ''}
                    </span>
                    &nbsp;
                    <span>,</span>
                    &nbsp;
                    <span className='details-row-c-address'>
                      {data ? data.merchantInfoDTO.country : ''}
                    </span>
                  </div>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.phoneNumber : ''}
                  </span>
                  <span className='details-row-c-address'>
                    {data ? data.merchantInfoDTO.email : ''}
                  </span>
                </div>
                <div className='details-row-item'>
                  <span className='details-row-sub-heading'>
                    Invoice Details
                  </span>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Invoice ID</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.invoiceId : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Due Date</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dueDate ?? '-' : ''}
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Generated</span>
                    <span className='details-row-item-value'>
                      {data ? data.billingInfoDTO.dateGenerated : ''}
                    </span>
                  </div>
                </div>
              </div>
              <div className='payment-row'>
                <div className='payment-row-left'>
                  <span className='details-row-sub-heading'>
                    Payment Method
                  </span>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Payment Via</span>
                    <span className='details-row-item-value'>
                      ACH/wire transfer
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Bank Name</span>
                    <span className='details-row-item-value'>
                      Silicon Valley Bank
                    </span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Account #</span>
                    <span className='details-row-item-value'>3300998940</span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Routing #</span>
                    <span className='details-row-item-value'>121140399</span>
                  </div>
                  <div className='details-row-item-row'>
                    <span className='details-row-item-key'>Swift Code</span>
                    <span className='details-row-item-value'>SVBKUS6</span>
                  </div>
                </div>
                <div className='payment-row-right'>
                  <div className='payment-status-table'>
                    <table>
                      <thead>
                        <th>PAID</th>
                        <th>On Dec 26, 2022</th>
                      </thead>
                    </table>
                  </div>
                  <div>
                    <span>Rs. 29840</span>
                  </div>
                </div>
              </div>
              <div className='order-table'>
                <table>
                  <thead>
                    <th>Data</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                  </thead>
                  <tbody>
                    {data
                      ? Array.isArray(data.ordersDTOList)
                        ? data.ordersDTOList.map((order) => (
                            <tr key={order.id}>
                              <td>{moment(order.date).format('ll')}</td>
                              <td>{order.orderId}</td>
                              <td>{order.amount}</td>
                            </tr>
                          ))
                        : ''
                      : ''}
                  </tbody>
                </table>
              </div>
              <div className='funds-details'>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Subtotal:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.subTotal : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>GST (10%):</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.gst : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-value'>Total:</span>
                  <span className='details-row-item-value'>
                    {data ? data.billingSummaryDTO.total : ''}
                  </span>
                </div>
                <div className='border'></div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Paid:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.paid ?? '' : ''}
                  </span>
                </div>
                <div className='details-row-item-row'>
                  <span className='details-row-item-key'>Amount Due:</span>
                  <span className='details-row-item-key'>
                    {data ? data.billingSummaryDTO.amountDue : ''}
                  </span>
                </div>
              </div>
            </div>
          </PDFExport>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default MerchantBillingDetailsTopRow

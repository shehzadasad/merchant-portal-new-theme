import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import TableContainer from '@mui/material/TableContainer'
import DeleteModal from '../../DelModal'
import PaymentDetailTable from './PaymentDetailTable'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import Payment_Link_Successful from '../CreatePaymentLink/Payment_Link_Successful'
import { getPaymentLink } from 'redux/actions/LinkBuilder'
import { useDispatch, useSelector } from 'react-redux'

const PaymentDetail = () => {
  const navigate = useNavigate()
  let { pd } = useParams()
  let { id } = useParams()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [singleData, setSingleData] = React.useState(null)
  const [dataparse, setDataParse] = React.useState(null)
  const [delSuccess, setDelSuccess] = React.useState(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (delSuccess) {
      navigate(`/link-builder`)
    }
  }, [delSuccess])
  React.useEffect(() => {
    if (id && pd) {
      dispatch(getPaymentLink(pd, id, setSingleData))
    }
  }, [userDetail, pd])
  React.useEffect(() => {
    if (singleData !== null) {
      const pdetail1 = JSON.parse(singleData?.data)

      setDataParse(pdetail1)
    }
  }, [singleData])

  const handleOpenDelete = (data) => {
    setOpenDeleteModal(true)
  }
  const handleClose = () => {
    setOpenDeleteModal(false)
  }
  return (
    <React.Fragment>
      <Grid container>
        <Box
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex' }}>
            <Link to='/link-builder'>
              <ArrowBack />
            </Link>
            <Typography variant='h2' component='h3' marginLeft={3}>
              Payment Link Details
            </Typography>
          </div>
          <Box display='flex'>
            <button
              style={{
                width: '100px',
                height: '36px',
                color: '#ED2079',
                background: '#fff',
                border: '2px solid #ED2079',
                marginRight: '18px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ED2079'
                e.target.style.color = '#fff'
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff'
                e.target.style.color = '#ED2079'
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() =>
                navigate(`/edit-payment-link/${id}/${userDetail?.id}`)
              }
            >
              Edit
            </button>
            <button
              style={{
                width: '100px',
                height: '36px',
                color: '#ED2079',
                background: '#fff',
                border: '2px solid #ED2079',
                marginRight: '18px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ED2079'
                e.target.style.color = '#fff'
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff'
                e.target.style.color = '#ED2079'
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onClick={handleOpenDelete}
            >
              Delete
            </button>
          </Box>
        </Box>
        {openDeleteModal && (
          <DeleteModal
            handleCls={handleClose}
            open={openDeleteModal}
            // dataR={rowData}
            requestId={id}
            setDelSuccess={setDelSuccess}
          />
        )}

        <PaymentDetailTable
          rows={dataparse ? dataparse.products : []}
          // columns={columns}
          timeRange={false}
          title={'Order Items'}
        />
        <Typography variant='h2' component='h3' marginTop={8}>
          Invoice Details
        </Typography>
        <TableContainer
          component={Paper}
          style={{ marginTop: 38, borderRadius: 10 }}
        >
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Creation Date
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.created_at
                  ? moment(singleData?.created_at).format('LL')
                  : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Link ID
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.id ? singleData?.id : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Link Name
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.name ? singleData?.name.toUpperCase() : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Total No. of Orders
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.total_no_of_orders
                  ? singleData?.total_no_of_orders
                  : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Total Amount
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.details?.amount &&
                  userDetail?.iso2 === 'PK' &&
                  Number(singleData?.details?.amount).toLocaleString('ur-PK', {
                    style: 'currency',
                    currency: 'PKR',
                  })}
                {singleData?.details?.amount &&
                  userDetail?.iso2 === 'PH' &&
                  Number(singleData?.details?.amount).toLocaleString('fil-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  })}
                {singleData?.details?.amount &&
                userDetail?.iso2 !== 'PK' &&
                userDetail?.iso2 !== 'PH'
                  ? Number(singleData?.details?.amount).toLocaleString(
                      'en-US',
                      {
                        style: 'currency',
                        currency: 'USD',
                      }
                    )
                  : ''}
                {!singleData?.details?.amount && '-'}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Status
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                <Box
                  sx={{
                    color:
                      singleData?.status.toUpperCase() === 'ACTIVE'
                        ? '#379200'
                        : singleData?.status.toUpperCase() === 'DRAFT'
                        ? '#924600'
                        : singleData?.status.toUpperCase() === 'EXPIRED'
                        ? '#6B7280'
                        : '',
                    backgroundColor:
                      singleData?.status.toUpperCase() === 'ACTIVE'
                        ? '#EBF4E6'
                        : singleData?.status.toUpperCase() === 'DRAFT'
                        ? '#FFE5D7'
                        : singleData?.status.toUpperCase() === 'EXPIRED'
                        ? '#F2F2F4'
                        : '',
                    padding: '4px 30px',
                    borderRadius: '15px',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {singleData?.status ? singleData?.status : '-'}
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Link Expiry
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.expiry_time
                  ? moment(singleData?.expiry_time).format('LL')
                  : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Limits
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.order_limit ? singleData?.order_limit : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Link Discounts {singleData?.link_discount_type}
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.link_discount_value
                  ? singleData?.link_discount_value
                  : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Shipping Charges
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.shipping_charges === true ? 'Enabled' : 'Disabled'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottomWidth: 1,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={4} lg={4}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Tax Charges
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {singleData?.tax_charges === true ? 'Enabled' : 'Disabled'}
              </Typography>
            </Grid>
          </Grid>
        </TableContainer>
        <Grid item xs={12} md={6}>
          {singleData?.status.toUpperCase() === 'DRAFT' ||
          singleData?.status.toUpperCase() === 'EXPIRED' ? (
            ''
          ) : (
            <>
              <Typography marginBottom={8} variant='h2' marginTop={8}>
                Links
              </Typography>
              <Payment_Link_Successful
                isbutton={'No'}
                paymentLink={singleData?.url}
              />
            </>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default PaymentDetail

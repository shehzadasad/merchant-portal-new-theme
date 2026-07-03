import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import PinkPlusIcon from 'assets/invoices/pinkPlusIcon.svg'
import { getProductDetail } from 'redux/actions/LinkBuilder'
import currencyFormatter from 'currency-formatter'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
function Autocomplete(props) {
  const [loading, setLoading] = useState(false)
  const [detailData, setDetailData] = React.useState(null)
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [searching, setSearching] = useState(false)
  const [items, setItems] = useState([])

  async function handleOnSearch(string, results) {
    setSearching(true)

    let val = string

    let postData = {
      token: userDetail.id,
      search: val,
    }

    setLoading(true)
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}merchant/products/search?merchant_user_id=${userDetail?.id}&search=${val}`
      )
      .then((response) => {
        setItems(response.data.merchant_products_list)
        props.setCustomerSearchError('')
        let options = []

        const permOptions = {
          address: '',
          billing: '',
          city: null,
          city_name: '',
          cno: '',
          country: null,
          country_name: null,
          email: '',
          id: 'Add Product',
          name: 'Add product12',
          same_billing: false,
          state: null,
          state_name: null,
          taxfee: null,
          zip: null,
          custom: val,
        }

        let prevOptions = [permOptions]
        let newOptions = response.data.merchant_products_list

        options = prevOptions.concat(newOptions)

        props.setCustomerOptions(options)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)

        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msg
        ) {
          props.setCustomerSearchError(error.response.data.msg)
        } else {
          props.setCustomerSearchError('Sorry cannot get customers right now')
        }
      })
    // }
  }

  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    // the item selected
    setSearching(true)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/products/details?merchant_user_id=${userDetail?.id}&product_id=${item?.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    axios(config)
      .then(function (response) {
        let data1 = response.data.data
        const dataObj = {
          product_id: data1.product_info.id,
          title: data1.product_info.title,
          price:
            data1.product_info.has_variants === 'NO'
              ? data1.product_info.price
              : data1?.product_variants?.[0]?.price,
          quantity:
            data1.product_info.has_variants === 'NO'
              ? data1?.product_info.available_stock
              : data1?.product_variants?.[0]?.available_stock,
          src: data1.product_info.image,
          inventory:
            data1.product_info.has_variants === 'NO'
              ? data1?.product_info.available_stock
              : data1?.product_variants?.[0]?.available_stock,

          variants:
            data1.product_info.has_variants === 'NO'
              ? 0
              : data1?.product_variants?.length,
        }

        // Check if the product_id already exists in the selected item
        console.log(props.prodList, 'chaec')
        if (props.prodList) {
          const isDuplicate = props.prodList.some(
            (item) => item.product_id === dataObj.product_id
          )

          if (!isDuplicate || props.prodList == null) {
            // If it's not a duplicate, update the props.setSelectedItem with the new dataObj
            props.setSelectedItem(dataObj)
          } else {
            // If it's a duplicate, you can handle it accordingly (e.g., show an error, log a message, etc.)
            toast.error('This product is already selected')
          }
        } else {
          props.setSelectedItem(dataObj)
        }
        setSearching(false)
      })
      .catch(function (error) {
        console.log(error?.response?.data, 'data encoded')

        toast.error(error?.response?.data?.message)
      })

    if (item.id == 'Add Product') {
      props.showModal()

      props.setShowAddProductModal(true)
      props.setCustomerSelected(null)
    } else {
      props.setCustomerSelected(item)
      props.setCustomerSelected(null)
    }
  }

  const onCustomerClear = (item) => {
    props.setCustomerSelected(null)
    setSearching(false)
  }

  const handleOnFocus = () => {}

  const formatResult = (item) => {
    return (
      <>
        {item?.id != 'Add Product' ? (
          <div>
            <Box display='flex' alignItems='center'>
              <img
                src={item?.image}
                alt=''
                style={{
                  width: '35px',
                  height: '35px',
                  marginRight: '10px',
                  borderRadius: '5px',
                }}
              />{' '}
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Box>{item?.name} </Box>
                <Box paddingRight='10px'>
                  {userDetail?.iso2 === 'PK' &&
                    Number(item?.stock_info?.product_price).toLocaleString(
                      'ur-PK',
                      {
                        style: 'currency',
                        currency: 'PKR',
                      }
                    )}
                  {userDetail?.iso2 === 'PH' &&
                    Number(item?.stock_info?.product_price).toLocaleString(
                      'fil-PH',
                      {
                        style: 'currency',
                        currency: 'PHP',
                      }
                    )}

                  {userDetail?.iso2 !== 'PK' && userDetail?.iso2 !== 'PH'
                    ? Number(item?.stock_info?.product_price).toLocaleString(
                        'en-US',
                        {
                          style: 'currency',
                          currency: 'USD',
                        }
                      )
                    : ''}
                </Box>
              </Box>
            </Box>
          </div>
        ) : (
          <span
            style={{
              display: 'block',
              textAlign: 'left',
              color: '#E71583',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            <img onClick={props.showModal} src={PinkPlusIcon} /> {item?.id}{' '}
            <div>{item?.address}</div>
          </span>
        )}
      </>
    )
  }
  return (
    <div>
      <div
        style={{
          position: 'relative',
          overflow: 'auto',
          width: '18rem',

          height: searching ? '14rem' : '',
        }}
      >
        <ReactSearchAutocomplete
          items={props.customerOptions}
          fuseOptions={{
            shouldSort: false,
            keys: ['name', 'custom'],
          }}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={onCustomerClear}
          placeholder='Search Products'
          // autoFocus
          formatResult={formatResult}
          styling={
            !(
              props.showAddCustomerModal ||
              props.showAddProductModal ||
              props.showAddProductModalToBE
            )
              ? {
                  borderRadius: '5px',
                  padding: '30px',
                }
              : {
                  borderRadius: '5px',
                  padding: '30px',
                  backgroundColor: 'green',
                  zIndex: 9999,
                }
          }
          showIcon={false}
          showClear={true}
          maxResults={100}
          marginLeft='12px'
          inputSearchString={
            props.customerSelected ? props.customerSelected.name : ''
          }
        />
        <ClipLoader
          color='#E72E80'
          loading={loading}
          size={30}
          css={{
            position: 'absolute',
            zIndex: '99999999999999999999',
            left: '85%',
            top: '25%',
          }}
        />
      </div>
    </div>
  )
}

export default Autocomplete

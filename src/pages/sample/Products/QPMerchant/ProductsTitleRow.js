import { Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import {
  convertProductsToCSV,
  fetchProducts,
  searchProducts,
} from 'redux/actions/ProductAction'
import SharedButton from 'shared/components/SharedButton'
import SharedSearchBox from 'shared/components/SharedSearchBox'
import { toast } from 'react-toastify'

const ProductsTitleRow = () => {
  const products = useSelector((state) => state.product.products)
  const productsCount = useSelector((state) => state.product.products?.length)
  const currentPage = useSelector((state) => state.product.currentPage)
  const userDetail = useSelector((state) => state.users.userDetail)
  const isOms = useSelector((state) => state.product.isOms)
  const platform = useSelector((state) => state.product.platform)

  const dispatch = useDispatch()
  const handleCSVExport = () => {
    let tempArray = []

    products.map((product) => {
      const object = {
        id: product.id,
        title: product.title,
        url: product.url,
        image: product.image,
        is_active: product.is_active,
        created_at: product.created_at,
        min_price: product.stock_info.min_price,
        max_price: product.stock_info.max_price,
        variants_count: product.stock_info.variants_count,
        is_available: product.stock_info.is_available,
        available_stock: product.stock_info.available_stock,
      }

      tempArray.push(object)
    })
    dispatch(convertProductsToCSV(tempArray, localStorage.getItem('token')))
  }

  const handleUpdateSearchValue = (e) => {
    if (e.target.value !== '') {
      dispatch(searchProducts(userDetail.id, e.target.value, currentPage))
    } else {
      dispatch(fetchProducts(userDetail.id, currentPage))
    }
  }

  const CSVUpload = useRef(null)

  const handleOnChange = (e) => {
    UploadCSV(e.target.files[0], e)
  }

  const UploadCSV = (file, e) => {
    var formdata = new FormData()
    formdata.append('bulk_add', file, 'bulk_upload.csv')
    formdata.append('merchant_user_id', userDetail.id)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      `${process.env.REACT_APP_API_URL}merchant/products/bulk-upload`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          toast.success(result.message)
          dispatch(fetchProducts(userDetail.id, currentPage))
        } else {
          toast.error(result.message)
        }
        e.target.value = null
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <Grid
      container
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Grid item>
        <Typography variant='h1' component='h2'>
          Products
        </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          style={{
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-between',
          }}
        >
          <Grid item>
            {productsCount > 0 ? (
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
                  // borderColor: '#e93a7d',
                  border: 'none',
                  height: 40,
                  cursor: 'pointer',
                  marginRight: 1,
                }}
                // disabled={products.length < 0 ? true : false}
                onClick={handleCSVExport}
              />
            ) : (
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
            )}
          </Grid>
          {isOms && isOms === true ? (
            ''
          ) : (
            <>
              <Grid>
                <SharedButton
                  text='Create Product'
                  style={{
                    background: '#e72e80',
                    borderRadius: 50,
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 150,
                    borderColor: '#e93a7d',
                    border: 'solid',
                    height: 40,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.location.href = '/product-create'
                  }}
                />
              </Grid>
              <Grid>
                <SharedButton
                  text='Bulk Upload'
                  style={{
                    background: '#e72e80',
                    borderRadius: 50,
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 150,
                    // borderColor: '#e93a7d',
                    border: 'solid',
                    height: 40,
                    cursor: 'pointer',
                    marginRight: 3,
                  }}
                  onClick={() => {
                    CSVUpload.current.click()
                  }}
                />
              </Grid>
              <input
                ref={CSVUpload}
                type={'file'}
                accept={'.csv'}
                style={{ display: 'none' }}
                onChange={handleOnChange}
              />
            </>
          )}

          <Grid item style={{ marginRight: 10 }}>
            <SharedSearchBox
              width={window.innerWidth > 600 ? 290 : '100%'}
              onChange={handleUpdateSearchValue}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default ProductsTitleRow

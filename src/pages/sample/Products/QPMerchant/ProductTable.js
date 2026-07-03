import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  setCurrentPageProducts,
  syncProducts,
} from 'redux/actions/ProductAction'
import QPMerchantProductsSharedTable from './QPMerchantProductsSharedTable'
import SharedButton from 'shared/components/SharedButton'
import AppLoader from '@crema/core/AppLoader'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'title',
    label: 'Product',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'stock_info',
    label: 'Inventory',
    minWidth: 80,
    align: 'left',
  },
  {
    id: 'category',
    label: 'Product Category',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'is_active',
    label: 'Status',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'url',
    label: 'Product URL',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'headless',
    label: 'Headless',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'viewEditDeleteIcons',
    label: '',
    minWidth: 120,
    align: 'left',
    format: 'img',
  },
]

const ProductTable = () => {
  const dispatch = useDispatch()
  const isError = useSelector((state) => state.product.isError)
  const isErrorMessage = useSelector((state) =>
    state.product.isErrorMessage.toUpperCase()
  )
  const products = useSelector((state) => state.product.products)
  const productNew = useSelector((state) => state.product)

  const userDetail = useSelector((state) => state.users.userDetail)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = useSelector((state) => state.product.totalPages)
  const isOms = useSelector((state) => state.product.isOms)
  const isInProgress = useSelector((state) => state.product.isInProgress)
  const headlessURL = 'https://headless-commerce-product.qisstpay.com/'
  const platform = useSelector((state) => state.product.platform)
  const [reloadProductData, setReloadProductData] = useState(true)

  // useEffect(() => {
  //   dispatch(fetchProducts(userDetail.id, currentPage))
  // }, [reloadProductData])

  const handleRotate = () => {
    dispatch(syncProducts(userDetail.id))
    setTimeout(function () {
      window.location.reload()
    }, 300)
  }

  const [productSync, setProductSync] = useState(false)

  useEffect(() => {
    if (userDetail) {
      if (userDetail.id) {
        if (currentPage) {
          dispatch(setCurrentPageProducts(currentPage))
          dispatch(fetchProducts(userDetail.id, currentPage, setProductSync))
          // dispatch(syncProducts(userDetail.id))
        }
      }
    }
  }, [currentPage, userDetail.id])

  const ModalStyle = {
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    display: 'grid',
    placeItems: 'center',
  }

  return (
    <>
      {productSync === false && products?.length > 1 ? (
        <>
          <QPMerchantProductsSharedTable
            rows={products}
            columns={columns}
            // isOms={isOms}
          />
        </>
      ) : products?.length === 0 ? (
        <>
          {productSync !== false ? (
            <center>
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '50%',
                  padding: '100px',
                  marginTop: '10px',
                  alignItems: 'center',
                }}
              >
                <>
                  <h2
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    {productSync === '0 products found for current page'
                      ? 'No products fetched during previous sync.'
                      : productSync}
                  </h2>
                </>
                <Button
                  sx={{
                    background:
                      platform === 'WORDPRESS' ||
                      platform === 'SHOPIFY' ||
                      platform === 'MAGENTO' ||
                      platform === 'BIGCOMMERCE'
                        ? '#e93a7d'
                        : '#ededed',
                    '&:hover': {
                      background:
                        platform === 'WORDPRESS' ||
                        platform === 'SHOPIFY' ||
                        platform === 'MAGENTO' ||
                        platform === 'BIGCOMMERCE'
                          ? '#e93a7d'
                          : '#ededed',
                    },
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    width: '180px',
                    border: 'none',
                    height: '50px',
                    cursor: 'pointer',
                  }}
                  disabled={
                    platform === 'WORDPRESS' ||
                    platform === 'SHOPIFY' ||
                    platform === 'MAGENTO' ||
                    platform === 'BIGCOMMERCE'
                      ? false
                      : true
                  }
                  onClick={handleRotate}
                >
                  Run Product Sync
                </Button>{' '}
              </div>
            </center>
          ) : (
            <AppLoader />
          )}
        </>
      ) : (
        <>
          <QPMerchantProductsSharedTable
            rows={products}
            columns={columns}
            isOms={isOms}
            isError={isError}
            isInProgress={isInProgress}
            headlessURL={headlessURL}
            selectRole={false}
            title={'All Products'}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={(e) => setCurrentPage(e)}
            reloadProductData={reloadProductData}
            setReloadProductData={setReloadProductData}
          />
        </>
      )}
    </>
  )
}

export default ProductTable

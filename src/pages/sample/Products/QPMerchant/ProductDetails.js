import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container } from 'react-trello'
import { fetchProductDetails } from 'redux/actions/ProductAction'
import ProductDetailsTable from './ProductDetailsTable'
import ProductVariants from './ProductVariants'

const ProductDetails = () => {
  const { id } = useParams()
  const productDetails = useSelector((state) => state.product.productDetails)
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id, userDetail.id))
    }
  }, [id])
  return (
    <Container style={{ padding: 0, maxWidth: '100%', margin: 0 }}>
      <ProductDetailsTable
        data={productDetails.product_info}
        productImages={productDetails.product_images}
      />
      {productDetails ? (
        productDetails.product_variants ? (
          productDetails.product_variants.length > 0 ? (
            <ProductVariants data={productDetails.product_variants} />
          ) : (
            ''
          )
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </Container>
  )
}
export default ProductDetails

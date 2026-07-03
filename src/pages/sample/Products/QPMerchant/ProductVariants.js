import { Typography } from '@mui/material'
import { Container } from 'react-trello'
import ProductVariantsTable from './ProductVariantsTable'

const ProductVariants = ({ data }) => {
  return (
    <Container>
      <Typography variant='h2' component='h3' marginTop={5} marginBottom={5}>
        Variants
      </Typography>
      <ProductVariantsTable data={data} />
    </Container>
  )
}

export default ProductVariants

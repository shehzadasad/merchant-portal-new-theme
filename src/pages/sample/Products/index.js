import { Container } from '@mui/material'
import React from 'react'
import ProductsTitleRow from './QPMerchant/ProductsTitleRow.js'
import ProductTable from './QPMerchant/ProductTable.js'

const Products = () => {
  document.title = 'Products | QisstPay - Merchants'
  return (
    <Container style={{ padding: 0, maxWidth: '100%', margin: 0 }}>
      <ProductsTitleRow />
      <ProductTable />
    </Container>
  )
}

export default Products

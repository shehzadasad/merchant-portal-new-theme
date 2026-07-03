import { ArrowBack } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SharedButton from 'shared/components/SharedButton'
import DeleteProductModal from '../DeleteProductModal'
import EditProductModal from '../EditProductModal'

const ProductDetailsTopRow = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Grid item>
          <Grid container>
            <Grid item>
              <Link to={`/products`}>
                <ArrowBack />
              </Link>
            </Grid>
            <Grid item>
              <Typography variant='h2' component='h3' marginLeft={3}>
                Product Details
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <SharedButton
                text='Delete Product'
                style={{
                  background: '#fff',
                  borderRadius: 50,
                  color: '#e93a7d',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  borderColor: '#e93a7d',
                  border: 'solid',
                  height: 40,
                  cursor: 'pointer',
                }}
                onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
              />
            </Grid>
            <Grid item>
              <SharedButton
                text='Edit Product'
                style={{
                  background: '#fff',
                  borderRadius: 50,
                  color: '#e93a7d',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  borderColor: '#e93a7d',
                  border: 'solid',
                  height: 40,
                  cursor: 'pointer',
                  marginLeft: 10,
                }}
                onClick={() => setIsEditModalOpen(!isEditModalOpen)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <EditProductModal open={isEditModalOpen} setOpen={setIsEditModalOpen} />
      <DeleteProductModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
      />
    </>
  )
}

export default ProductDetailsTopRow

import { LinkOutlined } from '@mui/icons-material'
import {
  Box,
  Container,
  Grid,
  Paper,
  TableContainer,
  Typography,
} from '@mui/material'
import ProductDetailsTopRow from './ProductDetailsTopRow'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import clipBoardIcon from 'assets/product/clipboardIcon.svg'
import currencyFormatter from 'currency-formatter'
import { encode } from 'js-base64'

const ProductDetailsTable = ({ data, productImages }) => {
  document.title = 'Product Details | QisstPay - Merchants'
  const headlessURL = 'https://headless-commerce-product.qisstpay.com/'

  if (data && data.id) {
    return (
      <Container style={{ padding: 0, minWidth: '100%', margin: 0 }}>
        <ProductDetailsTopRow />
        <TableContainer
          component={Paper}
          style={{ marginTop: 38, borderRadius: 10 }}
        >
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={2} md={2} lg={2}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Product ID
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {data.id}
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
            <Grid item xs={2} md={2} lg={2}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Title
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {data.title}
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
            <Grid item xs={2} md={2} lg={2}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Product Category
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                {data.category}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: 5,
              borderBottom: '1px solid #c9cdd4',
            }}
          >
            <Grid item xs={2} md={2} lg={2}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Description
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </Grid>
          </Grid>

          {data.has_variants === 'NO' && (
            <>
              <Grid
                container
                sx={{
                  padding: 5,
                  borderBottom: '1px solid #c9cdd4',
                }}
              >
                <Grid item xs={2} md={2} lg={2}>
                  <Typography
                    variant='p'
                    component='p'
                    fontSize={14}
                    fontWeight={'bold'}
                  >
                    Price
                  </Typography>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                  {currencyFormatter.format(data.price, {
                    code: data.currency,
                  })}
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  padding: 5,
                  borderBottom: '1px solid #c9cdd4',
                }}
              >
                <Grid item xs={2} md={2} lg={2}>
                  <Typography
                    variant='p'
                    component='p'
                    fontSize={14}
                    fontWeight={'bold'}
                  >
                    Sale Price
                  </Typography>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                  {currencyFormatter.format(data.sale_price, {
                    code: data.currency,
                  })}
                </Grid>
              </Grid>
            </>
          )}

          {data.url && (
            <Grid
              container
              sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Product URL
                </Typography>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant='p' component='p' fontSize={14}>
                  <a href={data.url} target='_blank'>
                    <Box
                      style={{
                        display: 'flex',
                      }}
                    >
                      <LinkOutlined
                        style={{
                          marginRight: 10,
                          color: '#ea3b7d',
                        }}
                      />
                      <Typography
                        style={{
                          color: '#ea3b7d',
                        }}
                      >
                        Open Link
                      </Typography>
                    </Box>
                  </a>
                </Typography>
              </Grid>
            </Grid>
          )}

          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={2} md={2} lg={2}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Headless URL
              </Typography>
            </Grid>

            <Grid item xs={8} md={8} lg={8}>
              <Typography variant='p' component='p' fontSize={14}>
                <a href={headlessURL + data.id} target='_blank'>
                  <Box
                    style={{
                      display: 'flex',
                    }}
                  >
                    <LinkOutlined
                      style={{
                        marginRight: 10,
                        color: '#ea3b7d',
                      }}
                    />
                    <Typography
                      style={{
                        color: '#ea3b7d',
                      }}
                    >
                      Open Link
                    </Typography>
                  </Box>
                </a>
              </Typography>
            </Grid>
          </Grid>
          {data.has_variants === 'NO' && (
            <Grid
              container
              sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
            >
              <Grid item xs={2} md={2} lg={2}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Checkout URL
                </Typography>
              </Grid>

              <Grid item xs={8} md={8} lg={8}>
                <Box display='flex'>
                  <Typography variant='p' component='p' fontSize={14}>
                    <a
                      href={
                        process.env.REACT_APP_HEADLESS_URL +
                        'product/' +
                        encode(data.headless_url)
                      }
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Box
                        style={{
                          display: 'flex',
                        }}
                      >
                        <LinkOutlined
                          style={{
                            marginRight: 10,
                            color: '#ea3b7d',
                          }}
                        />
                        <Typography
                          style={{
                            color: '#ea3b7d',
                          }}
                        >
                          Open Link
                        </Typography>
                      </Box>
                    </a>
                  </Typography>
                  <CopyToClipboard
                    text={data.headless_url}
                    onCopy={() => toast.success('Link Copied')}
                  >
                    <img
                      src={clipBoardIcon}
                      style={{
                        cursor: 'pointer',
                        marginLeft: 10,
                      }}
                      alt='img'
                    />
                  </CopyToClipboard>
                </Box>
              </Grid>
            </Grid>
          )}
          <Grid
            container
            sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          >
            <Grid item xs={2} md={2} lg={2}>
              <Typography
                variant='p'
                component='p'
                fontSize={14}
                fontWeight={'bold'}
              >
                Images
              </Typography>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
              <Grid container>
                <Grid item>
                  {productImages.length > 0
                    ? productImages.map((items) => {
                        return (
                          <img
                            src={items.image_url}
                            alt='Product'
                            style={{
                              width: 100,
                              height: 100,
                              marginRight: '15pt',
                            }}
                          />
                        )
                      })
                    : ''}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TableContainer>
      </Container>
    )
  } else {
    return <></>
  }
}

export default ProductDetailsTable

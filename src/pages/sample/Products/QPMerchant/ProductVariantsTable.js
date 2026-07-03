import { LinkOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import clipBoardIcon from 'assets/product/clipboardIcon.svg'
import { encode } from 'js-base64'

const ProductVariantsTable = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      style={{
        borderRadius: 10,
      }}
      id='Variants-Table'
    >
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 50 }}>Options</TableCell>
            <TableCell align='center' style={{ width: 150 }}>
              Quantity
            </TableCell>
            <TableCell align='center' style={{ width: 100 }}>
              Price
            </TableCell>
            <TableCell align='center' style={{ width: 100 }}>
              Sale Price
            </TableCell>
            <TableCell align='center' style={{ width: 100 }}>
              Checkout URL
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {row?.featured_image?.length > 0 ? (
                      <img
                        src={row?.featured_image}
                        style={{
                          width: 40,
                          height: 40,
                          marginRight: 10,
                        }}
                        alt='img'
                      />
                    ) : (
                      ''
                    )}
                    {/* {row?.variant_attributes?.join(' , ')} */}
                  </Box>
                </TableCell>
                <TableCell align='center'>{row?.available_stock}</TableCell>
                <TableCell align='center'>{row?.price}</TableCell>
                <TableCell align='center'>
                  {row.sale_price ? row.sale_price : 'N/A'}
                </TableCell>
                <TableCell align='center'>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <a
                      href={
                        process.env.REACT_APP_HEADLESS_URL +
                        'product/' +
                        encode(row.headless_url)
                      }
                      target='_blank'
                      rel='noreferrer'
                      style={{ display: 'flex' }}
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
                        textAlign='center'
                      >
                        Open Link
                      </Typography>
                    </a>

                    <CopyToClipboard
                      text={
                        process.env.REACT_APP_HEADLESS_URL +
                        'product/' +
                        encode(row.headless_url)
                      }
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
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductVariantsTable

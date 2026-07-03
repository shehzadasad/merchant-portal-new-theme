import { Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const OrderDetailsTable = (props) => {
  const { id } = useParams()
  const { rows, columns } = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
      <Grid
        container
        style={{ padding: 12, paddingLeft: 15, paddingRight: 0 }}
        alignItems='center'
      >
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={14}>
            {props.vendorName
              ? props.vendorName
              : props.title
              ? props.title
              : 'Users'}
          </Typography>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant={'p'} component={'p'}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.customer}
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'product' ? (
                            <Grid container alignItems={'center'}>
                              <img
                                src={value.productImg}
                                alt={value.productTitle}
                              />
                              <Typography
                                variant={'p'}
                                component={'p'}
                                marginLeft={4}
                              >
                                {value.productTitle}
                              </Typography>
                            </Grid>
                          ) : (
                            ''
                          )}
                          {column.id !== 'product' ? (
                            <>
                              {column.format && typeof value === 'number' ? (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              ) : column.id === 'id' ? (
                                <Link
                                  to={`/orders/item/details/${id && id}/${
                                    row['id']
                                  }`}
                                >
                                  <Typography
                                    variant={'p'}
                                    component={'p'}
                                    color='#ED2079'
                                  >
                                    {value}
                                  </Typography>
                                </Link>
                              ) : (
                                <Typography variant={'p'} component={'p'}>
                                  {value}
                                </Typography>
                              )}
                              {column.format === 'img' ? (
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/orders/item/details/${id && id}/${
                                        row['id']
                                      }`
                                    )
                                  }
                                />
                              ) : (
                                ''
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.vendorName && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  )
}

export default OrderDetailsTable

OrderDetailsTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  timeRange: PropTypes.bool,
}
